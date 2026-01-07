import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { applyRateLimit, PASSWORD_RESET_LIMIT } from '../utils/rateLimiter.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Apply strict rate limiting for password reset
  if (!applyRateLimit(req, res, PASSWORD_RESET_LIMIT)) {
    return;
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const [{ storage }, emailServiceModule] = await Promise.all([
      import('../storage.js'),
      import('../../server/services/email.js'),
    ]);
    const { emailService } = emailServiceModule;

    // Find user by email
    const user = await storage.getUserByEmail(email);

    if (!user) {
      // For security reasons, don't reveal if user exists
      return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update user with reset token
    await storage.updateUser(user.id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
      updatedAt: new Date(),
    });

    // Send password reset email
    const emailSent = await emailService.sendPasswordResetEmail(
      user.email,
      user.username,
      resetToken
    );

    if (!emailSent) {
      console.error('Failed to send password reset email to:', user.email);
      return res.status(500).json({ error: 'Failed to send password reset email. Please try again later.' });
    }

    return res.status(200).json({
      message: 'Password reset email sent successfully. Please check your inbox.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      error: 'Internal server error during password reset request',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
