# Vercel Deployment Issue - API Functions Not Deploying

## Issue Summary

The gencatsite project's API endpoints are not being deployed by Vercel. All `/api/*` requests return the frontend HTML instead of executing serverless functions.

## Evidence

```bash
# Test simple endpoint
curl https://iamatrust.com/api/hello
# Returns: HTML page instead of {"message": "Hello from API!"}

# Test registration endpoint
curl -X POST https://iamatrust.com/api/auth/register
# Returns: HTML page instead of API response
```

## Root Cause

Vercel is treating this project as a **pure Vite frontend deployment** and **ignoring the `api/` directory entirely**.

## Code-Level Fixes Already Applied ✅

1. **Schema Alignment**: Fixed User/InsertUser interfaces to match actual database schema
2. **Import Path Fixes**: Updated all imports after moving utilities from `api/_lib/` to `api/`
3. **Directory Restructure**: Moved all utilities to `api/` root for better Vercel tracking
4. **Routing Configuration**: Simplified `vercel.json` to let Vercel auto-handle routing
5. **Test Endpoints**: Created minimal test endpoints to verify API deployment

All code compiles successfully and works locally.

## What's Not Working ❌

Despite correct code and configuration:
- All `/api/*` routes return frontend HTML (200 OK)
- No serverless functions are being invoked
- API functions appear to not be deployed at all

## Required Fix: Vercel Dashboard Configuration

**This requires access to the Vercel dashboard or Vercel API.**

### Option 1: Vercel Dashboard (Manual)

1. **Go to**: https://vercel.com/dashboard
2. **Select Project**: iamatrust.com (gencatsite)
3. **Check Settings**:
   - **General → Root Directory**: Should be empty or `.` (not pointing to subdirectory)
   - **Build & Development Settings → Output Directory**: Should be `dist`
   - **Functions**: Ensure "Serverless Functions" are enabled
4. **Check Environment Variables**:
   - Verify `DATABASE_URL` exists
   - Verify `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` exist
5. **Deployment Settings**:
   - Click "Deployments" tab
   - Find latest deployment
   - Check "Functions" tab to see if any functions were detected/deployed
6. **Force Redeploy**:
   - Go to Deployments
   - Click "..." menu on latest deployment
   - Select "Redeploy" → Check "Force cache clear"

### Option 2: Vercel API / MCP (Programmatic)

Use the Vercel MCP server to inspect and fix deployment:

```bash
# Setup Vercel MCP (already cloned to ~/mcp-vercel)
cd ~/mcp-vercel

# Get Vercel API token from: https://vercel.com/account/tokens
# Create .env file:
echo "VERCEL_API_TOKEN=your_token_here" > .env

# Start MCP server
npm start

# Then use MCP tools to:
# 1. List deployments: vercel-list-all-deployments
# 2. Get deployment details: vercel-get-deployment
# 3. Check deployment logs
# 4. Inspect function deployment status
```

## Current Project Structure (Correct) ✅

```
gencatsite/
├── api/
│   ├── auth/
│   │   ├── register.ts      ← Should be /api/auth/register
│   │   ├── login.ts          ← Should be /api/auth/login
│   │   ├── me.ts             ← Should be /api/auth/me
│   │   ├── refresh.ts        ← Should be /api/auth/refresh
│   │   └── verify-2fa.ts     ← Should be /api/auth/verify-2fa
│   ├── test-db.ts            ← Should be /api/test-db
│   ├── hello.ts              ← Should be /api/hello
│   ├── storage.ts            ← Utility (not an endpoint)
│   ├── jwt.ts                ← Utility (not an endpoint)
│   ├── validation.ts         ← Utility (not an endpoint)
│   └── ...
├── src/                      ← Frontend source
├── dist/                     ← Frontend build output
├── vercel.json               ← Deployment config
└── package.json
```

## Current vercel.json (Correct) ✅

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs20.x",
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

## Diagnostic Tests

### Test 1: API Hello Endpoint
```bash
curl https://iamatrust.com/api/hello
```
**Expected**: `{"message":"Hello from API!","timestamp":"..."}`
**Actual**: HTML page (frontend)

### Test 2: Database Test Endpoint
```bash
curl https://iamatrust.com/api/test-db
```
**Expected**: `{"success":true,"message":"Database connection successful",...}`
**Actual**: HTML page (frontend)

### Test 3: Registration Endpoint
```bash
curl -X POST https://iamatrust.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"Test123!"}'
```
**Expected**: Success or validation error (JSON)
**Actual**: HTML page (frontend)

## Next Steps

**Immediate Priority**: Access Vercel dashboard or get Vercel API token to:
1. Inspect why functions aren't being deployed
2. Check deployment logs for build errors
3. Verify project configuration
4. Force redeploy with cache clear

**Once API Functions Deploy**: The registration endpoint should work immediately, as all code-level issues have been resolved.

## Code Commits Made

- `55b1381` - Add database test endpoint for debugging
- `6bcb5c6` - Fix critical routing issue: exclude /api routes from frontend rewrites
- `c26c4da` - Fix API routing: use explicit routes instead of rewrites
- `f63bf6a` - Simplify vercel.json: remove custom routing, let Vercel auto-handle
- `5a12bd0` - Add minimal test API endpoint

## Environment Variables Required (In Vercel)

```env
DATABASE_URL=postgresql://neondb_owner:...@ep-flat-hall-afc4091w-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require
JWT_ACCESS_SECRET=258bec5dba798fcf0ea2ba25bb2b315f32bb5f6bfac8593a3c0b3a3b5cfa42b9d3efada6ddf657f827e4be56f6bf97919088f4d7c6c1ba492d0b33ec6bb87988
JWT_REFRESH_SECRET=2527965aa3d44c1a007e0e4a6ad6a8f41716cbb1c645499051a6b73a26b06dd8c0284f475016c022c5e40b5ee239da4b07b3ce9fa036414054a6f3d661e65f97
JWT_ACCESS_EXPIRATION=15m
```

---

**Status**: Blocked on Vercel dashboard/API access
**Code Status**: ✅ All code issues resolved
**Deployment Status**: ❌ API functions not deploying
