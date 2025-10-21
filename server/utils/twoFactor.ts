import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';

export interface TwoFactorSetup {
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}

/**
 * Generate a new 2FA secret and QR code for user setup
 */
export async function generateTwoFactorSecret(
  username: string,
  appName: string = 'Generation Catalyst'
): Promise<TwoFactorSetup> {
  // Generate secret
  const secret = speakeasy.generateSecret({
    name: `${appName} (${username})`,
    length: 32,
  });

  if (!secret.otpauth_url) {
    throw new Error('Failed to generate OTP auth URL');
  }

  // Generate QR code as data URL
  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

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
export function verifyTwoFactorToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2, // Allow 2 time steps before/after for clock drift
  });
}

/**
 * Generate backup codes for 2FA recovery
 */
export function generateBackupCodes(count: number = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    // Generate 8-character alphanumeric code
    const code = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(code);
  }
  return codes;
}

/**
 * Hash backup codes for secure storage
 */
export function hashBackupCodes(codes: string[]): string[] {
  return codes.map(code =>
    crypto.createHash('sha256').update(code).digest('hex')
  );
}

/**
 * Verify a backup code against hashed codes
 */
export function verifyBackupCode(code: string, hashedCodes: string[]): boolean {
  const hashedInput = crypto.createHash('sha256').update(code).digest('hex');
  return hashedCodes.includes(hashedInput);
}

/**
 * Remove a used backup code from the list
 */
export function removeUsedBackupCode(code: string, hashedCodes: string[]): string[] {
  const hashedInput = crypto.createHash('sha256').update(code).digest('hex');
  return hashedCodes.filter(hash => hash !== hashedInput);
}
