# Vercel Environment Variables Setup Guide

## Required Environment Variables for Production

Based on your local `.env` file, you need to configure the following environment variables in Vercel:

### 1. Database Configuration
```
DATABASE_URL=postgresql://neondb_owner:npg_sf6PBCxKMt1F@ep-flat-hall-afc4091w-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require
```
✅ **Action**: Copy exactly as-is from your local .env

### 2. JWT Secrets (CRITICAL - Must Match Exactly)
```
JWT_ACCESS_SECRET=258bec5dba798fcf0ea2ba25bb2b315f32bb5f6bfac8593a3c0b3a3b5cfa42b9d3efada6ddf657f827e4be56f6bf97919088f4d7c6c1ba492d0b33ec6bb87988
JWT_REFRESH_SECRET=2527965aa3d44c1a007e0e4a6ad6a8f41716cbb1c645499051a6b73a26b06dd8c0284f475016c022c5e40b5ee239da4b07b3ce9fa036414054a6f3d661e65f97
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```
✅ **Action**: Copy these EXACTLY - any difference will break authentication

### 3. Environment Settings (PRODUCTION VALUES)
```
NODE_ENV=production
```
⚠️ **Important**: Must be set to `production` (not `development`)

### 4. Email Configuration
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_actual_email@gmail.com
SMTP_PASS=your_actual_app_password
EMAIL_FROM=noreply@generationcatalyst.com
```
⚠️ **Action Required**: Replace placeholder values with actual Gmail credentials
- `SMTP_USER`: Your actual Gmail address
- `SMTP_PASS`: Generate an App-Specific Password in Gmail (not your regular password)

### 5. AWS S3 Document Storage (Required for uploads/downloads)
```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET_NAME=iamatrust-client-documents
AWS_REGION=us-east-1
```
⚠️ **Action Required**:
- Use the IAM access key/secret that has permissions for the `iamatrust-client-documents` bucket
- Required permissions: `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`
- Bucket name and region must match exactly (case-sensitive)

### 5. Application Configuration
```
PORT=3001
FRONTEND_URL=https://gencatsite-ext2tqzuu-rons-projects-08ac03e7.vercel.app
```
⚠️ **Important**:
- `PORT` is handled automatically by Vercel, but include it for consistency
- `FRONTEND_URL` should be your actual Vercel deployment URL

## How to Add These to Vercel

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Select your `gencatsite` project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable one by one:
   - Click "Add Variable"
   - Enter the key (e.g., `DATABASE_URL`)
   - Enter the value
   - Select environments: ✅ Production, ✅ Preview, ✅ Development
   - Click "Save"

### Option 2: Via Vercel CLI
```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Link to your project
vercel link

# Add each environment variable
vercel env add DATABASE_URL production
vercel env add JWT_ACCESS_SECRET production
vercel env add JWT_REFRESH_SECRET production
# ... repeat for all variables
```

### Option 3: Bulk Import via .env.production
1. Create a `.env.production` file with all production values
2. Use Vercel CLI:
```bash
vercel env pull .env.production
```

## Critical Environment Variables Checklist

| Variable | Status | Notes |
|----------|--------|-------|
| DATABASE_URL | ⚠️ Required | Copy from local .env |
| JWT_ACCESS_SECRET | ⚠️ Required | Must match exactly |
| JWT_REFRESH_SECRET | ⚠️ Required | Must match exactly |
| JWT_ACCESS_EXPIRATION | ⚠️ Required | 15m |
| JWT_REFRESH_EXPIRATION | ⚠️ Required | 7d |
| NODE_ENV | ⚠️ Required | Must be "production" |
| AWS_ACCESS_KEY_ID | ⚠️ Required | IAM access key with S3 permissions |
| AWS_SECRET_ACCESS_KEY | ⚠️ Required | IAM secret |
| AWS_S3_BUCKET_NAME | ⚠️ Required | `iamatrust-client-documents` |
| AWS_REGION | ⚠️ Required | e.g., `us-east-1` |
| SMTP_HOST | ⚠️ Required | smtp.gmail.com |
| SMTP_PORT | ⚠️ Required | 587 |
| SMTP_USER | ❌ Update Required | Replace with actual email |
| SMTP_PASS | ❌ Update Required | Generate Gmail App Password |
| EMAIL_FROM | ⚠️ Required | noreply@generationcatalyst.com |
| FRONTEND_URL | ❌ Update Required | Use your Vercel URL |

## Gmail App-Specific Password Setup

If you're using Gmail for SMTP:

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication (required)
3. Go to "2-Step Verification" → "App passwords"
4. Generate a new app password for "Mail"
5. Use this 16-character password as `SMTP_PASS`

## After Adding Environment Variables

1. **Trigger a Redeploy**:
   - Go to your Vercel dashboard
   - Click on the latest deployment
   - Click "Redeploy"
   - Choose "Use existing Build Cache" → "No"

2. **Verify Variables Are Set**:
   - Go to Settings → Environment Variables
   - Ensure all 12 variables are listed

3. **Check Function Logs**:
   - After deployment, go to Functions tab
   - Check logs for any environment variable errors

## Common Issues and Solutions

### Issue: "JWT_ACCESS_SECRET is not defined"
**Solution**: The variable name must match EXACTLY (case-sensitive)

### Issue: "Cannot connect to database"
**Solution**: Verify DATABASE_URL is properly formatted and Neon database is active

### Issue: "Failed to upload file" for document uploads
**Solution**: Confirm all AWS S3 environment variables are set, redeploy, and ensure the IAM user has access to `iamatrust-client-documents`

### Issue: Email sending fails
**Solution**: Ensure Gmail App Password is used (not regular password) and 2FA is enabled

### Issue: CORS errors
**Solution**: Update FRONTEND_URL to match your actual Vercel deployment URL

## Security Notes

⚠️ **NEVER** commit these values to Git
⚠️ **NEVER** share JWT secrets publicly
⚠️ Regularly rotate JWT secrets in production
⚠️ Use different JWT secrets for development vs production (optional but recommended)

---

**Next Steps**:
1. Add all environment variables to Vercel
2. Update placeholder values (SMTP_USER, SMTP_PASS, FRONTEND_URL)
3. Redeploy your application
4. Test authentication and email functionality
