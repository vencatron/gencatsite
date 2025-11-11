"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const storage_1 = require("../storage");
const validation_1 = require("../utils/validation");
const s3_1 = require("../lib/s3");
const router = (0, express_1.Router)();
// Configure multer to use memory storage (files stored in buffer for S3 upload)
const multerStorage = multer_1.default.memoryStorage();
// File filter to validate file types
const fileFilter = (_req, file, cb) => {
    // Log the MIME type for debugging
    console.log('File upload attempt:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
    });
    // Allow common document types
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg',
        'image/jpg', 'image/png',
        'image/gif',
        'image/webp',
        'image/svg+xml',
        'text/plain',
        'text/csv',
        'application/zip',
        'application/x-zip-compressed',
        'application/octet-stream' // Generic binary - allow for now to debug
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        console.error('Rejected file type:', file.mimetype);
        cb(new Error(`Invalid file type: ${file.mimetype}. Only PDF, Word, Excel, PowerPoint, images, text, and zip files are allowed.`));
    }
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB max file size
    }
});
// GET /api/documents - List user's documents
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const documents = await storage_1.storage.getDocumentsByUserId(req.user.userId);
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
        res.json({
            success: true,
            documents: transformedDocs,
            count: transformedDocs.length
        });
    }
    catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});
// POST /api/documents - Upload file to S3
router.post('/', auth_1.authenticateToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const file = req.file;
        console.log('Uploading file to S3:', file.originalname);
        // Upload to S3 and get the S3 key (path)
        const s3Key = await (0, s3_1.uploadToS3)(file, req.user.userId);
        console.log('File uploaded to S3, creating database record...');
        // Create document metadata in database with S3 key
        const newDocument = {
            userId: req.user.userId,
            fileName: (0, validation_1.sanitizeInput)(file.originalname),
            fileType: file.mimetype,
            fileSize: file.size,
            category: req.body.category ? (0, validation_1.sanitizeInput)(req.body.category) : null,
            description: req.body.description ? (0, validation_1.sanitizeInput)(req.body.description) : null,
            tags: req.body.tags ? (0, validation_1.sanitizeInput)(req.body.tags) : null,
            storageUrl: s3Key, // Store the S3 key, not a local path
            uploadedBy: req.user.userId,
            status: 'active',
            isPublic: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const document = await storage_1.storage.createDocument(newDocument);
        console.log('Document record created successfully');
        res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            document: {
                id: document.id,
                userId: document.userId,
                name: document.fileName,
                type: document.fileType,
                size: document.fileSize,
                uploadedAt: document.createdAt,
                metadata: {
                    category: document.category,
                    description: document.description,
                    tags: document.tags
                }
            }
        });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        if (error.message?.includes('Invalid file type')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({
            error: 'Failed to upload file',
            details: error.message
        });
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
        res.json({
            success: true,
            document: transformedDoc
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
// GET /api/documents/:id/download - Generate signed S3 download URL
router.get('/:id/download', auth_1.authenticateToken, async (req, res) => {
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
        // Check if S3 key exists
        if (!document.storageUrl) {
            return res.status(404).json({ error: 'File storage location not found' });
        }
        console.log('Generating signed URL for:', document.storageUrl);
        // Generate temporary signed URL (valid for 1 hour)
        const downloadUrl = await (0, s3_1.getSignedDownloadUrl)(document.storageUrl);
        res.json({
            success: true,
            downloadUrl,
            filename: document.fileName,
            expiresIn: 3600 // seconds
        });
    }
    catch (error) {
        console.error('Error generating download URL:', error);
        res.status(500).json({
            error: 'Failed to generate download URL',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
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
        const { fileName, name, category, description, tags, status } = req.body;
        const updateData = {};
        // Support both 'name' and 'fileName' for backwards compatibility
        if (name)
            updateData.fileName = (0, validation_1.sanitizeInput)(name);
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
// DELETE /api/documents/:id - Delete document (soft delete + S3 deletion)
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
        // Delete from S3 if storageUrl exists
        if (existingDocument.storageUrl) {
            try {
                await (0, s3_1.deleteFromS3)(existingDocument.storageUrl);
                console.log('File deleted from S3:', existingDocument.storageUrl);
            }
            catch (s3Error) {
                console.error('Error deleting from S3:', s3Error);
                // Continue with database deletion even if S3 deletion fails
            }
        }
        // Soft delete the document from database
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