# Vercel Deployment Configuration Error Fix

## The Problem

You're getting a "Configuration" error after deploying to Vercel. This typically means NextAuth.js can't find the required environment variables in production.

## Root Causes

1. **Missing Environment Variables**: Required environment variables not set in Vercel
2. **Incorrect NEXTAUTH_URL**: Production URL not properly configured
3. **Missing Google OAuth Redirect URIs**: Production callback URL not added to Google Console
4. **Supabase Configuration**: Missing service role key in production

## Step-by-Step Fix

### Step 1: Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_nextauth_secret_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### Step 2: Update Google OAuth Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your production redirect URI:
   ```
   https://your-app-name.vercel.app/api/auth/callback/google
   ```
5. Save the changes

### Step 3: Generate a Secure NEXTAUTH_SECRET

Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

### Step 4: Update Your Auth Configuration

Your auth configuration has been updated with better error handling and validation.

### Step 5: Complete Deployment Checklist

#### ✅ Environment Variables in Vercel
- [ ] `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- [ ] `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret
- [ ] `NEXTAUTH_URL` - Your production URL (e.g., https://your-app.vercel.app)
- [ ] `NEXTAUTH_SECRET` - A secure random string (32+ characters)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

#### ✅ Google OAuth Configuration
- [ ] Added production redirect URI: `https://your-app.vercel.app/api/auth/callback/google`
- [ ] Verified client ID and secret match Vercel environment variables

#### ✅ Supabase Configuration
- [ ] Created users table in Supabase
- [ ] Set up Row Level Security policies
- [ ] Verified service role key has proper permissions

### Step 6: Deploy and Test

1. **Redeploy your application:**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment configuration"
   git push
   ```

2. **Test the deployment:**
   - Visit your Vercel URL
   - Try signing in with Google
   - Check if user data is stored in Supabase

### Step 7: Troubleshooting

#### Common Issues and Solutions

**Issue: "Configuration" error persists**
- Check Vercel environment variables are set correctly
- Verify `NEXTAUTH_URL` matches your production domain exactly
- Ensure Google OAuth redirect URI is added

**Issue: "Invalid redirect URI" error**
- Add `https://your-app.vercel.app/api/auth/callback/google` to Google Console
- Remove any trailing slashes from URLs

**Issue: Supabase connection errors**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set (not the anon key)
- Check if users table exists in Supabase
- Verify RLS policies are configured

**Issue: Environment variables not loading**
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)
- Ensure no extra spaces in variable values

### Step 8: Production Security Checklist

- [ ] Use strong, unique `NEXTAUTH_SECRET`
- [ ] Never commit environment variables to git
- [ ] Use service role key only for server-side operations
- [ ] Enable Row Level Security in Supabase
- [ ] Regularly rotate secrets and keys
- [ ] Monitor authentication logs

### Step 9: Monitoring

After deployment, monitor:
- Authentication success/failure rates
- User registration in Supabase
- Error logs in Vercel dashboard
- Google OAuth usage in Google Console

## Quick Fix Commands

If you need to quickly redeploy with fixes:

```bash
# 1. Add all changes
git add .

# 2. Commit with descriptive message
git commit -m "Fix Vercel deployment: Add environment validation and error handling"

# 3. Push to trigger redeploy
git push origin main
```

## Environment Variables Template

Copy this template and fill in your actual values in Vercel:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your_32_character_secret_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Support

If you continue to have issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test Google OAuth configuration
4. Check Supabase connection
5. Review the error messages in browser console
