import 'dotenv/config';
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getRequiredEnvVar, sanitizeEnvVars } from "../../shared/env";

const REQUIRED_S3_VARS = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_S3_BUCKET_NAME',
  'AWS_REGION'
];

sanitizeEnvVars(REQUIRED_S3_VARS);

// Initialize S3 client
export const s3Client = new S3Client({
  region: getRequiredEnvVar('AWS_REGION'),
  credentials: {
    accessKeyId: getRequiredEnvVar('AWS_ACCESS_KEY_ID'),
    secretAccessKey: getRequiredEnvVar('AWS_SECRET_ACCESS_KEY'),
  },
});

const BUCKET_NAME = getRequiredEnvVar('AWS_S3_BUCKET_NAME');

/**
 * Upload file to S3
 * @param file - Multer file object
 * @param userId - User ID for organizing files
 * @param folder - Base folder in S3 (default: "documents")
 * @returns S3 key (path) of the uploaded file
 */
export async function uploadToS3(
  file: Express.Multer.File,
  userId: number,
  folder: string = "documents"
): Promise<string> {
  // Generate unique key: documents/{userId}/{timestamp}-{filename}
  const timestamp = Date.now();
  const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_");
  const key = `${folder}/${userId}/${timestamp}-${sanitizedFilename}`;

  console.log('Starting S3 upload:', {
    bucket: BUCKET_NAME,
    key,
    size: file.size,
    type: file.mimetype
  });

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ServerSideEncryption: "AES256",
    },
  });

  await upload.done();
  
  console.log('S3 upload completed:', key);
  
  return key; // Return S3 key (path), not full URL
}

/**
 * Generate temporary signed download URL
 * @param key - S3 key (path) of the file
 * @returns Signed URL valid for 1 hour
 */
export async function getSignedDownloadUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  console.log('Generated signed URL for:', key);
  
  return url;
}

/**
 * Delete file from S3
 * @param key - S3 key (path) of the file to delete
 */
export async function deleteFromS3(key: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
  
  console.log('Deleted from S3:', key);
}
