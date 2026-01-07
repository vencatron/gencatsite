/**
 * Database Row to Model Mappers
 *
 * These functions convert snake_case database rows to camelCase TypeScript models.
 * They provide a single source of truth for the mapping logic, eliminating
 * duplication across the storage implementations.
 *
 * Usage:
 *   import { mapUserRow, mapDocumentRows } from '@/shared/storage/mappers';
 *
 *   // Single row mapping
 *   const user = mapUserRow(dbRow);
 *
 *   // Array mapping
 *   const documents = mapDocumentRows(dbRows);
 *
 *   // Nullable mapping (returns undefined if input is null/undefined)
 *   const maybeUser = mapUserRowOrUndefined(dbRow);
 */

import type {
  UserRow,
  UserRowWithStats,
  User,
  UserWithStats,
  DocumentRow,
  Document,
  MessageRow,
  Message,
  InvoiceRow,
  Invoice,
  AppointmentRow,
  Appointment,
  RecentUserSummary,
} from './types';

// ============================================================================
// User Mappers
// ============================================================================

/**
 * Maps a single user database row to the User model.
 *
 * @param row - Raw database row with snake_case columns
 * @returns User model with camelCase properties
 */
export function mapUserRow(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    passwordHash: row.password_hash,
    firstName: row.first_name,
    lastName: row.last_name,
    phoneNumber: row.phone_number,
    address: row.address,
    city: row.city,
    state: row.state,
    zipCode: row.zip_code,
    role: row.role,
    isActive: row.is_active,
    lastLoginAt: row.last_login_at,
    twoFactorEnabled: row.two_factor_enabled,
    twoFactorSecret: row.two_factor_secret,
    twoFactorBackupCodes: row.two_factor_backup_codes,
    emailVerified: row.email_verified,
    emailVerificationToken: row.email_verification_token,
    emailVerificationExpires: row.email_verification_expires,
    passwordResetToken: row.password_reset_token,
    passwordResetExpires: row.password_reset_expires,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Maps a single user database row to User model, or returns undefined.
 * Useful for queries that may return no results.
 *
 * @param row - Raw database row or null/undefined
 * @returns User model or undefined
 */
export function mapUserRowOrUndefined(row: UserRow | null | undefined): User | undefined {
  if (!row) return undefined;
  return mapUserRow(row);
}

/**
 * Maps an array of user database rows to User models.
 *
 * @param rows - Array of raw database rows
 * @returns Array of User models
 */
export function mapUserRows(rows: UserRow[]): User[] {
  return rows.map(mapUserRow);
}

/**
 * Maps a user row with computed statistics to UserWithStats model.
 *
 * @param row - Raw database row with additional computed fields
 * @returns UserWithStats model
 */
export function mapUserRowWithStats(row: UserRowWithStats): UserWithStats {
  const user = mapUserRow(row);
  return {
    ...user,
    documentCount: row.document_count !== undefined ? Number(row.document_count) : undefined,
    hasInvoice: row.has_invoice !== undefined ? Boolean(row.has_invoice) : undefined,
  };
}

/**
 * Maps an array of user rows with stats to UserWithStats models.
 *
 * @param rows - Array of raw database rows with computed fields
 * @returns Array of UserWithStats models
 */
export function mapUserRowsWithStats(rows: UserRowWithStats[]): UserWithStats[] {
  return rows.map(mapUserRowWithStats);
}

/**
 * Maps a user row to a recent user summary (for admin dashboard).
 *
 * @param row - Raw database row with user info and stats
 * @returns RecentUserSummary for dashboard display
 */
export function mapUserRowToRecentSummary(row: UserRowWithStats): RecentUserSummary {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    documentCount: Number(row.document_count ?? 0),
    hasInvoice: Boolean(row.has_invoice),
  };
}

/**
 * Maps an array of user rows to recent user summaries.
 *
 * @param rows - Array of raw database rows
 * @returns Array of RecentUserSummary models
 */
export function mapUserRowsToRecentSummaries(rows: UserRowWithStats[]): RecentUserSummary[] {
  return rows.map(mapUserRowToRecentSummary);
}

// ============================================================================
// Document Mappers
// ============================================================================

/**
 * Maps a single document database row to the Document model.
 *
 * @param row - Raw database row with snake_case columns
 * @returns Document model with camelCase properties
 */
export function mapDocumentRow(row: DocumentRow): Document {
  return {
    id: row.id,
    userId: row.user_id,
    fileName: row.file_name,
    fileType: row.file_type,
    fileSize: row.file_size,
    storageUrl: row.storage_url,
    category: row.category,
    description: row.description,
    tags: row.tags,
    status: row.status,
    uploadedBy: row.uploaded_by,
    isPublic: row.is_public,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Maps a single document database row to Document model, or returns undefined.
 *
 * @param row - Raw database row or null/undefined
 * @returns Document model or undefined
 */
export function mapDocumentRowOrUndefined(row: DocumentRow | null | undefined): Document | undefined {
  if (!row) return undefined;
  return mapDocumentRow(row);
}

/**
 * Maps an array of document database rows to Document models.
 *
 * @param rows - Array of raw database rows
 * @returns Array of Document models
 */
export function mapDocumentRows(rows: DocumentRow[]): Document[] {
  return rows.map(mapDocumentRow);
}

// ============================================================================
// Message Mappers
// ============================================================================

/**
 * Maps a single message database row to the Message model.
 *
 * @param row - Raw database row with snake_case columns
 * @returns Message model with camelCase properties
 */
export function mapMessageRow(row: MessageRow): Message {
  return {
    id: row.id,
    threadId: row.thread_id,
    senderId: row.sender_id,
    recipientId: row.recipient_id,
    subject: row.subject,
    content: row.content,
    isRead: row.is_read,
    readAt: row.read_at,
    priority: row.priority,
    status: row.status,
    attachmentIds: row.attachment_ids,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Maps a single message database row to Message model, or returns undefined.
 *
 * @param row - Raw database row or null/undefined
 * @returns Message model or undefined
 */
export function mapMessageRowOrUndefined(row: MessageRow | null | undefined): Message | undefined {
  if (!row) return undefined;
  return mapMessageRow(row);
}

/**
 * Maps an array of message database rows to Message models.
 *
 * @param rows - Array of raw database rows
 * @returns Array of Message models
 */
export function mapMessageRows(rows: MessageRow[]): Message[] {
  return rows.map(mapMessageRow);
}

// ============================================================================
// Invoice Mappers
// ============================================================================

/**
 * Maps a single invoice database row to the Invoice model.
 *
 * @param row - Raw database row with snake_case columns
 * @returns Invoice model with camelCase properties
 */
export function mapInvoiceRow(row: InvoiceRow): Invoice {
  return {
    id: row.id,
    userId: row.user_id,
    invoiceNumber: row.invoice_number,
    amount: row.amount,
    tax: row.tax,
    totalAmount: row.total_amount,
    currency: row.currency,
    status: row.status,
    description: row.description,
    lineItems: row.line_items,
    paymentMethod: row.payment_method,
    paymentDate: row.payment_date,
    dueDate: row.due_date,
    reminderSent: row.reminder_sent,
    reminderSentAt: row.reminder_sent_at,
    notes: row.notes,
    stripePaymentIntentId: row.stripe_payment_intent_id,
    stripeCustomerId: row.stripe_customer_id,
    stripePaymentStatus: row.stripe_payment_status,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Maps a single invoice database row to Invoice model, or returns undefined.
 *
 * @param row - Raw database row or null/undefined
 * @returns Invoice model or undefined
 */
export function mapInvoiceRowOrUndefined(row: InvoiceRow | null | undefined): Invoice | undefined {
  if (!row) return undefined;
  return mapInvoiceRow(row);
}

/**
 * Maps an array of invoice database rows to Invoice models.
 *
 * @param rows - Array of raw database rows
 * @returns Array of Invoice models
 */
export function mapInvoiceRows(rows: InvoiceRow[]): Invoice[] {
  return rows.map(mapInvoiceRow);
}

// ============================================================================
// Appointment Mappers
// ============================================================================

/**
 * Maps a single appointment database row to the Appointment model.
 *
 * @param row - Raw database row with snake_case columns
 * @returns Appointment model with camelCase properties
 */
export function mapAppointmentRow(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    description: row.description,
    scheduledAt: row.scheduled_at,
    duration: row.duration,
    location: row.location,
    meetingType: row.meeting_type,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Maps a single appointment database row to Appointment model, or returns undefined.
 *
 * @param row - Raw database row or null/undefined
 * @returns Appointment model or undefined
 */
export function mapAppointmentRowOrUndefined(row: AppointmentRow | null | undefined): Appointment | undefined {
  if (!row) return undefined;
  return mapAppointmentRow(row);
}

/**
 * Maps an array of appointment database rows to Appointment models.
 *
 * @param rows - Array of raw database rows
 * @returns Array of Appointment models
 */
export function mapAppointmentRows(rows: AppointmentRow[]): Appointment[] {
  return rows.map(mapAppointmentRow);
}

// ============================================================================
// Generic Utility Mappers
// ============================================================================

/**
 * Type for mapper functions that convert a single row to a model.
 */
export type RowMapper<TRow, TModel> = (row: TRow) => TModel;

/**
 * Creates a nullable mapper from a row mapper function.
 * Returns undefined if the input is null or undefined.
 *
 * @param mapper - The base row mapper function
 * @returns A new mapper that handles null/undefined input
 */
export function createNullableMapper<TRow, TModel>(
  mapper: RowMapper<TRow, TModel>
): (row: TRow | null | undefined) => TModel | undefined {
  return (row) => (row ? mapper(row) : undefined);
}

/**
 * Creates an array mapper from a row mapper function.
 *
 * @param mapper - The base row mapper function
 * @returns A new mapper that handles arrays
 */
export function createArrayMapper<TRow, TModel>(
  mapper: RowMapper<TRow, TModel>
): (rows: TRow[]) => TModel[] {
  return (rows) => rows.map(mapper);
}

/**
 * Extracts the first element from an array and maps it, or returns undefined.
 * Useful for queries with LIMIT 1.
 *
 * @param rows - Array of database rows
 * @param mapper - The row mapper function
 * @returns Mapped first element or undefined
 */
export function mapFirstOrUndefined<TRow, TModel>(
  rows: TRow[],
  mapper: RowMapper<TRow, TModel>
): TModel | undefined {
  const first = rows[0];
  return first ? mapper(first) : undefined;
}
