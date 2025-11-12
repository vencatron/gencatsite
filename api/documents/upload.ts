import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import multiparty from 'multiparty';

// Disable body parsing for multipart forms
export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

// Helper to parse multipart form data
function parseForm(req: VercelRequest): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

// Upload file buffer to S3 with user-identifiable naming
async function uploadToS3(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string,
  userId: number,
  username?: string | null,
  email?: string | null
): Promise<string> {
  const timestamp = Date.now();
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Extract file extension
  const lastDot = fileName.lastIndexOf('.');
  const extension = lastDot !== -1 ? fileName.substring(lastDot) : '';
  const baseName = lastDot !== -1 ? fileName.substring(0, lastDot) : fileName;

  // Sanitize filename parts
  const sanitizedUsername = (username || '').replace(/[^a-zA-Z0-9]/g, '_');
  const sanitizedEmail = (email || '')
    .split('@')
    .join('_at_')
    .replace(/[^a-zA-Z0-9._-]/g, '_');
  const sanitizedBaseName = (baseName || 'document').replace(/[^a-zA-Z0-9.-]/g, '_');

  const ownerLabelParts = [
    sanitizedUsername || null,
    sanitizedEmail || null
  ].filter(Boolean);

  const ownerLabel = ownerLabelParts.length > 0
    ? ownerLabelParts.join('_')
    : 'user';

  // Format: documents/identifier_userId/YYYY-MM-DD_timestamp_originalname.ext
  const key = `documents/${ownerLabel}_${userId}/${date}_${timestamp}_${sanitizedBaseName}${extension}`;

  console.log('Starting S3 upload:', { key, size: fileBuffer.length, type: mimeType });

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
      ServerSideEncryption: 'AES256',
    },
  });

  await upload.done();
  console.log('S3 upload completed:', key);

  return key;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyAccessToken(token);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const userId = decoded.userId;

    // Fetch user details for identifiable naming
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Parse multipart form data
    const { files } = await parseForm(req);

    if (!files.file || !files.file[0]) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = files.file[0];

    // Read file buffer
    const fs = await import('fs');
    const fileBuffer = fs.readFileSync(file.path);

    // Upload to S3 with username in path
    const s3Key = await uploadToS3(
      fileBuffer,
      file.originalFilename,
      file.headers['content-type'],
      userId,
      user.username,
      user.email
    );

    // Save metadata to database
    const document = await storage.createDocument({
      userId,
      fileName: file.originalFilename,
      fileType: file.headers['content-type'],
      fileSize: file.size,
      storageUrl: s3Key,
      uploadedBy: userId,
      status: 'active',
      isPublic: false,
      category: null,
      description: null,
      tags: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Clean up temp file
    fs.unlinkSync(file.path);

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      document: {
        id: document.id,
        userId: document.userId,
        name: document.fileName,
        type: document.fileType,
        size: document.fileSize,
        uploadedAt: document.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({
      error: 'Failed to upload file',
      details: error.message,
    });
  }
}
