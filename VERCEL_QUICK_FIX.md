# Quick Fix: Add Environment Variables to Vercel

## Step 1: Generate JWT Secrets

Open your terminal and run these commands:

```bash
# Generate JWT_ACCESS_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Copy the output, then generate JWT_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Save both outputs** - you'll need them in Step 3.

---

## Step 2: Go to Vercel Dashboard

1. Open: https://vercel.com/rons-projects-08ac03e7/gencatsite
2. Click **Settings** tab (top navigation)
3. Click **Environment Variables** in left sidebar

---

## Step 3: Add These 4 Variables

For each variable below, click **Add New** and enter:

### Variable 1: DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** `postgresql://neondb_owner:npg_sf6PBCxKMt1F@ep-flat-hall-afc4091w-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require`
- **Environments:** ☑️ Production ☑️ Preview ☑️ Development
- Click **Save**

### Variable 2: JWT_ACCESS_SECRET
- **Key:** `JWT_ACCESS_SECRET`
- **Value:** (paste the FIRST secret you generated in Step 1)
- **Environments:** ☑️ Production ☑️ Preview ☑️ Development
- Click **Save**

### Variable 3: JWT_REFRESH_SECRET
- **Key:** `JWT_REFRESH_SECRET`
- **Value:** (paste the SECOND secret you generated in Step 1)
- **Environments:** ☑️ Production ☑️ Preview ☑️ Development
- Click **Save**

### Variable 4: NODE_ENV
- **Key:** `NODE_ENV`
- **Value:** `production`
- **Environments:** ☑️ Production ☑️ Preview ☑️ Development
- Click **Save**

---

## Step 4: Redeploy

1. Go to **Deployments** tab (top navigation)
2. Find your latest deployment
3. Click the **⋯** (three dots) button
4. Click **Redeploy**
5. Wait 2-3 minutes for deployment to complete

---

## Step 5: Verify It Works

### Test 1: Check Environment Variables
Open: https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/api/debug/env-check

**Should see:**
```json
{
  "environmentVariables": {
    "DATABASE_URL": true,
    "JWT_ACCESS_SECRET": true,
    "JWT_REFRESH_SECRET": true
  }
}
```

### Test 2: Test Auth Flow
Open: https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/api/debug/test-login

**Should see:**
```json
{
  "tests": {
    "databaseConnection": {
      "works": true
    },
    "jwtGeneration": {
      "works": true
    }
  }
}
```

### Test 3: Try Login
Open: https://gencatsite-git-master-rons-projects-08ac03e7.vercel.app/client-portal

**Try logging in** - should work now!

---

## What About All Those Other Neon Variables?

**You don't need them.** Here's why:

| Variable | Needed? | Why/Why Not |
|----------|---------|-------------|
| `DATABASE_URL` | ✅ YES | Your code uses this |
| `DATABASE_URL_UNPOOLED` | ❌ NO | Only needed if you specifically need non-pooled connections |
| `PGHOST`, `PGUSER`, etc. | ❌ NO | These are just parts of DATABASE_URL, already included |
| `POSTGRES_URL` | ❌ NO | Same as DATABASE_URL, just different name |
| `NEXT_PUBLIC_STACK_*` | ❌ NO | These are for "Stack Auth" which you're not using |
| `STACK_SECRET_SERVER_KEY` | ❌ NO | Part of Stack Auth, not needed |

**Summary:** Only use `DATABASE_URL` (the pooled one). Your code already uses that variable name.

---

## Visual Guide

```
Vercel Dashboard
  └─ Settings
      └─ Environment Variables
          └─ Add New (4 times)
              ├─ DATABASE_URL = postgresql://...
              ├─ JWT_ACCESS_SECRET = (64-char random string)
              ├─ JWT_REFRESH_SECRET = (different 64-char random string)
              └─ NODE_ENV = production
```

After adding all 4:
```
Deployments
  └─ Latest deployment
      └─ ⋯ → Redeploy
```

---

## Troubleshooting

### "I don't see Environment Variables in Settings"
- Make sure you're on the correct project
- Make sure you're logged into the right Vercel account
- URL should be: `vercel.com/rons-projects-08ac03e7/gencatsite/settings/environment-variables`

### "I added variables but site still doesn't work"
- Did you click **Redeploy** after adding them?
- Variables only take effect after redeployment
- Wait for deployment to finish (check Deployments tab)

### "Test endpoints show false"
- Double-check you spelled variable names correctly (case-sensitive!)
- Make sure you selected all 3 environments (Production, Preview, Development)
- Try redeploying again

### "Database connection fails"
- Verify DATABASE_URL is exactly as shown above
- Check your Neon database is active (visit console.neon.tech)
- Make sure DATABASE_URL includes `?sslmode=require` at the end

---

## What NOT to Do

❌ Don't upload your entire `.env` file
❌ Don't add all those Neon variables (you only need DATABASE_URL)
❌ Don't share JWT secrets publicly or commit them to Git
❌ Don't use the same secret for ACCESS and REFRESH
❌ Don't forget to redeploy after adding variables

✅ Do add only the 4 variables listed above
✅ Do generate new random JWT secrets
✅ Do redeploy after adding variables
✅ Do test with the debug endpoints
✅ Do use the pooled DATABASE_URL (with `-pooler` in hostname)

---

## Summary

**Only add 4 environment variables:**
1. DATABASE_URL (from Neon, use pooled connection)
2. JWT_ACCESS_SECRET (generate random 64-char string)
3. JWT_REFRESH_SECRET (generate different random 64-char string)
4. NODE_ENV (set to "production")

**Then redeploy and test!**
