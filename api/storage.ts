// Simplified storage for Vercel serverless functions
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
  role: string | null;
  isActive: boolean | null;
  emailVerified: boolean | null;
  emailVerificationToken: string | null;
  emailVerificationExpires: Date | null;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  twoFactorSecret: string | null;
  twoFactorEnabled: boolean | null;
  twoFactorBackupCodes: string | null;
  lastLoginAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  documentCount?: number;
  hasInvoice?: boolean;
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
  role?: string | null;
  isActive?: boolean | null;
  emailVerified?: boolean | null;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  twoFactorSecret?: string | null;
  twoFactorEnabled?: boolean | null;
  twoFactorBackupCodes?: string | null;
  lastLoginAt?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface Message {
  id: number;
  threadId: number | null;
  senderId: number;
  recipientId: number | null;
  subject: string | null;
  content: string;
  isRead: boolean | null;
  readAt: Date | null;
  priority: string | null;
  status: string | null;
  attachmentIds: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface InsertMessage {
  threadId?: number | null;
  senderId: number;
  recipientId?: number | null;
  subject?: string | null;
  content: string;
  isRead?: boolean | null;
  readAt?: Date | null;
  priority?: string | null;
  status?: string | null;
  attachmentIds?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// Storage implementation using direct SQL queries
export const storage = {
  async getMessages(userId: number): Promise<Message[]> {
    const result = await sql`
      SELECT * FROM messages
      WHERE sender_id = ${userId} OR recipient_id = ${userId}
      ORDER BY created_at ASC
    `;

    return result.map((msg: any) => ({
      id: msg.id,
      threadId: msg.thread_id,
      senderId: msg.sender_id,
      recipientId: msg.recipient_id,
      subject: msg.subject,
      content: msg.content,
      isRead: msg.is_read,
      readAt: msg.read_at,
      priority: msg.priority,
      status: msg.status,
      attachmentIds: msg.attachment_ids,
      createdAt: msg.created_at,
      updatedAt: msg.updated_at
    })) as Message[];
  },

  async createMessage(data: InsertMessage): Promise<Message> {
    const result = await sql`
      INSERT INTO messages (
        thread_id, sender_id, recipient_id, subject, content,
        is_read, read_at, priority, status, attachment_ids,
        created_at, updated_at
      ) VALUES (
        ${data.threadId || null},
        ${data.senderId},
        ${data.recipientId || null},
        ${data.subject || null},
        ${data.content},
        ${data.isRead ?? false},
        ${data.readAt || null},
        ${data.priority || 'normal'},
        ${data.status || 'active'},
        ${data.attachmentIds || null},
        ${data.createdAt || new Date()},
        ${data.updatedAt || new Date()}
      ) RETURNING *
    `;

    const msg = result[0];
    if (!msg) throw new Error('Failed to create message');

    return {
      id: msg.id,
      threadId: msg.thread_id,
      senderId: msg.sender_id,
      recipientId: msg.recipient_id,
      subject: msg.subject,
      content: msg.content,
      isRead: msg.is_read,
      readAt: msg.read_at,
      priority: msg.priority,
      status: msg.status,
      attachmentIds: msg.attachment_ids,
      createdAt: msg.created_at,
      updatedAt: msg.updated_at
    } as Message;
  },

  async getAdminDashboardStats(): Promise<{
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalDocuments: number;
    totalMessages: number;
    unreadMessages: number;
    totalInvoices: number;
    pendingInvoices: number;
    totalRevenue: number;
    recentUsers: Array<{
      id: number;
      username: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      createdAt: string;
      documentCount: number;
      hasInvoice: boolean;
    }>;
  }> {
    const [
      totalUsersResult,
      activeUsersResult,
      inactiveUsersResult,
      totalDocumentsResult,
      totalMessagesResult,
      unreadMessagesResult,
      totalInvoicesResult,
      pendingInvoicesResult,
      totalRevenueResult,
      recentUsersResult,
    ] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM users`,
      sql`SELECT COUNT(*)::int AS count FROM users WHERE is_active IS TRUE`,
      sql`SELECT COUNT(*)::int AS count FROM users WHERE is_active IS FALSE`,
      sql`SELECT COUNT(*)::int AS count FROM documents`,
      sql`SELECT COUNT(*)::int AS count FROM messages`,
      sql`SELECT COUNT(*)::int AS count FROM messages WHERE is_read IS FALSE`,
      sql`SELECT COUNT(*)::int AS count FROM invoices`,
      sql`SELECT COUNT(*)::int AS count FROM invoices WHERE status = 'pending'`,
      sql`SELECT COALESCE(SUM(amount::numeric), 0)::numeric AS total FROM invoices`,
      sql`
        SELECT 
          u.id, u.username, u.email, u.first_name, u.last_name, u.created_at,
          (SELECT COUNT(*)::int FROM documents d WHERE d.user_id = u.id) as document_count,
          EXISTS(SELECT 1 FROM invoices i WHERE i.user_id = u.id) as has_invoice
        FROM users u
        ORDER BY u.created_at DESC NULLS LAST
        LIMIT 10
      `,
    ]);

    const countFrom = (result: any[]) => Number(result?.[0]?.count ?? 0);
    const totalRevenue = Number(totalRevenueResult?.[0]?.total ?? 0);
    const recentUsers = (recentUsersResult as any[]).map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      createdAt: user.created_at ? new Date(user.created_at).toISOString() : new Date().toISOString(),
      documentCount: Number(user.document_count ?? 0),
      hasInvoice: Boolean(user.has_invoice),
    }));

    return {
      totalUsers: countFrom(totalUsersResult),
      activeUsers: countFrom(activeUsersResult),
      inactiveUsers: countFrom(inactiveUsersResult),
      totalDocuments: countFrom(totalDocumentsResult),
      totalMessages: countFrom(totalMessagesResult),
      unreadMessages: countFrom(unreadMessagesResult),
      totalInvoices: countFrom(totalInvoicesResult),
      pendingInvoices: countFrom(pendingInvoicesResult),
      totalRevenue,
      recentUsers,
    };
  },

  async getAllUsers(): Promise<User[]> {
    const result = await sql`
      SELECT 
        u.*,
        (SELECT COUNT(*)::int FROM documents d WHERE d.user_id = u.id) as document_count,
        EXISTS(SELECT 1 FROM invoices i WHERE i.user_id = u.id) as has_invoice
      FROM users u
      ORDER BY u.created_at DESC
    `;

    return result.map((user: any) => ({
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
      updatedAt: user.updated_at,
      documentCount: Number(user.document_count ?? 0),
      hasInvoice: Boolean(user.has_invoice),
    })) as User[];
  },

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE username = ${username} LIMIT 1
    `;
    const user = result[0];
    if (!user) return undefined;

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

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;
    const user = result[0];
    if (!user) return undefined;

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

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE email_verification_token = ${token} LIMIT 1
    `;
    const user = result[0];
    if (!user) return undefined;

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
      role: user.role,
      isActive: user.is_active,
      emailVerified: user.email_verified,
      emailVerificationToken: user.email_verification_token,
      emailVerificationExpires: user.email_verification_expires,
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

  async getUserByPasswordResetToken(token: string): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE password_reset_token = ${token} LIMIT 1
    `;
    const user = result[0];
    if (!user) return undefined;

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
      role: user.role,
      isActive: user.is_active,
      emailVerified: user.email_verified,
      emailVerificationToken: user.email_verification_token,
      emailVerificationExpires: user.email_verification_expires,
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

  async getUser(id: number): Promise<User | undefined> {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id} LIMIT 1
    `;
    const user = result[0];
    if (!user) return undefined;

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

  async createUser(userData: InsertUser): Promise<User> {
    const result = await sql`
      INSERT INTO users (
        username, email, password_hash, first_name, last_name,
        phone_number, address, city, state, zip_code,
        role, is_active, email_verified,
        email_verification_token, email_verification_expires,
        password_reset_token, password_reset_expires,
        two_factor_secret, two_factor_enabled, two_factor_backup_codes,
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
        ${userData.role || 'client'},
        ${userData.isActive ?? true},
        ${userData.emailVerified ?? false},
        ${userData.emailVerificationToken || null},
        ${userData.emailVerificationExpires || null},
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
    if (!user) {
      throw new Error('Failed to create user');
    }
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
      role: user.role,
      isActive: user.is_active,
      emailVerified: user.email_verified,
      emailVerificationToken: user.email_verification_token,
      emailVerificationExpires: user.email_verification_expires,
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
      role: data.role !== undefined ? data.role : currentUser.role,
      isActive: data.isActive !== undefined ? data.isActive : currentUser.isActive,
      emailVerified: data.emailVerified !== undefined ? data.emailVerified : currentUser.emailVerified,
      emailVerificationToken: data.emailVerificationToken !== undefined ? data.emailVerificationToken : currentUser.emailVerificationToken,
      emailVerificationExpires: data.emailVerificationExpires !== undefined ? data.emailVerificationExpires : currentUser.emailVerificationExpires,
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
        role = ${updateData.role},
        is_active = ${updateData.isActive},
        email_verified = ${updateData.emailVerified},
        email_verification_token = ${updateData.emailVerificationToken},
        email_verification_expires = ${updateData.emailVerificationExpires},
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
      role: user.role,
      isActive: user.is_active,
      emailVerified: user.email_verified,
      emailVerificationToken: user.email_verification_token,
      emailVerificationExpires: user.email_verification_expires,
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

  // Document methods
  async getDocumentsByUserId(userId: number) {
    const result = await sql`
      SELECT * FROM documents
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return result.map((doc: any) => ({
      id: doc.id,
      userId: doc.user_id,
      fileName: doc.file_name,
      fileType: doc.file_type,
      fileSize: doc.file_size,
      storageUrl: doc.storage_url,
      category: doc.category,
      description: doc.description,
      tags: doc.tags,
      uploadedBy: doc.uploaded_by,
      status: doc.status,
      isPublic: doc.is_public,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    }));
  },

  async getDocument(id: number) {
    const result = await sql`
      SELECT * FROM documents WHERE id = ${id} LIMIT 1
    `;
    const doc = result[0];
    if (!doc) return undefined;

    return {
      id: doc.id,
      userId: doc.user_id,
      fileName: doc.file_name,
      fileType: doc.file_type,
      fileSize: doc.file_size,
      storageUrl: doc.storage_url,
      category: doc.category,
      description: doc.description,
      tags: doc.tags,
      uploadedBy: doc.uploaded_by,
      status: doc.status,
      isPublic: doc.is_public,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    };
  },

  async createDocument(data: any) {
    const result = await sql`
      INSERT INTO documents (
        user_id, file_name, file_type, file_size, storage_url,
        category, description, tags, uploaded_by, status, is_public,
        created_at, updated_at
      ) VALUES (
        ${data.userId},
        ${data.fileName},
        ${data.fileType},
        ${data.fileSize},
        ${data.storageUrl || null},
        ${data.category || null},
        ${data.description || null},
        ${data.tags || null},
        ${data.uploadedBy},
        ${data.status || 'active'},
        ${data.isPublic || false},
        ${data.createdAt || new Date()},
        ${data.updatedAt || new Date()}
      ) RETURNING *
    `;

    const doc = result[0];
    if (!doc) throw new Error('Failed to create document');

    return {
      id: doc.id,
      userId: doc.user_id,
      fileName: doc.file_name,
      fileType: doc.file_type,
      fileSize: doc.file_size,
      storageUrl: doc.storage_url,
      category: doc.category,
      description: doc.description,
      tags: doc.tags,
      uploadedBy: doc.uploaded_by,
      status: doc.status,
      isPublic: doc.is_public,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    };
  },

  async updateDocument(id: number, data: any) {
    const current = await this.getDocument(id);
    if (!current) return undefined;

    const updateData = {
      fileName: data.fileName !== undefined ? data.fileName : current.fileName,
      category: data.category !== undefined ? data.category : current.category,
      description: data.description !== undefined ? data.description : current.description,
      tags: data.tags !== undefined ? data.tags : current.tags,
      status: data.status !== undefined ? data.status : current.status,
      updatedAt: new Date()
    };

    const result = await sql`
      UPDATE documents
      SET
        file_name = ${updateData.fileName},
        category = ${updateData.category},
        description = ${updateData.description},
        tags = ${updateData.tags},
        status = ${updateData.status},
        updated_at = ${updateData.updatedAt}
      WHERE id = ${id}
      RETURNING *
    `;

    const doc = result[0];
    if (!doc) return undefined;

    return {
      id: doc.id,
      userId: doc.user_id,
      fileName: doc.file_name,
      fileType: doc.file_type,
      fileSize: doc.file_size,
      storageUrl: doc.storage_url,
      category: doc.category,
      description: doc.description,
      tags: doc.tags,
      uploadedBy: doc.uploaded_by,
      status: doc.status,
      isPublic: doc.is_public,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at
    };
  },

  async deleteDocument(id: number) {
    const result = await sql`
      UPDATE documents
      SET status = 'deleted', updated_at = ${new Date()}
      WHERE id = ${id}
      RETURNING id
    `;
    return result.length > 0;
  },

  // Invoice methods
  async getInvoice(id: number) {
    const result = await sql`
      SELECT * FROM invoices WHERE id = ${id} LIMIT 1
    `;
    const inv = result[0];
    if (!inv) return undefined;

    return {
      id: inv.id,
      userId: inv.user_id,
      invoiceNumber: inv.invoice_number,
      amount: inv.amount,
      tax: inv.tax,
      totalAmount: inv.total_amount,
      currency: inv.currency,
      status: inv.status,
      description: inv.description,
      lineItems: inv.line_items,
      paymentMethod: inv.payment_method,
      paymentDate: inv.payment_date,
      dueDate: inv.due_date,
      reminderSent: inv.reminder_sent,
      reminderSentAt: inv.reminder_sent_at,
      notes: inv.notes,
      stripePaymentIntentId: inv.stripe_payment_intent_id,
      stripeCustomerId: inv.stripe_customer_id,
      stripePaymentStatus: inv.stripe_payment_status,
      createdBy: inv.created_by,
      createdAt: inv.created_at,
      updatedAt: inv.updated_at
    };
  },

  async getInvoicesByUserId(userId: number) {
    const result = await sql`
      SELECT * FROM invoices
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return result.map((inv: any) => ({
      id: inv.id,
      userId: inv.user_id,
      invoiceNumber: inv.invoice_number,
      amount: inv.amount,
      tax: inv.tax,
      totalAmount: inv.total_amount,
      currency: inv.currency,
      status: inv.status,
      description: inv.description,
      lineItems: inv.line_items,
      paymentMethod: inv.payment_method,
      paymentDate: inv.payment_date,
      dueDate: inv.due_date,
      reminderSent: inv.reminder_sent,
      reminderSentAt: inv.reminder_sent_at,
      notes: inv.notes,
      stripePaymentIntentId: inv.stripe_payment_intent_id,
      stripeCustomerId: inv.stripe_customer_id,
      stripePaymentStatus: inv.stripe_payment_status,
      createdBy: inv.created_by,
      createdAt: inv.created_at,
      updatedAt: inv.updated_at
    }));
  },

  async getAllInvoices() {
    const result = await sql`
      SELECT * FROM invoices
      ORDER BY created_at DESC
    `;

    return result.map((inv: any) => ({
      id: inv.id,
      userId: inv.user_id,
      invoiceNumber: inv.invoice_number,
      amount: inv.amount,
      tax: inv.tax,
      totalAmount: inv.total_amount,
      currency: inv.currency,
      status: inv.status,
      description: inv.description,
      lineItems: inv.line_items,
      paymentMethod: inv.payment_method,
      paymentDate: inv.payment_date,
      dueDate: inv.due_date,
      reminderSent: inv.reminder_sent,
      reminderSentAt: inv.reminder_sent_at,
      notes: inv.notes,
      stripePaymentIntentId: inv.stripe_payment_intent_id,
      stripeCustomerId: inv.stripe_customer_id,
      stripePaymentStatus: inv.stripe_payment_status,
      createdBy: inv.created_by,
      createdAt: inv.created_at,
      updatedAt: inv.updated_at
    }));
  },

  async getInvoiceByNumber(invoiceNumber: string) {
    const result = await sql`
      SELECT * FROM invoices WHERE invoice_number = ${invoiceNumber} LIMIT 1
    `;
    const inv = result[0];
    if (!inv) return undefined;

    return {
      id: inv.id,
      userId: inv.user_id,
      invoiceNumber: inv.invoice_number,
      amount: inv.amount,
      tax: inv.tax,
      totalAmount: inv.total_amount,
      currency: inv.currency,
      status: inv.status,
      description: inv.description,
      lineItems: inv.line_items,
      paymentMethod: inv.payment_method,
      paymentDate: inv.payment_date,
      dueDate: inv.due_date,
      reminderSent: inv.reminder_sent,
      reminderSentAt: inv.reminder_sent_at,
      notes: inv.notes,
      stripePaymentIntentId: inv.stripe_payment_intent_id,
      stripeCustomerId: inv.stripe_customer_id,
      stripePaymentStatus: inv.stripe_payment_status,
      createdBy: inv.created_by,
      createdAt: inv.created_at,
      updatedAt: inv.updated_at
    };
  },

  async createInvoice(data: any) {
    const result = await sql`
      INSERT INTO invoices (
        user_id, invoice_number, amount, tax, total_amount, currency,
        status, description, line_items, payment_method, payment_date,
        due_date, reminder_sent, reminder_sent_at, notes,
        stripe_payment_intent_id, stripe_customer_id, stripe_payment_status,
        created_by, created_at, updated_at
      ) VALUES (
        ${data.userId},
        ${data.invoiceNumber},
        ${data.amount},
        ${data.tax || null},
        ${data.totalAmount || data.amount},
        ${data.currency || 'USD'},
        ${data.status || 'pending'},
        ${data.description || null},
        ${data.lineItems || null},
        ${data.paymentMethod || null},
        ${data.paymentDate || null},
        ${data.dueDate || null},
        ${data.reminderSent || false},
        ${data.reminderSentAt || null},
        ${data.notes || null},
        ${data.stripePaymentIntentId || null},
        ${data.stripeCustomerId || null},
        ${data.stripePaymentStatus || null},
        ${data.createdBy || null},
        ${data.createdAt || new Date()},
        ${data.updatedAt || new Date()}
      ) RETURNING *
    `;

    const inv = result[0];
    if (!inv) throw new Error('Failed to create invoice');

    return {
      id: inv.id,
      userId: inv.user_id,
      invoiceNumber: inv.invoice_number,
      amount: inv.amount,
      tax: inv.tax,
      totalAmount: inv.total_amount,
      currency: inv.currency,
      status: inv.status,
      description: inv.description,
      lineItems: inv.line_items,
      paymentMethod: inv.payment_method,
      paymentDate: inv.payment_date,
      dueDate: inv.due_date,
      reminderSent: inv.reminder_sent,
      reminderSentAt: inv.reminder_sent_at,
      notes: inv.notes,
      stripePaymentIntentId: inv.stripe_payment_intent_id,
      stripeCustomerId: inv.stripe_customer_id,
      stripePaymentStatus: inv.stripe_payment_status,
      createdBy: inv.created_by,
      createdAt: inv.created_at,
      updatedAt: inv.updated_at
    };
  },

  async updateInvoice(id: number, data: any) {
    const current = await this.getInvoice(id);
    if (!current) return undefined;

    const updateData = {
      status: data.status !== undefined ? data.status : current.status,
      paymentMethod: data.paymentMethod !== undefined ? data.paymentMethod : current.paymentMethod,
      paymentDate: data.paymentDate !== undefined ? data.paymentDate : current.paymentDate,
      notes: data.notes !== undefined ? data.notes : current.notes,
      stripePaymentIntentId: data.stripePaymentIntentId !== undefined ? data.stripePaymentIntentId : current.stripePaymentIntentId,
      stripeCustomerId: data.stripeCustomerId !== undefined ? data.stripeCustomerId : current.stripeCustomerId,
      stripePaymentStatus: data.stripePaymentStatus !== undefined ? data.stripePaymentStatus : current.stripePaymentStatus,
      updatedAt: new Date()
    };

    const result = await sql`
      UPDATE invoices
      SET
        status = ${updateData.status},
        payment_method = ${updateData.paymentMethod},
        payment_date = ${updateData.paymentDate},
        notes = ${updateData.notes},
        stripe_payment_intent_id = ${updateData.stripePaymentIntentId},
        stripe_customer_id = ${updateData.stripeCustomerId},
        stripe_payment_status = ${updateData.stripePaymentStatus},
        updated_at = ${updateData.updatedAt}
      WHERE id = ${id}
      RETURNING *
    `;

    const inv = result[0];
    if (!inv) return undefined;

    return {
      id: inv.id,
      userId: inv.user_id,
      invoiceNumber: inv.invoice_number,
      amount: inv.amount,
      tax: inv.tax,
      totalAmount: inv.total_amount,
      currency: inv.currency,
      status: inv.status,
      description: inv.description,
      lineItems: inv.line_items,
      paymentMethod: inv.payment_method,
      paymentDate: inv.payment_date,
      dueDate: inv.due_date,
      reminderSent: inv.reminder_sent,
      reminderSentAt: inv.reminder_sent_at,
      notes: inv.notes,
      stripePaymentIntentId: inv.stripe_payment_intent_id,
      stripeCustomerId: inv.stripe_customer_id,
      stripePaymentStatus: inv.stripe_payment_status,
      createdBy: inv.created_by,
      createdAt: inv.created_at,
      updatedAt: inv.updated_at
    };
  }
};
