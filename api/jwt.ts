// JWT utilities for Vercel serverless functions
import jwt from 'jsonwebtoken';

// SECURITY: Fail fast if JWT secrets are not configured
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error('FATAL: JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in environment variables');
}

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenUser {
  id: number;
  username: string;
  email: string;
  role: string | null;
}

// Decoded token payload types for type-safe verification
export interface DecodedAccessToken {
  userId: number;
  username: string;
  email: string;
  role: string | null;
  iat: number;
  exp: number;
}

export interface DecodedRefreshToken {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

export function generateAccessToken(user: TokenUser): string {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

export function generateRefreshToken(user: TokenUser): string {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

// Type guard to validate decoded access token structure
function isValidAccessTokenPayload(payload: unknown): payload is DecodedAccessToken {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return (
    typeof obj.userId === 'number' &&
    typeof obj.username === 'string' &&
    typeof obj.email === 'string' &&
    (obj.role === null || typeof obj.role === 'string') &&
    typeof obj.iat === 'number' &&
    typeof obj.exp === 'number'
  );
}

// Type guard to validate decoded refresh token structure
function isValidRefreshTokenPayload(payload: unknown): payload is DecodedRefreshToken {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return (
    typeof obj.userId === 'number' &&
    typeof obj.username === 'string' &&
    typeof obj.iat === 'number' &&
    typeof obj.exp === 'number'
  );
}

export function verifyAccessToken(token: string): DecodedAccessToken {
  const payload = jwt.verify(token, ACCESS_SECRET);
  if (!isValidAccessTokenPayload(payload)) {
    throw new Error('Invalid access token payload structure');
  }
  return payload;
}

export function verifyRefreshToken(token: string): DecodedRefreshToken {
  const payload = jwt.verify(token, REFRESH_SECRET);
  if (!isValidRefreshTokenPayload(payload)) {
    throw new Error('Invalid refresh token payload structure');
  }
  return payload;
}
