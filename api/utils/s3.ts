import { S3Client } from '@aws-sdk/client-s3';

const REQUIRED_S3_VARS = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_S3_BUCKET_NAME',
  'AWS_REGION'
];

const normalizeValue = (value: string | undefined): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const clearEnvVar = (name: string): void => {
  delete process.env[name];
};

export const getEnvVar = (name: string): string | undefined => {
  const raw = process.env[name];
  const normalized = normalizeValue(raw);

  if (normalized === undefined) {
    clearEnvVar(name);
    return undefined;
  }

  if (raw !== normalized) {
    process.env[name] = normalized;
  }

  return normalized;
};

export const sanitizeEnvVars = (keys?: string[]): void => {
  const targetKeys = Array.isArray(keys) && keys.length > 0 ? keys : Object.keys(process.env);
  targetKeys.forEach((key) => {
    const value = getEnvVar(key);
    if (value === undefined) {
      clearEnvVar(key);
    }
  });
};

export const getRequiredEnvVar = (name: string): string => {
  const value = getEnvVar(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

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
