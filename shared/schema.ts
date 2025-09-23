import { pgTable, serial, text, timestamp, integer, boolean, decimal, index, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// User table with portal-specific fields
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'), // For secure authentication
  firstName: text('first_name'),
  lastName: text('last_name'),
  phoneNumber: text('phone_number'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  zipCode: text('zip_code'),
  role: text('role').default('client'), // client, admin, support
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  usernameIdx: index('users_username_idx').on(table.username),
  roleIdx: index('users_role_idx').on(table.role),
}));

// Documents table for storing document metadata
export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  fileName: text('file_name').notNull(),
  fileType: text('file_type').notNull(),
  fileSize: integer('file_size').notNull(), // in bytes
  storageUrl: text('storage_url'), // URL to the actual file in object storage
  category: text('category'), // e.g., 'tax', 'legal', 'estate', 'personal'
  description: text('description'),
  tags: text('tags'), // Comma-separated tags
  status: text('status').default('active'), // active, archived, deleted
  uploadedBy: integer('uploaded_by').references(() => users.id),
  isPublic: boolean('is_public').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('documents_user_id_idx').on(table.userId),
  categoryIdx: index('documents_category_idx').on(table.category),
  statusIdx: index('documents_status_idx').on(table.status),
  createdAtIdx: index('documents_created_at_idx').on(table.createdAt),
}));

// Messages table for secure communication between users and support
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  threadId: integer('thread_id'), // For grouping messages into threads
  senderId: integer('sender_id').notNull().references(() => users.id),
  recipientId: integer('recipient_id').references(() => users.id), // null for broadcast
  subject: text('subject'),
  content: text('content').notNull(),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at'),
  priority: text('priority').default('normal'), // low, normal, high, urgent
  status: text('status').default('active'), // active, archived, deleted
  attachmentIds: text('attachment_ids'), // Comma-separated document IDs
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  senderIdIdx: index('messages_sender_id_idx').on(table.senderId),
  recipientIdIdx: index('messages_recipient_id_idx').on(table.recipientId),
  threadIdIdx: index('messages_thread_id_idx').on(table.threadId),
  isReadIdx: index('messages_is_read_idx').on(table.isRead),
  createdAtIdx: index('messages_created_at_idx').on(table.createdAt),
}));

// Invoices table for billing information
export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  tax: decimal('tax', { precision: 10, scale: 2 }).default('0'),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('USD'),
  status: text('status').default('pending'), // pending, paid, overdue, cancelled
  description: text('description'),
  lineItems: text('line_items'), // JSON string of line items
  paymentMethod: text('payment_method'), // credit_card, bank_transfer, check, etc.
  paymentDate: timestamp('payment_date'),
  dueDate: timestamp('due_date').notNull(),
  reminderSent: boolean('reminder_sent').default(false),
  reminderSentAt: timestamp('reminder_sent_at'),
  notes: text('notes'),
  createdBy: integer('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('invoices_user_id_idx').on(table.userId),
  invoiceNumberIdx: index('invoices_invoice_number_idx').on(table.invoiceNumber),
  statusIdx: index('invoices_status_idx').on(table.status),
  dueDateIdx: index('invoices_due_date_idx').on(table.dueDate),
  createdAtIdx: index('invoices_created_at_idx').on(table.createdAt),
}));

// Appointments table (existing)
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  scheduledAt: timestamp('scheduled_at').notNull(),
  duration: integer('duration'), // in minutes
  location: text('location'),
  meetingType: text('meeting_type'), // in-person, phone, video
  status: text('status').default('scheduled'), // scheduled, completed, cancelled
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  userIdIdx: index('appointments_user_id_idx').on(table.userId),
  scheduledAtIdx: index('appointments_scheduled_at_idx').on(table.scheduledAt),
  statusIdx: index('appointments_status_idx').on(table.status),
}));

// Define Relations
export const usersRelations = relations(users, ({ many }) => ({
  appointments: many(appointments),
  documents: many(documents),
  sentMessages: many(messages, { relationName: 'sender' }),
  receivedMessages: many(messages, { relationName: 'recipient' }),
  invoices: many(invoices),
  uploadedDocuments: many(documents, { relationName: 'uploader' }),
  createdInvoices: many(invoices, { relationName: 'creator' }),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  user: one(users, {
    fields: [documents.userId],
    references: [users.id],
  }),
  uploadedBy: one(users, {
    fields: [documents.uploadedBy],
    references: [users.id],
    relationName: 'uploader',
  }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: 'sender',
  }),
  recipient: one(users, {
    fields: [messages.recipientId],
    references: [users.id],
    relationName: 'recipient',
  }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  user: one(users, {
    fields: [invoices.userId],
    references: [users.id],
  }),
  createdBy: one(users, {
    fields: [invoices.createdBy],
    references: [users.id],
    relationName: 'creator',
  }),
}));

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;
export type Document = typeof documents.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = typeof invoices.$inferInsert;