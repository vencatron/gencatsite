import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Log environment check
    const hasDbUrl = !!process.env.DATABASE_URL;
    console.log('DATABASE_URL exists:', hasDbUrl);

    if (!hasDbUrl) {
      return res.status(500).json({
        error: 'DATABASE_URL not configured',
        env: Object.keys(process.env).filter(k => !k.includes('SECRET'))
      });
    }

    // Test database connection
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT NOW() as current_time, version() as pg_version`;

    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      timestamp: result[0].current_time,
      postgresVersion: result[0].pg_version,
      nodeVersion: process.version
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return res.status(500).json({
      error: 'Database connection failed',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
