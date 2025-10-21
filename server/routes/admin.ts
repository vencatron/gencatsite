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

// GET /api/admin/users - Get all users
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    // Get all users from database
    const { db } = require('../db');
    const { users } = require('../../shared/schema');
    const allUsers = await db.select().from(users);

    // Remove password hashes from response
    const usersWithoutPasswords = allUsers.map(({ passwordHash, twoFactorSecret, twoFactorBackupCodes, ...user }: any) => user);

    res.json({ users: usersWithoutPasswords });
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

export default router;
