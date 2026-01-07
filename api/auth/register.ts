import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import type { InsertUser } from '../storage';
import { applyRateLimit, AUTH_LIMIT } from '../utils/rateLimiter.js';

async function parseRequestBody(req: VercelRequest): Promise<Record<string, unknown>> {
  const { body } = req;

  if (body && typeof body === 'object' && !Buffer.isBuffer(body)) {
    return body as Record<string, unknown>;
  }

  if (typeof body === 'string') {
    if (!body.trim()) {
      return {};
    }

    try {
      return JSON.parse(body);
    } catch (error) {
      throw new Error('INVALID_JSON');
    }
  }

  const rawBody = (req as unknown as { rawBody?: unknown }).rawBody;
  if (rawBody) {
    const payload = Buffer.isBuffer(rawBody) ? rawBody.toString('utf8') : String(rawBody);
    if (!payload.trim()) {
      return {};
    }

    try {
      return JSON.parse(payload);
    } catch (error) {
      throw new Error('INVALID_JSON');
    }
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req as unknown as AsyncIterable<Buffer | string>) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  const payload = Buffer.concat(chunks).toString('utf8');
  if (!payload.trim()) {
    return {};
  }

  try {
    return JSON.parse(payload);
  } catch (error) {
    throw new Error('INVALID_JSON');
  }
}

const BCRYPT_ROUNDS = 10;
// Fixed: Removed non-existent dateOfBirth field from storage interface

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Apply rate limiting
  if (!applyRateLimit(req, res, AUTH_LIMIT)) {
    return; // Response already sent by applyRateLimit
  }

  const debugStages: string[] = [];
  const requestUrl = req.url ? new URL(req.url, `https://${req.headers.host ?? 'localhost'}`) : null;
  const debugMode = requestUrl?.searchParams.get('debug') === '1';

  try {
    let body: Record<string, unknown>;
    try {
      body = await parseRequestBody(req);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
    debugStages.push('parsed-body');

    const rawUsername = typeof body.username === 'string' ? body.username : '';
    const rawEmail = typeof body.email === 'string' ? body.email : '';
    const rawPassword = typeof body.password === 'string' ? body.password : '';
    const rawFirstName = typeof body.firstName === 'string' ? body.firstName : null;
    const rawLastName = typeof body.lastName === 'string' ? body.lastName : null;
    const rawPhoneNumber = typeof body.phoneNumber === 'string' ? body.phoneNumber : null;

    // Validate required fields
    if (!rawUsername || !rawEmail || !rawPassword) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    debugStages.push('validated-required');

    const [{ storage }, { generateAccessToken, generateRefreshToken }, validationModule, emailServiceModule] = await Promise.all([
      import('../storage.js'),
      import('../jwt.js'),
      import('../validation.js'),
      import('../../server/services/email.js'),
    ]);
    const { sanitizeInput, validateEmail, validatePassword, validateUsername } = validationModule;
    const { emailService } = emailServiceModule;
    debugStages.push('loaded-dependencies');

    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(rawUsername);
    const sanitizedEmail = sanitizeInput(rawEmail).toLowerCase();
    const firstName = rawFirstName ? sanitizeInput(rawFirstName) : null;
    const lastName = rawLastName ? sanitizeInput(rawLastName) : null;
    const phoneNumber = rawPhoneNumber ? sanitizeInput(rawPhoneNumber) : null;

    // Validate username
    const usernameValidation = validateUsername(sanitizedUsername);
    if (!usernameValidation.valid) {
      return res.status(400).json({ error: usernameValidation.error });
    }

    // Validate email
    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password
    const passwordValidation = validatePassword(rawPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({ 
        error: 'Password does not meet requirements',
        details: passwordValidation.errors 
      });
    }

    // Check for existing users
    const existingUserByUsername = await storage.getUserByUsername(sanitizedUsername);
    if (existingUserByUsername) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    debugStages.push('checked-username');

    const existingUserByEmail = await storage.getUserByEmail(sanitizedEmail);
    if (existingUserByEmail) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    debugStages.push('checked-email');

    // Hash password
    const passwordHash = await bcrypt.hash(rawPassword, BCRYPT_ROUNDS);
    debugStages.push('hashed-password');

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    debugStages.push('generated-verification-token');

    // Create user
    const newUser: InsertUser = {
      username: sanitizedUsername,
      email: sanitizedEmail,
      passwordHash,
      firstName,
      lastName,
      phoneNumber,
      role: 'client',
      isActive: true,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await storage.createUser(newUser);
    debugStages.push('created-user');

    // Send verification email (don't wait for it to complete)
    emailService.sendVerificationEmail(
      user.email,
      user.username,
      verificationToken
    ).catch(error => {
      console.error('Failed to send verification email:', error);
    });
    debugStages.push('sent-verification-email');

    // Return user without password and tokens
    // Note: We don't generate tokens or login the user until email is verified
    const { passwordHash: _, ...userWithoutPassword } = user;
    return res.status(201).json({
      message: 'Registration successful! Please check your email to verify your account.',
      user: userWithoutPassword,
      emailVerificationRequired: true,
      ...(debugMode ? { debugStages } : {}),
    });
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    return res.status(500).json({
      error: 'Internal server error during registration',
      details: error instanceof Error ? error.message : String(error),
      ...(debugMode ? { debugStages } : {}),
    });
  }
}
