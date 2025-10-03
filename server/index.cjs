"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const storage_1 = require("./storage");
const jwt_1 = require("./utils/jwt");
const validation_1 = require("./utils/validation");
const auth_1 = require("./middleware/auth");
// Import route modules
const documents_1 = __importDefault(require("./routes/documents"));
const messages_1 = __importDefault(require("./routes/messages"));
const invoices_1 = __importDefault(require("./routes/invoices"));
const users_1 = __importDefault(require("./routes/users"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const BCRYPT_ROUNDS = 10;
// Middleware - Configure CORS for Replit environment
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin)
            return callback(null, true);
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Request logging middleware
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});
// Mount API routes
app.use('/api/documents', documents_1.default);
app.use('/api/messages', messages_1.default);
app.use('/api/invoices', invoices_1.default);
app.use('/api/users', users_1.default);
// Authentication Routes
// POST /api/auth/register - User registration with password hashing
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phoneNumber } = req.body;
        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }
        // Sanitize inputs
        const sanitizedUsername = (0, validation_1.sanitizeInput)(username);
        const sanitizedEmail = (0, validation_1.sanitizeInput)(email).toLowerCase();
        // Validate username
        const usernameValidation = (0, validation_1.validateUsername)(sanitizedUsername);
        if (!usernameValidation.valid) {
            return res.status(400).json({ error: usernameValidation.error });
        }
        // Validate email
        if (!(0, validation_1.validateEmail)(sanitizedEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        // Validate password
        const passwordValidation = (0, validation_1.validatePassword)(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({
                error: 'Password does not meet requirements',
                details: passwordValidation.errors
            });
        }
        // Check if user already exists
        const existingUserByUsername = await storage_1.storage.getUserByUsername(sanitizedUsername);
        if (existingUserByUsername) {
            return res.status(409).json({ error: 'Username already exists' });
        }
        const existingUserByEmail = await storage_1.storage.getUserByEmail(sanitizedEmail);
        if (existingUserByEmail) {
            return res.status(409).json({ error: 'Email already registered' });
        }
        // Hash password
        const passwordHash = await bcrypt_1.default.hash(password, BCRYPT_ROUNDS);
        // Create user
        const newUser = {
            username: sanitizedUsername,
            email: sanitizedEmail,
            passwordHash,
            firstName: firstName ? (0, validation_1.sanitizeInput)(firstName) : null,
            lastName: lastName ? (0, validation_1.sanitizeInput)(lastName) : null,
            phoneNumber: phoneNumber ? (0, validation_1.sanitizeInput)(phoneNumber) : null,
            role: 'client',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const user = await storage_1.storage.createUser(newUser);
        // Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
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
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
});
// POST /api/auth/login - User login with JWT token generation
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // Validate input - either username or email is required
        if (!password || (!username && !email)) {
            return res.status(400).json({ error: 'Password and either username or email are required' });
        }
        // Find user by username or email
        let user;
        if (email) {
            const sanitizedEmail = (0, validation_1.sanitizeInput)(email).toLowerCase();
            user = await storage_1.storage.getUserByEmail(sanitizedEmail);
        }
        else if (username) {
            const sanitizedUsername = (0, validation_1.sanitizeInput)(username);
            user = await storage_1.storage.getUserByUsername(sanitizedUsername);
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
        const passwordMatch = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Update last login time
        await storage_1.storage.updateUser(user.id, { lastLoginAt: new Date() });
        // Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)(user);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user);
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
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
});
// POST /api/auth/logout - User logout
app.post('/api/auth/logout', (_req, res) => {
    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    res.json({ message: 'Logout successful' });
});
// GET /api/auth/me - Get current user info from JWT
app.get('/api/auth/me', auth_1.authenticateToken, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const user = await storage_1.storage.getUser(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.isActive) {
            return res.status(403).json({ error: 'Account is deactivated' });
        }
        // Return user info without password
        const { passwordHash: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
    }
    catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// POST /api/auth/refresh - Refresh JWT token
app.post('/api/auth/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ error: 'Refresh token not provided' });
        }
        // Verify refresh token
        let payload;
        try {
            payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
        }
        catch (error) {
            res.clearCookie('refreshToken');
            return res.status(401).json({ error: 'Invalid or expired refresh token' });
        }
        // Get user
        const user = await storage_1.storage.getUser(payload.userId);
        if (!user) {
            res.clearCookie('refreshToken');
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.isActive) {
            res.clearCookie('refreshToken');
            return res.status(403).json({ error: 'Account is deactivated' });
        }
        // Generate new tokens
        const newAccessToken = (0, jwt_1.generateAccessToken)(user);
        const newRefreshToken = (0, jwt_1.generateRefreshToken)(user);
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
    }
    catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ error: 'Internal server error during token refresh' });
    }
});
// Error handling middleware
app.use((err, _req, res, _next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});
// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server with API endpoints running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('Available API endpoints:');
    console.log('  - Authentication: /api/auth/*');
    console.log('  - Documents: /api/documents/*');
    console.log('  - Messages: /api/messages/*');
    console.log('  - Invoices: /api/invoices/*');
    console.log('  - User Profile: /api/users/*');
    // Check for JWT secrets
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
        console.warn('⚠️  WARNING: JWT secrets not found in environment variables!');
        console.warn('⚠️  Using default development secrets. Please set JWT_ACCESS_SECRET and JWT_REFRESH_SECRET in production.');
    }
});
exports.default = app;
//# sourceMappingURL=index.js.map