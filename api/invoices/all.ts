import type { VercelRequest, VercelResponse } from '@vercel/node';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';

// GET /api/invoices/all - Get all invoices (admin only)
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

    // Only admin can view all invoices
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get all invoices
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

    return res.json({
      success: true,
      invoices: invoicesWithUsers
    });
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    return res.status(500).json({ error: 'Failed to fetch invoices' });
  }
}
