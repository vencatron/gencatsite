// Simplified storage for Vercel serverless functions
import { db } from './db';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const sql = neon(process.env.DATABASE_URL);

export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  dateOfBirth: Date | null;
  role: string | null;
  isActive: boolean | null;
  emailVerified: boolean | null;
  emailVerificationToken: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  twoFactorSecret: string | null;
  twoFactorEnabled: boolean | null;
  twoFactorBackupCodes: string | null;
  lastLogin: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface InsertUser {
  username: string;
  email: string;
  passwordHash: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  dateOfBirth?: Date | null;
  role?: string | null;
  isActive?: boolean | null;
  emailVerified?: boolean | null;
  emailVerificationToken?: string | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  twoFactorSecret?: string | null;
  twoFactorEnabled?: boolean | null;
  twoFactorBackupCodes?: string | null;
  lastLogin?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// Storage implementation using direct SQL queries
export const storage = {
  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE username = ${username} LIMIT 1
    `;
    return result[0] as User | undefined;
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;
    return result[0] as User | undefined;
  },

  async getUser(id: number): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id} LIMIT 1
    `;
    return result[0] as User | undefined;
  },

  async createUser(userData: InsertUser): Promise<User> {
    const result = await sql`
      INSERT INTO users (
        username, email, password_hash, first_name, last_name,
        phone_number, address, city, state, zip_code,
        date_of_birth, role, is_active, email_verified,
        email_verification_token, password_reset_token,
        password_reset_expires, two_factor_secret,
        two_factor_enabled, two_factor_backup_codes,
        last_login, created_at, updated_at
      ) VALUES (
        ${userData.username},
        ${userData.email},
        ${userData.passwordHash},
        ${userData.firstName || null},
        ${userData.lastName || null},
        ${userData.phoneNumber || null},
        ${userData.address || null},
        ${userData.city || null},
        ${userData.state || null},
        ${userData.zipCode || null},
        ${userData.dateOfBirth || null},
        ${userData.role || 'client'},
        ${userData.isActive ?? true},
        ${userData.emailVerified ?? false},
        ${userData.emailVerificationToken || null},
        ${userData.passwordResetToken || null},
        ${userData.passwordResetExpires || null},
        ${userData.twoFactorSecret || null},
        ${userData.twoFactorEnabled ?? false},
        ${userData.twoFactorBackupCodes || null},
        ${userData.lastLogin || null},
        ${userData.createdAt || new Date()},
        ${userData.updatedAt || new Date()}
      ) RETURNING *
    `;
    
    // Map database fields to camelCase
    const user = result[0];
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      passwordHash: user.password_hash,
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zip_code,
      dateOfBirth: user.date_of_birth,
      role: user.role,
      isActive: user.is_active,
      emailVerified: user.email_verified,
      emailVerificationToken: user.email_verification_token,
      passwordResetToken: user.password_reset_token,
      passwordResetExpires: user.password_reset_expires,
      twoFactorSecret: user.two_factor_secret,
      twoFactorEnabled: user.two_factor_enabled,
      twoFactorBackupCodes: user.two_factor_backup_codes,
      lastLogin: user.last_login,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    } as User;
  },

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    // Build dynamic UPDATE query
    if (data.username !== undefined) {
      updates.push(`username = $${paramIndex++}`);
      values.push(data.username);
    }
    if (data.email !== undefined) {
      updates.push(`email = $${paramIndex++}`);
      values.push(data.email);
    }
    if (data.passwordHash !== undefined) {
      updates.push(`password_hash = $${paramIndex++}`);
      values.push(data.passwordHash);
    }
    if (data.firstName !== undefined) {
      updates.push(`first_name = $${paramIndex++}`);
      values.push(data.firstName);
    }
    if (data.lastName !== undefined) {
      updates.push(`last_name = $${paramIndex++}`);
      values.push(data.lastName);
    }
    if (data.phoneNumber !== undefined) {
      updates.push(`phone_number = $${paramIndex++}`);
      values.push(data.phoneNumber);
    }
    if (data.twoFactorSecret !== undefined) {
      updates.push(`two_factor_secret = $${paramIndex++}`);
      values.push(data.twoFactorSecret);
    }
    if (data.twoFactorEnabled !== undefined) {
      updates.push(`two_factor_enabled = $${paramIndex++}`);
      values.push(data.twoFactorEnabled);
    }
    if (data.twoFactorBackupCodes !== undefined) {
      updates.push(`two_factor_backup_codes = $${paramIndex++}`);
      values.push(data.twoFactorBackupCodes);
    }
    if (data.lastLogin !== undefined) {
      updates.push(`last_login = $${paramIndex++}`);
      values.push(data.lastLogin);
    }

    // Always update updated_at
    updates.push(`updated_at = $${paramIndex++}`);
    values.push(new Date());

    // Add the id as the last parameter
    values.push(id);

    if (updates.length === 1) return undefined; // Only updated_at

    const result = await sql`
      UPDATE users 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    if (!result[0]) return undefined;

    // Map database fields to camelCase
    const user = result[0];
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      passwordHash: user.password_hash,
      firstName: user.first_name,
      lastName: user.last_name,
      phoneNumber: user.phone_number,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zip_code,
      dateOfBirth: user.date_of_birth,
      role: user.role,
      isActive: user.is_active,
      emailVerified: user.email_verified,
      emailVerificationToken: user.email_verification_token,
      passwordResetToken: user.password_reset_token,
      passwordResetExpires: user.password_reset_expires,
      twoFactorSecret: user.two_factor_secret,
      twoFactorEnabled: user.two_factor_enabled,
      twoFactorBackupCodes: user.two_factor_backup_codes,
      lastLogin: user.last_login,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    } as User;
  }
};
