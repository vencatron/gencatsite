# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project: Generation Catalyst - Estate Planning Website

A full-stack professional estate planning website built with React 18, TypeScript, Express.js, and PostgreSQL. The application provides a modern, responsive interface for legal estate planning services with a secure client portal featuring authentication, document management, messaging, and billing.

## Key Development Commands

```bash
# Frontend Development
npm run dev                  # Start frontend dev server (port 5000)
npm run build                # Production build (TypeScript + Vite)
npm run preview              # Preview production build
npm run lint                 # Run ESLint checks
npm run lint:fix             # Auto-fix linting issues

# Backend Development (Local)
npm run server:dev           # Start backend API server (port 3001)
npm run build:server         # Build server (transpile TS to CommonJS .cjs)

# Database Management
npm run db:push              # Apply schema changes to PostgreSQL
npm run db:studio            # Open Drizzle Studio (visual DB manager)
```

## Architecture Overview

### Dual Backend Structure
This project has **two backend implementations**:

1. **Local Express Server** (`server/`): Used for local development
   - Runs on port 3001
   - Uses Drizzle ORM with connection pooling
   - Start with `npm run server:dev`

2. **Vercel Serverless Functions** (`api/`): Used in production
   - File-based routing (e.g., `api/auth/login.ts` → `/api/auth/login`)
   - Uses `@neondatabase/serverless` with direct SQL queries
   - Each function is stateless with 10s max duration
   - Configured in `vercel.json`

**Important**: When adding new API endpoints, implement in **both** `server/` (for local dev) and `api/` (for Vercel production).

### Full-Stack Structure
- **Frontend**: React 18 + TypeScript + Vite (port 5000)
- **Backend**: Express.js (local) / Vercel Functions (production)
- **Database**: PostgreSQL on Neon with Drizzle ORM
- **File Storage**: AWS S3 for document uploads
- **Shared**: Type definitions and database schema in `shared/`

The Vite dev server proxies `/api` requests to the backend server (configured in `vite.config.ts`).

### Frontend Architecture

#### Routing Structure (`src/App.tsx`)
- **Public Routes**: Home, About, Services, Contact, Resources, Schedule
- **Service Sub-routes**: Estate Planning, Wills & Trusts, Tax Planning
- **Client Portal Routes** (protected by JWT auth):
  - `/client-portal`: Login/registration page
  - `/client-portal/dashboard`: Overview of documents, messages, invoices
  - `/client-portal/documents`: Document upload/management
  - `/client-portal/messages`: Secure messaging with support
  - `/client-portal/appointments`: Schedule management
  - `/client-portal/billing`: Invoice viewing
  - `/client-portal/settings`: Profile and password management

#### Component Organization
- **Pages** (`src/pages/`): Route-level components
  - `src/pages/portal/`: Client portal pages with `PortalLayout` wrapper
- **Common Components** (`src/components/common/`): Header, Footer, Scheduler
- **Section Components** (`src/components/sections/`): Reusable sections (Hero, Services, etc.)
- **Hooks** (`src/hooks/`): Form handling (`useForm`), scroll animations (`useScrollAnimation`)
- **Utils** (`src/utils/`): Validation, email, helpers, constants, `portalDb.ts` for API calls
- **Routes** (`src/routes/`): `RequirePortalAuth` - route protection wrapper

#### TypeScript Configuration
Strict mode with comprehensive type checking:
- `noUnusedLocals`, `noUnusedParameters`: Enforce clean code
- `exactOptionalPropertyTypes`, `noImplicitReturns`: Strict optional/return handling
- `noUncheckedIndexedAccess`: Safe array/object access
- Path aliases: `@/*`, `@/components/*`, `@/pages/*`, `@/hooks/*`, `@/utils/*`, `@/types/*`

### Backend Architecture

#### API Server (`server/index.cjs`)
Express.js server with:
- **Authentication Routes** (`/api/auth/*`):
  - `POST /api/auth/register`: User registration with bcrypt password hashing
  - `POST /api/auth/login`: Login with JWT token generation
  - `POST /api/auth/logout`: Clear refresh token cookie
  - `GET /api/auth/me`: Get current user from JWT
  - `POST /api/auth/refresh`: Refresh access token using refresh token

- **Protected Routes** (require JWT authentication):
  - `/api/documents/*`: Document CRUD and S3 upload/download
  - `/api/messages/*`: Secure messaging with threading
  - `/api/invoices/*`: Billing and invoice management
  - `/api/users/*`: User profile management
  - `/api/admin/*`: Admin dashboard stats and user management (requires admin role)
  - `/api/twoFactor/*`: Two-factor authentication setup/verification

#### Security Implementation
- **Password Hashing**: bcrypt with 10 rounds
- **JWT Tokens**: Access (15min) + Refresh (7 days in httpOnly cookies)
- **Two-Factor Auth**: TOTP-based with backup codes (speakeasy library)
- **Email Verification**: Token-based email verification on registration
- **Password Reset**: Token-based reset flow with expiration
- **Input Validation**: All inputs sanitized via `sanitizeInput()` function
- **Role-Based Access**: Users have roles (`client`, `admin`, `support`)

#### Database Layer
- **ORM**: Drizzle ORM (local) / raw SQL with `@neondatabase/serverless` (Vercel)
- **Schema**: `shared/schema.ts` defines tables with relations:
  - `users`: Auth, profile, roles, 2FA fields, email verification
  - `documents`: File metadata with S3 storage URLs
  - `messages`: Threaded messaging with priority levels
  - `invoices`: Billing with line items (JSON), status tracking
  - `appointments`: Scheduling with meeting types
- **Storage Interface**:
  - `server/storage.ts`: Drizzle-based for local dev
  - `api/storage.ts`: Raw SQL for Vercel serverless
- **Database Config**: `drizzle.config.ts` for migrations

#### File Storage (AWS S3)
- Documents stored in S3, metadata in PostgreSQL
- Upload flow: `api/documents/upload.ts` handles multipart form data
- Download: Presigned URLs generated via `@aws-sdk/s3-request-presigner`
- S3 utilities in `api/utils/s3.ts` and `server/lib/s3.ts`

#### Build Process
The server build compiles TypeScript to CommonJS (`.cjs`):
1. `tsconfig.server.json` compiles `server/` and `shared/`
2. Script renames `.js` → `.cjs` (Express requires CommonJS)

### Design System

#### Color Palette (Tailwind CSS)
**No blue colors** - warm, neutral, professional tones:
- **Primary**: Warm nude/sand (#b19373 base with 50-900 scale)
- **Secondary**: Neutral taupe/beige (#a89f94 base)
- **Accent**: Soft blush/terracotta (#e68c73 base)
- **Neutral**: Warm grays (#988c84 base)

#### Typography
- **Serif**: Freight Serif Pro, Playfair Display, Georgia (primary)
- **Sans**: Inter for UI elements
- **Mono**: JetBrains Mono for code

#### Animation System
- Framer Motion for page transitions
- Custom Tailwind animations: `fade-in`, `slide-up`, `slide-down`, `scale-in`
- Custom keyframes in `tailwind.config.js`

### Important Considerations

#### Frontend Development
1. **Path Imports**: Always use aliases (`@/components/common/Header`) for consistency
2. **TypeScript Strictness**: Avoid `any` types - project enforces strict mode
3. **Component Naming**: PascalCase for components, camelCase for hooks/utils
4. **Responsive Design**: Mobile-first (320px+), tablet (768px+), desktop (1200px+)
5. **API Integration**: Use `src/utils/portalDb.ts` functions for backend calls
6. **Authentication**: Portal routes wrapped in `RequirePortalAuth` component

#### Backend Development
1. **Build Before Run**: Always `npm run build:server` before starting local server
2. **Dual Implementation**: New endpoints need both `server/routes/*.ts` and `api/*.ts`
3. **File Extensions**: Local server compiles to `.cjs` (CommonJS)
4. **Database Changes**: Run `npm run db:push` after modifying `shared/schema.ts`

#### Environment Variables
Required in `.env` (never commit):
- `DATABASE_URL`: Neon PostgreSQL connection string
- `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`: JWT signing secrets
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`: S3 config
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`: Email service (nodemailer)

#### Development Workflow
1. Start backend: `npm run server:dev` (port 3001)
2. Start frontend: `npm run dev` (port 5000, proxies `/api` to 3001)
3. Run `npm run lint:fix` before commits
4. Deploy: Push to main branch triggers Vercel deployment