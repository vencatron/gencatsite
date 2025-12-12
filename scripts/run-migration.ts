// Script to run Stripe columns migration
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  console.log('Running Stripe columns migration...');

  try {
    // Add stripe_payment_intent_id column
    await sql`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT
    `;
    console.log('✓ Added stripe_payment_intent_id column');

    // Add stripe_customer_id column
    await sql`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT
    `;
    console.log('✓ Added stripe_customer_id column');

    // Add stripe_payment_status column
    await sql`
      ALTER TABLE invoices 
      ADD COLUMN IF NOT EXISTS stripe_payment_status TEXT
    `;
    console.log('✓ Added stripe_payment_status column');

    // Add index on stripe_payment_intent_id
    await sql`
      CREATE INDEX IF NOT EXISTS invoices_stripe_payment_intent_idx 
      ON invoices (stripe_payment_intent_id)
    `;
    console.log('✓ Added index on stripe_payment_intent_id');

    // Verify columns
    const result = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'invoices' 
      AND column_name LIKE 'stripe%'
    `;

    console.log('\nVerification - Stripe columns in invoices table:');
    result.forEach((row: any) => {
      console.log(`  - ${row.column_name}: ${row.data_type}`);
    });

    console.log('\n✓ Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
