import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../../jwt.js';
import { storage } from '../../storage.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
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
    const documentId = parseInt(req.query.id as string);

    if (isNaN(documentId)) {
      return res.status(400).json({ error: 'Invalid document ID' });
    }

    // Get document from database
    const document = await storage.getDocument(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check ownership
    if (document.userId !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Don't return deleted documents
    if (document.status === 'deleted') {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check if S3 key exists
    if (!document.storageUrl) {
      return res.status(404).json({ error: 'File storage location not found' });
    }

    console.log('Generating signed URL for:', document.storageUrl);

    // Generate temporary signed URL (valid for 1 hour)
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: document.storageUrl,
    });

    const downloadUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600, // 1 hour
    });

    return res.json({
      success: true,
      downloadUrl,
      filename: document.fileName,
      expiresIn: 3600 // seconds
    });
  } catch (error: any) {
    console.error('Error generating download URL:', error);
    return res.status(500).json({
      error: 'Failed to generate download URL',
      details: error.message
    });
  }
}
