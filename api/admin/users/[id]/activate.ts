import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../../../jwt.js';
import { storage } from '../../../storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const { id } = req.query;
    const userId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id ?? '', 10);

    if (!userId || Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await storage.updateUser(userId, { isActive: true });

    return res.json({
      message: `User ${user.username} has been activated`,
      userId: user.id,
    });
  } catch (error) {
    console.error('Admin activate user error:', error);
    return res.status(500).json({ error: 'Internal server error activating user' });
  }
}
