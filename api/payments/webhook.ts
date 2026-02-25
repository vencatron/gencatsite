import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { storage } from '../storage.js';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-11-17.clover',
});

// Disable body parsing for webhook signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to get raw body
async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Stripe webhook secret not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  if (!sig) {
    return res.status(400).json({ error: 'No signature provided' });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        // Get invoice ID from metadata
        const invoiceId = paymentIntent.metadata?.invoiceId;
        if (invoiceId) {
          const invoice = await storage.getInvoice(parseInt(invoiceId));
          if (invoice && invoice.status !== 'paid') {
            await storage.updateInvoice(invoice.id, {
              status: 'paid',
              paymentDate: new Date(),
              paymentMethod: 'stripe',
              stripePaymentStatus: 'succeeded',
              notes: invoice.notes 
                ? `${invoice.notes}\n[${new Date().toISOString()}] Payment received via Stripe webhook.`
                : `[${new Date().toISOString()}] Payment received via Stripe webhook.`,
            });
          }
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        const invoiceId = paymentIntent.metadata?.invoiceId;
        if (invoiceId) {
          const invoice = await storage.getInvoice(parseInt(invoiceId));
          if (invoice) {
            await storage.updateInvoice(invoice.id, {
              stripePaymentStatus: 'failed',
              notes: invoice.notes 
                ? `${invoice.notes}\n[${new Date().toISOString()}] Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`
                : `[${new Date().toISOString()}] Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
            });
          }
        }
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        
        const invoiceId = paymentIntent.metadata?.invoiceId;
        if (invoiceId) {
          const invoice = await storage.getInvoice(parseInt(invoiceId));
          if (invoice) {
            await storage.updateInvoice(invoice.id, {
              stripePaymentStatus: 'canceled',
            });
          }
        }
        break;
      }

      default:
        // Unhandled event types are silently ignored
        break;
    }

    return res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
