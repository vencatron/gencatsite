import { 
  users, documents, messages, invoices, appointments,
  type User, type InsertUser,
  type Document, type InsertDocument,
  type Message, type InsertMessage,
  type Invoice, type InsertInvoice,
  type Appointment, type InsertAppointment
} from "../shared/schema";
import { db } from "./db";
import { eq, or, desc, asc, count, sum, sql } from "drizzle-orm";

// Re-export types for compatibility with existing consumers
export { 
  type User, type InsertUser,
  type Document, type InsertDocument,
  type Message, type InsertMessage,
  type Invoice, type InsertInvoice
};

export interface AdminStats {
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
}

export class DatabaseStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.emailVerificationToken, token));
    return user || undefined;
  }

  async getUserByPasswordResetToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.passwordResetToken, token));
    return user || undefined;
  }
  
  // Alias for compatibility
  async getUserByEmailVerificationToken(token: string) {
      return this.getUserByVerificationToken(token);
  }

  async getAllUsers(): Promise<User[]> {
      const rows = await db.select({
          user: users,
          documentCount: count(documents.id),
          invoiceCount: count(invoices.id)
      })
      .from(users)
      .leftJoin(documents, eq(documents.userId, users.id))
      .leftJoin(invoices, eq(invoices.userId, users.id))
      .groupBy(users.id)
      .orderBy(desc(users.createdAt));
      
      return rows.map(row => ({
          ...row.user,
          documentCount: Number(row.documentCount),
          hasInvoice: Number(row.invoiceCount) > 0
      })) as any as User[];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User | undefined> {
    const result = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return result[0] || undefined;
  }

  // Document methods
  async getDocument(id: number): Promise<Document | undefined> {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document || undefined;
  }

  async getDocumentsByUserId(userId: number): Promise<Document[]> {
    return await db
      .select()
      .from(documents)
      .where(eq(documents.userId, userId))
      .orderBy(desc(documents.createdAt));
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const [document] = await db
      .insert(documents)
      .values(insertDocument)
      .returning();
    return document;
  }

  async updateDocument(id: number, data: Partial<InsertDocument>): Promise<Document | undefined> {
    const result = await db
      .update(documents)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(documents.id, id))
      .returning();
    return result[0] || undefined;
  }

  async deleteDocument(id: number): Promise<boolean> {
    const result = await db
      .update(documents)
      .set({ status: 'deleted', updatedAt: new Date() })
      .where(eq(documents.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Message methods
  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message || undefined;
  }

  // Alias for compatibility
  async getMessages(userId: number): Promise<Message[]> {
      return this.getMessagesByUserId(userId);
  }

  async getMessagesByUserId(userId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(or(
        eq(messages.senderId, userId),
        eq(messages.recipientId, userId)
      ))
      .orderBy(desc(messages.createdAt));
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    const result = await db
      .update(messages)
      .set({ isRead: true, readAt: new Date(), updatedAt: new Date() })
      .where(eq(messages.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Invoice methods
  async getInvoice(id: number): Promise<Invoice | undefined> {
    const [invoice] = await db.select().from(invoices).where(eq(invoices.id, id));
    return invoice || undefined;
  }

  async getInvoicesByUserId(userId: number): Promise<Invoice[]> {
    return await db
      .select()
      .from(invoices)
      .where(eq(invoices.userId, userId))
      .orderBy(desc(invoices.createdAt));
  }

  async getInvoiceByNumber(invoiceNumber: string): Promise<Invoice | undefined> {
    const [invoice] = await db
      .select()
      .from(invoices)
      .where(eq(invoices.invoiceNumber, invoiceNumber));
    return invoice || undefined;
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return await db
      .select()
      .from(invoices)
      .orderBy(desc(invoices.createdAt));
  }

  async createInvoice(insertInvoice: InsertInvoice): Promise<Invoice> {
    const [invoice] = await db
      .insert(invoices)
      .values(insertInvoice)
      .returning();
    return invoice;
  }

  async updateInvoice(id: number, data: Partial<InsertInvoice>): Promise<Invoice | undefined> {
    const result = await db
      .update(invoices)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(invoices.id, id))
      .returning();
    return result[0] || undefined;
  }

  // Admin Stats
  async getAdminDashboardStats(): Promise<AdminStats> {
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [activeUsers] = await db.select({ count: count() }).from(users).where(eq(users.isActive, true));
    const [inactiveUsers] = await db.select({ count: count() }).from(users).where(eq(users.isActive, false));
    const [totalDocuments] = await db.select({ count: count() }).from(documents);
    const [totalMessages] = await db.select({ count: count() }).from(messages);
    const [unreadMessages] = await db.select({ count: count() }).from(messages).where(eq(messages.isRead, false));
    const [totalInvoices] = await db.select({ count: count() }).from(invoices);
    const [pendingInvoices] = await db.select({ count: count() }).from(invoices).where(eq(invoices.status, 'pending'));
    const [revenue] = await db.select({ total: sum(invoices.amount) }).from(invoices);

    // Recent Users with stats
    const recentUsersList = await db.select().from(users).orderBy(desc(users.createdAt)).limit(10);
    
    const recentUsersWithStats = await Promise.all(recentUsersList.map(async (u) => {
        const [docCount] = await db.select({ count: count() }).from(documents).where(eq(documents.userId, u.id));
        const [invCount] = await db.select({ count: count() }).from(invoices).where(eq(invoices.userId, u.id));
        return {
            id: u.id,
            username: u.username,
            email: u.email,
            firstName: u.firstName,
            lastName: u.lastName,
            createdAt: u.createdAt ? u.createdAt.toISOString() : new Date().toISOString(),
            documentCount: docCount.count,
            hasInvoice: invCount.count > 0
        };
    }));

    return {
        totalUsers: totalUsers.count,
        activeUsers: activeUsers.count,
        inactiveUsers: inactiveUsers.count,
        totalDocuments: totalDocuments.count,
        totalMessages: totalMessages.count,
        unreadMessages: unreadMessages.count,
        totalInvoices: totalInvoices.count,
        pendingInvoices: pendingInvoices.count,
        totalRevenue: Number(revenue?.total || 0),
        recentUsers: recentUsersWithStats
    };
  }
}

export const storage = new DatabaseStorage();