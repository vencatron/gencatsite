# Authentication System Guide

**Generation Catalyst Estate Planning - JWT Authentication Flow**

This guide provides a brief technical overview of the JWT-based authentication system.

---

## Architecture Overview

The authentication system uses **JWT (JSON Web Tokens)** with dual-token approach:

- **Access Token:** Short-lived (15 minutes), sent in request headers
- **Refresh Token:** Long-lived (7 days), stored in httpOnly cookies

**Security Model:** Bearer token authentication with bcrypt password hashing (10 rounds)

---

## Token Types

### Access Token

**Purpose:** Authenticate API requests
**Storage:** Client-side (memory/state, not localStorage)
**Lifetime:** 15 minutes (configurable via `JWT_ACCESS_EXPIRATION`)
**Format:** JWT signed with `JWT_ACCESS_SECRET`

**Payload:**
```json
{
  "userId": 123,
  "email": "user@example.com",
  "role": "client",
  "iat": 1705000000,
  "exp": 1705000900
}
```

**Usage:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Refresh Token

**Purpose:** Obtain new access tokens without re-login
**Storage:** httpOnly cookie (secure, not accessible via JavaScript)
**Lifetime:** 7 days (configurable via `JWT_REFRESH_EXPIRATION`)
**Format:** JWT signed with `JWT_REFRESH_SECRET`

**Payload:**
```json
{
  "userId": 123,
  "email": "user@example.com",
  "role": "client",
  "isRefreshToken": true,
  "iat": 1705000000,
  "exp": 1705604800
}
```

**Cookie Settings:**
```javascript
{
  httpOnly: true,              // Not accessible via JS
  secure: production,          // HTTPS only in production
  sameSite: 'lax',            // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
}
```

---

## Authentication Flow

### 1. Registration Flow

```
User → POST /api/auth/register
  ↓
Server validates input (username, email, password)
  ↓
Server checks for existing user
  ↓
Password hashed with bcrypt (10 rounds)
  ↓
Email verification token generated (24-hour expiry)
  ↓
User record created (emailVerified: false)
  ↓
Verification email sent
  ↓
Server generates access + refresh tokens
  ↓
Response: { user, accessToken } + refreshToken cookie
```

**Key Points:**
- Email verification required before full access
- Auto-login after registration (with verification reminder)
- Password requirements validated (`validatePassword()`)
- All inputs sanitized (`sanitizeInput()`)

---

### 2. Email Verification Flow

```
User clicks email link → GET /api/auth/verify-email?token=...
  ↓
Server finds user by verification token
  ↓
Check token not expired (< 24 hours)
  ↓
Update: emailVerified = true, clear verification token
  ↓
Generate access + refresh tokens
  ↓
Response: { user, accessToken, autoLogin: true } + cookie
```

**Result:** User automatically logged in after verification

---

### 3. Login Flow (Standard)

```
User → POST /api/auth/login (username/email + password)
  ↓
Server finds user by username or email
  ↓
Check user.isActive = true
  ↓
Verify password: bcrypt.compare(password, user.passwordHash)
  ↓
Check user.emailVerified = true
  ↓
Check if 2FA enabled → If yes, return tempToken
  ↓
If no 2FA: Generate access + refresh tokens
  ↓
Update user.lastLoginAt
  ↓
Response: { user, accessToken } + refreshToken cookie
```

**Security Checks:**
1. Account active
2. Password correct
3. Email verified
4. 2FA verification (if enabled)

---

### 4. Login Flow (With 2FA)

```
User → POST /api/auth/login
  ↓
Server detects user.twoFactorEnabled = true
  ↓
Response: { requires2FA: true, tempToken, userId }
  ↓
User → POST /api/auth/verify-2fa (userId + 6-digit code)
  ↓
Server verifies TOTP token or backup code
  ↓
If backup code used, remove from backup codes list
  ↓
Generate full access + refresh tokens
  ↓
Update user.lastLoginAt
  ↓
Response: { user, accessToken } + refreshToken cookie
```

**2FA Methods:**
- **TOTP:** 6-digit time-based code (Google Authenticator, Authy)
- **Backup Codes:** One-time use codes (hashed, removed after use)

---

### 5. Token Refresh Flow

```
Client detects access token expired (401 error)
  ↓
Client → POST /api/auth/refresh (with refreshToken cookie)
  ↓
Server verifies refresh token signature + expiry
  ↓
Extract userId from refresh token payload
  ↓
Fetch user from database
  ↓
Check user.isActive = true
  ↓
Generate new access token + new refresh token
  ↓
Response: { accessToken } + new refreshToken cookie
```

**Auto-Refresh Strategy:**
- Frontend intercepts 401 responses
- Automatically calls `/auth/refresh`
- Retries original request with new token
- Seamless UX (no visible re-login)

---

### 6. Logout Flow

```
User → POST /api/auth/logout
  ↓
Server clears refreshToken cookie
  ↓
Response: { message: "Logout successful" }
  ↓
Client discards access token from memory
```

**Note:** Access tokens remain valid until expiry (15 min max)

---

### 7. Password Reset Flow

```
User → POST /api/auth/forgot-password (email)
  ↓
Server finds user by email
  ↓
Generate password reset token (1-hour expiry)
  ↓
Store: passwordResetToken, passwordResetExpires
  ↓
Send password reset email
  ↓
Response: Generic success message (security)

User clicks email link → Frontend form
  ↓
User → POST /api/auth/reset-password (token + newPassword)
  ↓
Server finds user by reset token
  ↓
Check token not expired (< 1 hour)
  ↓
Validate new password requirements
  ↓
Hash new password with bcrypt
  ↓
Update passwordHash, clear reset token
  ↓
Generate access + refresh tokens (auto-login)
  ↓
Response: { user, accessToken } + refreshToken cookie
```

**Security Features:**
- Generic response (doesn't reveal if email exists)
- Short token expiry (1 hour)
- Auto-login after successful reset

---

## Password Security

### Hashing Algorithm

**Library:** `bcrypt`
**Rounds:** 10 (configurable via `BCRYPT_ROUNDS`)

**Registration/Reset:**
```javascript
const passwordHash = await bcrypt.hash(password, 10);
```

**Login Verification:**
```javascript
const isValid = await bcrypt.compare(password, user.passwordHash);
```

### Password Requirements

Validated by `validatePassword()` function:

```javascript
{
  valid: boolean,
  errors: string[]
}
```

**Minimum Requirements:**
- 8 characters minimum
- Additional complexity rules as needed

---

## Middleware Authentication

### `authenticateToken` Middleware

**Location:** `server/middleware/auth.ts`

**Flow:**
```
Request → Extract Authorization header
  ↓
Parse: "Bearer {token}"
  ↓
Verify token with JWT_ACCESS_SECRET
  ↓
Decode payload → attach to req.user
  ↓
Call next() → Proceed to route handler
```

**Error Responses:**
- `401`: Token missing or expired
- `403`: Token invalid or malformed

**Usage:**
```typescript
router.get('/profile', authenticateToken, async (req: AuthRequest, res) => {
  const userId = req.user!.userId;  // Available after middleware
  // ... route logic
});
```

---

### `authorizeRole` Middleware

**Purpose:** Role-based access control

**Usage:**
```typescript
router.delete('/users/:id',
  authenticateToken,
  authorizeRole(['admin']),
  async (req, res) => {
    // Only admin users reach here
  }
);
```

---

### `requireAdmin` Middleware

**Purpose:** Shorthand for admin-only routes

**Usage:**
```typescript
router.post('/invoices', authenticateToken, requireAdmin, handler);
```

---

## Security Best Practices

### Token Storage

**✅ Correct:**
- Access token: React state/memory (not localStorage)
- Refresh token: httpOnly cookie only

**❌ Incorrect:**
- Access token in localStorage (XSS vulnerable)
- Refresh token in localStorage (XSS vulnerable)
- Tokens in sessionStorage (still XSS vulnerable)

---

### Environment Variables

**Required:**
```bash
JWT_ACCESS_SECRET=your-strong-random-secret
JWT_REFRESH_SECRET=different-strong-random-secret
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

**Defaults (Development Only):**
```javascript
ACCESS_SECRET = 'dev_access_secret_change_in_production'
REFRESH_SECRET = 'dev_refresh_secret_change_in_production'
```

**⚠️ WARNING:** Never use default secrets in production!

---

### CORS Configuration

**Allowed Origins:**
- `localhost:*` (development)
- `*.replit.dev` (Replit hosting)
- `*.replit.app` (Replit hosting)
- `*.repl.co` (Replit legacy)

**Credentials:** Enabled (`credentials: true`) for cookie support

---

### Input Validation

All auth endpoints use:

1. **Email Validation:** `validateEmail(email)`
   - RFC 5322 compliant regex
   - Case-insensitive comparison

2. **Username Validation:** `validateUsername(username)`
   - Length, character restrictions
   - No special characters (configurable)

3. **Input Sanitization:** `sanitizeInput(string)`
   - Remove potentially dangerous characters
   - Prevent XSS and SQL injection

4. **Password Validation:** `validatePassword(password)`
   - Minimum length enforcement
   - Complexity requirements

---

## Two-Factor Authentication (2FA)

### Setup Flow

```
User enables 2FA in settings
  ↓
Server generates TOTP secret
  ↓
Server generates QR code (data URL)
  ↓
User scans with authenticator app
  ↓
User enters verification code
  ↓
Server validates code with secret
  ↓
Generate backup codes (hashed)
  ↓
Update: twoFactorEnabled = true, store secret + backup codes
```

### Login with 2FA

1. Standard login → Server returns `requires2FA: true`
2. Client prompts for 6-digit code
3. Client sends code to `/auth/verify-2fa`
4. Server verifies TOTP or backup code
5. Success → Full authentication tokens issued

### Backup Codes

- **Quantity:** 8-10 codes generated
- **Storage:** Hashed with bcrypt
- **Usage:** One-time use, removed after verification
- **Purpose:** Recovery if phone lost

---

## Error Handling

### Common Error Codes

**400 Bad Request:**
- Missing required fields
- Invalid email format
- Password doesn't meet requirements
- New password same as current

**401 Unauthorized:**
- Invalid credentials
- Access token missing/expired
- Current password incorrect
- Invalid 2FA token

**403 Forbidden:**
- Account deactivated (`isActive: false`)
- Email not verified
- Insufficient role permissions

**404 Not Found:**
- User not found
- Invalid verification/reset token

**409 Conflict:**
- Username already exists
- Email already registered
- Invoice number duplicate

**500 Internal Server Error:**
- Database errors
- JWT signing errors
- Bcrypt hashing errors

---

## Session Management

### Token Lifecycle

```
Registration/Login
  ↓
Access Token (15 min) + Refresh Token (7 days)
  ↓
Access Token Expires → Auto-refresh
  ↓
New Access Token (15 min) + New Refresh Token (7 days)
  ↓
Repeat until refresh token expires
  ↓
User must re-login
```

### Invalidation Strategies

**Logout:**
- Clear refresh token cookie
- Client discards access token
- Access token still valid until expiry (max 15 min)

**Account Deactivation:**
- Set `user.isActive = false`
- All auth endpoints reject requests
- Existing tokens remain valid until expiry

**Password Change:**
- Does not invalidate existing tokens
- Consider re-login for security

**Future Enhancement:** Token blacklist/revocation system

---

## API Integration Example

### Frontend Auth Context

```javascript
// Login
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password }),
  credentials: 'include'  // Important for cookies
});
const { accessToken, user } = await response.json();
setAccessToken(accessToken);  // Store in memory/state

// Authenticated Request
const response = await fetch('/api/documents', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  },
  credentials: 'include'
});

// Refresh Token
const response = await fetch('/api/auth/refresh', {
  method: 'POST',
  credentials: 'include'  // Sends refresh token cookie
});
const { accessToken } = await response.json();
setAccessToken(accessToken);

// Logout
await fetch('/api/auth/logout', {
  method: 'POST',
  credentials: 'include'
});
setAccessToken(null);
```

---

## Monitoring & Logging

**Logged Events:**
- Registration attempts
- Login attempts (success/failure)
- Password reset requests
- Token refresh operations
- 2FA verifications
- Account deactivations

**Log Format:**
```
[2025-01-10T12:00:00.000Z] - POST /api/auth/login
Login error: Invalid credentials
2FA verification error: Invalid 2FA token
```

**Security Monitoring:**
- Failed login attempts (potential brute force)
- Token expiration errors (potential replay attacks)
- Multiple password reset requests (account enumeration)

---

## Testing Authentication

### Manual Testing

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"password123"}' \
  -c cookies.txt

# Authenticated Request
curl http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer {accessToken}"

# Refresh
curl -X POST http://localhost:3001/api/auth/refresh \
  -b cookies.txt -c cookies.txt

# Logout
curl -X POST http://localhost:3001/api/auth/logout \
  -b cookies.txt
```

---

**Last Updated:** January 2025
**Security Audit:** Recommended quarterly
**Dependencies:** jsonwebtoken, bcrypt, cookie-parser
