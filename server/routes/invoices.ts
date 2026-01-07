import { Router, Request, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { storage } from '../storage';
import { sanitizeInput } from '../utils/validation';
import { emailService } from '../services/email';

const router = Router();

// GET /api/invoices - List user's invoices
router.get('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get all invoices for the user
    const invoices = await storage.getInvoicesByUserId(req.user.userId);
    
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
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// GET /api/invoices/:id - Get specific invoice
router.get('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const invoiceId = parseInt(req.params.id);
    if (isNaN(invoiceId)) {
      return res.status(400).json({ error: 'Invalid invoice ID' });
    }

    const invoice = await storage.getInvoice(invoiceId);
    
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
      } catch (e) {
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
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'Failed to fetch invoice' });
  }
});

// PUT /api/invoices/:id/status - Update invoice status
router.put('/:id/status', authenticateToken, async (req: AuthRequest, res: Response) => {
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
    const existingInvoice = await storage.getInvoice(invoiceId);
    if (!existingInvoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check ownership - users can update their own invoices, admin can update any
    if (existingInvoice.userId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Prepare update data
    const updateData: {
      status: string;
      paymentDate?: Date;
      paymentMethod?: string;
      notes?: string;
    } = { status };

    // If marking as paid, add payment details
    if (status === 'paid') {
      updateData.paymentDate = paymentDate ? new Date(paymentDate) : new Date();
      if (paymentMethod) {
        updateData.paymentMethod = sanitizeInput(paymentMethod);
      }
    }

    // Add notes if provided
    if (notes) {
      const existingNotes = existingInvoice.notes ? existingInvoice.notes + '\n' : '';
      updateData.notes = existingNotes + `[${new Date().toISOString()}] Status changed to ${status}. ${sanitizeInput(notes)}`;
    }

    // Update invoice
    const updatedInvoice = await storage.updateInvoice(invoiceId, updateData);

    if (!updatedInvoice) {
      return res.status(500).json({ error: 'Failed to update invoice status' });
    }

    res.json({
      success: true,
      message: `Invoice status updated to ${status}`,
      invoice: updatedInvoice
    });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'Failed to update invoice status' });
  }
});

// POST /api/invoices - Create new invoice (admin only)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Only admin can create invoices
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required to create invoices' });
    }

    const {
      userId,
      invoiceNumber,
      amount,
      tax,
      description,
      lineItems,
      dueDate,
      sendEmail = true // Default to sending email
    } = req.body;

    // Validate required fields
    if (!userId || !invoiceNumber || !amount || !dueDate) {
      return res.status(400).json({
        error: 'Missing required fields: userId, invoiceNumber, amount, and dueDate are required'
      });
    }

    // Verify user exists
    const targetUser = await storage.getUser(parseInt(userId));
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if invoice number already exists
    const existingInvoice = await storage.getInvoiceByNumber(sanitizeInput(invoiceNumber));
    if (existingInvoice) {
      return res.status(409).json({ error: 'Invoice number already exists' });
    }

    // Calculate total amount
    const amountNum = parseFloat(amount);
    const taxNum = tax ? parseFloat(tax) : 0;
    const totalAmount = amountNum + taxNum;

    // Create invoice
    const newInvoice = await storage.createInvoice({
      userId: parseInt(userId),
      invoiceNumber: sanitizeInput(invoiceNumber),
      amount: amount.toString(),
      tax: taxNum.toString(),
      totalAmount: totalAmount.toString(),
      description: description ? sanitizeInput(description) : null,
      lineItems: lineItems ? JSON.stringify(lineItems) : null,
      dueDate: new Date(dueDate),
      status: 'pending',
      createdBy: req.user.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Send invoice email to client
    let emailSent = false;
    if (sendEmail && targetUser.email) {
      try {
        // Parse line items for email
        let parsedLineItems;
        if (lineItems) {
          parsedLineItems = Array.isArray(lineItems) ? lineItems : JSON.parse(lineItems);
        }

        emailSent = await emailService.sendInvoiceEmail(
          targetUser.email,
          targetUser.firstName || targetUser.username,
          {
            invoiceNumber: sanitizeInput(invoiceNumber),
            amount: amount.toString(),
            tax: taxNum.toString(),
            totalAmount: totalAmount.toString(),
            description: description ? sanitizeInput(description) : undefined,
            dueDate: new Date(dueDate),
            lineItems: parsedLineItems
          }
        );
        console.log(`Invoice email ${emailSent ? 'sent' : 'failed'} to ${targetUser.email}`);
      } catch (emailError) {
        console.error('Error sending invoice email:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      invoice: newInvoice,
      emailSent
    });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// POST /api/invoices/:id/send - Resend invoice email (admin only)
router.post('/:id/send', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Only admin can send invoice emails
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required to send invoices' });
    }

    const invoiceId = parseInt(req.params.id);
    if (isNaN(invoiceId)) {
      return res.status(400).json({ error: 'Invalid invoice ID' });
    }

    // Get the invoice
    const invoice = await storage.getInvoice(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Get the user
    const user = await storage.getUser(invoice.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.email) {
      return res.status(400).json({ error: 'User does not have an email address' });
    }

    // Parse line items
    let lineItems;
    if (invoice.lineItems) {
      try {
        lineItems = JSON.parse(invoice.lineItems);
      } catch (e) {
        lineItems = undefined;
      }
    }

    // Send the email
    const emailSent = await emailService.sendInvoiceEmail(
      user.email,
      user.firstName || user.username,
      {
        invoiceNumber: invoice.invoiceNumber,
        amount: invoice.amount,
        tax: invoice.tax || undefined,
        totalAmount: invoice.totalAmount || invoice.amount,
        description: invoice.description || undefined,
        dueDate: invoice.dueDate,
        lineItems
      }
    );

    if (emailSent) {
      res.json({
        success: true,
        message: `Invoice email sent to ${user.email}`
      });
    } else {
      res.status(500).json({ error: 'Failed to send invoice email' });
    }
  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({ error: 'Failed to send invoice email' });
  }
});

// GET /api/invoices/all - Get all invoices (admin only)
router.get('/all', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Only admin can view all invoices
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const invoices = await storage.getAllInvoices();

    // Get user info for each invoice
    const invoicesWithUsers = await Promise.all(
      invoices.map(async (invoice) => {
        const user = await storage.getUser(invoice.userId);
        return {
          ...invoice,
          user: user ? {
            id: user.id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          } : null
        };
      })
    );

    res.json({
      success: true,
      invoices: invoicesWithUsers
    });
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

export default router;