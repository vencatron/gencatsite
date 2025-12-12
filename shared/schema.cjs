"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoicesRelations = exports.messagesRelations = exports.documentsRelations = exports.appointmentsRelations = exports.usersRelations = exports.appointments = exports.invoices = exports.messages = exports.documents = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// User table with portal-specific fields
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    username: (0, pg_core_1.text)('username').notNull().unique(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    passwordHash: (0, pg_core_1.text)('password_hash'), // For secure authentication
    firstName: (0, pg_core_1.text)('first_name'),
    lastName: (0, pg_core_1.text)('last_name'),
    phoneNumber: (0, pg_core_1.text)('phone_number'),
    address: (0, pg_core_1.text)('address'),
    city: (0, pg_core_1.text)('city'),
    state: (0, pg_core_1.text)('state'),
    zipCode: (0, pg_core_1.text)('zip_code'),
    role: (0, pg_core_1.text)('role').default('client'), // client, admin, support
    isActive: (0, pg_core_1.boolean)('is_active').default(true),
    lastLoginAt: (0, pg_core_1.timestamp)('last_login_at'),
    // 2FA fields
    twoFactorEnabled: (0, pg_core_1.boolean)('two_factor_enabled').default(false),
    twoFactorSecret: (0, pg_core_1.text)('two_factor_secret'), // Encrypted TOTP secret
    twoFactorBackupCodes: (0, pg_core_1.text)('two_factor_backup_codes'), // JSON array of backup codes
    // Email verification
    emailVerified: (0, pg_core_1.boolean)('email_verified').default(false),
    emailVerificationToken: (0, pg_core_1.text)('email_verification_token'),
    emailVerificationExpires: (0, pg_core_1.timestamp)('email_verification_expires'),
    // Password reset
    passwordResetToken: (0, pg_core_1.text)('password_reset_token'),
    passwordResetExpires: (0, pg_core_1.timestamp)('password_reset_expires'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => ({
    emailIdx: (0, pg_core_1.index)('users_email_idx').on(table.email),
    usernameIdx: (0, pg_core_1.index)('users_username_idx').on(table.username),
    roleIdx: (0, pg_core_1.index)('users_role_idx').on(table.role),
}));
// Documents table for storing document metadata
exports.documents = (0, pg_core_1.pgTable)('documents', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    fileName: (0, pg_core_1.text)('file_name').notNull(),
    fileType: (0, pg_core_1.text)('file_type').notNull(),
    fileSize: (0, pg_core_1.integer)('file_size').notNull(), // in bytes
    storageUrl: (0, pg_core_1.text)('storage_url'), // URL to the actual file in object storage
    category: (0, pg_core_1.text)('category'), // e.g., 'tax', 'legal', 'estate', 'personal'
    description: (0, pg_core_1.text)('description'),
    tags: (0, pg_core_1.text)('tags'), // Comma-separated tags
    status: (0, pg_core_1.text)('status').default('active'), // active, archived, deleted
    uploadedBy: (0, pg_core_1.integer)('uploaded_by').references(() => exports.users.id),
    isPublic: (0, pg_core_1.boolean)('is_public').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => ({
    userIdIdx: (0, pg_core_1.index)('documents_user_id_idx').on(table.userId),
    categoryIdx: (0, pg_core_1.index)('documents_category_idx').on(table.category),
    statusIdx: (0, pg_core_1.index)('documents_status_idx').on(table.status),
    createdAtIdx: (0, pg_core_1.index)('documents_created_at_idx').on(table.createdAt),
}));
// Messages table for secure communication between users and support
exports.messages = (0, pg_core_1.pgTable)('messages', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    threadId: (0, pg_core_1.integer)('thread_id'), // For grouping messages into threads
    senderId: (0, pg_core_1.integer)('sender_id').notNull().references(() => exports.users.id),
    recipientId: (0, pg_core_1.integer)('recipient_id').references(() => exports.users.id), // null for broadcast
    subject: (0, pg_core_1.text)('subject'),
    content: (0, pg_core_1.text)('content').notNull(),
    isRead: (0, pg_core_1.boolean)('is_read').default(false),
    readAt: (0, pg_core_1.timestamp)('read_at'),
    priority: (0, pg_core_1.text)('priority').default('normal'), // low, normal, high, urgent
    status: (0, pg_core_1.text)('status').default('active'), // active, archived, deleted
    attachmentIds: (0, pg_core_1.text)('attachment_ids'), // Comma-separated document IDs
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => ({
    senderIdIdx: (0, pg_core_1.index)('messages_sender_id_idx').on(table.senderId),
    recipientIdIdx: (0, pg_core_1.index)('messages_recipient_id_idx').on(table.recipientId),
    threadIdIdx: (0, pg_core_1.index)('messages_thread_id_idx').on(table.threadId),
    isReadIdx: (0, pg_core_1.index)('messages_is_read_idx').on(table.isRead),
    createdAtIdx: (0, pg_core_1.index)('messages_created_at_idx').on(table.createdAt),
}));
// Invoices table for billing information
exports.invoices = (0, pg_core_1.pgTable)('invoices', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').notNull().references(() => exports.users.id),
    invoiceNumber: (0, pg_core_1.varchar)('invoice_number', { length: 50 }).notNull().unique(),
    amount: (0, pg_core_1.decimal)('amount', { precision: 10, scale: 2 }).notNull(),
    tax: (0, pg_core_1.decimal)('tax', { precision: 10, scale: 2 }).default('0'),
    totalAmount: (0, pg_core_1.decimal)('total_amount', { precision: 10, scale: 2 }).notNull(),
    currency: (0, pg_core_1.varchar)('currency', { length: 3 }).default('USD'),
    status: (0, pg_core_1.text)('status').default('pending'), // pending, paid, overdue, cancelled, processing
    description: (0, pg_core_1.text)('description'),
    lineItems: (0, pg_core_1.text)('line_items'), // JSON string of line items
    paymentMethod: (0, pg_core_1.text)('payment_method'), // credit_card, bank_transfer, check, stripe
    paymentDate: (0, pg_core_1.timestamp)('payment_date'),
    dueDate: (0, pg_core_1.timestamp)('due_date').notNull(),
    reminderSent: (0, pg_core_1.boolean)('reminder_sent').default(false),
    reminderSentAt: (0, pg_core_1.timestamp)('reminder_sent_at'),
    notes: (0, pg_core_1.text)('notes'),
    // Stripe payment fields
    stripePaymentIntentId: (0, pg_core_1.text)('stripe_payment_intent_id'),
    stripeCustomerId: (0, pg_core_1.text)('stripe_customer_id'),
    stripePaymentStatus: (0, pg_core_1.text)('stripe_payment_status'), // requires_payment_method, processing, succeeded, failed
    createdBy: (0, pg_core_1.integer)('created_by').references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => ({
    userIdIdx: (0, pg_core_1.index)('invoices_user_id_idx').on(table.userId),
    invoiceNumberIdx: (0, pg_core_1.index)('invoices_invoice_number_idx').on(table.invoiceNumber),
    statusIdx: (0, pg_core_1.index)('invoices_status_idx').on(table.status),
    dueDateIdx: (0, pg_core_1.index)('invoices_due_date_idx').on(table.dueDate),
    createdAtIdx: (0, pg_core_1.index)('invoices_created_at_idx').on(table.createdAt),
    stripePaymentIntentIdx: (0, pg_core_1.index)('invoices_stripe_payment_intent_idx').on(table.stripePaymentIntentId),
}));
// Appointments table (existing)
exports.appointments = (0, pg_core_1.pgTable)('appointments', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.integer)('user_id').references(() => exports.users.id),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    scheduledAt: (0, pg_core_1.timestamp)('scheduled_at').notNull(),
    duration: (0, pg_core_1.integer)('duration'), // in minutes
    location: (0, pg_core_1.text)('location'),
    meetingType: (0, pg_core_1.text)('meeting_type'), // in-person, phone, video
    status: (0, pg_core_1.text)('status').default('scheduled'), // scheduled, completed, cancelled
    notes: (0, pg_core_1.text)('notes'),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow(),
}, (table) => ({
    userIdIdx: (0, pg_core_1.index)('appointments_user_id_idx').on(table.userId),
    scheduledAtIdx: (0, pg_core_1.index)('appointments_scheduled_at_idx').on(table.scheduledAt),
    statusIdx: (0, pg_core_1.index)('appointments_status_idx').on(table.status),
}));
// Define Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    appointments: many(exports.appointments),
    documents: many(exports.documents),
    sentMessages: many(exports.messages, { relationName: 'sender' }),
    receivedMessages: many(exports.messages, { relationName: 'recipient' }),
    invoices: many(exports.invoices),
    uploadedDocuments: many(exports.documents, { relationName: 'uploader' }),
    createdInvoices: many(exports.invoices, { relationName: 'creator' }),
}));
exports.appointmentsRelations = (0, drizzle_orm_1.relations)(exports.appointments, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.appointments.userId],
        references: [exports.users.id],
    }),
}));
exports.documentsRelations = (0, drizzle_orm_1.relations)(exports.documents, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.documents.userId],
        references: [exports.users.id],
    }),
    uploadedBy: one(exports.users, {
        fields: [exports.documents.uploadedBy],
        references: [exports.users.id],
        relationName: 'uploader',
    }),
}));
exports.messagesRelations = (0, drizzle_orm_1.relations)(exports.messages, ({ one }) => ({
    sender: one(exports.users, {
        fields: [exports.messages.senderId],
        references: [exports.users.id],
        relationName: 'sender',
    }),
    recipient: one(exports.users, {
        fields: [exports.messages.recipientId],
        references: [exports.users.id],
        relationName: 'recipient',
    }),
}));
exports.invoicesRelations = (0, drizzle_orm_1.relations)(exports.invoices, ({ one }) => ({
    user: one(exports.users, {
        fields: [exports.invoices.userId],
        references: [exports.users.id],
    }),
    createdBy: one(exports.users, {
        fields: [exports.invoices.createdBy],
        references: [exports.users.id],
        relationName: 'creator',
    }),
}));
//# sourceMappingURL=schema.js.map