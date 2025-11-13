import { S3Client } from '@aws-sdk/client-s3';
import { getEnvVar, getRequiredEnvVar, sanitizeEnvVars } from '../../shared/env';

const REQUIRED_S3_VARS = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_S3_BUCKET_NAME',
  'AWS_REGION'
];

sanitizeEnvVars(REQUIRED_S3_VARS);

let cachedClient: S3Client | null = null;

function ensureS3Config() {
  const missing = REQUIRED_S3_VARS.filter((key) => !getEnvVar(key));
  if (missing.length > 0) {
    throw new Error(`Missing required S3 environment variables: ${missing.join(', ')}`);
  }
}

export function getS3Client(): S3Client {
  ensureS3Config();

  if (!cachedClient) {
    cachedClient = new S3Client({
      region: getRequiredEnvVar('AWS_REGION'),
      credentials: {
        accessKeyId: getRequiredEnvVar('AWS_ACCESS_KEY_ID'),
        secretAccessKey: getRequiredEnvVar('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  return cachedClient;
}

export function getS3BucketName(): string {
  ensureS3Config();
  return getRequiredEnvVar('AWS_S3_BUCKET_NAME');
}

export function getMissingS3EnvVars(): string[] {
  return REQUIRED_S3_VARS.filter((key) => !getEnvVar(key));
}
