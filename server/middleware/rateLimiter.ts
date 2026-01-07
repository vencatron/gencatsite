import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Custom key generator that uses IP + optional user identifier
const keyGenerator = (req: Request): string => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const userId = (req as { user?: { userId: number } }).user?.userId;
  return userId ? `${ip}-${userId}` : ip;
};

// Rate limit response handler
const rateLimitHandler = (_req: Request, res: Response): void => {
  res.status(429).json({
    error: 'Too many requests',
    message: 'Please wait before trying again',
    retryAfter: res.getHeader('Retry-After'),
  });
};

// Auth endpoints: Strict limits for login/register (brute force protection)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many authentication attempts, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitHandler,
  skipSuccessfulRequests: false, // Count all requests, not just failed ones
});

// Password reset: Very strict (prevents email enumeration attacks)
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts per hour
  message: 'Too many password reset requests, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitHandler,
});

// Email verification resend: Moderate limits
export const emailVerificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 attempts per 15 minutes
  message: 'Too many verification email requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitHandler,
});

// 2FA verification: Strict limits (prevents brute force on TOTP codes)
export const twoFactorLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many 2FA verification attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitHandler,
});

// General API rate limiter (for authenticated endpoints)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests, please slow down',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator,
  handler: rateLimitHandler,
});
