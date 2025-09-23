"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const storage_1 = require("../storage");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
// GET /api/invoices - List user's invoices
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Get all invoices for the user
        const invoices = await storage_1.storage.getInvoicesByUserId(req.user.userId);
        // Calculate summary statistics
        const stats = {
            total: invoices.length,
            pending: invoices.filter(inv => inv.status === 'pending').length,
            paid: invoices.filter(inv => inv.status === 'paid').length,
            overdue: invoices.filter(inv => inv.status === 'overdue').length,
            cancelled: invoices.filter(inv => inv.status === 'cancelled').length,
            totalAmount: invoices
                .filter(inv => inv.status !== 'cancelled')
                .reduce((sum, inv) => sum + parseFloat(inv.totalAmount || '0'), 0),
            paidAmount: invoices
                .filter(inv => inv.status === 'paid')
                .reduce((sum, inv) => sum + parseFloat(inv.totalAmount || '0'), 0)
        };
        res.json({
            success: true,
            invoices,
            stats
        });
    }
    catch (error) {
        console.error('Error fetching invoices:', error);
        res.status(500).json({ error: 'Failed to fetch invoices' });
    }
});
// GET /api/invoices/:id - Get specific invoice
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const invoiceId = parseInt(req.params.id);
        if (isNaN(invoiceId)) {
            return res.status(400).json({ error: 'Invalid invoice ID' });
        }
        const invoice = await storage_1.storage.getInvoice(invoiceId);
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        // Check ownership
        if (invoice.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        // Parse line items if they're stored as JSON string
        let lineItems = [];
        if (invoice.lineItems) {
            try {
                lineItems = JSON.parse(invoice.lineItems);
            }
            catch (e) {
                lineItems = [];
            }
        }
        res.json({
            success: true,
            invoice: {
                ...invoice,
                lineItems
            }
        });
    }
    catch (error) {
        console.error('Error fetching invoice:', error);
        res.status(500).json({ error: 'Failed to fetch invoice' });
    }
});
// PUT /api/invoices/:id/status - Update invoice status
router.put('/:id/status', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const invoiceId = parseInt(req.params.id);
        if (isNaN(invoiceId)) {
            return res.status(400).json({ error: 'Invalid invoice ID' });
        }
        const { status, paymentMethod, paymentDate, notes } = req.body;
        // Validate status
        const validStatuses = ['pending', 'paid', 'overdue', 'cancelled'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({
                error: 'Invalid status. Must be one of: pending, paid, overdue, cancelled'
            });
        }
        // Get existing invoice to check ownership
        const existingInvoice = await storage_1.storage.getInvoice(invoiceId);
        if (!existingInvoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        // Check ownership - users can update their own invoices, admin can update any
        if (existingInvoice.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        // Prepare update data
        const updateData = { status };
        // If marking as paid, add payment details
        if (status === 'paid') {
            updateData.paymentDate = paymentDate ? new Date(paymentDate) : new Date();
            if (paymentMethod) {
                updateData.paymentMethod = (0, validation_1.sanitizeInput)(paymentMethod);
            }
        }
        // Add notes if provided
        if (notes) {
            const existingNotes = existingInvoice.notes ? existingInvoice.notes + '\n' : '';
            updateData.notes = existingNotes + `[${new Date().toISOString()}] Status changed to ${status}. ${(0, validation_1.sanitizeInput)(notes)}`;
        }
        // Update invoice
        const updatedInvoice = await storage_1.storage.updateInvoice(invoiceId, updateData);
        if (!updatedInvoice) {
            return res.status(500).json({ error: 'Failed to update invoice status' });
        }
        res.json({
            success: true,
            message: `Invoice status updated to ${status}`,
            invoice: updatedInvoice
        });
    }
    catch (error) {
        console.error('Error updating invoice status:', error);
        res.status(500).json({ error: 'Failed to update invoice status' });
    }
});
// POST /api/invoices - Create new invoice (admin only)
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Only admin can create invoices
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required to create invoices' });
        }
        const { userId, invoiceNumber, amount, tax, description, lineItems, dueDate } = req.body;
        // Validate required fields
        if (!userId || !invoiceNumber || !amount || !dueDate) {
            return res.status(400).json({
                error: 'Missing required fields: userId, invoiceNumber, amount, and dueDate are required'
            });
        }
        // Verify user exists
        const targetUser = await storage_1.storage.getUser(parseInt(userId));
        if (!targetUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if invoice number already exists
        const existingInvoice = await storage_1.storage.getInvoiceByNumber((0, validation_1.sanitizeInput)(invoiceNumber));
        if (existingInvoice) {
            return res.status(409).json({ error: 'Invoice number already exists' });
        }
        // Calculate total amount
        const amountNum = parseFloat(amount);
        const taxNum = tax ? parseFloat(tax) : 0;
        const totalAmount = amountNum + taxNum;
        // Create invoice
        const newInvoice = await storage_1.storage.createInvoice({
            userId: parseInt(userId),
            invoiceNumber: (0, validation_1.sanitizeInput)(invoiceNumber),
            amount: amount.toString(),
            tax: taxNum.toString(),
            totalAmount: totalAmount.toString(),
            description: description ? (0, validation_1.sanitizeInput)(description) : null,
            lineItems: lineItems ? JSON.stringify(lineItems) : null,
            dueDate: new Date(dueDate),
            status: 'pending',
            createdBy: req.user.userId,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            invoice: newInvoice
        });
    }
    catch (error) {
        console.error('Error creating invoice:', error);
        res.status(500).json({ error: 'Failed to create invoice' });
    }
});
exports.default = router;
//# sourceMappingURL=invoices.js.map