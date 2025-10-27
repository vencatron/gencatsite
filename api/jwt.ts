// JWT utilities for Vercel serverless functions
import jwt from 'jsonwebtoken';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_in_production';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_in_production';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenUser {
  id: number;
  username: string;
  email: string;
  role: string | null;
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

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, REFRESH_SECRET);
}
