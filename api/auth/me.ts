import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage.js';
import { verifyAccessToken } from '../jwt.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.substring(7);

    // Verify token
    let payload;
    try {
      payload = verifyAccessToken(token);
    } catch (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Get user
    const user = await storage.getUser(payload.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
