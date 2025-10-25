import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const body = {
      username: 'debug_step_user',
      email: 'debug-step@example.com',
      password: 'Passw0rd!123',
    };

    const { storage } = await import('../storage.js');
    const bcrypt = (await import('bcrypt')).default;
    const { generateAccessToken } = await import('../jwt.js');

    const existing = await storage.getUserByUsername(body.username);
    if (existing) {
      return res.status(200).json({ stage: 'existing-user', user: existing });
    }

    const passwordHash = await bcrypt.hash(body.password, 4);
    const newUser = await storage.createUser({
      username: body.username,
      email: body.email,
      passwordHash,
      role: 'client',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = generateAccessToken(newUser);

    return res.status(200).json({ stage: 'success', userId: newUser.id, token });
  } catch (error) {
    return res.status(500).json({
      stage: 'error',
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
