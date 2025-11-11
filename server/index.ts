import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { storage } from './storage';
import { User, InsertUser } from '../shared/schema';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  TokenPayload
} from './utils/jwt';
import {
  validateEmail,
  validatePassword,
  validateUsername,
  sanitizeInput
} from './utils/validation';
import { authenticateToken, AuthRequest } from './middleware/auth';
import { emailService } from './services/email';
import { MessagingWebSocketServer } from './websocket';

// S3 configuration validation
function validateS3Config(): void {
  const requiredVars = [
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_BUCKET_NAME',
    'AWS_REGION'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(`Missing required S3 environment variables: ${missing.join(', ')}`);
  }
}

// Import route modules
import documentsRouter from './routes/documents';
import messagesRouter from './routes/messages';
import invoicesRouter from './routes/invoices';
import usersRouter from './routes/users';
import twoFactorRouter from './routes/twoFactor';
import adminRouter from './routes/admin';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BCRYPT_ROUNDS = 10;

// Middleware - Configure CORS for Replit environment
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    // Allow localhost for development
    if (origin.startsWith('http://localhost:') || 
        origin.startsWith('https://localhost:')) {
      return callback(null, true);
    }
    
    // Allow Replit domains
    if (origin.includes('.replit.dev') || 
        origin.includes('.replit.app') ||
        origin.includes('.repl.co')) {
      return callback(null, true);
    }
    
    // Otherwise reject
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Mount API routes
app.use('/api/documents', documentsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/users', usersRouter);
app.use('/api/2fa', twoFactorRouter);
app.use('/api/admin', adminRouter);

// Authentication Routes

// POST /api/auth/register - User registration with password hashing
app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, phoneNumber } = req.body;

    // Input validation
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

    // Check if user already exists
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

    // Generate email verification token
    const verificationToken = emailService.generateVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24); // Token expires in 24 hours

    // Create user with email verification fields
    const newUser: InsertUser = {
      username: sanitizedUsername,
      email: sanitizedEmail,
      passwordHash,
      firstName: firstName ? sanitizeInput(firstName) : null,
      lastName: lastName ? sanitizeInput(lastName) : null,
      phoneNumber: phoneNumber ? sanitizeInput(phoneNumber) : null,
      role: 'client',
      isActive: true,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await storage.createUser(newUser);

    // Send verification email
    await emailService.sendVerificationEmail(sanitizedEmail, sanitizedUsername, verificationToken);

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' for better cross-origin support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user info and access token
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.status(201).json({
      message: 'User registered successfully. Please check your email to verify your account.',
      user: userWithoutPassword,
      accessToken,
      emailVerificationRequired: true,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

// POST /api/auth/login - User login with JWT token generation
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Validate input - either username or email is required
    if (!password || (!username && !email)) {
      return res.status(400).json({ error: 'Password and either username or email are required' });
    }

    // Find user by username or email
    let user: User | undefined;
    if (email) {
      const sanitizedEmail = sanitizeInput(email).toLowerCase();
      user = await storage.getUserByEmail(sanitizedEmail);
    } else if (username) {
      const sanitizedUsername = sanitizeInput(username);
      user = await storage.getUserByUsername(sanitizedUsername);
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Verify password
    if (!user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        error: 'Please verify your email address before logging in',
        emailNotVerified: true,
        email: user.email
      });
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Don't return full auth tokens yet - require 2FA verification first
      // Generate a temporary token that only allows 2FA verification
      const tempToken = generateAccessToken({ ...user, role: '2fa-pending' });

      return res.json({
        message: '2FA required',
        requires2FA: true,
        tempToken, // Temporary token for 2FA verification endpoint
        userId: user.id,
      });
    }

    // Update last login time
    await storage.updateUser(user.id, { lastLoginAt: new Date() });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' for better cross-origin support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user info and access token
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken,
      requires2FA: false,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// POST /api/auth/verify-2fa - Complete login after 2FA verification
app.post('/api/auth/verify-2fa', async (req: Request, res: Response) => {
  try {
    const { userId, token, isBackupCode } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ error: 'User ID and 2FA token are required' });
    }

    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.twoFactorEnabled || !user.twoFactorSecret) {
      return res.status(400).json({ error: '2FA is not enabled for this user' });
    }

    // Verify 2FA token
    const { verifyTwoFactorToken, verifyBackupCode, removeUsedBackupCode } = require('./utils/twoFactor');
    let isValid = false;

    if (isBackupCode) {
      if (!user.twoFactorBackupCodes) {
        return res.status(400).json({ error: 'No backup codes available' });
      }
      const hashedCodes = JSON.parse(user.twoFactorBackupCodes);
      isValid = verifyBackupCode(sanitizeInput(token), hashedCodes);

      if (isValid) {
        const updatedCodes = removeUsedBackupCode(sanitizeInput(token), hashedCodes);
        await storage.updateUser(user.id, {
          twoFactorBackupCodes: JSON.stringify(updatedCodes),
        });
      }
    } else {
      isValid = verifyTwoFactorToken(user.twoFactorSecret, sanitizeInput(token));
    }

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid 2FA token' });
    }

    // 2FA verified - update last login and generate full auth tokens
    await storage.updateUser(user.id, { lastLoginAt: new Date() });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' for better cross-origin support
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({
      message: '2FA verification successful',
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    console.error('2FA verification error:', error);
    res.status(500).json({ error: 'Internal server error during 2FA verification' });
  }
});

// POST /api/auth/logout - User logout
app.post('/api/auth/logout', (_req: Request, res: Response) => {
  // Clear refresh token cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ message: 'Logout successful' });
});

// GET /api/auth/me - Get current user info from JWT
app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await storage.getUser(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Return user info without password
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/refresh - Refresh JWT token
app.post('/api/auth/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token not provided' });
    }

    // Verify refresh token
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      res.clearCookie('refreshToken');
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

    // Get user
    const user = await storage.getUser(payload.userId);
    if (!user) {
      res.clearCookie('refreshToken');
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isActive) {
      res.clearCookie('refreshToken');
      return res.status(403).json({ error: 'Account is deactivated' });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Set new refresh token in httpOnly cookie
    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' for better cross-origin support
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: 'Token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Internal server error during token refresh' });
  }
});

// GET /api/auth/verify-email - Verify email with token
app.get('/api/auth/verify-email', async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    // Find user by verification token
    const user = await storage.getUserByEmailVerificationToken(token);

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired verification token' });
    }

    // Check if token has expired
    if (user.emailVerificationExpires && new Date() > user.emailVerificationExpires) {
      return res.status(400).json({ error: 'Verification token has expired' });
    }

    // Mark email as verified
    await storage.updateUser(user.id, {
      emailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null,
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    });

    // Auto-login: Generate tokens for the user
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user info and access token for auto-login
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Email verified successfully',
      emailVerified: true,
      user: userWithoutPassword,
      accessToken,
      autoLogin: true,
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Internal server error during email verification' });
  }
});

// POST /api/auth/resend-verification - Resend verification email
app.post('/api/auth/resend-verification', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Sanitize and validate email
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    if (!validateEmail(sanitizedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Find user by email
    const user = await storage.getUserByEmail(sanitizedEmail);

    if (!user) {
      // Don't reveal if email exists for security
      return res.json({ message: 'If the email exists, a verification email has been sent' });
    }

    // Check if already verified
    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = emailService.generateVerificationToken();
    const verificationExpires = new Date();
    verificationExpires.setHours(verificationExpires.getHours() + 24); // Token expires in 24 hours

    // Update user with new token
    await storage.updateUser(user.id, {
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      updatedAt: new Date(),
    });

    // Send verification email
    await emailService.sendVerificationEmail(sanitizedEmail, user.username, verificationToken);

    res.json({
      message: 'Verification email has been sent',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// POST /api/auth/forgot-password - Request password reset
app.post('/api/auth/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const sanitizedEmail = sanitizeInput(email).toLowerCase();

    // Validate email format
    const isValidEmail = validateEmail(sanitizedEmail);
    if (!isValidEmail) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Find user by email
    const user = await storage.getUserByEmail(sanitizedEmail);

    // Always return success even if user doesn't exist (security best practice)
    if (!user) {
      return res.json({
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.json({
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Generate password reset token
    const resetToken = emailService.generateVerificationToken();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // Token expires in 1 hour

    // Update user with reset token
    await storage.updateUser(user.id, {
      passwordResetToken: resetToken,
      passwordResetExpires: resetExpires,
      updatedAt: new Date(),
    });

    // Send password reset email
    await emailService.sendPasswordResetEmail(sanitizedEmail, user.username, resetToken);

    res.json({
      message: 'If an account exists with this email, a password reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Internal server error processing password reset request' });
  }
});

// POST /api/auth/reset-password - Reset password with token
app.post('/api/auth/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required' });
    }

    // Validate password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        error: 'Password does not meet requirements',
        details: passwordValidation.errors
      });
    }

    // Find user by reset token
    const user = await storage.getUserByPasswordResetToken(token);

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    // Check if token is expired
    if (user.passwordResetExpires && new Date() > user.passwordResetExpires) {
      return res.status(400).json({ error: 'Password reset token has expired' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    // Update user password and clear reset token
    await storage.updateUser(user.id, {
      passwordHash: hashedPassword,
      passwordResetToken: null,
      passwordResetExpires: null,
      updatedAt: new Date(),
    });

    // Generate new tokens for auto-login
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return success with tokens for auto-login
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Password has been reset successfully',
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Internal server error resetting password' });
  }
});

// Create HTTP server and attach WebSocket server
const httpServer = createServer(app);
const wsServer = new MessagingWebSocketServer(httpServer);

// Start server
httpServer.listen(PORT, () => {
  console.log(`Backend server with API endpoints running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Available API endpoints:');
  console.log('  - Authentication: /api/auth/*');
  console.log('  - Two-Factor Auth: /api/2fa/*');
  console.log('  - Documents: /api/documents/*');
  console.log('  - Messages: /api/messages/*');
  console.log('  - Invoices: /api/invoices/*');
  console.log('  - User Profile: /api/users/*');
  console.log('  - Admin: /api/admin/*');
  console.log('  - WebSocket: ws://localhost:' + PORT + '/ws/messages');

  // Check for JWT secrets
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    console.warn('⚠️  WARNING: JWT secrets not found in environment variables!');
    console.warn('⚠️  Using default development secrets. Please set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in production.');
  }

  // Validate S3 configuration
  try {
    validateS3Config();
    console.log('✓ S3 document storage configured successfully');
  } catch (error) {
    console.error('⚠️  WARNING: S3 configuration incomplete!');
    console.error('⚠️  Document uploads will fail until AWS credentials are set.');
    console.error('   Error:', error instanceof Error ? error.message : 'Unknown error');
  }
});

export default app;