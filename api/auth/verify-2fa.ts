import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../jwt.js';
import { sanitizeInput } from '../validation.js';
import { verifyTwoFactorToken, verifyBackupCode, removeUsedBackupCode } from '../twoFactor.js';
import { applyRateLimit, TWO_FACTOR_LIMIT } from '../utils/rateLimiter.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Apply rate limiting - strict for 2FA to prevent brute force
  if (!applyRateLimit(req, res, TWO_FACTOR_LIMIT)) {
    return;
  }

  try {
    const { userId, token, isBackupCode } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ error: 'User ID and 2FA token are required' });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.twoFactorEnabled || !user.twoFactorSecret) {
      return res.status(400).json({ error: '2FA is not enabled for this user' });
    }

    // Verify 2FA token
    let isValid = false;

    if (isBackupCode) {
      if (!user.twoFactorBackupCodes) {
        return res.status(400).json({ error: 'No backup codes available' });
      }
      const hashedCodes = JSON.parse(user.twoFactorBackupCodes);
      isValid = verifyBackupCode(sanitizeInput(token), hashedCodes);

      if (isValid) {
        const updatedCodes = removeUsedBackupCode(sanitizeInput(token), hashedCodes);
        await storage.updateUser(user.id, {
          twoFactorBackupCodes: JSON.stringify(updatedCodes),
        });
      }
    } else {
      isValid = verifyTwoFactorToken(user.twoFactorSecret, sanitizeInput(token));
    }

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid 2FA token' });
    }

    // 2FA verified - update last login
    await storage.updateUser(user.id, { lastLoginAt: new Date() });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token cookie
    res.setHeader('Set-Cookie', [
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`,
    ]);

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return res.json({
      message: '2FA verification successful',
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    console.error('2FA verification error:', error);
    return res.status(500).json({ error: 'Internal server error during 2FA verification' });
  }
}
