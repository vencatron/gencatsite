"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const auth_1 = require("../middleware/auth");
const storage_1 = require("../storage");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// Configure multer for file uploads
const uploadDir = path_1.default.join(process.cwd(), 'uploads');
// Ensure upload directory exists
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
// Configure storage
const multerStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
        // Generate unique filename: timestamp-random-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
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
        'image/jpg',
        'image/png',
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
// POST /api/documents - Upload file
router.post('/', auth_1.authenticateToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const file = req.file;
        // Create document metadata in database
        const newDocument = {
            userId: req.user.userId,
            fileName: (0, validation_1.sanitizeInput)(file.originalname),
            fileType: file.mimetype,
            fileSize: file.size,
            category: req.body.category ? (0, validation_1.sanitizeInput)(req.body.category) : null,
            description: req.body.description ? (0, validation_1.sanitizeInput)(req.body.description) : null,
            tags: req.body.tags ? (0, validation_1.sanitizeInput)(req.body.tags) : null,
            storageUrl: file.path, // Store the file path on disk
            uploadedBy: req.user.userId,
            status: 'active',
            isPublic: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const document = await storage_1.storage.createDocument(newDocument);
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
        // Clean up uploaded file if database operation fails
        if (req.file && fs_1.default.existsSync(req.file.path)) {
            fs_1.default.unlinkSync(req.file.path);
        }
        console.error('Error uploading file:', error);
        if (error.message?.includes('Invalid file type')) {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to upload file' });
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
// GET /api/documents/:id/download - Download file
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
        // Check if file exists
        if (!document.storageUrl || !fs_1.default.existsSync(document.storageUrl)) {
            return res.status(404).json({ error: 'File not found on server' });
        }
        // Send file
        res.download(document.storageUrl, document.fileName, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'Failed to download file' });
                }
            }
        });
    }
    catch (error) {
        console.error('Error downloading document:', error);
        res.status(500).json({ error: 'Failed to download document' });
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