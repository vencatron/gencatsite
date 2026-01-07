import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { verifyAccessToken } from '../jwt.js';
import { storage } from '../storage.js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

// Helper to get or create Stripe customer for a user
async function getOrCreateStripeCustomer(userId: number): Promise<string> {
  const user = await storage.getUser(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Check if user has existing invoices with a Stripe customer ID
  const invoices = await storage.getInvoicesByUserId(userId);
  const existingCustomerId = invoices.find((inv) => inv.stripeCustomerId)?.stripeCustomerId;
  
  if (existingCustomerId) {
    return existingCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email: user.email,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
    metadata: {
      userId: userId.toString(),
    },
  });

  return customer.id;
}

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

    const { invoiceId } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ error: 'Invoice ID is required' });
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

    // Check if already paid
    if (invoice.status === 'paid') {
      return res.status(400).json({ error: 'Invoice is already paid' });
    }

    // Check if there's an existing payment intent
    if (invoice.stripePaymentIntentId) {
      // Retrieve existing payment intent
      const existingIntent = await stripe.paymentIntents.retrieve(invoice.stripePaymentIntentId);
      
      if (existingIntent.status === 'succeeded') {
        // Payment already succeeded, update invoice
        await storage.updateInvoice(invoice.id, {
          status: 'paid',
          paymentDate: new Date(),
          paymentMethod: 'stripe',
          stripePaymentStatus: 'succeeded',
        });
        return res.status(400).json({ error: 'Invoice is already paid' });
      }

      if (existingIntent.status !== 'canceled') {
        // Return existing payment intent
        return res.json({
          success: true,
          clientSecret: existingIntent.client_secret,
          paymentIntentId: existingIntent.id,
          amount: invoice.totalAmount,
          currency: invoice.currency || 'usd',
        });
      }
    }

    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer(decoded.userId);

    // Calculate amount in cents (Stripe uses smallest currency unit)
    const amountInCents = Math.round(parseFloat(invoice.totalAmount || '0') * 100);

    if (amountInCents <= 0) {
      return res.status(400).json({ error: 'Invalid invoice amount' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: (invoice.currency || 'USD').toLowerCase(),
      customer: customerId,
      metadata: {
        invoiceId: invoice.id.toString(),
        invoiceNumber: invoice.invoiceNumber,
        userId: decoded.userId.toString(),
      },
      description: `Payment for Invoice ${invoice.invoiceNumber}${invoice.description ? ` - ${invoice.description}` : ''}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update invoice with payment intent ID
    await storage.updateInvoice(invoice.id, {
      stripePaymentIntentId: paymentIntent.id,
      stripeCustomerId: customerId,
      stripePaymentStatus: paymentIntent.status,
    });

    return res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: invoice.totalAmount,
      currency: invoice.currency || 'USD',
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return res.status(500).json({ 
      error: 'Failed to create payment intent',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
