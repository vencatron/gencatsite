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

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_in_production';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_in_production';
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

export function verifyAccessToken(token: string): TokenPayload {
  return jwt.verify(token, ACCESS_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): RefreshTokenPayload {
  const payload = jwt.verify(token, REFRESH_SECRET) as RefreshTokenPayload;
  if (!payload.isRefreshToken) {
    throw new Error('Invalid refresh token');
  }
  return payload;
}

export function decodeToken(token: string): jwt.JwtPayload | null {
  return jwt.decode(token) as jwt.JwtPayload | null;
}
