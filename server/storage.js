"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.DatabaseStorage = void 0;
// Referenced from javascript_database integration
const schema_1 = require("../shared/schema");
// Use Vercel-specific DB connection
const db_vercel_1 = require("./db.vercel");
const drizzle_orm_1 = require("drizzle-orm");
// Database storage implementation using PostgreSQL
class DatabaseStorage {
    // User methods
    async getUser(id) {
        const [user] = await db_vercel_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        return user || undefined;
    }
    async getUserByUsername(username) {
        const [user] = await db_vercel_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.username, username));
        return user || undefined;
    }
    async getUserByEmail(email) {
        const [user] = await db_vercel_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        return user || undefined;
    }
    async getUserByEmailVerificationToken(token) {
        const [user] = await db_vercel_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.emailVerificationToken, token));
        return user || undefined;
    }
    async getUserByPasswordResetToken(token) {
        const [user] = await db_vercel_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.passwordResetToken, token));
        return user || undefined;
    }
    async createUser(insertUser) {
        const [user] = await db_vercel_1.db
            .insert(schema_1.users)
            .values(insertUser)
            .returning();
        return user;
    }
    async updateUser(id, data) {
        const result = await db_vercel_1.db
            .update(schema_1.users)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .returning();
        return result[0] || undefined;
    }
    // Document methods
    async getDocument(id) {
        const [document] = await db_vercel_1.db.select().from(schema_1.documents).where((0, drizzle_orm_1.eq)(schema_1.documents.id, id));
        return document || undefined;
    }
    async getDocumentsByUserId(userId) {
        return await db_vercel_1.db
            .select()
            .from(schema_1.documents)
            .where((0, drizzle_orm_1.eq)(schema_1.documents.userId, userId))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.documents.createdAt));
    }
    async createDocument(insertDocument) {
        const [document] = await db_vercel_1.db
            .insert(schema_1.documents)
            .values(insertDocument)
            .returning();
        return document;
    }
    async updateDocument(id, data) {
        const result = await db_vercel_1.db
            .update(schema_1.documents)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.documents.id, id))
            .returning();
        return result[0] || undefined;
    }
    async deleteDocument(id) {
        const result = await db_vercel_1.db
            .update(schema_1.documents)
            .set({ status: 'deleted', updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.documents.id, id));
        return (result.rowCount ?? 0) > 0;
    }
    // Message methods
    async getMessage(id) {
        const [message] = await db_vercel_1.db.select().from(schema_1.messages).where((0, drizzle_orm_1.eq)(schema_1.messages.id, id));
        return message || undefined;
    }
    async getMessagesByUserId(userId) {
        return await db_vercel_1.db
            .select()
            .from(schema_1.messages)
            .where((0, drizzle_orm_1.or)((0, drizzle_orm_1.eq)(schema_1.messages.senderId, userId), (0, drizzle_orm_1.eq)(schema_1.messages.recipientId, userId)))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.messages.createdAt));
    }
    async getMessageThread(threadId) {
        return await db_vercel_1.db
            .select()
            .from(schema_1.messages)
            .where((0, drizzle_orm_1.eq)(schema_1.messages.threadId, threadId))
            .orderBy((0, drizzle_orm_1.asc)(schema_1.messages.createdAt));
    }
    async createMessage(insertMessage) {
        const [message] = await db_vercel_1.db
            .insert(schema_1.messages)
            .values(insertMessage)
            .returning();
        return message;
    }
    async updateMessage(id, data) {
        const result = await db_vercel_1.db
            .update(schema_1.messages)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.messages.id, id))
            .returning();
        return result[0] || undefined;
    }
    async markMessageAsRead(id) {
        const result = await db_vercel_1.db
            .update(schema_1.messages)
            .set({ isRead: true, readAt: new Date(), updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.messages.id, id));
        return (result.rowCount ?? 0) > 0;
    }
    // Invoice methods
    async getInvoice(id) {
        const [invoice] = await db_vercel_1.db.select().from(schema_1.invoices).where((0, drizzle_orm_1.eq)(schema_1.invoices.id, id));
        return invoice || undefined;
    }
    async getInvoicesByUserId(userId) {
        return await db_vercel_1.db
            .select()
            .from(schema_1.invoices)
            .where((0, drizzle_orm_1.eq)(schema_1.invoices.userId, userId))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.invoices.createdAt));
    }
    async getInvoiceByNumber(invoiceNumber) {
        const [invoice] = await db_vercel_1.db
            .select()
            .from(schema_1.invoices)
            .where((0, drizzle_orm_1.eq)(schema_1.invoices.invoiceNumber, invoiceNumber));
        return invoice || undefined;
    }
    async createInvoice(insertInvoice) {
        const [invoice] = await db_vercel_1.db
            .insert(schema_1.invoices)
            .values(insertInvoice)
            .returning();
        return invoice;
    }
    async updateInvoice(id, data) {
        const result = await db_vercel_1.db
            .update(schema_1.invoices)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.invoices.id, id))
            .returning();
        return result[0] || undefined;
    }
    // Appointment methods
    async getAppointment(id) {
        const [appointment] = await db_vercel_1.db.select().from(schema_1.appointments).where((0, drizzle_orm_1.eq)(schema_1.appointments.id, id));
        return appointment || undefined;
    }
    async getAppointmentsByUserId(userId) {
        return await db_vercel_1.db
            .select()
            .from(schema_1.appointments)
            .where((0, drizzle_orm_1.eq)(schema_1.appointments.userId, userId))
            .orderBy((0, drizzle_orm_1.asc)(schema_1.appointments.scheduledAt));
    }
    async createAppointment(insertAppointment) {
        const [appointment] = await db_vercel_1.db
            .insert(schema_1.appointments)
            .values(insertAppointment)
            .returning();
        return appointment;
    }
    async updateAppointment(id, data) {
        const result = await db_vercel_1.db
            .update(schema_1.appointments)
            .set({ ...data, updatedAt: new Date() })
            .where((0, drizzle_orm_1.eq)(schema_1.appointments.id, id))
            .returning();
        return result[0] || undefined;
    }
}
exports.DatabaseStorage = DatabaseStorage;
exports.storage = new DatabaseStorage();
//# sourceMappingURL=storage.js.map