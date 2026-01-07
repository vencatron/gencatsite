import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { User } from '../../shared/schema';

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  isRefreshToken: true;
}

// SECURITY: Fail fast if JWT secrets are not configured
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
  throw new Error('FATAL: JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in environment variables');
}

const ACCESS_EXPIRATION = process.env.JWT_ACCESS_EXPIRATION || '15m';
const REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';

export function generateAccessToken(user: User): string {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role || 'client',
  };

  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRATION,
  } as jwt.SignOptions);
}

export function generateRefreshToken(user: User): string {
  const payload: RefreshTokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role || 'client',
    isRefreshToken: true,
  };

  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRATION,
  } as jwt.SignOptions);
}

// Type guard to validate token payload structure
function isValidTokenPayload(payload: unknown): payload is TokenPayload {
  if (typeof payload !== 'object' || payload === null) return false;
  const obj = payload as Record<string, unknown>;
  return (
    typeof obj.userId === 'number' &&
    typeof obj.email === 'string' &&
    typeof obj.role === 'string'
  );
}

// Type guard to validate refresh token payload structure
function isValidRefreshTokenPayload(payload: unknown): payload is RefreshTokenPayload {
  if (!isValidTokenPayload(payload)) return false;
  const obj = payload as Record<string, unknown>;
  return obj.isRefreshToken === true;
}

export function verifyAccessToken(token: string): TokenPayload {
  const payload = jwt.verify(token, ACCESS_SECRET);
  if (!isValidTokenPayload(payload)) {
    throw new Error('Invalid access token payload structure');
  }
  return payload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const payload = jwt.verify(token, REFRESH_SECRET);
  if (!isValidRefreshTokenPayload(payload)) {
    throw new Error('Invalid refresh token payload structure');
  }
  return payload;
}

export function decodeToken(token: string): jwt.JwtPayload | null {
  const decoded = jwt.decode(token);
  if (decoded === null || typeof decoded === 'string') {
    return null;
  }
  return decoded;
}
