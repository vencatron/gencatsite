import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Fetch user from database
    const user = await storage.getUser(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user profile without password
    const { passwordHash: _passwordHash, ...userProfile } = user;
    return res.json({
      profile: userProfile
    });
  } catch (error) {
    console.error('User profile endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
