// Quick S3 upload test
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

console.log('Testing S3 Configuration...\n');

// Check environment variables
const vars = {
  'AWS_ACCESS_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
  'AWS_SECRET_ACCESS_KEY': process.env.AWS_SECRET_ACCESS_KEY,
  'AWS_S3_BUCKET_NAME': process.env.AWS_S3_BUCKET_NAME,
  'AWS_REGION': process.env.AWS_REGION
};

console.log('Environment Variables:');
for (const [key, value] of Object.entries(vars)) {
  if (key === 'AWS_SECRET_ACCESS_KEY') {
    console.log(`  ${key}: ${value ? '***SET***' : '❌ NOT SET'}`);
  } else {
    console.log(`  ${key}: ${value || '❌ NOT SET'}`);
  }
}

// Try to initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

console.log('\n✓ S3 Client initialized');

// Try a simple upload
const testFile = {
  buffer: Buffer.from('Test document content'),
  originalname: 'test-document.txt',
  mimetype: 'text/plain',
  size: 22
};

const key = `documents/test-user/${Date.now()}-${testFile.originalname}`;

console.log(`\nAttempting upload to: ${key}`);

const command = new PutObjectCommand({
  Bucket: process.env.AWS_S3_BUCKET_NAME,
  Key: key,
  Body: testFile.buffer,
  ContentType: testFile.mimetype,
  ServerSideEncryption: 'AES256',
});

s3Client.send(command)
  .then(() => {
    console.log('✓ Upload successful!');
    console.log(`\nCheck your S3 bucket at: https://s3.console.aws.amazon.com/s3/buckets/${process.env.AWS_S3_BUCKET_NAME}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Upload failed:');
    console.error('  Error:', error.message);
    console.error('  Code:', error.code || 'Unknown');
    console.error('  Status:', error.$metadata?.httpStatusCode || 'Unknown');
    process.exit(1);
  });
