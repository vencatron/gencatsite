"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const storage_1 = require("../storage");
const validation_1 = require("../utils/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
const BCRYPT_ROUNDS = 10;
// GET /api/users/profile - Get current user profile
router.get('/profile', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.isActive) {
            return res.status(403).json({ error: 'Account is deactivated' });
        }
        // Return user profile without sensitive information
        const { passwordHash, ...userProfile } = user;
        res.json({
            success: true,
            profile: userProfile
        });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});
// PUT /api/users/profile - Update user profile
router.put('/profile', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { firstName, lastName, email, phoneNumber, address, city, state, zipCode } = req.body;
        // Get current user to verify they exist
        const currentUser = await storage_1.storage.getUser(req.user.userId);
        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!currentUser.isActive) {
            return res.status(403).json({ error: 'Account is deactivated' });
        }
        // Prepare update data
        const updateData = {};
        // Update email if provided and valid
        if (email && email !== currentUser.email) {
            const sanitizedEmail = (0, validation_1.sanitizeInput)(email).toLowerCase();
            // Validate email format
            if (!(0, validation_1.validateEmail)(sanitizedEmail)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }
            // Check if email is already taken
            const existingUserWithEmail = await storage_1.storage.getUserByEmail(sanitizedEmail);
            if (existingUserWithEmail) {
                return res.status(409).json({ error: 'Email already in use' });
            }
            updateData.email = sanitizedEmail;
        }
        // Update other profile fields
        if (firstName !== undefined) {
            updateData.firstName = firstName ? (0, validation_1.sanitizeInput)(firstName) : null;
        }
        if (lastName !== undefined) {
            updateData.lastName = lastName ? (0, validation_1.sanitizeInput)(lastName) : null;
        }
        if (phoneNumber !== undefined) {
            updateData.phoneNumber = phoneNumber ? (0, validation_1.sanitizeInput)(phoneNumber) : null;
        }
        if (address !== undefined) {
            updateData.address = address ? (0, validation_1.sanitizeInput)(address) : null;
        }
        if (city !== undefined) {
            updateData.city = city ? (0, validation_1.sanitizeInput)(city) : null;
        }
        if (state !== undefined) {
            updateData.state = state ? (0, validation_1.sanitizeInput)(state) : null;
        }
        if (zipCode !== undefined) {
            updateData.zipCode = zipCode ? (0, validation_1.sanitizeInput)(zipCode) : null;
        }
        // Only update if there are changes
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }
        // Update user
        const updatedUser = await storage_1.storage.updateUser(req.user.userId, updateData);
        if (!updatedUser) {
            return res.status(500).json({ error: 'Failed to update profile' });
        }
        // Return updated profile without password
        const { passwordHash, ...userProfile } = updatedUser;
        res.json({
            success: true,
            message: 'Profile updated successfully',
            profile: userProfile
        });
    }
    catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Failed to update user profile' });
    }
});
// PUT /api/users/password - Change password
router.put('/password', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { currentPassword, newPassword, confirmPassword } = req.body;
        // Validate required fields
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                error: 'Current password, new password, and confirmation are required'
            });
        }
        // Check if new password matches confirmation
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'New password and confirmation do not match' });
        }
        // Validate new password strength
        const passwordValidation = (0, validation_1.validatePassword)(newPassword);
        if (!passwordValidation.valid) {
            return res.status(400).json({
                error: 'New password does not meet requirements',
                details: passwordValidation.errors
            });
        }
        // Get current user to verify current password
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.isActive) {
            return res.status(403).json({ error: 'Account is deactivated' });
        }
        // Verify current password
        if (!user.passwordHash) {
            return res.status(500).json({ error: 'User password configuration error' });
        }
        const isCurrentPasswordValid = await bcrypt_1.default.compare(currentPassword, user.passwordHash);
        if (!isCurrentPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }
        // Check that new password is different from current
        const isSamePassword = await bcrypt_1.default.compare(newPassword, user.passwordHash);
        if (isSamePassword) {
            return res.status(400).json({ error: 'New password must be different from current password' });
        }
        // Hash new password
        const newPasswordHash = await bcrypt_1.default.hash(newPassword, BCRYPT_ROUNDS);
        // Update password
        const updatedUser = await storage_1.storage.updateUser(req.user.userId, {
            passwordHash: newPasswordHash
        });
        if (!updatedUser) {
            return res.status(500).json({ error: 'Failed to update password' });
        }
        res.json({
            success: true,
            message: 'Password changed successfully. Please login again with your new password.'
        });
    }
    catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});
// GET /api/users - List all users (admin only)
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Only admin can list all users
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        // This would need a new storage method to get all users
        // For now, we'll return a placeholder response
        res.json({
            success: true,
            message: 'This endpoint would return all users for admin',
            users: []
        });
    }
    catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ error: 'Failed to list users' });
    }
});
// PUT /api/users/:id/status - Activate/deactivate user (admin only)
router.put('/:id/status', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        // Only admin can change user status
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        const userId = parseInt(req.params.id);
        if (isNaN(userId)) {
            return res.status(400).json({ error: 'Invalid user ID' });
        }
        const { isActive } = req.body;
        if (typeof isActive !== 'boolean') {
            return res.status(400).json({ error: 'isActive must be a boolean value' });
        }
        // Prevent admin from deactivating themselves
        if (userId === req.user.userId && !isActive) {
            return res.status(400).json({ error: 'Cannot deactivate your own account' });
        }
        // Check if user exists
        const targetUser = await storage_1.storage.getUser(userId);
        if (!targetUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Update user status
        const updatedUser = await storage_1.storage.updateUser(userId, { isActive });
        if (!updatedUser) {
            return res.status(500).json({ error: 'Failed to update user status' });
        }
        const { passwordHash, ...userProfile } = updatedUser;
        res.json({
            success: true,
            message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
            user: userProfile
        });
    }
    catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Failed to update user status' });
    }
});
exports.default = router;
//# sourceMappingURL=users.js.map