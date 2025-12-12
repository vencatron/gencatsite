-- Add Stripe payment columns to invoices table
-- Run this migration to add Stripe payment tracking fields

-- Add stripe_payment_intent_id column
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

-- Add stripe_customer_id column
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Add stripe_payment_status column
ALTER TABLE invoices 
ADD COLUMN IF NOT EXISTS stripe_payment_status TEXT;

-- Add index on stripe_payment_intent_id for faster lookups
CREATE INDEX IF NOT EXISTS invoices_stripe_payment_intent_idx 
ON invoices (stripe_payment_intent_id);

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'invoices' 
AND column_name LIKE 'stripe%';
