import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import { applyRateLimit, EMAIL_VERIFICATION_LIMIT } from '../utils/rateLimiter.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Apply rate limiting for email verification requests
  if (!applyRateLimit(req, res, EMAIL_VERIFICATION_LIMIT)) {
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
      return res.status(200).json({ message: 'If an account with that email exists, a verification email has been sent.' });
    }

    // Check if already verified
    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new token
    await storage.updateUser(user.id, {
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      updatedAt: new Date(),
    });

    // Send verification email
    const emailSent = await emailService.sendVerificationEmail(
      user.email,
      user.username,
      verificationToken
    );

    if (!emailSent) {
      console.error('Failed to send verification email to:', user.email);
      return res.status(500).json({ error: 'Failed to send verification email. Please try again later.' });
    }

    return res.status(200).json({
      message: 'Verification email sent successfully. Please check your inbox.',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return res.status(500).json({
      error: 'Internal server error while resending verification email',
    });
  }
}
