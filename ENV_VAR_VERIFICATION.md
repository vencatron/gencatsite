# Environment Variable Verification Checklist

## Current Status
- ✅ API functions ARE deploying and being invoked
- ❌ Functions are failing with `FUNCTION_INVOCATION_FAILED`
- 🔍 Root cause: Environment variables not being loaded

## Evidence
```
curl -I https://iamatrust.com/api/auth/register
→ HTTP/2 500
→ x-vercel-error: FUNCTION_INVOCATION_FAILED
```

The function is running but failing at line 5-7 of `api/storage.ts`:
```typescript
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}
```

## Verification Steps

### 1. Check Vercel Dashboard Environment Variables

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

**Verify ALL of these are set:**

| Variable Name | Expected Value Start | Length | Environments |
|---------------|---------------------|---------|--------------|
| `DATABASE_URL` | `postgresql://neondb_owner...` | ~150 chars | ✓ Production, ✓ Preview, ✓ Development |
| `JWT_ACCESS_SECRET` | `258bec5dba798fcf...` | 128 chars | ✓ Production, ✓ Preview, ✓ Development |
| `JWT_REFRESH_SECRET` | `2527965aa3d44c1a...` | 128 chars | ✓ Production, ✓ Preview, ✓ Development |
| `JWT_ACCESS_EXPIRATION` | `15m` | 3 chars | ✓ Production, ✓ Preview, ✓ Development |
| `JWT_REFRESH_EXPIRATION` | `7d` | 2 chars | ✓ Production, ✓ Preview, ✓ Development |
| `NODE_ENV` | `production` | 10 chars | ✓ Production only |

### 2. Common Issues

#### Issue 1: Variables not selected for all environments
- ❌ **Wrong**: Only checked "Production"
- ✅ **Right**: Checked "Production", "Preview", AND "Development"

#### Issue 2: Variables set for wrong branch
- Some Vercel plans allow branch-specific env vars
- Ensure they're set for `master` branch (your main branch)

#### Issue 3: Typos in variable names
- Variable names are CASE SENSITIVE
- Must be EXACTLY: `DATABASE_URL` (not `database_url` or `DATABASE_Url`)

#### Issue 4: Missing values or extra spaces
- Make sure you didn't accidentally add spaces before/after the values
- Values should be pasted directly without quotes around them

#### Issue 5: Deployment didn't pick up env vars
- After adding env vars, you MUST redeploy
- Old deployments don't automatically get new env vars

### 3. How to Fix

If variables are missing or incorrect:

1. **Go to Vercel Dashboard**
   ```
   https://vercel.com/dashboard
   → Select your project (iamatrust.com)
   → Settings → Environment Variables
   ```

2. **For each missing/incorrect variable**:
   - Click "Edit" (if exists) or "Add New"
   - Name: `DATABASE_URL` (exact name)
   - Value: (paste from `.env` file - NO QUOTES)
   - Environments: ✓ Production, ✓ Preview, ✓ Development
   - Click "Save"

3. **After ALL variables are set**:
   - Go to "Deployments" tab
   - Find latest deployment
   - Click "..." menu
   - Click "Redeploy"
   - **IMPORTANT**: Check "Use existing Build Cache" = OFF
   - Click "Redeploy"

### 4. Test After Redeployment

Wait 1-2 minutes after redeploy completes, then test:

```bash
# Should return JSON with environment info (not HTML)
curl https://iamatrust.com/api/debug/env-check

# Should return success or validation error (not FUNCTION_INVOCATION_FAILED)
curl -X POST https://iamatrust.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"TestPass123!"}'
```

## Quick Diagnostic

If you can access the Vercel dashboard, check:

1. **Environment Variables page**: Do you see all 6 variables?
2. **Each variable**: Is it checked for all 3 environments?
3. **Deployment logs**: Click on latest deployment → "Functions" tab → Check for errors
4. **Runtime logs**: Click "View Function Logs" to see actual error messages

## Expected Outcome

Once environment variables are correctly set and deployment completes:

- ✅ `/api/debug/env-check` → Returns JSON showing all env vars are set
- ✅ `/api/auth/register` → Returns success or validation error (not 500)
- ✅ `/api/test-db` → Returns database connection success
- ✅ Registration flow works end-to-end

## Reference: Correct Environment Variables

From your `.env` file:

```env
DATABASE_URL=postgresql://neondb_owner:npg_sf6PBCxKMt1F@ep-flat-hall-afc4091w-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require

JWT_ACCESS_SECRET=258bec5dba798fcf0ea2ba25bb2b315f32bb5f6bfac8593a3c0b3a3b5cfa42b9d3efada6ddf657f827e4be56f6bf97919088f4d7c6c1ba492d0b33ec6bb87988

JWT_REFRESH_SECRET=2527965aa3d44c1a007e0e4a6ad6a8f41716cbb1c645499051a6b73a26b06dd8c0284f475016c022c5e40b5ee239da4b07b3ce9fa036414054a6f3d661e65f97

JWT_ACCESS_EXPIRATION=15m

JWT_REFRESH_EXPIRATION=7d

NODE_ENV=production
```

**IMPORTANT**: Copy these EXACTLY (including the full PostgreSQL connection string with password)

---

**Next Step**: Please verify these settings in your Vercel dashboard and let me know what you find.
