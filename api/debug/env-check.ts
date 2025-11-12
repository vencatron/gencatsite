import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow this in non-production or for debugging
  const envCheck = {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? '✅ Set' : '❌ Missing',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? '✅ Set' : '❌ Missing',
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME ? '✅ Set' : '❌ Missing',
    AWS_REGION: process.env.AWS_REGION ? '✅ Set' : '❌ Missing',
    NODE_ENV: process.env.NODE_ENV || 'not set',
    // Show partial values for debugging (first 4 chars only for security)
    bucket_value: process.env.AWS_S3_BUCKET_NAME ? 
      `${process.env.AWS_S3_BUCKET_NAME.substring(0, 4)}...` : 'undefined',
  };

  return res.status(200).json({
    message: 'Environment variable check',
    variables: envCheck,
    timestamp: new Date().toISOString(),
  });
}
