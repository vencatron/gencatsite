/**
 * Unified Database Row Types for Storage Layer
 *
 * These types represent the raw database rows with snake_case column names
 * as they are returned from PostgreSQL queries. They serve as the bridge
 * between the database layer and the application model types.
 *
 * Convention:
 * - DB row types use snake_case (matching PostgreSQL column names)
 * - Application model types use camelCase (TypeScript convention)
 * - Mapper functions in ./mappers.ts handle the conversion
 */

// ============================================================================
// User Types
// ============================================================================

/**
 * Raw database row for the users table.
 * All column names match PostgreSQL snake_case naming.
 */
export interface UserRow {
  id: number;
  username: string;
  email: string;
  password_hash: string | null;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  role: string | null;
  is_active: boolean | null;
  last_login_at: Date | null;
  // Two-factor authentication fields
  two_factor_enabled: boolean | null;
  two_factor_secret: string | null;
  two_factor_backup_codes: string | null;
  // Email verification fields
  email_verified: boolean | null;
  email_verification_token: string | null;
  email_verification_expires: Date | null;
  // Password reset fields
  password_reset_token: string | null;
  password_reset_expires: Date | null;
  // Timestamps
  created_at: Date | null;
  updated_at: Date | null;
}

/**
 * Extended user row with computed fields from JOINs or subqueries.
 * Used in admin dashboard and user listing queries.
 */
export interface UserRowWithStats extends UserRow {
  document_count?: number;
  has_invoice?: boolean;
}

/**
 * Application model for User entity.
 * Uses camelCase for TypeScript convention.
 */
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
  lastLoginAt: Date | null;
  // Two-factor authentication fields
  twoFactorEnabled: boolean | null;
  twoFactorSecret: string | null;
  twoFactorBackupCodes: string | null;
  // Email verification fields
  emailVerified: boolean | null;
  emailVerificationToken: string | null;
  emailVerificationExpires: Date | null;
  // Password reset fields
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  // Timestamps
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * Extended user model with computed statistics.
 */
export interface UserWithStats extends User {
  documentCount?: number;
  hasInvoice?: boolean;
}

/**
 * Input type for creating a new user.
 * Required fields: username, email
 * Optional fields: all others (will use database defaults)
 */
export interface InsertUser {
  username: string;
  email: string;
  passwordHash?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zipCode?: string | null;
  role?: string | null;
  isActive?: boolean | null;
  lastLoginAt?: Date | null;
  twoFactorEnabled?: boolean | null;
  twoFactorSecret?: string | null;
  twoFactorBackupCodes?: string | null;
  emailVerified?: boolean | null;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// ============================================================================
// Document Types
// ============================================================================

/**
 * Raw database row for the documents table.
 */
export interface DocumentRow {
  id: number;
  user_id: number;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_url: string | null;
  category: string | null;
  description: string | null;
  tags: string | null;
  status: string | null;
  uploaded_by: number | null;
  is_public: boolean | null;
  created_at: Date | null;
  updated_at: Date | null;
}

/**
 * Application model for Document entity.
 */
export interface Document {
  id: number;
  userId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  storageUrl: string | null;
  category: string | null;
  description: string | null;
  tags: string | null;
  status: string | null;
  uploadedBy: number | null;
  isPublic: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * Input type for creating a new document.
 */
export interface InsertDocument {
  userId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  storageUrl?: string | null;
  category?: string | null;
  description?: string | null;
  tags?: string | null;
  status?: string | null;
  uploadedBy?: number | null;
  isPublic?: boolean | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// ============================================================================
// Message Types
// ============================================================================

/**
 * Raw database row for the messages table.
 */
export interface MessageRow {
  id: number;
  thread_id: number | null;
  sender_id: number;
  recipient_id: number | null;
  subject: string | null;
  content: string;
  is_read: boolean | null;
  read_at: Date | null;
  priority: string | null;
  status: string | null;
  attachment_ids: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

/**
 * Application model for Message entity.
 */
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

/**
 * Input type for creating a new message.
 */
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

// ============================================================================
// Invoice Types
// ============================================================================

/**
 * Raw database row for the invoices table.
 */
export interface InvoiceRow {
  id: number;
  user_id: number;
  invoice_number: string;
  amount: string; // Decimal stored as string in PostgreSQL
  tax: string | null;
  total_amount: string;
  currency: string | null;
  status: string | null;
  description: string | null;
  line_items: string | null; // JSON string
  payment_method: string | null;
  payment_date: Date | null;
  due_date: Date;
  reminder_sent: boolean | null;
  reminder_sent_at: Date | null;
  notes: string | null;
  // Stripe payment fields
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  stripe_payment_status: string | null;
  created_by: number | null;
  created_at: Date | null;
  updated_at: Date | null;
}

/**
 * Application model for Invoice entity.
 */
export interface Invoice {
  id: number;
  userId: number;
  invoiceNumber: string;
  amount: string;
  tax: string | null;
  totalAmount: string;
  currency: string | null;
  status: string | null;
  description: string | null;
  lineItems: string | null;
  paymentMethod: string | null;
  paymentDate: Date | null;
  dueDate: Date;
  reminderSent: boolean | null;
  reminderSentAt: Date | null;
  notes: string | null;
  // Stripe payment fields
  stripePaymentIntentId: string | null;
  stripeCustomerId: string | null;
  stripePaymentStatus: string | null;
  createdBy: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * Input type for creating a new invoice.
 */
export interface InsertInvoice {
  userId: number;
  invoiceNumber: string;
  amount: string;
  tax?: string | null;
  totalAmount: string;
  currency?: string | null;
  status?: string | null;
  description?: string | null;
  lineItems?: string | null;
  paymentMethod?: string | null;
  paymentDate?: Date | null;
  dueDate: Date;
  reminderSent?: boolean | null;
  reminderSentAt?: Date | null;
  notes?: string | null;
  stripePaymentIntentId?: string | null;
  stripeCustomerId?: string | null;
  stripePaymentStatus?: string | null;
  createdBy?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// ============================================================================
// Appointment Types
// ============================================================================

/**
 * Raw database row for the appointments table.
 */
export interface AppointmentRow {
  id: number;
  user_id: number | null;
  title: string;
  description: string | null;
  scheduled_at: Date;
  duration: number | null;
  location: string | null;
  meeting_type: string | null;
  status: string | null;
  notes: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}

/**
 * Application model for Appointment entity.
 */
export interface Appointment {
  id: number;
  userId: number | null;
  title: string;
  description: string | null;
  scheduledAt: Date;
  duration: number | null;
  location: string | null;
  meetingType: string | null;
  status: string | null;
  notes: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

/**
 * Input type for creating a new appointment.
 */
export interface InsertAppointment {
  userId?: number | null;
  title: string;
  description?: string | null;
  scheduledAt: Date;
  duration?: number | null;
  location?: string | null;
  meetingType?: string | null;
  status?: string | null;
  notes?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// ============================================================================
// Admin Dashboard Types
// ============================================================================

/**
 * Statistics returned from admin dashboard queries.
 */
export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalDocuments: number;
  totalMessages: number;
  unreadMessages: number;
  totalInvoices: number;
  pendingInvoices: number;
  totalRevenue: number;
  recentUsers: RecentUserSummary[];
}

/**
 * Summary user info for admin dashboard recent users list.
 */
export interface RecentUserSummary {
  id: number;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  documentCount: number;
  hasInvoice: boolean;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Type guard to check if a value is a valid UserRow.
 */
export function isUserRow(value: unknown): value is UserRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'number' &&
    typeof row.username === 'string' &&
    typeof row.email === 'string'
  );
}

/**
 * Type guard to check if a value is a valid DocumentRow.
 */
export function isDocumentRow(value: unknown): value is DocumentRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'number' &&
    typeof row.user_id === 'number' &&
    typeof row.file_name === 'string' &&
    typeof row.file_type === 'string' &&
    typeof row.file_size === 'number'
  );
}

/**
 * Type guard to check if a value is a valid MessageRow.
 */
export function isMessageRow(value: unknown): value is MessageRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'number' &&
    typeof row.sender_id === 'number' &&
    typeof row.content === 'string'
  );
}

/**
 * Type guard to check if a value is a valid InvoiceRow.
 */
export function isInvoiceRow(value: unknown): value is InvoiceRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'number' &&
    typeof row.user_id === 'number' &&
    typeof row.invoice_number === 'string'
  );
}

/**
 * Type guard to check if a value is a valid AppointmentRow.
 */
export function isAppointmentRow(value: unknown): value is AppointmentRow {
  if (typeof value !== 'object' || value === null) return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === 'number' &&
    typeof row.title === 'string'
  );
}
