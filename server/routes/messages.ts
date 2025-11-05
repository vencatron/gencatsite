import { Router, Request, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { storage } from '../storage';
import { sanitizeInput } from '../utils/validation';
import { InsertMessage } from '../../shared/schema';

const router = Router();

// GET /api/messages - List user's messages with pagination
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Parse pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = (page - 1) * limit;

    // Get all messages for the user
    const allMessages = await storage.getMessagesByUserId(req.user.userId);

    // Filter out deleted messages
    const activeMessages = allMessages.filter(msg => msg.status !== 'deleted');

    // Apply pagination
    const paginatedMessages = activeMessages.slice(offset, offset + limit);

    // Transform to match frontend expected format
    const transformedMessages = paginatedMessages.map(msg => ({
      id: msg.id,
      userId: msg.senderId,
      from: msg.senderId === req.user!.userId ? 'user' : 'support',
      text: msg.content,
      isRead: msg.isRead,
      createdAt: msg.createdAt
    }));

    // Calculate unread count
    const unreadCount = activeMessages.filter(msg =>
      !msg.isRead && msg.recipientId === req.user!.userId
    ).length;

    res.json({
      success: true,
      messages: transformedMessages,
      pagination: {
        page,
        limit,
        total: activeMessages.length,
        totalPages: Math.ceil(activeMessages.length / limit)
      },
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// GET /api/messages/:id - Get specific message
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const messageId = parseInt(req.params.id);
    if (isNaN(messageId)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const message = await storage.getMessage(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Check if user has access to this message
    if (message.senderId !== req.user.userId && 
        message.recipientId !== req.user.userId && 
        req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Don't return deleted messages
    if (message.status === 'deleted') {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Auto-mark as read if recipient is viewing
    if (message.recipientId === req.user.userId && !message.isRead) {
      await storage.markMessageAsRead(messageId);
      message.isRead = true;
      message.readAt = new Date();
    }

    // Get thread messages if this message is part of a thread
    let thread = null;
    if (message.threadId) {
      const threadMessages = await storage.getMessageThread(message.threadId);
      thread = threadMessages.filter(msg => msg.status !== 'deleted');
    }

    res.json({
      success: true,
      message,
      thread
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

// POST /api/messages - Send new message
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { recipientId, subject, content, priority, threadId, attachmentIds } = req.body;

    // Validate required fields
    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Validate recipient if provided
    if (recipientId) {
      const recipientIdNum = parseInt(recipientId);
      if (isNaN(recipientIdNum)) {
        return res.status(400).json({ error: 'Invalid recipient ID' });
      }

      // Verify recipient exists
      const recipient = await storage.getUser(recipientIdNum);
      if (!recipient) {
        return res.status(404).json({ error: 'Recipient not found' });
      }

      // Prevent sending messages to oneself
      if (recipientIdNum === req.user.userId) {
        return res.status(400).json({ error: 'Cannot send message to yourself' });
      }
    }

    // Validate priority
    const validPriorities = ['low', 'normal', 'high', 'urgent'];
    const messagePriority = priority && validPriorities.includes(priority) ? priority : 'normal';

    // Sanitize inputs
    const sanitizedSubject = subject ? sanitizeInput(subject) : null;
    const sanitizedContent = sanitizeInput(content);
    const sanitizedAttachmentIds = attachmentIds ? sanitizeInput(attachmentIds) : null;

    // Create message
    const newMessage: InsertMessage = {
      threadId: threadId ? parseInt(threadId) : null,
      senderId: req.user.userId,
      recipientId: recipientId ? parseInt(recipientId) : null,
      subject: sanitizedSubject,
      content: sanitizedContent,
      priority: messagePriority,
      status: 'active',
      attachmentIds: sanitizedAttachmentIds,
      isRead: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const message = await storage.createMessage(newMessage);

    // Transform to match frontend expected format
    const transformedMessage = {
      id: message.id,
      userId: message.senderId,
      from: 'user' as const,
      text: message.content,
      isRead: message.isRead,
      createdAt: message.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: transformedMessage
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// PUT /api/messages/:id/read - Mark message as read
router.put('/:id/read', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const messageId = parseInt(req.params.id);
    if (isNaN(messageId)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    // Get message to check access
    const message = await storage.getMessage(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Only recipient can mark as read
    if (message.recipientId !== req.user.userId) {
      return res.status(403).json({ error: 'Only recipient can mark message as read' });
    }

    // Mark as read
    const success = await storage.markMessageAsRead(messageId);

    if (!success) {
      return res.status(500).json({ error: 'Failed to mark message as read' });
    }

    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ error: 'Failed to mark message as read' });
  }
});

// DELETE /api/messages/:id - Delete message (soft delete)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const messageId = parseInt(req.params.id);
    if (isNaN(messageId)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    // Get message to check access
    const message = await storage.getMessage(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // User can only delete their own sent/received messages
    if (message.senderId !== req.user.userId && 
        message.recipientId !== req.user.userId && 
        req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Soft delete by updating status
    const updatedMessage = await storage.updateMessage(messageId, { status: 'deleted' });

    if (!updatedMessage) {
      return res.status(500).json({ error: 'Failed to delete message' });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;