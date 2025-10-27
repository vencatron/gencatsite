import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../../jwt.js';
import { storage } from '../../storage.js';

const sanitizeUsers = (users: any[]) =>
  users.map(({ passwordHash, twoFactorSecret, twoFactorBackupCodes, passwordResetToken, emailVerificationToken, ...rest }) => ({
    ...rest,
    // Ensure boolean fields default to false when null
    isActive: rest.isActive ?? false,
    emailVerified: rest.emailVerified ?? false,
  }));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
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

    const users = await storage.getAllUsers();
    return res.json({ users: sanitizeUsers(users) });
  } catch (error) {
    console.error('Admin users list error:', error);
    return res.status(500).json({ error: 'Internal server error fetching users' });
  }
}
