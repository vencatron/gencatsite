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
  lastLoginAt: Date | null;
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
  lastLoginAt?: Date | null;
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
        last_login_at, created_at, updated_at
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
        ${userData.lastLoginAt || null},
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
      lastLoginAt: user.last_login_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    } as User;
  },

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    // Get current user first
    const currentUser = await this.getUser(id);
    if (!currentUser) return undefined;

    // Prepare update data with current values as fallback
    const updateData = {
      username: data.username !== undefined ? data.username : currentUser.username,
      email: data.email !== undefined ? data.email : currentUser.email,
      passwordHash: data.passwordHash !== undefined ? data.passwordHash : currentUser.passwordHash,
      firstName: data.firstName !== undefined ? data.firstName : currentUser.firstName,
      lastName: data.lastName !== undefined ? data.lastName : currentUser.lastName,
      phoneNumber: data.phoneNumber !== undefined ? data.phoneNumber : currentUser.phoneNumber,
      address: data.address !== undefined ? data.address : currentUser.address,
      city: data.city !== undefined ? data.city : currentUser.city,
      state: data.state !== undefined ? data.state : currentUser.state,
      zipCode: data.zipCode !== undefined ? data.zipCode : currentUser.zipCode,
      dateOfBirth: data.dateOfBirth !== undefined ? data.dateOfBirth : currentUser.dateOfBirth,
      role: data.role !== undefined ? data.role : currentUser.role,
      isActive: data.isActive !== undefined ? data.isActive : currentUser.isActive,
      emailVerified: data.emailVerified !== undefined ? data.emailVerified : currentUser.emailVerified,
      emailVerificationToken: data.emailVerificationToken !== undefined ? data.emailVerificationToken : currentUser.emailVerificationToken,
      passwordResetToken: data.passwordResetToken !== undefined ? data.passwordResetToken : currentUser.passwordResetToken,
      passwordResetExpires: data.passwordResetExpires !== undefined ? data.passwordResetExpires : currentUser.passwordResetExpires,
      twoFactorSecret: data.twoFactorSecret !== undefined ? data.twoFactorSecret : currentUser.twoFactorSecret,
      twoFactorEnabled: data.twoFactorEnabled !== undefined ? data.twoFactorEnabled : currentUser.twoFactorEnabled,
      twoFactorBackupCodes: data.twoFactorBackupCodes !== undefined ? data.twoFactorBackupCodes : currentUser.twoFactorBackupCodes,
      lastLoginAt: data.lastLoginAt !== undefined ? data.lastLoginAt : currentUser.lastLoginAt,
      updatedAt: new Date()
    };

    const result = await sql`
      UPDATE users
      SET
        username = ${updateData.username},
        email = ${updateData.email},
        password_hash = ${updateData.passwordHash},
        first_name = ${updateData.firstName},
        last_name = ${updateData.lastName},
        phone_number = ${updateData.phoneNumber},
        address = ${updateData.address},
        city = ${updateData.city},
        state = ${updateData.state},
        zip_code = ${updateData.zipCode},
        date_of_birth = ${updateData.dateOfBirth},
        role = ${updateData.role},
        is_active = ${updateData.isActive},
        email_verified = ${updateData.emailVerified},
        email_verification_token = ${updateData.emailVerificationToken},
        password_reset_token = ${updateData.passwordResetToken},
        password_reset_expires = ${updateData.passwordResetExpires},
        two_factor_secret = ${updateData.twoFactorSecret},
        two_factor_enabled = ${updateData.twoFactorEnabled},
        two_factor_backup_codes = ${updateData.twoFactorBackupCodes},
        last_login_at = ${updateData.lastLoginAt},
        updated_at = ${updateData.updatedAt}
      WHERE id = ${id}
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
      lastLoginAt: user.last_login_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    } as User;
  }
};
