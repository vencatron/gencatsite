// Database connection for Vercel serverless functions
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Use HTTP connection for Vercel serverless
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
