# Vercel Environment Variables Setup

## Critical Environment Variables

Your authentication is failing on Vercel because these environment variables are missing. You MUST add them in your Vercel dashboard.

### How to Add Environment Variables on Vercel

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your project: `gencatsite`
3. Go to **Settings** → **Environment Variables**
4. Add each variable below

---

## Required Environment Variables

### 1. Database Connection
```
DATABASE_URL=postgresql://[user]:[password]@[host]/[database]?sslmode=require
```
**Where to get this:**
- From your Neon database dashboard
- Navigate to: https://console.neon.tech
- Select your project → Connection Details
- Copy the **Pooled Connection** string

**Example:**
```
DATABASE_URL=postgresql://user:password@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

---

### 2. JWT Access Secret
```
JWT_ACCESS_SECRET=your_very_long_random_secret_here
```

**Generate a secure secret:**
```bash
# On Mac/Linux terminal:
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OR use this website:
# https://www.random.org/strings/
```

**Must be:**
- At least 32 characters long
- Random and unpredictable
- Different from JWT_REFRESH_SECRET

---

### 3. JWT Refresh Secret
```
JWT_REFRESH_SECRET=another_very_long_random_secret_here
```

**Generate a DIFFERENT secret** (use same method as above)

**Important:**
- Must be different from JWT_ACCESS_SECRET
- At least 32 characters long

---

### 4. Node Environment
```
NODE_ENV=production
```

This ensures cookies use the `Secure` flag (HTTPS only)

---

### 5. Email Configuration (Optional but Recommended)

For email verification and password resets:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@iamatrust.com
```

**If using Gmail:**
1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the App Password (not your regular password)

---

## Vercel Dashboard Steps

### Step-by-Step:

1. **Open Vercel Dashboard:**
   - Go to: https://vercel.com/rons-projects-08ac03e7/gencatsite
   - Click **Settings** tab
   - Click **Environment Variables** in left sidebar

2. **Add Each Variable:**
   - For each variable above:
     - Click **Add New**
     - Enter **Key** (e.g., `DATABASE_URL`)
     - Enter **Value** (the actual value)
     - Select environments: ☑️ Production ☑️ Preview ☑️ Development
     - Click **Save**

3. **Redeploy:**
   After adding all variables:
   - Go to **Deployments** tab
   - Click the **⋯** menu on latest deployment
   - Select **Redeploy**
   - Wait for deployment to complete

---

## Testing After Setup

### 1. Check Environment Variables
Visit: https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/api/debug/env-check

Should show:
```json
{
  "status": "ok",
  "environment": {
    "DATABASE_URL": true,
    "JWT_ACCESS_SECRET": true,
    "JWT_REFRESH_SECRET": true,
    "NODE_ENV": "production"
  }
}
```

### 2. Test Registration
Try registering a new user at:
https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/client-portal

### 3. Check Browser Console
- Open Developer Tools (F12)
- Go to **Console** tab
- Look for any error messages
- Check **Network** tab for API call responses

---

## Common Issues & Solutions

### Issue: "DATABASE_URL must be set"
**Solution:** Add DATABASE_URL environment variable and redeploy

### Issue: "Invalid credentials" even with correct password
**Solution:**
- Check JWT secrets are set
- Ensure NODE_ENV=production
- Clear browser cookies and try again

### Issue: Cookies not being set
**Solution:**
- Ensure NODE_ENV=production (enables Secure flag)
- Check your site uses HTTPS (Vercel does this automatically)
- Clear browser cache and cookies

### Issue: CORS errors
**Solution:**
- Serverless functions on same domain shouldn't have CORS issues
- If you see CORS errors, check browser console for actual domain mismatch

---

## Quick Reference Commands

### Generate JWT Secrets (Run locally)
```bash
# Generate ACCESS_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate REFRESH_SECRET (run again for different value)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Get Neon Database URL
```bash
# Login to Neon CLI
npx neonctl auth

# Get connection string
npx neonctl connection-string --project-id your-project-id
```

### Test Local Build (Before Deploying)
```bash
# Build frontend
npm run build

# Preview production build
npm run preview

# Test serverless functions locally
vercel dev
```

---

## Verification Checklist

Before testing on Vercel, ensure:

- [ ] DATABASE_URL is set (from Neon dashboard)
- [ ] JWT_ACCESS_SECRET is set (64-char random string)
- [ ] JWT_REFRESH_SECRET is set (different 64-char random string)
- [ ] NODE_ENV=production is set
- [ ] All variables are enabled for Production, Preview, Development
- [ ] Project has been redeployed after adding variables
- [ ] /api/debug/env-check returns all true values

---

## Need Help?

If you're still having issues after following these steps:

1. Check `/api/debug/env-check` endpoint
2. Look at Vercel deployment logs (Deployments → View Function Logs)
3. Check browser console for specific error messages
4. Verify your DATABASE_URL works by testing connection locally

---

## Security Notes

⚠️ **NEVER commit these values to Git:**
- Keep `.env` in `.gitignore`
- Never share secrets publicly
- Use different secrets for development and production
- Rotate secrets if they're ever exposed

✅ **Good practices:**
- Use Vercel's environment variables (encrypted at rest)
- Different secrets per environment
- Strong, random secrets (64+ characters)
- Regular secret rotation (every 6-12 months)
