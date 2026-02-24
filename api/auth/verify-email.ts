import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const token = req.query.token as string;

    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    const [{ storage }, { generateAccessToken, generateRefreshToken }] = await Promise.all([
      import('../storage.js'),
      import('../jwt.js'),
    ]);

    // Find user with this verification token
    const user = await storage.getUserByVerificationToken(token);

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    // Check if token has expired (24 hours)
    if (user.emailVerificationExpires && new Date() > new Date(user.emailVerificationExpires)) {
      return res.status(400).json({ error: 'Verification token has expired. Please request a new one.' });
    }

    // Check if already verified
    if (user.emailVerified) {
      return res.status(200).json({ message: 'Email already verified', alreadyVerified: true });
    }

    // Update user - mark as verified and clear token
    await storage.updateUser(user.id, {
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
      updatedAt: new Date(),
    });

    // Generate tokens for auto-login
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token cookie
    res.setHeader('Set-Cookie', [
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`,
    ]);

    return res.status(200).json({
      message: 'Email verified successfully!',
      autoLogin: true,
      accessToken,
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({
      error: 'Internal server error during email verification',
    });
  }
}
