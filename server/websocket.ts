import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { storage } from './storage';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'your-secret-key-change-this';

interface AuthenticatedWebSocket extends WebSocket {
  userId?: number;
  userEmail?: string;
  isAlive?: boolean;
}

interface WSMessage {
  type: 'message' | 'typing' | 'read' | 'ping' | 'pong';
  data?: any;
}

export class MessagingWebSocketServer {
  private wss: WebSocketServer;
  private clients: Map<number, AuthenticatedWebSocket[]> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({
      server,
      path: '/ws/messages'
    });

    this.wss.on('connection', (ws: AuthenticatedWebSocket, req) => {
      this.handleConnection(ws, req);
    });

    // Heartbeat to detect dead connections
    const interval = setInterval(() => {
      this.wss.clients.forEach((ws: AuthenticatedWebSocket) => {
        if (ws.isAlive === false) {
          console.log('Terminating dead WebSocket connection');
          return ws.terminate();
        }
        ws.isAlive = false;
        ws.ping();
      });
    }, 30000); // Check every 30 seconds

    this.wss.on('close', () => {
      clearInterval(interval);
    });

    console.log('WebSocket server initialized at /ws/messages');
  }

  private handleConnection(ws: AuthenticatedWebSocket, req: any) {
    // Extract token from query string or headers
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token') || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      console.log('WebSocket connection rejected: No token provided');
      ws.close(1008, 'Authentication required');
      return;
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as { userId: number; email: string };
      ws.userId = decoded.userId;
      ws.userEmail = decoded.email;
      ws.isAlive = true;

      // Add to clients map
      if (!this.clients.has(decoded.userId)) {
        this.clients.set(decoded.userId, []);
      }
      this.clients.get(decoded.userId)!.push(ws);

      console.log(`WebSocket connected: User ${decoded.userId} (${decoded.email})`);

      // Send welcome message
      this.sendToClient(ws, {
        type: 'ping',
        data: { message: 'Connected to messaging server', userId: decoded.userId }
      });

      // Handle pong responses
      ws.on('pong', () => {
        ws.isAlive = true;
      });

      // Handle incoming messages
      ws.on('message', async (data: Buffer) => {
        try {
          const message: WSMessage = JSON.parse(data.toString());
          await this.handleMessage(ws, message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          this.sendToClient(ws, {
            type: 'error',
            data: { error: 'Invalid message format' }
          });
        }
      });

      // Handle disconnection
      ws.on('close', () => {
        this.removeClient(ws);
        console.log(`WebSocket disconnected: User ${decoded.userId}`);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        this.removeClient(ws);
      });

    } catch (error) {
      console.log('WebSocket connection rejected: Invalid token');
      ws.close(1008, 'Invalid authentication token');
    }
  }

  private async handleMessage(ws: AuthenticatedWebSocket, message: WSMessage) {
    if (!ws.userId) return;

    switch (message.type) {
      case 'message':
        await this.handleNewMessage(ws, message.data);
        break;
      case 'typing':
        await this.handleTyping(ws, message.data);
        break;
      case 'read':
        await this.handleMarkAsRead(ws, message.data);
        break;
      case 'ping':
        this.sendToClient(ws, { type: 'pong', data: { timestamp: Date.now() } });
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  }

  private async handleNewMessage(ws: AuthenticatedWebSocket, data: any) {
    if (!ws.userId) return;

    try {
      const { content, recipientId } = data;

      if (!content) {
        this.sendToClient(ws, {
          type: 'error',
          data: { error: 'Message content is required' }
        });
        return;
      }

      // Create message in database
      const newMessage = await storage.createMessage({
        senderId: ws.userId,
        recipientId: recipientId || null,
        content: content,
        subject: null,
        priority: 'normal',
        status: 'active',
        isRead: false,
        threadId: null,
        attachmentIds: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Transform to frontend format
      const transformedMessage = {
        id: newMessage.id,
        userId: newMessage.senderId,
        from: 'user' as const,
        text: newMessage.content,
        isRead: newMessage.isRead,
        createdAt: newMessage.createdAt
      };

      // Send confirmation to sender
      this.sendToClient(ws, {
        type: 'message',
        data: transformedMessage
      });

      // Broadcast to recipient (support/admin users)
      // For now, broadcast to all admin users
      const adminUsers = await storage.getUsersByRole('admin');
      for (const admin of adminUsers) {
        const supportMessage = {
          id: newMessage.id,
          userId: newMessage.senderId,
          from: 'user' as const,
          text: newMessage.content,
          isRead: newMessage.isRead,
          createdAt: newMessage.createdAt
        };
        this.broadcastToUser(admin.id, {
          type: 'message',
          data: supportMessage
        });
      }

      console.log(`Message sent from user ${ws.userId} to support`);
    } catch (error) {
      console.error('Error handling new message:', error);
      this.sendToClient(ws, {
        type: 'error',
        data: { error: 'Failed to send message' }
      });
    }
  }

  private async handleTyping(ws: AuthenticatedWebSocket, data: any) {
    if (!ws.userId) return;

    const { isTyping, recipientId } = data;

    // Broadcast typing indicator to recipient
    if (recipientId) {
      this.broadcastToUser(recipientId, {
        type: 'typing',
        data: { userId: ws.userId, isTyping }
      });
    } else {
      // Broadcast to all admins
      const adminUsers = await storage.getUsersByRole('admin');
      for (const admin of adminUsers) {
        this.broadcastToUser(admin.id, {
          type: 'typing',
          data: { userId: ws.userId, isTyping }
        });
      }
    }
  }

  private async handleMarkAsRead(ws: AuthenticatedWebSocket, data: any) {
    if (!ws.userId) return;

    try {
      const { messageId } = data;

      if (!messageId) return;

      const message = await storage.getMessage(messageId);
      if (!message) return;

      // Only recipient can mark as read
      if (message.recipientId !== ws.userId) return;

      await storage.markMessageAsRead(messageId);

      // Notify sender that message was read
      this.broadcastToUser(message.senderId, {
        type: 'read',
        data: { messageId }
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }

  private sendToClient(ws: AuthenticatedWebSocket, message: any) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  private broadcastToUser(userId: number, message: any) {
    const userClients = this.clients.get(userId);
    if (userClients) {
      userClients.forEach(client => {
        this.sendToClient(client, message);
      });
    }
  }

  private removeClient(ws: AuthenticatedWebSocket) {
    if (!ws.userId) return;

    const userClients = this.clients.get(ws.userId);
    if (userClients) {
      const index = userClients.indexOf(ws);
      if (index > -1) {
        userClients.splice(index, 1);
      }
      if (userClients.length === 0) {
        this.clients.delete(ws.userId);
      }
    }
  }

  public broadcast(message: any) {
    this.wss.clients.forEach((client: AuthenticatedWebSocket) => {
      this.sendToClient(client, message);
    });
  }
}
