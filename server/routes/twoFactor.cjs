"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const storage_1 = require("../storage");
const twoFactor_1 = require("../utils/twoFactor");
const validation_1 = require("../utils/validation");
const router = express_1.default.Router();
// All 2FA routes require authentication
router.use(auth_1.authenticateToken);
/**
 * GET /api/2fa/status
 * Get current 2FA status for the authenticated user
 */
router.get('/status', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({
            enabled: user.twoFactorEnabled || false,
            hasBackupCodes: !!user.twoFactorBackupCodes,
        });
    }
    catch (error) {
        console.error('2FA status error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * POST /api/2fa/setup
 * Initialize 2FA setup - generates secret and QR code
 */
router.post('/setup', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Don't allow setup if already enabled
        if (user.twoFactorEnabled) {
            return res.status(400).json({ error: '2FA is already enabled' });
        }
        // Generate new 2FA secret and QR code
        const twoFactorData = await (0, twoFactor_1.generateTwoFactorSecret)(user.username);
        // Temporarily store the secret (will be confirmed on verification)
        // We don't enable 2FA yet - user must verify first
        await storage_1.storage.updateUser(user.id, {
            twoFactorSecret: twoFactorData.secret,
            twoFactorEnabled: false, // Not enabled until verified
        });
        res.json({
            qrCodeUrl: twoFactorData.qrCodeUrl,
            secret: twoFactorData.secret, // Allow manual entry if QR scan fails
            backupCodes: twoFactorData.backupCodes,
        });
    }
    catch (error) {
        console.error('2FA setup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * POST /api/2fa/verify
 * Verify and enable 2FA with a token
 */
router.post('/verify', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { token, backupCodes } = req.body;
        if (!token) {
            return res.status(400).json({ error: '2FA token is required' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.twoFactorSecret) {
            return res.status(400).json({ error: '2FA setup not initialized' });
        }
        // Verify the token
        const isValid = (0, twoFactor_1.verifyTwoFactorToken)(user.twoFactorSecret, (0, validation_1.sanitizeInput)(token));
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid 2FA token' });
        }
        // Hash backup codes for secure storage
        const hashedBackupCodes = backupCodes
            ? JSON.stringify((0, twoFactor_1.hashBackupCodes)(backupCodes))
            : null;
        // Enable 2FA
        await storage_1.storage.updateUser(user.id, {
            twoFactorEnabled: true,
            twoFactorBackupCodes: hashedBackupCodes,
        });
        res.json({
            message: '2FA enabled successfully',
            enabled: true,
        });
    }
    catch (error) {
        console.error('2FA verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * POST /api/2fa/disable
 * Disable 2FA (requires current password and 2FA token)
 */
router.post('/disable', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { password, token } = req.body;
        if (!password || !token) {
            return res.status(400).json({ error: 'Password and 2FA token are required' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.twoFactorEnabled) {
            return res.status(400).json({ error: '2FA is not enabled' });
        }
        // Verify password
        const bcrypt = require('bcrypt');
        if (!user.passwordHash) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        // Verify 2FA token
        if (!user.twoFactorSecret) {
            return res.status(400).json({ error: '2FA secret not found' });
        }
        const isValid = (0, twoFactor_1.verifyTwoFactorToken)(user.twoFactorSecret, (0, validation_1.sanitizeInput)(token));
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid 2FA token' });
        }
        // Disable 2FA
        await storage_1.storage.updateUser(user.id, {
            twoFactorEnabled: false,
            twoFactorSecret: null,
            twoFactorBackupCodes: null,
        });
        res.json({
            message: '2FA disabled successfully',
            enabled: false,
        });
    }
    catch (error) {
        console.error('2FA disable error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * POST /api/2fa/verify-login
 * Verify 2FA token during login (called after successful password auth)
 */
router.post('/verify-login', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { token, isBackupCode } = req.body;
        if (!token) {
            return res.status(400).json({ error: '2FA token is required' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.twoFactorEnabled || !user.twoFactorSecret) {
            return res.status(400).json({ error: '2FA is not enabled' });
        }
        let isValid = false;
        if (isBackupCode) {
            // Verify backup code
            if (!user.twoFactorBackupCodes) {
                return res.status(400).json({ error: 'No backup codes available' });
            }
            const hashedCodes = JSON.parse(user.twoFactorBackupCodes);
            isValid = (0, twoFactor_1.verifyBackupCode)((0, validation_1.sanitizeInput)(token), hashedCodes);
            if (isValid) {
                // Remove used backup code
                const updatedCodes = (0, twoFactor_1.removeUsedBackupCode)((0, validation_1.sanitizeInput)(token), hashedCodes);
                await storage_1.storage.updateUser(user.id, {
                    twoFactorBackupCodes: JSON.stringify(updatedCodes),
                });
            }
        }
        else {
            // Verify TOTP token
            isValid = (0, twoFactor_1.verifyTwoFactorToken)(user.twoFactorSecret, (0, validation_1.sanitizeInput)(token));
        }
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid 2FA token' });
        }
        res.json({
            message: '2FA verification successful',
            verified: true,
        });
    }
    catch (error) {
        console.error('2FA login verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * POST /api/2fa/regenerate-backup-codes
 * Generate new backup codes (requires 2FA token)
 */
router.post('/regenerate-backup-codes', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: '2FA token is required' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.twoFactorEnabled || !user.twoFactorSecret) {
            return res.status(400).json({ error: '2FA is not enabled' });
        }
        // Verify 2FA token
        const isValid = (0, twoFactor_1.verifyTwoFactorToken)(user.twoFactorSecret, (0, validation_1.sanitizeInput)(token));
        if (!isValid) {
            return res.status(401).json({ error: 'Invalid 2FA token' });
        }
        // Generate new backup codes
        const { generateBackupCodes } = require('../utils/twoFactor');
        const newBackupCodes = generateBackupCodes(8);
        const hashedBackupCodes = (0, twoFactor_1.hashBackupCodes)(newBackupCodes);
        // Update user with new backup codes
        await storage_1.storage.updateUser(user.id, {
            twoFactorBackupCodes: JSON.stringify(hashedBackupCodes),
        });
        res.json({
            message: 'Backup codes regenerated successfully',
            backupCodes: newBackupCodes,
        });
    }
    catch (error) {
        console.error('Backup code regeneration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;
//# sourceMappingURL=twoFactor.js.map