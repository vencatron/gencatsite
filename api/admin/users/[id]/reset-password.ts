import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcrypt';
import { verifyAccessToken } from '../../../jwt.js';
import { storage } from '../../../storage.js';
import { validatePassword } from '../../../validation.js';

const BCRYPT_ROUNDS = 10;

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

    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
    }

    const { newPassword } = (body ?? {}) as { newPassword?: string };

    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
        details: passwordValidation.errors,
      });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);
    await storage.updateUser(userId, { passwordHash });

    return res.json({
      message: `Password reset successfully for user ${user.username}`,
      userId: user.id,
    });
  } catch (error) {
    console.error('Admin reset password error:', error);
    return res.status(500).json({ error: 'Internal server error resetting password' });
  }
}
