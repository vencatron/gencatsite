import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../storage.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../jwt.js';
import cookie from 'cookie';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get refresh token from cookie
    const cookies = cookie.parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token not provided' });
    }

    // Verify refresh token
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      res.setHeader('Set-Cookie', [
        `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
          process.env.NODE_ENV === 'production' ? '; Secure' : ''
        }`,
      ]);
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    if (!payload || typeof payload.userId !== 'number') {
      res.setHeader('Set-Cookie', [
        `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
          process.env.NODE_ENV === 'production' ? '; Secure' : ''
        }`,
      ]);
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    // Get user
    const user = await storage.getUser(payload.userId);
    if (!user) {
      res.setHeader('Set-Cookie', [
        `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
          process.env.NODE_ENV === 'production' ? '; Secure' : ''
        }`,
      ]);
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      res.setHeader('Set-Cookie', [
        `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax${
          process.env.NODE_ENV === 'production' ? '; Secure' : ''
        }`,
      ]);
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Set new refresh token cookie
    res.setHeader('Set-Cookie', [
      `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`,
    ]);

    return res.json({
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    return res.status(500).json({ error: 'Internal server error during token refresh' });
  }
}
