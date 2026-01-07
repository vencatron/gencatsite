/**
 * Unified Storage Layer Types and Mappers
 *
 * This module provides a single source of truth for:
 * - Database row types (snake_case matching PostgreSQL columns)
 * - Application model types (camelCase for TypeScript)
 * - Mapper functions to convert between the two
 *
 * Usage:
 *   import {
 *     type User,
 *     type UserRow,
 *     mapUserRow,
 *     mapUserRowOrUndefined,
 *     mapUserRows,
 *   } from '@/shared/storage';
 *
 * The goal is to eliminate the ~900 lines of duplicated mapping code
 * across server/storage.ts and api/storage.ts by providing reusable
 * mapper functions.
 */

// Re-export all types
export type {
  // User types
  UserRow,
  UserRowWithStats,
  User,
  UserWithStats,
  InsertUser,
  // Document types
  DocumentRow,
  Document,
  InsertDocument,
  // Message types
  MessageRow,
  Message,
  InsertMessage,
  // Invoice types
  InvoiceRow,
  Invoice,
  InsertInvoice,
  // Appointment types
  AppointmentRow,
  Appointment,
  InsertAppointment,
  // Admin types
  AdminDashboardStats,
  RecentUserSummary,
} from './types';

// Re-export type guards
export {
  isUserRow,
  isDocumentRow,
  isMessageRow,
  isInvoiceRow,
  isAppointmentRow,
} from './types';

// Re-export all mappers
export {
  // User mappers
  mapUserRow,
  mapUserRowOrUndefined,
  mapUserRows,
  mapUserRowWithStats,
  mapUserRowsWithStats,
  mapUserRowToRecentSummary,
  mapUserRowsToRecentSummaries,
  // Document mappers
  mapDocumentRow,
  mapDocumentRowOrUndefined,
  mapDocumentRows,
  // Message mappers
  mapMessageRow,
  mapMessageRowOrUndefined,
  mapMessageRows,
  // Invoice mappers
  mapInvoiceRow,
  mapInvoiceRowOrUndefined,
  mapInvoiceRows,
  // Appointment mappers
  mapAppointmentRow,
  mapAppointmentRowOrUndefined,
  mapAppointmentRows,
  // Utility mappers
  createNullableMapper,
  createArrayMapper,
  mapFirstOrUndefined,
  type RowMapper,
} from './mappers';
