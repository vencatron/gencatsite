// Two-factor authentication utilities for Vercel serverless functions
import speakeasy from 'speakeasy';
import bcrypt from 'bcrypt';

export function generateTwoFactorSecret(username: string): {
  secret: string;
  qrCodeUrl: string;
} {
  const secret = speakeasy.generateSecret({
    name: `Generation Catalyst (${username})`,
    issuer: 'Generation Catalyst',
    length: 32,
  });

  return {
    secret: secret.base32,
    qrCodeUrl: secret.otpauth_url || '',
  };
}

export function verifyTwoFactorToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 2,
  });
}

export function generateBackupCodes(count: number = 10): {
  plain: string[];
  hashed: string[];
} {
  const plain: string[] = [];
  const hashed: string[] = [];

  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substr(2, 10).toUpperCase();
    plain.push(code);
    hashed.push(bcrypt.hashSync(code, 10));
  }

  return { plain, hashed };
}

export function verifyBackupCode(code: string, hashedCodes: string[]): boolean {
  for (const hashedCode of hashedCodes) {
    if (bcrypt.compareSync(code, hashedCode)) {
      return true;
    }
  }
  return false;
}

export function removeUsedBackupCode(code: string, hashedCodes: string[]): string[] {
  return hashedCodes.filter(hashedCode => !bcrypt.compareSync(code, hashedCode));
}
