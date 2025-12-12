"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const auth_1 = require("../middleware/auth");
const storage_1 = require("../storage");
const router = (0, express_1.Router)();
// Initialize Stripe with secret key
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-11-17.clover',
});
// Helper to get or create Stripe customer for a user
async function getOrCreateStripeCustomer(userId) {
    const user = await storage_1.storage.getUser(userId);
    if (!user) {
        throw new Error('User not found');
    }
    // Check if user has existing invoices with a Stripe customer ID
    const invoices = await storage_1.storage.getInvoicesByUserId(userId);
    const existingCustomerId = invoices.find(inv => inv.stripeCustomerId)?.stripeCustomerId;
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
// POST /api/payments/create-payment-intent - Create a payment intent for an invoice
router.post('/create-payment-intent', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { invoiceId } = req.body;
        if (!invoiceId) {
            return res.status(400).json({ error: 'Invoice ID is required' });
        }
        // Get the invoice
        const invoice = await storage_1.storage.getInvoice(parseInt(invoiceId));
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        // Check ownership
        if (invoice.userId !== req.user.userId && req.user.role !== 'admin') {
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
                await storage_1.storage.updateInvoice(invoice.id, {
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
        const customerId = await getOrCreateStripeCustomer(req.user.userId);
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
                userId: req.user.userId.toString(),
            },
            description: `Payment for Invoice ${invoice.invoiceNumber}${invoice.description ? ` - ${invoice.description}` : ''}`,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        // Update invoice with payment intent ID
        await storage_1.storage.updateInvoice(invoice.id, {
            stripePaymentIntentId: paymentIntent.id,
            stripeCustomerId: customerId,
            stripePaymentStatus: paymentIntent.status,
        });
        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: invoice.totalAmount,
            currency: invoice.currency || 'USD',
        });
    }
    catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({
            error: 'Failed to create payment intent',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// POST /api/payments/confirm-payment - Confirm payment was successful (called after client-side confirmation)
router.post('/confirm-payment', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { paymentIntentId, invoiceId } = req.body;
        if (!paymentIntentId || !invoiceId) {
            return res.status(400).json({ error: 'Payment intent ID and invoice ID are required' });
        }
        // Get the invoice
        const invoice = await storage_1.storage.getInvoice(parseInt(invoiceId));
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        // Check ownership
        if (invoice.userId !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied' });
        }
        // Verify payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        if (paymentIntent.status === 'succeeded') {
            // Update invoice as paid
            const updatedInvoice = await storage_1.storage.updateInvoice(invoice.id, {
                status: 'paid',
                paymentDate: new Date(),
                paymentMethod: 'stripe',
                stripePaymentStatus: 'succeeded',
                notes: invoice.notes
                    ? `${invoice.notes}\n[${new Date().toISOString()}] Payment confirmed via Stripe. Payment Intent: ${paymentIntentId}`
                    : `[${new Date().toISOString()}] Payment confirmed via Stripe. Payment Intent: ${paymentIntentId}`,
            });
            res.json({
                success: true,
                message: 'Payment confirmed successfully',
                invoice: updatedInvoice,
            });
        }
        else {
            // Update payment status
            await storage_1.storage.updateInvoice(invoice.id, {
                stripePaymentStatus: paymentIntent.status,
            });
            res.status(400).json({
                success: false,
                error: `Payment not completed. Status: ${paymentIntent.status}`,
                status: paymentIntent.status,
            });
        }
    }
    catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).json({
            error: 'Failed to confirm payment',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET /api/payments/config - Get Stripe publishable key
router.get('/config', (_req, res) => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    if (!publishableKey) {
        return res.status(500).json({ error: 'Stripe is not configured' });
    }
    res.json({
        publishableKey,
    });
});
// POST /api/payments/webhook - Handle Stripe webhooks
router.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        console.error('Stripe webhook secret not configured');
        return res.status(500).json({ error: 'Webhook not configured' });
    }
    let event;
    try {
        // Verify webhook signature
        // Note: For this to work, you need to use raw body (express.raw middleware)
        // We'll handle this in the main server file
        const rawBody = req.rawBody || req.body;
        event = stripe.webhooks.constructEvent(typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody), sig, webhookSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).json({ error: 'Webhook signature verification failed' });
    }
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded': {
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
            // Get invoice ID from metadata
            const invoiceId = paymentIntent.metadata?.invoiceId;
            if (invoiceId) {
                const invoice = await storage_1.storage.getInvoice(parseInt(invoiceId));
                if (invoice && invoice.status !== 'paid') {
                    await storage_1.storage.updateInvoice(invoice.id, {
                        status: 'paid',
                        paymentDate: new Date(),
                        paymentMethod: 'stripe',
                        stripePaymentStatus: 'succeeded',
                        notes: invoice.notes
                            ? `${invoice.notes}\n[${new Date().toISOString()}] Payment received via Stripe webhook.`
                            : `[${new Date().toISOString()}] Payment received via Stripe webhook.`,
                    });
                    console.log(`Invoice ${invoiceId} marked as paid via webhook`);
                }
            }
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent ${paymentIntent.id} failed`);
            const invoiceId = paymentIntent.metadata?.invoiceId;
            if (invoiceId) {
                const invoice = await storage_1.storage.getInvoice(parseInt(invoiceId));
                if (invoice) {
                    await storage_1.storage.updateInvoice(invoice.id, {
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
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent ${paymentIntent.id} canceled`);
            const invoiceId = paymentIntent.metadata?.invoiceId;
            if (invoiceId) {
                const invoice = await storage_1.storage.getInvoice(parseInt(invoiceId));
                if (invoice) {
                    await storage_1.storage.updateInvoice(invoice.id, {
                        stripePaymentStatus: 'canceled',
                    });
                }
            }
            break;
        }
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
    res.json({ received: true });
});
// GET /api/payments/history - Get payment history for the user
router.get('/history', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Get all paid invoices for the user
        const invoices = await storage_1.storage.getInvoicesByUserId(req.user.userId);
        const paidInvoices = invoices.filter(inv => inv.status === 'paid');
        const paymentHistory = paidInvoices.map(inv => ({
            id: inv.id,
            invoiceNumber: inv.invoiceNumber,
            amount: inv.totalAmount,
            currency: inv.currency || 'USD',
            paymentDate: inv.paymentDate,
            paymentMethod: inv.paymentMethod,
            description: inv.description,
        }));
        res.json({
            success: true,
            payments: paymentHistory,
            totalPaid: paidInvoices.reduce((sum, inv) => sum + parseFloat(inv.totalAmount || '0'), 0),
        });
    }
    catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ error: 'Failed to fetch payment history' });
    }
});
exports.default = router;
//# sourceMappingURL=payments.js.map