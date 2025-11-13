import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getEnvVar, sanitizeEnvVars } from '../../shared/env';

const AWS_KEYS = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_S3_BUCKET_NAME',
  'AWS_REGION'
];

sanitizeEnvVars(AWS_KEYS);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Get all environment variables
  const allEnvVars = Object.keys(process.env)
    .filter(key => key.startsWith('AWS') || key.startsWith('JWT'))
    .sort()
    .reduce((acc, key) => {
      acc[key] = getEnvVar(key) || 'UNDEFINED';
      return acc;
    }, {} as Record<string, string>);

  // Check specifically for bucket name variations
  const bucketVariations = [
    'AWS_S3_BUCKET_NAME',
    'AWS_S3_BUCKET',
    'S3_BUCKET_NAME',
    'BUCKET_NAME',
  ];

  const bucketCheck = bucketVariations.reduce((acc, key) => {
    acc[key] = getEnvVar(key) || 'not found';
    return acc;
  }, {} as Record<string, string>);

  // List ALL AWS-related env vars (show first 5 chars)
  const awsVars = Object.keys(process.env)
    .filter(key => key.includes('AWS') || key.includes('S3'))
    .reduce((acc, key) => {
      const value = getEnvVar(key);
      acc[key] = value ? `${value.substring(0, 5)}...` : 'undefined';
      return acc;
    }, {} as Record<string, string>);

  return res.status(200).json({
    timestamp: new Date().toISOString(),
    vercelEnv: process.env.VERCEL_ENV,
    nodeEnv: process.env.NODE_ENV,
    
    // Main check
    mainVariables: {
      AWS_ACCESS_KEY_ID: getEnvVar('AWS_ACCESS_KEY_ID') ? '✅ SET' : '❌ MISSING',
      AWS_SECRET_ACCESS_KEY: getEnvVar('AWS_SECRET_ACCESS_KEY') ? '✅ SET' : '❌ MISSING',
      AWS_S3_BUCKET_NAME: getEnvVar('AWS_S3_BUCKET_NAME') || '❌ UNDEFINED',
      AWS_REGION: getEnvVar('AWS_REGION') || '❌ UNDEFINED',
    },
    
    // Show actual values (partial)
    actualValues: {
      AWS_S3_BUCKET_NAME_value: getEnvVar('AWS_S3_BUCKET_NAME') || 'UNDEFINED',
      AWS_S3_BUCKET_NAME_type: typeof getEnvVar('AWS_S3_BUCKET_NAME'),
      AWS_S3_BUCKET_NAME_length: getEnvVar('AWS_S3_BUCKET_NAME')?.length || 0,
    },
    
    // Check for variations
    bucketVariations: bucketCheck,
    
    // All AWS variables
    allAwsVariables: awsVars,
    
    // Full list
    allConfiguredVars: allEnvVars,
  });
}
