import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';

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
    const userRole = decoded.role;

    // Handle GET request - list invoices
    if (req.method === 'GET') {
      const invoices = await storage.getInvoicesByUserId(userId);

      // Calculate summary statistics
      const stats = {
        total: invoices.length,
        pending: invoices.filter(inv => inv.status === 'pending').length,
        paid: invoices.filter(inv => inv.status === 'paid').length,
        overdue: invoices.filter(inv => inv.status === 'overdue').length,
        cancelled: invoices.filter(inv => inv.status === 'cancelled').length,
        totalAmount: invoices
          .filter(inv => inv.status !== 'cancelled')
          .reduce((sum, inv) => sum + parseFloat(inv.totalAmount || inv.amount || '0'), 0),
        paidAmount: invoices
          .filter(inv => inv.status === 'paid')
          .reduce((sum, inv) => sum + parseFloat(inv.totalAmount || inv.amount || '0'), 0)
      };

      return res.json({
        success: true,
        invoices,
        stats
      });
    }

    // Handle POST request - create invoice (admin only)
    if (req.method === 'POST') {
      if (userRole !== 'admin') {
        return res.status(403).json({ error: 'Admin access required to create invoices' });
      }

      const {
        userId: targetUserId,
        invoiceNumber,
        amount,
        tax,
        description,
        lineItems,
        dueDate,
        sendEmail = true
      } = req.body;

      // Validate required fields
      if (!targetUserId || !invoiceNumber || !amount || !dueDate) {
        return res.status(400).json({
          error: 'Missing required fields: userId, invoiceNumber, amount, and dueDate are required'
        });
      }

      // Verify user exists
      const targetUser = await storage.getUser(parseInt(targetUserId));
      if (!targetUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Check if invoice number already exists
      const existingInvoice = await storage.getInvoiceByNumber(invoiceNumber);
      if (existingInvoice) {
        return res.status(409).json({ error: 'Invoice number already exists' });
      }

      // Calculate total amount
      const amountNum = parseFloat(amount);
      const taxNum = tax ? parseFloat(tax) : 0;
      const totalAmount = amountNum + taxNum;

      // Create invoice
      const newInvoice = await storage.createInvoice({
        userId: parseInt(targetUserId),
        invoiceNumber,
        amount: amount.toString(),
        tax: taxNum.toString(),
        totalAmount: totalAmount.toString(),
        description: description || null,
        lineItems: lineItems ? JSON.stringify(lineItems) : null,
        dueDate: new Date(dueDate),
        status: 'pending',
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Note: Email sending in Vercel would need a separate email service integration
      // For now, we return success without email (can be added via SendGrid, Resend, etc.)

      return res.status(201).json({
        success: true,
        message: 'Invoice created successfully',
        invoice: newInvoice,
        emailSent: false // Email sending would need serverless-compatible email service
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Invoices endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
