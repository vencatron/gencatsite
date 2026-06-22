import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';

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

    // Fetch documents from database
    const documents = await storage.getDocumentsByUserId(decoded.userId);

    // Filter out deleted documents
    const activeDocuments = documents.filter(doc => doc.status !== 'deleted');

    // Transform to match frontend expected format
    const transformedDocs = activeDocuments.map(doc => ({
      id: doc.id,
      userId: doc.userId,
      name: doc.fileName,
      type: doc.fileType,
      size: doc.fileSize,
      uploadedAt: doc.createdAt,
      category: doc.category,
      description: doc.description,
      tags: doc.tags,
      status: doc.status
    }));

    return res.json({
      success: true,
      documents: transformedDocs,
      count: transformedDocs.length
    });
  } catch (error: unknown) {
    console.error('Documents endpoint error:', error);
    return res.status(500).json({
      error: 'Failed to fetch documents',
    });
  }
}
