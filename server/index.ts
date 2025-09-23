import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
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

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BCRYPT_ROUNDS = 10;

// Middleware
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5173', process.env.FRONTEND_URL || 'http://localhost:5000'],
  credentials: true,
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

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user info and access token
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
      accessToken,
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

    // Update last login time
    await storage.updateUser(user.id, { lastLoginAt: new Date() });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in httpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user info and access token
    const { passwordHash: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
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
      sameSite: 'strict',
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

// Protected route example - Get all users (admin only)
app.get('/api/users', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // This is an example protected route
    res.json({ message: 'Admin route accessed successfully', userId: req.user.userId });
  } catch (error) {
    console.error('Error in protected route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Authentication server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Check for JWT secrets
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    console.warn('⚠️  WARNING: JWT secrets not found in environment variables!');
    console.warn('⚠️  Using default development secrets. Please set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in production.');
  }
});

export default app;