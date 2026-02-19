# Troubleshooting Vercel Deployment

## Quick Diagnosis

If your login is working locally but not on Vercel, follow these steps:

### Step 1: Check Environment Variables

Visit: `https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/api/debug/env-check`

**Expected Response:**
```json
{
  "timestamp": "2025-10-27T...",
  "vercelEnv": "production",
  "nodeEnv": "production",
  "environmentVariables": {
    "DATABASE_URL": true,
    "DATABASE_URL_length": 100+,
    "JWT_ACCESS_SECRET": true,
    "JWT_ACCESS_SECRET_length": 64+,
    "JWT_REFRESH_SECRET": true,
    "JWT_REFRESH_SECRET_length": 64+
  }
}
```

❌ **If any value is `false` or length is `0`:**
- Missing environment variable
- See `VERCEL_SETUP.md` to add them

---

### Step 2: Test Login Flow

Visit: `https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/api/debug/test-login`

**Expected Response:**
```json
{
  "status": "ok",
  "tests": {
    "databaseConnection": {
      "works": true,
      "userCount": 5
    },
    "jwtGeneration": {
      "works": true
    },
    "environment": {
      "DATABASE_URL": true,
      "JWT_ACCESS_SECRET": true,
      "JWT_REFRESH_SECRET": true,
      "NODE_ENV": "production"
    }
  },
  "recommendations": []
}
```

❌ **If `databaseConnection.works` is `false`:**
- Database URL is incorrect or database is unreachable
- Check your Neon database is active
- Verify DATABASE_URL in Vercel dashboard

❌ **If `jwtGeneration.works` is `false`:**
- JWT secrets are missing or invalid
- Check JWT_ACCESS_SECRET and JWT_REFRESH_SECRET are set

---

### Step 3: Test Actual Login

1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Visit: `https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/client-portal`
4. Try to login with test credentials

#### Check Network Request:

**Request:**
```
POST /api/auth/login
```

**Expected Response (Success):**
```json
{
  "message": "Login successful",
  "user": { ... },
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "requires2FA": false
}
```

**Check Response Headers:**
```
Set-Cookie: refreshToken=...; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax; Secure
```

❌ **Common Issues:**

| Error | Cause | Solution |
|-------|-------|----------|
| `500 Internal Server Error` | Missing env variables | Add DATABASE_URL, JWT secrets |
| `401 Invalid credentials` | Wrong password OR user doesn't exist | Check credentials, create user |
| `DATABASE_URL must be set` | Missing DATABASE_URL | Add in Vercel dashboard |
| `User not found` | No users in database | Register a new user first |
| Cookie not set | NODE_ENV not set | Set NODE_ENV=production |
| CORS error | Domain mismatch | Shouldn't happen on same domain |

---

## Common Scenarios

### Scenario 1: "500 Internal Server Error" on Login

**Symptoms:**
- Works on localhost
- 500 error on Vercel
- Console shows network error

**Diagnosis:**
1. Check `/api/debug/env-check` - all should be `true`
2. Check `/api/debug/test-login` - `databaseConnection.works` should be `true`

**Solution:**
```bash
# If DATABASE_URL is missing:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add DATABASE_URL (from Neon dashboard)
3. Redeploy

# If JWT secrets are missing:
1. Generate secrets: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
2. Add JWT_ACCESS_SECRET and JWT_REFRESH_SECRET
3. Redeploy
```

---

### Scenario 2: "Invalid credentials" but Password is Correct

**Symptoms:**
- Same credentials work locally
- "Invalid credentials" on Vercel
- User exists in database

**Possible Causes:**
1. **Different databases:** Local vs. Vercel using different DBs
2. **User doesn't exist in production DB**
3. **Password hash mismatch**

**Solution:**
```bash
# Option 1: Register on production
1. Go to Vercel site → /client-portal
2. Click "Register" and create new account
3. Verify email
4. Try login again

# Option 2: Check if user exists
Visit: /api/debug/test-login
Check "userCount" - if 0, no users exist

# Option 3: Verify you're using same database
1. Check local DATABASE_URL in .env
2. Check Vercel DATABASE_URL in dashboard
3. Should be same Neon database
```

---

### Scenario 3: Login Succeeds but Immediately Logged Out

**Symptoms:**
- Login API returns success
- Redirects to dashboard
- Immediately kicked back to login

**Cause:** Cookies not being set properly

**Diagnosis:**
1. Open DevTools → Application → Cookies
2. Check if `refreshToken` cookie exists
3. Check if cookie has `Secure` and `HttpOnly` flags

**Solution:**
```bash
# Ensure NODE_ENV is set to production
1. Vercel Dashboard → Environment Variables
2. Add: NODE_ENV=production
3. Redeploy

# Clear browser cookies and try again
1. DevTools → Application → Cookies
2. Right-click → Clear
3. Try login again
```

---

### Scenario 4: Registration Works, Email Verification Fails

**Symptoms:**
- Can register successfully
- Email verification link doesn't work
- Stuck on "verify your email" page

**Cause:** Email service not configured OR verification token not saved

**Solution:**
```bash
# Check if email service is configured
Visit: /api/debug/env-check
Look for EMAIL_* variables

# If email not configured:
1. Add EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD
2. See VERCEL_SETUP.md for email setup
3. Redeploy

# Manual verification workaround:
1. Check Vercel Function Logs for verification token
2. Visit: /api/auth/verify-email?token=YOUR_TOKEN_HERE
```

---

## Debugging Tools

### 1. Browser Developer Tools

**Network Tab:**
- Shows all API requests/responses
- Check status codes (200, 401, 500)
- View request/response bodies
- See response headers (cookies)

**Console Tab:**
- Shows JavaScript errors
- API error messages
- Frontend errors

**Application Tab:**
- View cookies (refreshToken)
- Check localStorage (accessToken if stored)
- View IndexedDB data

### 2. Vercel Function Logs

**How to access:**
1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Click **Functions** tab
4. Click individual function (e.g., `/api/auth/login`)
5. View real-time logs

**What to look for:**
- Error messages
- Stack traces
- Database connection errors
- JWT generation errors

### 3. Debug Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/debug/env-check` | Check environment variables |
| `/api/debug/test-login` | Test auth flow without logging in |
| `/api/hello` | Test basic serverless function |

---

## Step-by-Step Debugging Process

### 1. Verify Basics
```bash
# 1. Check environment variables
curl https://your-site.vercel.app/api/debug/env-check

# 2. Test login flow
curl https://your-site.vercel.app/api/debug/test-login

# 3. Test basic function
curl https://your-site.vercel.app/api/hello
```

### 2. Test Authentication Flow
```bash
# 1. Try to register (replace with your data)
curl -X POST https://your-site.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "SecurePass123!",
    "firstName": "Test",
    "lastName": "User"
  }'

# 2. Try to login
curl -X POST https://your-site.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!"
  }' \
  -c cookies.txt \
  -v

# 3. Check if cookie was set (look for Set-Cookie header in output)
```

### 3. Check Database
```bash
# Using Neon CLI
npx neonctl sql "SELECT COUNT(*) FROM users" \
  --project-id your-project-id

# OR visit Neon console
# https://console.neon.tech
```

---

## Prevention Checklist

Before deploying to Vercel:

- [ ] Set all environment variables (DATABASE_URL, JWT secrets, NODE_ENV)
- [ ] Test `/api/debug/env-check` - all should be `true`
- [ ] Test `/api/debug/test-login` - all tests should pass
- [ ] Create at least one test user on production
- [ ] Clear browser cache/cookies before testing
- [ ] Test in incognito/private window
- [ ] Check Vercel function logs for errors
- [ ] Verify cookies are being set (DevTools → Application)

---

## Getting Help

If you're still stuck:

1. **Check Logs:**
   - Vercel Dashboard → Functions → View Logs
   - Look for specific error messages

2. **Test Endpoints:**
   - `/api/debug/env-check` - environment status
   - `/api/debug/test-login` - auth flow test

3. **Browser Console:**
   - Open DevTools (F12)
   - Check Console for errors
   - Check Network for failed requests

4. **Verify Setup:**
   - Review `VERCEL_SETUP.md`
   - Ensure all environment variables are set
   - Confirm database is accessible

---

## Quick Reference

### Required Environment Variables
```
DATABASE_URL=postgresql://...
JWT_ACCESS_SECRET=64-char-random-string
JWT_REFRESH_SECRET=different-64-char-random-string
NODE_ENV=production
```

### Test Endpoints
```
/api/debug/env-check     - Environment variables status
/api/debug/test-login    - Auth flow test
/api/hello               - Basic function test
```

### Vercel URLs
```
Production:  https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app
Dashboard:   https://vercel.com/rons-projects-08ac03e7/gencatsite
Functions:   https://vercel.com/rons-projects-08ac03e7/gencatsite/functions
```
