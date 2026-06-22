import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // SECURITY: Disable database initialization in production
  // This endpoint should only be used during initial setup
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
    return res.status(403).json({ 
      error: 'Database initialization is disabled in production',
      message: 'This endpoint is only available in development environments'
    });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'Database URL not configured' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash TEXT,
        first_name TEXT,
        last_name TEXT,
        phone_number TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        zip_code TEXT,
        role VARCHAR(20) DEFAULT 'client',
        is_active BOOLEAN DEFAULT true,
        email_verified BOOLEAN DEFAULT false,
        email_verification_token TEXT,
        email_verification_expires TIMESTAMP,
        password_reset_token TEXT,
        password_reset_expires TIMESTAMP,
        two_factor_secret TEXT,
        two_factor_enabled BOOLEAN DEFAULT false,
        two_factor_backup_codes TEXT,
        last_login_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        file_size INTEGER NOT NULL,
        storage_url TEXT,
        category VARCHAR(50),
        description TEXT,
        tags TEXT,
        status VARCHAR(20) DEFAULT 'active',
        uploaded_by INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        thread_id INTEGER,
        sender_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        subject VARCHAR(255),
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        read_at TIMESTAMP,
        priority VARCHAR(20) DEFAULT 'normal',
        attachment_ids TEXT,
        tags TEXT,
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        invoice_number VARCHAR(50) UNIQUE NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        tax DECIMAL(10, 2) DEFAULT 0,
        total_amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(3) DEFAULT 'USD',
        description TEXT,
        line_items TEXT,
        payment_method VARCHAR(50),
        payment_date TIMESTAMP,
        due_date TIMESTAMP NOT NULL,
        payment_reference VARCHAR(255),
        notes TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        reminder_sent BOOLEAN DEFAULT false,
        reminder_sent_at TIMESTAMP,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        scheduled_at TIMESTAMP NOT NULL,
        duration INTEGER,
        location VARCHAR(255),
        meeting_type VARCHAR(50),
        status VARCHAR(20) DEFAULT 'scheduled',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Ensure legacy schemas are brought forward
    await sql`ALTER TABLE documents ADD COLUMN IF NOT EXISTS uploaded_by INTEGER REFERENCES users(id);`;
    await sql`UPDATE documents SET uploaded_by = user_id WHERE uploaded_by IS NULL;`;

    await sql`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'messages' AND column_name = 'body'
        ) THEN
          ALTER TABLE messages RENAME COLUMN body TO content;
        END IF;
      END $$;
    `;
    await sql`ALTER TABLE messages ALTER COLUMN status SET DEFAULT 'active';`;
    await sql`UPDATE messages SET status = 'active' WHERE status IS NULL OR status = 'sent';`;
    await sql`ALTER TABLE messages ALTER COLUMN content SET NOT NULL;`;

    await sql`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'invoices' AND column_name = 'total'
        ) THEN
          ALTER TABLE invoices RENAME COLUMN total TO total_amount;
        END IF;
      END $$;
    `;
    await sql`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'invoices' AND column_name = 'items'
        ) THEN
          ALTER TABLE invoices RENAME COLUMN items TO line_items;
        END IF;
      END $$;
    `;
    await sql`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'invoices' AND column_name = 'paid_date'
        ) THEN
          ALTER TABLE invoices RENAME COLUMN paid_date TO payment_date;
        END IF;
      END $$;
    `;
    await sql`ALTER TABLE invoices ALTER COLUMN due_date TYPE TIMESTAMP USING CASE WHEN due_date IS NULL THEN NULL ELSE due_date::timestamp END;`;
    await sql`ALTER TABLE invoices ALTER COLUMN payment_date TYPE TIMESTAMP USING CASE WHEN payment_date IS NULL THEN NULL ELSE payment_date::timestamp END;`;
    await sql`ALTER TABLE invoices ALTER COLUMN tax SET DEFAULT 0;`;
    await sql`ALTER TABLE invoices ALTER COLUMN currency SET DEFAULT 'USD';`;
    await sql`ALTER TABLE invoices ALTER COLUMN reminder_sent SET DEFAULT false;`;
    await sql`ALTER TABLE invoices ALTER COLUMN total_amount TYPE DECIMAL(10, 2);`;
    await sql`ALTER TABLE invoices ALTER COLUMN total_amount SET DEFAULT 0;`;
    await sql`UPDATE invoices SET total_amount = 0 WHERE total_amount IS NULL;`;
    await sql`ALTER TABLE invoices ALTER COLUMN total_amount SET NOT NULL;`;
    await sql`ALTER TABLE invoices ALTER COLUMN line_items TYPE TEXT USING line_items::text;`;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`;
    await sql`CREATE INDEX IF NOT EXISTS users_role_idx ON users(role)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS documents_category_idx ON documents(category)`;
    await sql`CREATE INDEX IF NOT EXISTS documents_status_idx ON documents(status)`;
    await sql`CREATE INDEX IF NOT EXISTS documents_created_at_idx ON documents(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id)`;
    await sql`CREATE INDEX IF NOT EXISTS messages_thread_id_idx ON messages(thread_id)`;
    await sql`CREATE INDEX IF NOT EXISTS messages_is_read_idx ON messages(is_read)`;
    await sql`CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS invoices_invoice_number_idx ON invoices(invoice_number)`;
    await sql`CREATE INDEX IF NOT EXISTS invoices_status_idx ON invoices(status)`;
    await sql`CREATE INDEX IF NOT EXISTS invoices_due_date_idx ON invoices(due_date)`;
    await sql`CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON invoices(created_at)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS appointments_scheduled_at_idx ON appointments(scheduled_at)`;
    await sql`CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status)`;

    return res.status(200).json({ 
      success: true, 
      message: 'Database initialized successfully',
      tables: ['users', 'documents', 'messages', 'invoices', 'appointments']
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return res.status(500).json({ 
      error: 'Failed to initialize database',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
