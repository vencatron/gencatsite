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

    // Get all paid invoices for the user
    const invoices = await storage.getInvoicesByUserId(decoded.userId);
    const paidInvoices = invoices.filter((inv) => inv.status === 'paid');

    const paymentHistory = paidInvoices.map((inv) => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      amount: inv.totalAmount,
      currency: inv.currency || 'USD',
      paymentDate: inv.paymentDate,
      paymentMethod: inv.paymentMethod,
      description: inv.description,
    }));

    return res.json({
      success: true,
      payments: paymentHistory,
      totalPaid: paidInvoices.reduce((sum, inv) => sum + parseFloat(inv.totalAmount || '0'), 0),
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    return res.status(500).json({ error: 'Failed to fetch payment history' });
  }
}
