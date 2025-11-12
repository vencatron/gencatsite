import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Check which environment variables are set (without exposing values)
  const envCheck = {
    timestamp: new Date().toISOString(),
    vercelEnv: process.env.VERCEL_ENV || 'not-set',
    vercelRegion: process.env.VERCEL_REGION || 'not-set',
    nodeEnv: process.env.NODE_ENV || 'not-set',
    environmentVariables: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      DATABASE_URL_length: process.env.DATABASE_URL?.length || 0,
      JWT_ACCESS_SECRET: !!process.env.JWT_ACCESS_SECRET,
      JWT_ACCESS_SECRET_length: process.env.JWT_ACCESS_SECRET?.length || 0,
      JWT_REFRESH_SECRET: !!process.env.JWT_REFRESH_SECRET,
      JWT_REFRESH_SECRET_length: process.env.JWT_REFRESH_SECRET?.length || 0,
      JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || 'not-set',
      JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || 'not-set',
      AWS_ACCESS_KEY_ID: !!process.env.AWS_ACCESS_KEY_ID,
      AWS_ACCESS_KEY_ID_length: process.env.AWS_ACCESS_KEY_ID?.length || 0,
      AWS_SECRET_ACCESS_KEY: !!process.env.AWS_SECRET_ACCESS_KEY,
      AWS_SECRET_ACCESS_KEY_length: process.env.AWS_SECRET_ACCESS_KEY?.length || 0,
      AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || 'not-set',
      AWS_REGION: process.env.AWS_REGION || 'not-set',
    },
    allEnvKeys: Object.keys(process.env).filter(key =>
      key.startsWith('DATABASE') ||
      key.startsWith('JWT') ||
      key.startsWith('AWS') ||
      key.startsWith('VERCEL') ||
      key === 'NODE_ENV'
    ),
  };

  return res.status(200).json(envCheck);
}
