import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests for security
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
        password_hash VARCHAR(255),
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        phone_number VARCHAR(20),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(50),
        zip_code VARCHAR(20),
        date_of_birth DATE,
        role VARCHAR(20) DEFAULT 'client',
        is_active BOOLEAN DEFAULT true,
        email_verified BOOLEAN DEFAULT false,
        email_verification_token VARCHAR(255),
        email_verification_expires TIMESTAMP,
        password_reset_token VARCHAR(255),
        password_reset_expires TIMESTAMP,
        two_factor_secret VARCHAR(255),
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
        metadata JSONB,
        version INTEGER DEFAULT 1,
        is_public BOOLEAN DEFAULT false,
        status VARCHAR(20) DEFAULT 'active',
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
        body TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        read_at TIMESTAMP,
        priority VARCHAR(20) DEFAULT 'normal',
        tags TEXT,
        attachment_ids TEXT,
        status VARCHAR(20) DEFAULT 'sent',
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
        tax DECIMAL(10, 2),
        total DECIMAL(10, 2),
        currency VARCHAR(3) DEFAULT 'USD',
        description TEXT,
        items JSONB,
        due_date DATE,
        paid_date DATE,
        payment_method VARCHAR(50),
        payment_reference VARCHAR(255),
        notes TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        metadata JSONB,
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

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id)`;

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
