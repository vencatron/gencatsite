# API Endpoints Guide

**Generation Catalyst Estate Planning Portal - REST API Reference**

This guide provides a brief overview of all available API endpoints for the Generation Catalyst estate planning client portal.

---

## Base URL

**Development:** `http://localhost:3001/api`
**Production:** Configured via environment

---

## Authentication Endpoints

### POST `/auth/register`
Create new user account with email verification.

**Request:**
```json
{
  "username": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 8 chars)",
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": { ...userObject },
  "accessToken": "jwt-token",
  "emailVerificationRequired": true
}
```

**Sets Cookie:** `refreshToken` (httpOnly, 7 days)

---

### POST `/auth/login`
Authenticate user and receive JWT tokens.

**Request:**
```json
{
  "username": "string (or email)",
  "email": "string (or username)",
  "password": "string (required)"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": { ...userObject },
  "accessToken": "jwt-token",
  "requires2FA": false
}
```

**2FA Response (200):**
```json
{
  "message": "2FA required",
  "requires2FA": true,
  "tempToken": "temporary-token",
  "userId": 123
}
```

---

### POST `/auth/verify-2fa`
Complete login after 2FA token verification.

**Request:**
```json
{
  "userId": "number (required)",
  "token": "string (required, 6-digit code)",
  "isBackupCode": "boolean"
}
```

---

### POST `/auth/logout`
Clear refresh token cookie.

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

### GET `/auth/me`
Get current authenticated user info.

**Headers:** `Authorization: Bearer {accessToken}`

**Response (200):**
```json
{
  "user": { ...userObject }
}
```

---

### POST `/auth/refresh`
Refresh expired access token using refresh token cookie.

**Response (200):**
```json
{
  "message": "Token refreshed successfully",
  "accessToken": "new-jwt-token"
}
```

---

### GET `/auth/verify-email`
Verify email address with token from email link.

**Query Params:** `token=verification-token`

**Response (200):**
```json
{
  "message": "Email verified successfully",
  "emailVerified": true,
  "user": { ...userObject },
  "accessToken": "jwt-token",
  "autoLogin": true
}
```

---

### POST `/auth/resend-verification`
Resend email verification link.

**Request:**
```json
{
  "email": "string (required)"
}
```

---

### POST `/auth/forgot-password`
Request password reset link via email.

**Request:**
```json
{
  "email": "string (required)"
}
```

---

### POST `/auth/reset-password`
Reset password with token from email.

**Request:**
```json
{
  "token": "string (required)",
  "newPassword": "string (required, min 8 chars)"
}
```

**Response (200):**
```json
{
  "message": "Password has been reset successfully",
  "user": { ...userObject },
  "accessToken": "jwt-token"
}
```

---

## Document Endpoints

**All routes require authentication header:** `Authorization: Bearer {accessToken}`

### GET `/documents`
List all user documents.

**Response (200):**
```json
{
  "success": true,
  "documents": [
    {
      "id": 1,
      "userId": 123,
      "name": "estate-plan.pdf",
      "type": "application/pdf",
      "size": 524288,
      "uploadedAt": "2025-01-10T12:00:00Z",
      "category": "estate",
      "description": "Primary estate planning document",
      "tags": "legal,estate",
      "status": "active"
    }
  ],
  "count": 1
}
```

---

### POST `/documents`
Upload new document (multipart/form-data).

**Form Fields:**
- `file`: File (required, max 50MB)
- `category`: string (optional)
- `description`: string (optional)
- `tags`: string (optional)

**Allowed Types:** PDF, Word, Excel, PowerPoint, images, text, CSV, ZIP

**Response (201):**
```json
{
  "success": true,
  "message": "File uploaded successfully",
  "document": { ...documentObject }
}
```

---

### GET `/documents/:id`
Get specific document metadata.

**Response (200):**
```json
{
  "success": true,
  "document": { ...documentObject }
}
```

---

### GET `/documents/:id/download`
Generate temporary S3 signed download URL (1 hour expiry).

**Response (200):**
```json
{
  "success": true,
  "downloadUrl": "https://s3-signed-url...",
  "filename": "estate-plan.pdf",
  "expiresIn": 3600
}
```

---

### PUT `/documents/:id`
Update document metadata.

**Request:**
```json
{
  "name": "string",
  "category": "string",
  "description": "string",
  "tags": "string",
  "status": "active | archived"
}
```

---

### DELETE `/documents/:id`
Delete document (soft delete in DB + S3 deletion).

**Response (200):**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

---

## Message Endpoints

**All routes require authentication**

### GET `/messages`
List user messages with pagination.

**Query Params:**
- `page`: number (default: 1)
- `limit`: number (default: 20, max: 100)

**Response (200):**
```json
{
  "success": true,
  "messages": [
    {
      "id": 1,
      "userId": 123,
      "from": "user | support",
      "text": "Message content",
      "isRead": false,
      "createdAt": "2025-01-10T12:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  },
  "unreadCount": 5
}
```

---

### POST `/messages`
Send new message to support.

**Request:**
```json
{
  "recipientId": "number (optional)",
  "subject": "string (optional)",
  "content": "string (required)",
  "priority": "low | normal | high | urgent",
  "threadId": "number (optional)",
  "attachmentIds": "string (optional)"
}
```

---

### PUT `/messages/:id/read`
Mark message as read (recipient only).

---

### DELETE `/messages/:id`
Delete message (soft delete).

---

## Invoice Endpoints

**All routes require authentication**

### GET `/invoices`
List user invoices with statistics.

**Response (200):**
```json
{
  "success": true,
  "invoices": [ ...invoiceArray ],
  "stats": {
    "total": 10,
    "pending": 3,
    "paid": 7,
    "overdue": 0,
    "cancelled": 0,
    "totalAmount": 5000.00,
    "paidAmount": 3500.00
  }
}
```

---

### GET `/invoices/:id`
Get specific invoice details.

**Response (200):**
```json
{
  "success": true,
  "invoice": {
    "id": 1,
    "userId": 123,
    "invoiceNumber": "INV-2025-001",
    "amount": "1000.00",
    "tax": "80.00",
    "totalAmount": "1080.00",
    "status": "pending",
    "dueDate": "2025-02-10T00:00:00Z",
    "lineItems": [
      {
        "description": "Estate planning consultation",
        "quantity": 1,
        "unitPrice": "1000.00"
      }
    ]
  }
}
```

---

### PUT `/invoices/:id/status`
Update invoice status.

**Request:**
```json
{
  "status": "pending | paid | overdue | cancelled",
  "paymentMethod": "string (optional)",
  "paymentDate": "ISO date (optional)",
  "notes": "string (optional)"
}
```

---

### POST `/invoices`
Create new invoice (admin only).

**Request:**
```json
{
  "userId": "number (required)",
  "invoiceNumber": "string (required)",
  "amount": "decimal (required)",
  "tax": "decimal (optional)",
  "description": "string (optional)",
  "lineItems": "array (optional)",
  "dueDate": "ISO date (required)"
}
```

---

## User Profile Endpoints

**All routes require authentication**

### GET `/users/profile`
Get current user profile.

**Response (200):**
```json
{
  "success": true,
  "profile": { ...userObject (without passwordHash) }
}
```

---

### PUT `/users/profile`
Update user profile.

**Request:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "phoneNumber": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "zipCode": "string"
}
```

---

### PUT `/users/password`
Change user password.

**Request:**
```json
{
  "currentPassword": "string (required)",
  "newPassword": "string (required)",
  "confirmPassword": "string (required)"
}
```

---

### GET `/users`
List all users (admin only).

---

### PUT `/users/:id/status`
Activate/deactivate user account (admin only).

**Request:**
```json
{
  "isActive": "boolean (required)"
}
```

---

## Error Responses

All endpoints may return standard error responses:

**400 Bad Request:**
```json
{
  "error": "Validation error message",
  "details": ["specific field errors"]
}
```

**401 Unauthorized:**
```json
{
  "error": "Access token is required"
}
```

**403 Forbidden:**
```json
{
  "error": "Access denied"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error",
  "details": "Error message"
}
```

---

## Authentication Flow

1. **Registration:** `POST /auth/register` → Receive email verification
2. **Verify Email:** Click link → `GET /auth/verify-email?token=...`
3. **Login:** `POST /auth/login` → Receive accessToken + refreshToken cookie
4. **Use API:** Include `Authorization: Bearer {accessToken}` header
5. **Token Expired:** `POST /auth/refresh` → Receive new accessToken
6. **Logout:** `POST /auth/logout`

---

## Rate Limits & Security

- **CORS:** Configured for localhost and Replit domains
- **File Upload:** 50MB max per file
- **Password Requirements:** Minimum 8 characters
- **JWT Expiry:** Access tokens (15 min), Refresh tokens (7 days)
- **Cookie Security:** httpOnly, secure (production), sameSite: lax

---

**Last Updated:** January 2025
**API Version:** 1.0
