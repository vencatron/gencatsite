# Database Schema Guide

**Generation Catalyst Estate Planning - PostgreSQL Data Models**

This guide provides a brief overview of the database schema, relationships, and data models.

---

## Database Technology

**Database:** PostgreSQL (hosted on Neon)
**ORM:** Drizzle ORM (type-safe, lightweight)
**Schema Location:** `shared/schema.ts`
**Migration Tool:** `drizzle-kit`

---

## Tables Overview

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts & authentication | id, username, email, passwordHash, role |
| `documents` | Document metadata (files in S3) | id, userId, fileName, storageUrl |
| `messages` | Secure messaging system | id, senderId, recipientId, content |
| `invoices` | Billing and payment tracking | id, userId, invoiceNumber, totalAmount |
| `appointments` | Scheduling system | id, userId, scheduledAt, status |

---

## Table Definitions

### Users Table

**Purpose:** Authentication, user profiles, and account management

```typescript
{
  id: serial (primary key),
  username: text (unique, not null),
  email: text (unique, not null),
  passwordHash: text,
  firstName: text,
  lastName: text,
  phoneNumber: text,
  address: text,
  city: text,
  state: text,
  zipCode: text,
  role: text (default: 'client'),  // client, admin, support
  isActive: boolean (default: true),
  lastLoginAt: timestamp,

  // Two-Factor Authentication
  twoFactorEnabled: boolean (default: false),
  twoFactorSecret: text,           // Encrypted TOTP secret
  twoFactorBackupCodes: text,      // JSON array of hashed codes

  // Email Verification
  emailVerified: boolean (default: false),
  emailVerificationToken: text,
  emailVerificationExpires: timestamp,

  // Password Reset
  passwordResetToken: text,
  passwordResetExpires: timestamp,

  // Timestamps
  createdAt: timestamp (default: now),
  updatedAt: timestamp (default: now)
}
```

**Indexes:**
- `email` (for fast login lookups)
- `username` (for fast login lookups)
- `role` (for admin queries)

**Relations:**
- One-to-many: `appointments`, `documents`, `invoices`
- One-to-many: `sentMessages`, `receivedMessages`

---

### Documents Table

**Purpose:** Document metadata (actual files stored in AWS S3)

```typescript
{
  id: serial (primary key),
  userId: integer (foreign key → users.id, not null),
  fileName: text (not null),
  fileType: text (not null),         // MIME type
  fileSize: integer (not null),      // bytes
  storageUrl: text,                  // S3 key/path
  category: text,                    // estate, legal, tax, personal
  description: text,
  tags: text,                        // comma-separated
  status: text (default: 'active'),  // active, archived, deleted
  uploadedBy: integer (foreign key → users.id),
  isPublic: boolean (default: false),

  // Timestamps
  createdAt: timestamp (default: now),
  updatedAt: timestamp (default: now)
}
```

**Indexes:**
- `userId` (for user document queries)
- `category` (for filtering)
- `status` (for filtering active/archived)
- `createdAt` (for sorting)

**Relations:**
- Many-to-one: `user` (document owner)
- Many-to-one: `uploadedBy` (uploader, may differ from owner)

**Storage Pattern:**
- `storageUrl` contains S3 key (e.g., `users/123/1705000000-document.pdf`)
- Downloads via signed URLs (1-hour expiry)

---

### Messages Table

**Purpose:** Secure messaging between users and support

```typescript
{
  id: serial (primary key),
  threadId: integer,                   // for conversation grouping
  senderId: integer (foreign key → users.id, not null),
  recipientId: integer (foreign key → users.id),  // null for broadcast
  subject: text,
  content: text (not null),
  isRead: boolean (default: false),
  readAt: timestamp,
  priority: text (default: 'normal'),  // low, normal, high, urgent
  status: text (default: 'active'),    // active, archived, deleted
  attachmentIds: text,                 // comma-separated document IDs

  // Timestamps
  createdAt: timestamp (default: now),
  updatedAt: timestamp (default: now)
}
```

**Indexes:**
- `senderId` (for sent messages)
- `recipientId` (for received messages)
- `threadId` (for conversation threads)
- `isRead` (for unread count)
- `createdAt` (for sorting)

**Relations:**
- Many-to-one: `sender` → `users`
- Many-to-one: `recipient` → `users`

**Threading:**
- `threadId` groups related messages
- First message in thread has `threadId` = null
- Replies reference original message's `threadId`

---

### Invoices Table

**Purpose:** Billing, payment tracking, and financial records

```typescript
{
  id: serial (primary key),
  userId: integer (foreign key → users.id, not null),
  invoiceNumber: varchar(50) (unique, not null),
  amount: decimal(10,2) (not null),
  tax: decimal(10,2) (default: 0),
  totalAmount: decimal(10,2) (not null),
  currency: varchar(3) (default: 'USD'),
  status: text (default: 'pending'),   // pending, paid, overdue, cancelled
  description: text,
  lineItems: text,                     // JSON string
  paymentMethod: text,                 // credit_card, bank_transfer, check
  paymentDate: timestamp,
  dueDate: timestamp (not null),
  reminderSent: boolean (default: false),
  reminderSentAt: timestamp,
  notes: text,
  createdBy: integer (foreign key → users.id),

  // Timestamps
  createdAt: timestamp (default: now),
  updatedAt: timestamp (default: now)
}
```

**Indexes:**
- `userId` (for user invoices)
- `invoiceNumber` (unique identifier)
- `status` (for filtering)
- `dueDate` (for overdue checks)
- `createdAt` (for sorting)

**Relations:**
- Many-to-one: `user` (invoice recipient)
- Many-to-one: `createdBy` (admin who created invoice)

**Line Items Format:**
```json
[
  {
    "description": "Estate planning consultation",
    "quantity": 1,
    "unitPrice": "1000.00",
    "total": "1000.00"
  },
  {
    "description": "Document preparation",
    "quantity": 3,
    "unitPrice": "150.00",
    "total": "450.00"
  }
]
```

---

### Appointments Table

**Purpose:** Scheduling and appointment management

```typescript
{
  id: serial (primary key),
  userId: integer (foreign key → users.id),
  title: text (not null),
  description: text,
  scheduledAt: timestamp (not null),
  duration: integer,                   // minutes
  location: text,
  meetingType: text,                   // in-person, phone, video
  status: text (default: 'scheduled'), // scheduled, completed, cancelled
  notes: text,

  // Timestamps
  createdAt: timestamp (default: now),
  updatedAt: timestamp (default: now)
}
```

**Indexes:**
- `userId` (for user appointments)
- `scheduledAt` (for time-based queries)
- `status` (for filtering)

**Relations:**
- Many-to-one: `user`

---

## Relationships Diagram

```
users (1) ──────┬────── (many) documents
                │
                ├────── (many) messages (as sender)
                │
                ├────── (many) messages (as recipient)
                │
                ├────── (many) invoices
                │
                └────── (many) appointments

messages (many) ──── (1) threadId (self-referencing)

documents (many) ──── (1) uploadedBy → users
invoices (many) ───── (1) createdBy → users
```

---

## Data Types & Constraints

### Common Patterns

**Primary Keys:**
- All tables use `serial` (auto-incrementing integer)

**Foreign Keys:**
- Enforce referential integrity
- No cascade deletes (use soft deletes)

**Timestamps:**
- `createdAt`: Set on record creation
- `updatedAt`: Updated on record modification
- All timestamps use PostgreSQL `timestamp` type

**Booleans:**
- Default values specified for all boolean fields
- Used for flags: `isActive`, `isRead`, `emailVerified`

**Text vs Varchar:**
- `text`: Unlimited length (descriptions, content)
- `varchar(n)`: Fixed max length (invoiceNumber, currency)

**Decimals:**
- Financial amounts: `decimal(10,2)` (precision 10, scale 2)
- Example: 12345678.90 (max value)

---

## Soft Deletes

**Pattern:** Use `status` field instead of hard deletes

**Documents:**
- `status = 'deleted'` (hidden from user, admin can view)
- Actual S3 file deleted immediately

**Messages:**
- `status = 'deleted'` (soft delete)
- Preserved for audit trail

**Invoices:**
- `status = 'cancelled'` (not deleted)
- Financial records must be immutable

**Users:**
- `isActive = false` (account deactivation)
- Never delete user records (data integrity)

---

## Indexes & Performance

### Index Strategy

**User Lookup (Email/Username):**
```sql
CREATE INDEX users_email_idx ON users(email);
CREATE INDEX users_username_idx ON users(username);
```
- Fastest login queries
- Unique constraint enforcement

**Foreign Key Lookups:**
```sql
CREATE INDEX documents_user_id_idx ON documents(userId);
CREATE INDEX messages_sender_id_idx ON messages(senderId);
```
- Efficient joins
- User-specific queries

**Filtering & Sorting:**
```sql
CREATE INDEX documents_status_idx ON documents(status);
CREATE INDEX invoices_due_date_idx ON invoices(dueDate);
```
- Fast WHERE clause evaluation
- Ordered results

---

## Query Patterns

### Common Queries

**Get User Documents:**
```typescript
const documents = await storage.getDocumentsByUserId(userId);
// Uses: documents_user_id_idx
```

**Get Unread Messages:**
```typescript
const unread = messages.filter(msg =>
  !msg.isRead && msg.recipientId === userId
);
// Uses: messages_recipient_id_idx, messages_is_read_idx
```

**Get Overdue Invoices:**
```typescript
const overdue = invoices.filter(inv =>
  inv.status === 'pending' && inv.dueDate < new Date()
);
// Uses: invoices_status_idx, invoices_due_date_idx
```

**Message Thread:**
```typescript
const thread = await storage.getMessageThread(threadId);
// Uses: messages_thread_id_idx
```

---

## Data Validation

### Application-Level Validation

**Users:**
- Email: RFC 5322 regex validation
- Username: Alphanumeric, 3-30 characters
- Password: Minimum 8 characters, bcrypt hashed
- Phone: Optional, sanitized input

**Documents:**
- File size: Max 50MB
- File types: Whitelist of allowed MIME types
- Filename: Sanitized to prevent path traversal

**Messages:**
- Content: Required, sanitized
- Priority: Enum validation (low, normal, high, urgent)
- Recipient: Must exist in users table

**Invoices:**
- Invoice number: Unique, alphanumeric
- Amounts: Positive decimals only
- Due date: Future date validation
- Status: Enum validation

---

## Security Considerations

### Sensitive Data

**Encrypted Fields:**
- `passwordHash`: bcrypt (10 rounds)
- `twoFactorSecret`: Encrypted TOTP secret
- `twoFactorBackupCodes`: Hashed backup codes

**PII Protection:**
- Email, phone, address fields
- Not logged in application logs
- Access controlled by authentication

**Token Fields:**
- `emailVerificationToken`: Random, time-limited
- `passwordResetToken`: Random, short-lived (1 hour)
- Cleared after use

### Access Control

**Row-Level Security (Application-Level):**
- Users can only access own records
- Admin role can access all records
- Verified through `authenticateToken` middleware

**Foreign Key Constraints:**
- Prevent orphaned records
- Ensure referential integrity
- No cascade deletes (explicit handling)

---

## Database Operations

### Using Drizzle ORM

**Insert:**
```typescript
const newUser: InsertUser = {
  username: 'john',
  email: 'john@example.com',
  passwordHash: hashedPassword,
  role: 'client',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};
const user = await storage.createUser(newUser);
```

**Query:**
```typescript
const user = await storage.getUserByEmail('john@example.com');
```

**Update:**
```typescript
await storage.updateUser(userId, {
  firstName: 'John',
  lastName: 'Doe',
  updatedAt: new Date()
});
```

**Soft Delete:**
```typescript
await storage.updateDocument(docId, { status: 'deleted' });
```

---

### Schema Migrations

**Apply Changes:**
```bash
npm run db:push
```

**Visual Management:**
```bash
npm run db:studio
```

**Configuration:**
- `drizzle.config.ts`: Database connection
- Uses `DATABASE_URL` environment variable
- Neon PostgreSQL connection string

---

## Type Safety

### Generated Types

**Schema Inference:**
```typescript
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
```

**Usage:**
```typescript
// Type-safe insert
const newUser: InsertUser = { ... };

// Type-safe select
const user: User = await storage.getUser(userId);

// TypeScript ensures all required fields present
// No runtime type errors
```

---

## Backup & Recovery

**Neon Features:**
- Automatic daily backups
- Point-in-time recovery
- Database branching for testing

**Best Practices:**
- Regular backup verification
- Test restore procedures
- Document recovery process

---

## Performance Optimization

### Query Optimization

**Indexes:** Cover all foreign keys and frequent filters
**Pagination:** Use LIMIT/OFFSET for large result sets
**Selective Loading:** Only fetch needed columns
**Connection Pooling:** Managed by Neon

### Data Growth Management

**Documents:** Files in S3, only metadata in DB
**Messages:** Archive old threads (status = 'archived')
**Invoices:** Never delete, index by date range
**Appointments:** Archive completed appointments

---

## Future Enhancements

**Potential Schema Additions:**

1. **Audit Log Table:**
   - Track all user actions
   - Compliance and security

2. **File Sharing Table:**
   - Share documents with specific users
   - Permission levels

3. **Payment Transactions:**
   - Separate payment history from invoices
   - Multiple payments per invoice

4. **Notification Preferences:**
   - User-configurable email/SMS settings
   - Granular notification control

5. **Session Tokens:**
   - JWT blacklist/revocation
   - Active session management

---

**Last Updated:** January 2025
**Schema Version:** 1.0
**Database:** PostgreSQL 15+ (Neon)
**ORM:** Drizzle ORM 0.x
