"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const storage_1 = require("../storage");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
const BCRYPT_ROUNDS = 10;
// All admin routes require authentication and admin role
router.use(auth_1.authenticateToken);
router.use(auth_1.requireAdmin);
// GET /api/admin/stats - Get dashboard statistics
router.get('/stats', async (req, res) => {
    try {
        const { db } = require('../db');
        const { users, documents, messages, invoices } = require('../../shared/schema');
        const { sql, count } = require('drizzle-orm');
        const { eq } = require('drizzle-orm');
        // Get counts using Promise.all for parallel execution
        const [totalUsersResult, activeUsersResult, inactiveUsersResult, totalDocumentsResult, totalMessagesResult, unreadMessagesResult, totalInvoicesResult, pendingInvoicesResult,] = await Promise.all([
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
            .orderBy(sql `${users.createdAt} DESC`)
            .limit(5);
        // Calculate total revenue
        const invoiceResults = await db.select({ amount: invoices.amount }).from(invoices);
        const totalRevenue = invoiceResults.reduce((sum, inv) => sum + Number(inv.amount), 0);
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
    }
    catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ error: 'Internal server error fetching dashboard statistics' });
    }
});
// GET /api/admin/users - Get all users
router.get('/users', async (req, res) => {
    try {
        // Get all users from database
        const { db } = require('../db');
        const { users } = require('../../shared/schema');
        const allUsers = await db.select().from(users);
        // Remove password hashes from response
        const usersWithoutPasswords = allUsers.map(({ passwordHash, twoFactorSecret, twoFactorBackupCodes, ...user }) => user);
        res.json({ users: usersWithoutPasswords });
    }
    catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ error: 'Internal server error fetching users' });
    }
});
// PUT /api/admin/users/:id/reset-password - Reset user password
router.put('/users/:id/reset-password', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { newPassword } = req.body;
        if (!newPassword) {
            return res.status(400).json({ error: 'New password is required' });
        }
        // Validate password
        const passwordValidation = (0, validation_1.validatePassword)(newPassword);
        if (!passwordValidation.valid) {
            return res.status(400).json({
                error: 'Password does not meet requirements',
                details: passwordValidation.errors
            });
        }
        // Check if user exists
        const user = await storage_1.storage.getUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Hash new password
        const passwordHash = await bcrypt_1.default.hash(newPassword, BCRYPT_ROUNDS);
        // Update user password
        await storage_1.storage.updateUser(userId, { passwordHash, updatedAt: new Date() });
        res.json({
            message: `Password reset successfully for user ${user.username}`,
            userId: user.id
        });
    }
    catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Internal server error resetting password' });
    }
});
// DELETE /api/admin/users/:id - Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        // Check if user exists
        const user = await storage_1.storage.getUser(userId);
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
        await storage_1.storage.updateUser(userId, { isActive: false, updatedAt: new Date() });
        res.json({
            message: `User ${user.username} has been deactivated`,
            userId: user.id
        });
    }
    catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Internal server error deleting user' });
    }
});
// PUT /api/admin/users/:id/activate - Reactivate user
router.put('/users/:id/activate', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        // Check if user exists
        const user = await storage_1.storage.getUser(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Activate the user
        await storage_1.storage.updateUser(userId, { isActive: true, updatedAt: new Date() });
        res.json({
            message: `User ${user.username} has been activated`,
            userId: user.id
        });
    }
    catch (error) {
        console.error('Activate user error:', error);
        res.status(500).json({ error: 'Internal server error activating user' });
    }
});
// PUT /api/admin/users/:id/role - Update user role
router.put('/users/:id/role', async (req, res) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const { role } = req.body ?? {};
        if (!role || (role !== 'admin' && role !== 'client')) {
            return res.status(400).json({ error: 'Invalid role specified' });
        }
        const user = await storage_1.storage.getUser(userId);
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
        await storage_1.storage.updateUser(userId, { role, updatedAt: new Date() });
        res.json({
            message: `User ${user.username} role updated to ${role}`,
            userId: user.id,
            role,
        });
    }
    catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({ error: 'Internal server error updating user role' });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map
