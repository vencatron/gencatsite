import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simple in-memory rate limiter for Vercel Edge/Serverless
// NOTE: In production with multiple instances, use @upstash/ratelimit with Upstash Redis
// This provides basic protection but won't be distributed across function instances

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store - works per-instance, provides basic protection
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

interface RateLimitConfig {
  windowMs: number;
  max: number;
  message?: string;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  message?: string;
}

function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }
  if (Array.isArray(forwarded)) {
    return forwarded[0] || 'unknown';
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function checkRateLimit(
  req: VercelRequest,
  config: RateLimitConfig
): RateLimitResult {
  const { windowMs, max, message } = config;
  const ip = getClientIP(req);
  const key = `${ip}:${req.url}`;
  const now = Date.now();

  let entry = rateLimitStore.get(key);

  // Create new entry if doesn't exist or window expired
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
  }

  entry.count++;
  rateLimitStore.set(key, entry);

  const remaining = Math.max(0, max - entry.count);
  const success = entry.count <= max;

  return {
    success,
    remaining,
    resetTime: entry.resetTime,
    message: success ? undefined : message || 'Too many requests',
  };
}

// Rate limit configurations
export const AUTH_LIMIT: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many authentication attempts, please try again after 15 minutes',
};

export const PASSWORD_RESET_LIMIT: RateLimitConfig = {
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 attempts
  message: 'Too many password reset requests, please try again after an hour',
};

export const EMAIL_VERIFICATION_LIMIT: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 attempts
  message: 'Too many verification email requests, please try again later',
};

export const TWO_FACTOR_LIMIT: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many 2FA verification attempts, please try again after 15 minutes',
};

// Helper to apply rate limiting and send response if exceeded
export function applyRateLimit(
  req: VercelRequest,
  res: VercelResponse,
  config: RateLimitConfig
): boolean {
  const result = checkRateLimit(req, config);

  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', config.max);
  res.setHeader('X-RateLimit-Remaining', result.remaining);
  res.setHeader('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000));

  if (!result.success) {
    res.setHeader('Retry-After', Math.ceil((result.resetTime - Date.now()) / 1000));
    res.status(429).json({
      error: 'Too many requests',
      message: result.message,
      retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000),
    });
    return false; // Request blocked
  }

  return true; // Request allowed
}
