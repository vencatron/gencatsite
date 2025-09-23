import { Router, Request, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { storage } from '../storage';
import { sanitizeInput } from '../utils/validation';
import { InsertDocument } from '../../shared/schema';

const router = Router();

// GET /api/documents - List user's documents
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const documents = await storage.getDocumentsByUserId(req.user.userId);
    
    // Filter out deleted documents
    const activeDocuments = documents.filter(doc => doc.status !== 'deleted');
    
    res.json({
      success: true,
      documents: activeDocuments,
      count: activeDocuments.length
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

// GET /api/documents/:id - Get specific document metadata
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const documentId = parseInt(req.params.id);
    if (isNaN(documentId)) {
      return res.status(400).json({ error: 'Invalid document ID' });
    }

    const document = await storage.getDocument(documentId);
    
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check ownership
    if (document.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Don't return deleted documents
    if (document.status === 'deleted') {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({
      success: true,
      document
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Failed to fetch document' });
  }
});

// POST /api/documents/upload - Upload document metadata
router.post('/upload', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { fileName, fileType, fileSize, category, description, tags, storageUrl } = req.body;

    // Validate required fields
    if (!fileName || !fileType || !fileSize) {
      return res.status(400).json({ 
        error: 'Missing required fields: fileName, fileType, and fileSize are required' 
      });
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (fileSize > maxSize) {
      return res.status(400).json({ error: 'File size exceeds maximum allowed size of 50MB' });
    }

    // Sanitize inputs
    const sanitizedFileName = sanitizeInput(fileName);
    const sanitizedDescription = description ? sanitizeInput(description) : null;
    const sanitizedCategory = category ? sanitizeInput(category) : null;
    const sanitizedTags = tags ? sanitizeInput(tags) : null;

    // Create document metadata
    const newDocument: InsertDocument = {
      userId: req.user.userId,
      fileName: sanitizedFileName,
      fileType: sanitizeInput(fileType),
      fileSize: parseInt(fileSize),
      category: sanitizedCategory,
      description: sanitizedDescription,
      tags: sanitizedTags,
      storageUrl: storageUrl || null,
      uploadedBy: req.user.userId,
      status: 'active',
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const document = await storage.createDocument(newDocument);

    res.status(201).json({
      success: true,
      message: 'Document metadata created successfully',
      document
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Failed to upload document' });
  }
});

// PUT /api/documents/:id - Update document metadata
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const documentId = parseInt(req.params.id);
    if (isNaN(documentId)) {
      return res.status(400).json({ error: 'Invalid document ID' });
    }

    // Check if document exists and user has access
    const existingDocument = await storage.getDocument(documentId);
    if (!existingDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check ownership
    if (existingDocument.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Prepare update data
    const { fileName, category, description, tags, status } = req.body;
    const updateData: Partial<InsertDocument> = {};

    if (fileName) updateData.fileName = sanitizeInput(fileName);
    if (category) updateData.category = sanitizeInput(category);
    if (description) updateData.description = sanitizeInput(description);
    if (tags) updateData.tags = sanitizeInput(tags);
    if (status && ['active', 'archived'].includes(status)) {
      updateData.status = status;
    }

    // Update document
    const updatedDocument = await storage.updateDocument(documentId, updateData);

    if (!updatedDocument) {
      return res.status(500).json({ error: 'Failed to update document' });
    }

    res.json({
      success: true,
      message: 'Document updated successfully',
      document: updatedDocument
    });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Failed to update document' });
  }
});

// DELETE /api/documents/:id - Delete document (soft delete)
router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const documentId = parseInt(req.params.id);
    if (isNaN(documentId)) {
      return res.status(400).json({ error: 'Invalid document ID' });
    }

    // Check if document exists and user has access
    const existingDocument = await storage.getDocument(documentId);
    if (!existingDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // Check ownership
    if (existingDocument.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Soft delete the document
    const deleted = await storage.deleteDocument(documentId);

    if (!deleted) {
      return res.status(500).json({ error: 'Failed to delete document' });
    }

    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'Failed to delete document' });
  }
});

export default router;