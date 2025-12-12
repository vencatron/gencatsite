import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  return res.json({
    publishableKey,
  });
}
