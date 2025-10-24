import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcrypt';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const hash = await bcrypt.hash('diagnostic', 4);
    return res.status(200).json({
      success: true,
      hash,
      nodeVersion: process.version,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
