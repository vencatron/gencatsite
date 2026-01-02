import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { InsertUser } from '../../storage';

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
    } catch {
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
    } catch {
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
  } catch {
    throw new Error('INVALID_JSON');
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify admin authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = authHeader.substring(7);
    const { verifyAccessToken } = await import('../../jwt.js');
    const decoded = verifyAccessToken(token);

    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Parse request body
    let body: Record<string, unknown>;
    try {
      body = await parseRequestBody(req);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    const rawEmail = typeof body.email === 'string' ? body.email : '';
    const rawFirstName = typeof body.firstName === 'string' ? body.firstName : '';
    const rawLastName = typeof body.lastName === 'string' ? body.lastName : '';
    const rawPhoneNumber = typeof body.phoneNumber === 'string' ? body.phoneNumber : null;

    // Validate required fields
    if (!rawEmail || !rawFirstName || !rawLastName) {
      return res.status(400).json({ error: 'Email, first name, and last name are required' });
    }

    // Load dependencies
    const [{ storage }, validationModule] = await Promise.all([
      import('../../storage.js'),
      import('../../validation.js'),
    ]);
    const { sanitizeInput, validateEmail } = validationModule;

    // Sanitize inputs
    const sanitizedEmail = sanitizeInput(rawEmail).toLowerCase().trim();
    const firstName = sanitizeInput(rawFirstName).trim();
    const lastName = sanitizeInput(rawLastName).trim();
    const phoneNumber = rawPhoneNumber ? sanitizeInput(rawPhoneNumber).trim() : null;

    // Validate email
    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check for existing user
    const existingUser = await storage.getUserByEmail(sanitizedEmail);
    if (existingUser) {
      return res.status(400).json({ error: 'A client with this email already exists' });
    }

    // Generate username from email
    const username = sanitizedEmail.split('@')[0] + '_' + Date.now().toString(36);

    // Create client record (no password needed for invoice-only clients)
    const newUser: InsertUser = {
      username,
      email: sanitizedEmail,
      passwordHash: null, // No login required
      firstName,
      lastName,
      phoneNumber,
      role: 'client',
      isActive: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await storage.createUser(newUser);

    // Remove sensitive data from response
    const { passwordHash: _, twoFactorSecret, twoFactorBackupCodes, ...userResponse } = user;

    return res.status(201).json({
      message: `Client ${firstName} ${lastName} created successfully`,
      user: userResponse
    });
  } catch (error) {
    console.error('Admin create client error:', error);
    return res.status(500).json({ error: 'Internal server error creating client' });
  }
}
