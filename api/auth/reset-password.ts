import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcrypt';
import { applyRateLimit, PASSWORD_RESET_LIMIT } from '../utils/rateLimiter.js';

const BCRYPT_ROUNDS = 10;

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
    const { token, newPassword, confirmPassword } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Reset token is required' });
    }

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'New password and confirmation are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const [{ storage }, validationModule] = await Promise.all([
      import('../storage.js'),
      import('../validation.js'),
    ]);
    const { validatePassword } = validationModule;

    // Validate password strength
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
        details: passwordValidation.errors
      });
    }

    // Find user by reset token
    const user = await storage.getUserByPasswordResetToken(token);

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Check if token has expired (1 hour)
    if (user.passwordResetExpires && new Date() > new Date(user.passwordResetExpires)) {
      return res.status(400).json({ error: 'Reset token has expired. Please request a new password reset.' });
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    // Update user with new password and clear reset token
    await storage.updateUser(user.id, {
      passwordHash,
      passwordResetToken: null,
      passwordResetExpires: null,
      updatedAt: new Date(),
    });

    return res.status(200).json({
      message: 'Password reset successfully! You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({
      error: 'Internal server error during password reset',
    });
  }
}
