import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No authorization token provided' });
  }

  const token = authHeader.substring(7);
  const decoded = verifyAccessToken(token);

  if (!decoded || !decoded.userId) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  const userId = decoded.userId;

  if (req.method === 'GET') {
    try {
      const messages = await storage.getMessages(userId);
      
      // Map to frontend format
      const formattedMessages = messages.map(msg => ({
        id: msg.id,
        userId: msg.senderId,
        from: msg.senderId === userId ? 'user' : 'support',
        text: msg.content,
        isRead: msg.isRead,
        createdAt: msg.createdAt
      }));

      return res.json({ messages: formattedMessages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  } else if (req.method === 'POST') {
    try {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: 'Message content is required' });
      }

      // Determine recipient. For now, we'll leave it null for "support"
      // or we could look up an admin.
      // If the sender is support (admin), we'd need to know who they are replying to.
      // But this endpoint seems to be for the "Portal Messages" which is user-facing.
      
      const newMessage = await storage.createMessage({
        senderId: userId,
        recipientId: null, // Send to support queue
        content,
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Return in frontend format
      return res.json({
        data: {
          id: newMessage.id,
          userId: newMessage.senderId,
          from: 'user',
          text: newMessage.content,
          isRead: newMessage.isRead,
          createdAt: newMessage.createdAt
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
