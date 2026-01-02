# Repository Overview: Generation Catalyst

**Purpose**: A professional estate planning website with a secure client portal for document management, messaging, appointments, billing, and payments.

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Stripe |
| **Backend** | Express.js (local) / Vercel Serverless (prod), Node.js |
| **Database** | PostgreSQL (Neon), Drizzle ORM |
| **Storage** | AWS S3 for documents |
| **Auth** | JWT (access + refresh tokens), bcrypt, TOTP 2FA |

---

## Main Entry Points

| Component | File | Dev Command |
|-----------|------|-------------|
| **Frontend** | `src/main.tsx` → `src/App.tsx` | `npm run dev` (port 5000) |
| **Backend (local)** | `server/index.ts` | `npm run server:dev` (port 3001) |
| **Backend (prod)** | `api/` (file-based routing) | Deployed on Vercel |
| **Database Schema** | `shared/schema.ts` | `npm run db:push` |

---

## Key Directory Structure

```
src/           # React frontend
├── pages/     # Routes (public + portal/)
├── components/# UI components
├── hooks/     # useForm, useMessaging, etc.
└── utils/     # API calls (portalDb.ts), validation

server/        # Local Express backend
├── routes/    # API endpoints
└── storage.ts # Drizzle ORM layer

api/           # Vercel serverless functions (production)
├── auth/      # Login, register, 2FA
├── documents/ # S3 upload/download
└── payments/  # Stripe integration

shared/        # Shared types & schema
```

---

## Core Features

- **Public site**: Home, About, Services, Contact, Resources, Schedule
- **Client portal**: Dashboard, Documents, Messages, Appointments, Billing, Settings
- **Admin dashboard**: User management, statistics
- **Security**: Email verification, password reset, 2FA, role-based access

---

## Development Commands

```bash
# Frontend
npm run dev              # Start dev server (port 5000)
npm run build            # Production build
npm run lint:fix         # Auto-fix linting issues

# Backend
npm run server:dev       # Start Express server (port 3001)
npm run build:server     # Compile TS to CommonJS

# Database
npm run db:push          # Apply migrations to PostgreSQL
npm run db:studio        # Open Drizzle Studio
```

---

## Architecture Notes

### Dual Backend Structure
- **Local Development**: Express.js with Drizzle ORM on port 3001
- **Production**: Vercel serverless functions with raw SQL queries
- New API endpoints must be implemented in **both** `server/` and `api/` directories

### Authentication Flow
1. User registers → Email verification token sent
2. Email confirmed → Auto-login with JWT
3. If 2FA enabled → TOTP verification required
4. Access token (15min) + Refresh token (7 days, httpOnly cookie)

### Database Schema (PostgreSQL)
- `users` - Authentication, profile, 2FA, email verification
- `documents` - File metadata with S3 storage URLs
- `messages` - Threaded messaging with priority levels
- `invoices` - Billing with Stripe integration
- `appointments` - Scheduling with meeting types

### Design System
- **Colors**: Warm, neutral tones (no blue) - sand, taupe, terracotta
- **Typography**: Freight Serif Pro, Playfair Display (serif); Inter (sans)
- **Animations**: Framer Motion + custom Tailwind keyframes

---

## Environment Variables Required

```
DATABASE_URL              # Neon PostgreSQL connection
JWT_ACCESS_SECRET         # JWT signing secret
JWT_REFRESH_SECRET        # Refresh token secret
AWS_ACCESS_KEY_ID         # S3 credentials
AWS_SECRET_ACCESS_KEY
AWS_REGION
S3_BUCKET_NAME
SMTP_HOST                 # Email service
SMTP_PORT
SMTP_USER
SMTP_PASS
STRIPE_SECRET_KEY         # Payment processing
STRIPE_PUBLISHABLE_KEY
```
