import { Router, Response } from 'express';
import bcrypt from 'bcrypt';
import { storage } from '../storage';
import { AuthRequest, authenticateToken, requireAdmin } from '../middleware/auth';
import { validatePassword, sanitizeInput } from '../utils/validation';

const router = Router();
const BCRYPT_ROUNDS = 10;

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// GET /api/admin/stats - Get dashboard statistics
router.get('/stats', async (req: AuthRequest, res: Response) => {
  try {
    const { db } = require('../db');
    const { users, documents, messages, invoices } = require('../../shared/schema');
    const { sql, count } = require('drizzle-orm');
    const { eq } = require('drizzle-orm');

    // Get counts using Promise.all for parallel execution
    const [
      totalUsersResult,
      activeUsersResult,
      inactiveUsersResult,
      totalDocumentsResult,
      totalMessagesResult,
      unreadMessagesResult,
      totalInvoicesResult,
      pendingInvoicesResult,
    ] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(users).where(eq(users.isActive, true)),
      db.select({ count: count() }).from(users).where(eq(users.isActive, false)),
      db.select({ count: count() }).from(documents),
      db.select({ count: count() }).from(messages),
      db.select({ count: count() }).from(messages).where(eq(messages.isRead, false)),
      db.select({ count: count() }).from(invoices),
      db.select({ count: count() }).from(invoices).where(eq(invoices.status, 'pending')),
    ]);

    // Get recent users (last 5)
    const recentUsers = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(sql`${users.createdAt} DESC`)
      .limit(5);

    // Calculate total revenue
    interface InvoiceAmount { amount: string | null }
    const invoiceResults: InvoiceAmount[] = await db.select({ amount: invoices.amount }).from(invoices);
    const totalRevenue = invoiceResults.reduce((sum, inv) => sum + Number(inv.amount ?? 0), 0);

    res.json({
      stats: {
        totalUsers: totalUsersResult[0]?.count || 0,
        activeUsers: activeUsersResult[0]?.count || 0,
        inactiveUsers: inactiveUsersResult[0]?.count || 0,
        totalDocuments: totalDocumentsResult[0]?.count || 0,
        totalMessages: totalMessagesResult[0]?.count || 0,
        unreadMessages: unreadMessagesResult[0]?.count || 0,
        totalInvoices: totalInvoicesResult[0]?.count || 0,
        pendingInvoices: pendingInvoicesResult[0]?.count || 0,
        totalRevenue: totalRevenue,
        recentUsers: recentUsers,
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error fetching dashboard statistics' });
  }
});

// GET /api/admin/users - Get all users with document count and invoice status
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const { db } = require('../db');
    const { users, documents, invoices } = require('../../shared/schema');
    const { sql, eq, count } = require('drizzle-orm');

    // Get all users with document count and invoice status
    const allUsers = await db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        phoneNumber: users.phoneNumber,
        role: users.role,
        isActive: users.isActive,
        emailVerified: users.emailVerified,
        twoFactorEnabled: users.twoFactorEnabled,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .orderBy(sql`${users.createdAt} DESC`);

    // Define user result type
    interface UserResult {
      id: number;
      username: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      phoneNumber: string | null;
      role: string | null;
      isActive: boolean | null;
      emailVerified: boolean | null;
      twoFactorEnabled: boolean | null;
      createdAt: Date | null;
      updatedAt: Date | null;
    }

    const typedUsers = allUsers as UserResult[];
    console.log('GET /api/admin/users - Sample user from DB:', JSON.stringify(typedUsers[0], null, 2));
    console.log('GET /api/admin/users - Total users:', typedUsers.length);
    console.log('GET /api/admin/users - Non-admin users:', typedUsers.filter((u) => u.role !== 'admin').length);

    // Get document counts per user
    interface DocCount { userId: number; count: number }
    const docCounts: DocCount[] = await db
      .select({
        userId: documents.userId,
        count: count(),
      })
      .from(documents)
      .groupBy(documents.userId);

    // Get users who have invoices
    interface InvoiceUserId { userId: number }
    const usersWithInvoices: InvoiceUserId[] = await db
      .select({ userId: invoices.userId })
      .from(invoices)
      .groupBy(invoices.userId);

    const docCountMap = new Map(docCounts.map((d) => [d.userId, Number(d.count)]));
    const invoiceUserIds = new Set(usersWithInvoices.map((i) => i.userId));

    // Enrich users with document count and invoice status
    const enrichedUsers = typedUsers.map((user) => ({
      ...user,
      documentCount: docCountMap.get(user.id) || 0,
      hasInvoice: invoiceUserIds.has(user.id),
    }));

    res.json({ users: enrichedUsers });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error fetching users' });
  }
});

// PUT /api/admin/users/:id/reset-password - Reset user password
router.put('/users/:id/reset-password', async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: 'New password is required' });
    }

    // Validate password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
        details: passwordValidation.errors
      });
    }

    // Check if user exists
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    // Update user password
    await storage.updateUser(userId, { passwordHash, updatedAt: new Date() });

    res.json({
      message: `Password reset successfully for user ${user.username}`,
      userId: user.id
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Internal server error resetting password' });
  }
});

// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prevent deleting yourself
    if (req.user && req.user.userId === userId) {
      return res.status(403).json({ error: 'Cannot delete your own account' });
    }

    // Prevent deleting other admins
    if (user.role === 'admin') {
      return res.status(403).json({ error: 'Cannot delete admin users' });
    }

    // Instead of hard delete, deactivate the user
    await storage.updateUser(userId, { isActive: false, updatedAt: new Date() });

    res.json({
      message: `User ${user.username} has been deactivated`,
      userId: user.id
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Internal server error deleting user' });
  }
});

// PUT /api/admin/users/:id/activate - Reactivate user
router.put('/users/:id/activate', async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id);

    // Check if user exists
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Activate the user
    await storage.updateUser(userId, { isActive: true, updatedAt: new Date() });

    res.json({
      message: `User ${user.username} has been activated`,
      userId: user.id
    });
  } catch (error) {
    console.error('Activate user error:', error);
    res.status(500).json({ error: 'Internal server error activating user' });
  }
});

// POST /api/admin/users/create - Create a new client record for invoicing
router.post('/users/create', async (req: AuthRequest, res: Response) => {
  try {
    const { email, firstName, lastName, phoneNumber } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Email, first name, and last name are required' });
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
    const sanitizedFirstName = sanitizeInput(firstName.trim());
    const sanitizedLastName = sanitizeInput(lastName.trim());
    const sanitizedPhoneNumber = phoneNumber ? sanitizeInput(phoneNumber.trim()) : null;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user with this email already exists
    const existingUser = await storage.getUserByEmail(sanitizedEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'A client with this email already exists' });
    }

    // Generate username from email
    const username = sanitizedEmail.split('@')[0] + '_' + Date.now().toString(36);

    // Create the client record (no password needed for invoice-only clients)
    const newUser = await storage.createUser({
      username,
      email: sanitizedEmail,
      passwordHash: null, // No login required
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      phoneNumber: sanitizedPhoneNumber,
      role: 'client',
      isActive: true,
      emailVerified: true,
    });

    // Remove sensitive data from response
    const { passwordHash: _, twoFactorSecret, twoFactorBackupCodes, ...userResponse } = newUser;

    res.status(201).json({
      message: `Client ${sanitizedFirstName} ${sanitizedLastName} created successfully`,
      user: userResponse
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ error: 'Internal server error creating client' });
  }
});

// POST /api/admin/users - Create a new client user (legacy endpoint)
router.post('/users', async (req: AuthRequest, res: Response) => {
  try {
    const { email, firstName, lastName, phoneNumber, password } = req.body;

    // Validate required fields
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ error: 'Email, first name, last name, and password are required' });
    }

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(email.toLowerCase().trim());
    const sanitizedFirstName = sanitizeInput(firstName.trim());
    const sanitizedLastName = sanitizeInput(lastName.trim());
    const sanitizedPhoneNumber = phoneNumber ? sanitizeInput(phoneNumber.trim()) : null;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
        details: passwordValidation.errors
      });
    }

    // Check if user with this email already exists
    const existingUser = await storage.getUserByEmail(sanitizedEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'A user with this email already exists' });
    }

    // Generate username from email
    const username = sanitizedEmail.split('@')[0] + '_' + Date.now().toString(36);

    // Hash password
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create the user
    const newUser = await storage.createUser({
      username,
      email: sanitizedEmail,
      passwordHash,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      phoneNumber: sanitizedPhoneNumber,
      role: 'client',
      isActive: true,
      emailVerified: true, // Admin-created users are pre-verified
    });

    // Remove sensitive data from response
    const { passwordHash: _, twoFactorSecret, twoFactorBackupCodes, ...userResponse } = newUser;

    res.status(201).json({
      message: `Client ${sanitizedFirstName} ${sanitizedLastName} created successfully`,
      user: userResponse
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ error: 'Internal server error creating client' });
  }
});

// PUT /api/admin/users/:id/role - Update user role
router.put('/users/:id/role', async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { role } = req.body ?? {};

    if (!role || (role !== 'admin' && role !== 'client')) {
      return res.status(400).json({ error: 'Invalid role specified' });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.role === role) {
      return res.json({
        message: `User ${user.username} already has role ${role}`,
        userId: user.id,
        role: user.role,
      });
    }

    // Prevent demoting yourself from admin via portal
    if (req.user && req.user.userId === userId && role !== 'admin') {
      return res.status(403).json({ error: 'You cannot change your own admin role' });
    }

    if (user.role === 'admin' && role !== 'admin') {
      const { db } = require('../db');
      const { users } = require('../../shared/schema');
      const { count, eq } = require('drizzle-orm');

      const adminCountResult = await db
        .select({ count: count() })
        .from(users)
        .where(eq(users.role, 'admin'));

      const adminCount = Number(adminCountResult[0]?.count || 0);
      if (adminCount <= 1) {
        return res.status(400).json({ error: 'Cannot remove the last remaining admin' });
      }
    }

    await storage.updateUser(userId, { role, updatedAt: new Date() });

    res.json({
      message: `User ${user.username} role updated to ${role}`,
      userId: user.id,
      role,
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ error: 'Internal server error updating user role' });
  }
});

export default router;
