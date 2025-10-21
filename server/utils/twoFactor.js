"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTwoFactorSecret = generateTwoFactorSecret;
exports.verifyTwoFactorToken = verifyTwoFactorToken;
exports.generateBackupCodes = generateBackupCodes;
exports.hashBackupCodes = hashBackupCodes;
exports.verifyBackupCode = verifyBackupCode;
exports.removeUsedBackupCode = removeUsedBackupCode;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generate a new 2FA secret and QR code for user setup
 */
async function generateTwoFactorSecret(username, appName = 'Generation Catalyst') {
    // Generate secret
    const secret = speakeasy_1.default.generateSecret({
        name: `${appName} (${username})`,
        length: 32,
    });
    if (!secret.otpauth_url) {
        throw new Error('Failed to generate OTP auth URL');
    }
    // Generate QR code as data URL
    const qrCodeUrl = await qrcode_1.default.toDataURL(secret.otpauth_url);
    // Generate backup codes
    const backupCodes = generateBackupCodes(8);
    return {
        secret: secret.base32,
        qrCodeUrl,
        backupCodes,
    };
}
/**
 * Verify a 2FA token against a secret
 */
function verifyTwoFactorToken(secret, token) {
    return speakeasy_1.default.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window: 2, // Allow 2 time steps before/after for clock drift
    });
}
/**
 * Generate backup codes for 2FA recovery
 */
function generateBackupCodes(count = 8) {
    const codes = [];
    for (let i = 0; i < count; i++) {
        // Generate 8-character alphanumeric code
        const code = crypto_1.default.randomBytes(4).toString('hex').toUpperCase();
        codes.push(code);
    }
    return codes;
}
/**
 * Hash backup codes for secure storage
 */
function hashBackupCodes(codes) {
    return codes.map(code => crypto_1.default.createHash('sha256').update(code).digest('hex'));
}
/**
 * Verify a backup code against hashed codes
 */
function verifyBackupCode(code, hashedCodes) {
    const hashedInput = crypto_1.default.createHash('sha256').update(code).digest('hex');
    return hashedCodes.includes(hashedInput);
}
/**
 * Remove a used backup code from the list
 */
function removeUsedBackupCode(code, hashedCodes) {
    const hashedInput = crypto_1.default.createHash('sha256').update(code).digest('hex');
    return hashedCodes.filter(hash => hash !== hashedInput);
}
//# sourceMappingURL=twoFactor.js.map