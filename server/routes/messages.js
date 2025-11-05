"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const storage_1 = require("../storage");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// Helper function to transform database message to frontend format
function transformMessage(msg, currentUserId) {
    return {
        id: msg.id,
        userId: msg.senderId,
        from: msg.senderId === currentUserId ? 'user' : 'support',
        text: msg.content,
        isRead: msg.isRead || false,
        createdAt: msg.createdAt
    };
}
// GET /api/messages - List user's messages with pagination
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Parse pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const offset = (page - 1) * limit;
        // Get all messages for the user
        const allMessages = await storage_1.storage.getMessagesByUserId(req.user.userId);
        // Filter out deleted messages
        const activeMessages = allMessages.filter(msg => msg.status !== 'deleted');
        // Apply pagination
        const paginatedMessages = activeMessages.slice(offset, offset + limit);
        // Transform messages to frontend format
        const transformedMessages = paginatedMessages.map(msg => transformMessage(msg, req.user.userId));
        // Calculate unread count
        const unreadCount = activeMessages.filter(msg => !msg.isRead && msg.recipientId === req.user.userId).length;
        res.json({
            messages: transformedMessages,
            pagination: {
                page,
                limit,
                total: activeMessages.length,
                totalPages: Math.ceil(activeMessages.length / limit)
            },
            unreadCount
        });
    }
    catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});
// GET /api/messages/:id - Get specific message
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const messageId = parseInt(req.params.id);
        if (isNaN(messageId)) {
            return res.status(400).json({ error: 'Invalid message ID' });
        }
        const message = await storage_1.storage.getMessage(messageId);
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
            await storage_1.storage.markMessageAsRead(messageId);
            message.isRead = true;
            message.readAt = new Date();
        }
        // Get thread messages if this message is part of a thread
        let thread = null;
        if (message.threadId) {
            const threadMessages = await storage_1.storage.getMessageThread(message.threadId);
            thread = threadMessages.filter(msg => msg.status !== 'deleted');
        }
        res.json({
            success: true,
            message,
            thread
        });
    }
    catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ error: 'Failed to fetch message' });
    }
});
// POST /api/messages - Send new message
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Accept both 'text' (frontend format) and 'content' (full API format)
        const { text, recipientId, subject, content, priority, threadId, attachmentIds } = req.body;
        const messageContent = text || content;
        // Validate required fields
        if (!messageContent) {
            return res.status(400).json({ error: 'Message content is required' });
        }
        // Find an admin/support user to send message to (if recipientId not provided)
        let targetRecipientId = recipientId;
        if (!targetRecipientId) {
            // Find first admin user to use as default support recipient
            const adminUsers = await storage_1.storage.getUserByRole('admin');
            if (adminUsers.length > 0) {
                targetRecipientId = adminUsers[0].id;
            }
        }
        // Validate recipient if provided
        if (targetRecipientId) {
            const recipientIdNum = parseInt(targetRecipientId);
            if (isNaN(recipientIdNum)) {
                return res.status(400).json({ error: 'Invalid recipient ID' });
            }
            // Verify recipient exists
            const recipient = await storage_1.storage.getUser(recipientIdNum);
            if (!recipient) {
                return res.status(404).json({ error: 'Recipient not found' });
            }
            // Prevent sending messages to oneself
            if (recipientIdNum === req.user.userId) {
                return res.status(400).json({ error: 'Cannot send message to yourself' });
            }
            targetRecipientId = recipientIdNum;
        }
        // Validate priority
        const validPriorities = ['low', 'normal', 'high', 'urgent'];
        const messagePriority = priority && validPriorities.includes(priority) ? priority : 'normal';
        // Sanitize inputs
        const sanitizedSubject = subject ? (0, validation_1.sanitizeInput)(subject) : null;
        const sanitizedContent = (0, validation_1.sanitizeInput)(messageContent);
        const sanitizedAttachmentIds = attachmentIds ? (0, validation_1.sanitizeInput)(attachmentIds) : null;
        // Create message
        const newMessage = {
            threadId: threadId ? parseInt(threadId) : null,
            senderId: req.user.userId,
            recipientId: targetRecipientId || null,
            subject: sanitizedSubject,
            content: sanitizedContent,
            priority: messagePriority,
            status: 'active',
            attachmentIds: sanitizedAttachmentIds,
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const createdMessage = await storage_1.storage.createMessage(newMessage);
        // Transform to frontend format and return
        const transformedMessage = transformMessage(createdMessage, req.user.userId);
        res.status(201).json({
            message: transformedMessage
        });
    }
    catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});
// PUT /api/messages/:id/read - Mark message as read
router.put('/:id/read', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const messageId = parseInt(req.params.id);
        if (isNaN(messageId)) {
            return res.status(400).json({ error: 'Invalid message ID' });
        }
        // Get message to check access
        const message = await storage_1.storage.getMessage(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        // Only recipient can mark as read
        if (message.recipientId !== req.user.userId) {
            return res.status(403).json({ error: 'Only recipient can mark message as read' });
        }
        // Mark as read
        const success = await storage_1.storage.markMessageAsRead(messageId);
        if (!success) {
            return res.status(500).json({ error: 'Failed to mark message as read' });
        }
        res.json({
            success: true,
            message: 'Message marked as read'
        });
    }
    catch (error) {
        console.error('Error marking message as read:', error);
        res.status(500).json({ error: 'Failed to mark message as read' });
    }
});
// DELETE /api/messages/:id - Delete message (soft delete)
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const messageId = parseInt(req.params.id);
        if (isNaN(messageId)) {
            return res.status(400).json({ error: 'Invalid message ID' });
        }
        // Get message to check access
        const message = await storage_1.storage.getMessage(messageId);
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
        const updatedMessage = await storage_1.storage.updateMessage(messageId, { status: 'deleted' });
        if (!updatedMessage) {
            return res.status(500).json({ error: 'Failed to delete message' });
        }
        res.json({
            success: true,
            message: 'Message deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});
exports.default = router;
//# sourceMappingURL=messages.js.map