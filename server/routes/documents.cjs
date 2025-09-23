"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth.cjs");
const storage_1 = require("../storage.cjs");
const validation_1 = require("../utils/validation.cjs");
const router = (0, express_1.Router)();
// GET /api/documents - List user's documents
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const documents = await storage_1.storage.getDocumentsByUserId(req.user.userId);
        // Filter out deleted documents
        const activeDocuments = documents.filter(doc => doc.status !== 'deleted');
        res.json({
            success: true,
            documents: activeDocuments,
            count: activeDocuments.length
        });
    }
    catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});
// GET /api/documents/:id - Get specific document metadata
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const documentId = parseInt(req.params.id);
        if (isNaN(documentId)) {
            return res.status(400).json({ error: 'Invalid document ID' });
        }
        const document = await storage_1.storage.getDocument(documentId);
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
    }
    catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ error: 'Failed to fetch document' });
    }
});
// POST /api/documents/upload - Upload document metadata
router.post('/upload', auth_1.authenticateToken, async (req, res) => {
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
        const sanitizedFileName = (0, validation_1.sanitizeInput)(fileName);
        const sanitizedDescription = description ? (0, validation_1.sanitizeInput)(description) : null;
        const sanitizedCategory = category ? (0, validation_1.sanitizeInput)(category) : null;
        const sanitizedTags = tags ? (0, validation_1.sanitizeInput)(tags) : null;
        // Create document metadata
        const newDocument = {
            userId: req.user.userId,
            fileName: sanitizedFileName,
            fileType: (0, validation_1.sanitizeInput)(fileType),
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
        const document = await storage_1.storage.createDocument(newDocument);
        res.status(201).json({
            success: true,
            message: 'Document metadata created successfully',
            document
        });
    }
    catch (error) {
        console.error('Error uploading document:', error);
        res.status(500).json({ error: 'Failed to upload document' });
    }
});
// PUT /api/documents/:id - Update document metadata
router.put('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const documentId = parseInt(req.params.id);
        if (isNaN(documentId)) {
            return res.status(400).json({ error: 'Invalid document ID' });
        }
        // Check if document exists and user has access
        const existingDocument = await storage_1.storage.getDocument(documentId);
        if (!existingDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }
        // Check ownership
        if (existingDocument.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        // Prepare update data
        const { fileName, category, description, tags, status } = req.body;
        const updateData = {};
        if (fileName)
            updateData.fileName = (0, validation_1.sanitizeInput)(fileName);
        if (category)
            updateData.category = (0, validation_1.sanitizeInput)(category);
        if (description)
            updateData.description = (0, validation_1.sanitizeInput)(description);
        if (tags)
            updateData.tags = (0, validation_1.sanitizeInput)(tags);
        if (status && ['active', 'archived'].includes(status)) {
            updateData.status = status;
        }
        // Update document
        const updatedDocument = await storage_1.storage.updateDocument(documentId, updateData);
        if (!updatedDocument) {
            return res.status(500).json({ error: 'Failed to update document' });
        }
        res.json({
            success: true,
            message: 'Document updated successfully',
            document: updatedDocument
        });
    }
    catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ error: 'Failed to update document' });
    }
});
// DELETE /api/documents/:id - Delete document (soft delete)
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const documentId = parseInt(req.params.id);
        if (isNaN(documentId)) {
            return res.status(400).json({ error: 'Invalid document ID' });
        }
        // Check if document exists and user has access
        const existingDocument = await storage_1.storage.getDocument(documentId);
        if (!existingDocument) {
            return res.status(404).json({ error: 'Document not found' });
        }
        // Check ownership
        if (existingDocument.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        // Soft delete the document
        const deleted = await storage_1.storage.deleteDocument(documentId);
        if (!deleted) {
            return res.status(500).json({ error: 'Failed to delete document' });
        }
        res.json({
            success: true,
            message: 'Document deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({ error: 'Failed to delete document' });
    }
});
exports.default = router;
//# sourceMappingURL=documents.js.map