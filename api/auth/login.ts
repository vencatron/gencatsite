import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcrypt';
import { storage } from '../storage.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../jwt.js';
import { sanitizeInput } from '../validation.js';
import { applyRateLimit, AUTH_LIMIT } from '../utils/rateLimiter.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Apply rate limiting
  if (!applyRateLimit(req, res, AUTH_LIMIT)) {
    return; // Response already sent by applyRateLimit
  }

  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!password || (!username && !email)) {
      return res.status(400).json({ error: 'Password and either username or email are required' });
    }

    // Find user
    let user;
    if (email) {
      const sanitizedEmail = sanitizeInput(email).toLowerCase();
      user = await storage.getUserByEmail(sanitizedEmail);
    } else if (username) {
      const sanitizedUsername = sanitizeInput(username);
      user = await storage.getUserByUsername(sanitizedUsername);
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        error: 'Please verify your email address before logging in. Check your inbox for the verification email.',
        emailNotVerified: true,
        email: user.email
      });
    }

    // Verify password
    if (!user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check for 2FA
    if (user.twoFactorEnabled) {
      const tempToken = generateAccessToken({ ...user, role: '2fa-pending' });
      return res.json({
        message: '2FA required',
        requires2FA: true,
        tempToken,
        userId: user.id,
      });
    }

    // Update last login
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
    const { passwordHash: _passwordHash, ...userWithoutPassword } = user;
    return res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken,
      requires2FA: false,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login' });
  }
}
