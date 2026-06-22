import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
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

    const { paymentIntentId, invoiceId } = req.body;

    if (!paymentIntentId || !invoiceId) {
      return res.status(400).json({ error: 'Payment intent ID and invoice ID are required' });
    }

    // Get the invoice
    const invoice = await storage.getInvoice(parseInt(invoiceId));
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check ownership
    if (invoice.userId !== decoded.userId && decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Verify payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update invoice as paid
      const updatedInvoice = await storage.updateInvoice(invoice.id, {
        status: 'paid',
        paymentDate: new Date(),
        paymentMethod: 'stripe',
        stripePaymentStatus: 'succeeded',
        notes: invoice.notes 
          ? `${invoice.notes}\n[${new Date().toISOString()}] Payment confirmed via Stripe. Payment Intent: ${paymentIntentId}`
          : `[${new Date().toISOString()}] Payment confirmed via Stripe. Payment Intent: ${paymentIntentId}`,
      });

      return res.json({
        success: true,
        message: 'Payment confirmed successfully',
        invoice: updatedInvoice,
      });
    } else {
      // Update payment status
      await storage.updateInvoice(invoice.id, {
        stripePaymentStatus: paymentIntent.status,
      });

      return res.status(400).json({
        success: false,
        error: `Payment not completed. Status: ${paymentIntent.status}`,
        status: paymentIntent.status,
      });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    // Check for Stripe-specific errors that are safe to expose
    if (error instanceof Stripe.errors.StripeError) {
      return res.status(400).json({ 
        error: 'Payment confirmation error',
        code: error.code,
      });
    }
    return res.status(500).json({ 
      error: 'Failed to confirm payment',
    });
  }
}
