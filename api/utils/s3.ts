import { S3Client } from '@aws-sdk/client-s3';

const REQUIRED_S3_VARS = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_S3_BUCKET_NAME',
  'AWS_REGION'
];

let cachedClient: S3Client | null = null;

function ensureS3Config() {
  const missing = REQUIRED_S3_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required S3 environment variables: ${missing.join(', ')}`);
  }
}

export function getS3Client(): S3Client {
  ensureS3Config();

  if (!cachedClient) {
    cachedClient = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  return cachedClient;
}

export function getS3BucketName(): string {
  ensureS3Config();
  return process.env.AWS_S3_BUCKET_NAME!;
}

export function getMissingS3EnvVars(): string[] {
  return REQUIRED_S3_VARS.filter((key) => !process.env[key]);
}
