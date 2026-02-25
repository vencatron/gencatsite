import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../../jwt.js';
import { storage } from '../../storage.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getS3BucketName, getS3Client } from '../../utils/s3.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        return handleGet(res, userId, documentId);
      case 'PUT':
        return handleUpdate(req, res, userId, documentId);
      case 'DELETE':
        return handleDelete(res, userId, documentId);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: unknown) {
    console.error('Document operation error:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}

// GET /api/documents/[id] - Get document metadata
async function handleGet(res: VercelResponse, userId: number, documentId: number) {
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

  // Transform to match frontend expected format
  const transformedDoc = {
    id: document.id,
    userId: document.userId,
    name: document.fileName,
    type: document.fileType,
    size: document.fileSize,
    uploadedAt: document.createdAt,
    category: document.category,
    description: document.description,
    tags: document.tags,
    status: document.status
  };

  return res.json({
    success: true,
    document: transformedDoc
  });
}

// PUT /api/documents/[id] - Update document metadata
async function handleUpdate(req: VercelRequest, res: VercelResponse, userId: number, documentId: number) {
  const document = await storage.getDocument(documentId);

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  // Check ownership
  if (document.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Define expected body structure
  interface UpdateRequestBody {
    fileName?: string;
    name?: string;
    category?: string;
    description?: string;
    tags?: string;
    status?: string;
  }

  // Normalize request body to an object
  let body: UpdateRequestBody = {};
  const rawBody = req.body ?? {};
  if (typeof rawBody === 'string') {
    try {
      body = JSON.parse(rawBody) as UpdateRequestBody;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  } else {
    body = rawBody as UpdateRequestBody;
  }

  // Prepare update data
  const { fileName, name, category, description, tags, status } = body;
  const updateData: { fileName?: string; category?: string; description?: string; tags?: string; status?: string } = {};

  // Support both 'name' and 'fileName' for backwards compatibility
  if (name) updateData.fileName = name;
  if (fileName) updateData.fileName = fileName;
  if (category !== undefined) updateData.category = category;
  if (description !== undefined) updateData.description = description;
  if (tags !== undefined) updateData.tags = tags;
  if (status && ['active', 'archived'].includes(status)) {
    updateData.status = status;
  }

  // Update document
  const updatedDocument = await storage.updateDocument(documentId, updateData);

  if (!updatedDocument) {
    return res.status(500).json({ error: 'Failed to update document' });
  }

  return res.json({
    success: true,
    message: 'Document updated successfully',
    document: {
      id: updatedDocument.id,
      userId: updatedDocument.userId,
      name: updatedDocument.fileName,
      type: updatedDocument.fileType,
      size: updatedDocument.fileSize,
      uploadedAt: updatedDocument.createdAt
    }
  });
}

// DELETE /api/documents/[id] - Delete document (soft delete + S3 deletion)
async function handleDelete(res: VercelResponse, userId: number, documentId: number) {
  const document = await storage.getDocument(documentId);

  if (!document) {
    return res.status(404).json({ error: 'Document not found' });
  }

  // Check ownership
  if (document.userId !== userId) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Delete from S3 if storageUrl exists
  if (document.storageUrl) {
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: getS3BucketName(),
        Key: document.storageUrl,
      });
      await getS3Client().send(deleteCommand);
    } catch (s3Error) {
      console.error('Error deleting from S3:', s3Error);
      // Continue with database deletion even if S3 deletion fails
    }
  }

  // Soft delete the document from database
  const deleted = await storage.deleteDocument(documentId);

  if (!deleted) {
    return res.status(500).json({ error: 'Failed to delete document' });
  }

  return res.json({
    success: true,
    message: 'Document deleted successfully'
  });
}
