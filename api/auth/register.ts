import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcrypt';
import { storage, type InsertUser } from '../_lib/storage';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../_lib/jwt';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  sanitizeInput
} from '../_lib/validation';

const BCRYPT_ROUNDS = 10;
// Fixed: Removed non-existent dateOfBirth field from storage interface

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, email, password, firstName, lastName, phoneNumber } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();

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
    const passwordValidation = validatePassword(password);
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

    const existingUserByEmail = await storage.getUserByEmail(sanitizedEmail);
    if (existingUserByEmail) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    // Create user
    const newUser: InsertUser = {
      username: sanitizedUsername,
      email: sanitizedEmail,
      passwordHash,
      firstName: firstName ? sanitizeInput(firstName) : null,
      lastName: lastName ? sanitizeInput(lastName) : null,
      phoneNumber: phoneNumber ? sanitizeInput(phoneNumber) : null,
      role: 'client',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await storage.createUser(newUser);

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token cookie
    res.setHeader('Set-Cookie', [
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${
        process.env.NODE_ENV === 'production' ? '; Secure' : ''
      }`,
    ]);

    // Return user without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    return res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error during registration' });
  }
}
