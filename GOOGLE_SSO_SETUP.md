# Google SSO Setup Guide

This guide will walk you through setting up Google Single Sign-On (SSO) for your Next.js application.

## Prerequisites

- A Google Cloud Platform account
- A Next.js application (already set up)
- Node.js and npm/yarn installed

## Step 1: Create Google OAuth Credentials

### 1.1 Go to Google Cloud Console
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

### 1.2 Enable Google+ API
1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" and enable it
3. Also enable "Google OAuth2 API" if available

### 1.3 Create OAuth 2.0 Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add the following authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
5. Click "Create"
6. Copy the **Client ID** and **Client Secret** - you'll need these for your environment variables

## Step 2: Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Supabase Configuration (for storing user data)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### Generate NEXTAUTH_SECRET
You can generate a secure secret using:
```bash
openssl rand -base64 32
```

Or use an online generator like: https://generate-secret.vercel.app/32

## Step 3: Project Structure

The following files have been created/modified for Google SSO:

```
indra/
├── lib/
│   └── auth.js                    # NextAuth configuration
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.js       # NextAuth API routes
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.js           # Custom sign-in page
│   │   └── error/
│   │       └── page.js           # Error handling page
│   ├── auth-protected/
│   │   └── page.js               # Example protected page
│   ├── layout.js                 # Updated with SessionProvider
│   └── page.js                   # Updated with login button
├── components/
│   └── SessionProvider.js        # Session provider wrapper
├── hooks/
│   └── useAuth.js                # Authentication hook
└── middleware.js                 # Route protection middleware
```

## Step 4: Features Implemented

### ✅ Authentication Flow
- Google OAuth 2.0 integration
- Secure JWT-based sessions
- Automatic token refresh

### ✅ User Interface
- Login button on main page
- User profile display when authenticated
- Sign out functionality
- Loading states and error handling

### ✅ Route Protection
- Middleware-based route protection
- Automatic redirects for unauthenticated users
- Protected route examples

### ✅ Custom Pages
- Custom sign-in page (`/auth/signin`)
- Error handling page (`/auth/error`)
- Protected area example (`/auth-protected`)

### ✅ User Data Storage
- Automatic user registration in Supabase database
- User profile data storage (name, email, image, provider)
- Login tracking and analytics
- Secure server-side database operations

## Step 5: Testing the Implementation

### 5.1 Start the Development Server
```bash
cd indra
yarn dev
```

### 5.2 Test the Flow
1. Visit `http://localhost:3000`
2. Click "Sign in with Google"
3. Complete the Google OAuth flow
4. Verify you're redirected back and see your profile
5. Test the "Protected Area" link
6. Test the sign-out functionality

## Step 6: Production Deployment

### 6.1 Update Environment Variables
For production, update your environment variables:
- Set `NEXTAUTH_URL` to your production domain
- Add your production domain to Google OAuth redirect URIs
- Use production Supabase credentials if applicable

### 6.2 Deploy
Deploy your application to your preferred platform (Vercel, Netlify, etc.)

## Step 7: Additional Configuration Options

### 7.1 Customize User Data Storage
You can extend the authentication to store user data in Supabase:

```javascript
// In lib/auth.js, add to callbacks
async signIn({ user, account, profile }) {
  // Store user in Supabase
  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      updated_at: new Date().toISOString()
    })
  
  return !error
}
```

### 7.2 Add More OAuth Providers
You can add additional providers like GitHub, Facebook, etc.:

```javascript
// In lib/auth.js
import GitHubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  // ... rest of config
}
```

## Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Ensure your redirect URI in Google Console matches exactly: `http://localhost:3000/api/auth/callback/google`

2. **"NEXTAUTH_SECRET not set" error**
   - Make sure you have a `.env.local` file with `NEXTAUTH_SECRET` set

3. **Session not persisting**
   - Check that `NEXTAUTH_URL` is set correctly
   - Ensure cookies are enabled in your browser

4. **CORS errors**
   - Make sure your domain is added to Google OAuth authorized domains

### Debug Mode
Enable debug mode by adding to your `.env.local`:
```env
NEXTAUTH_DEBUG=true
```

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **HTTPS**: Always use HTTPS in production
3. **Secret Management**: Use secure, randomly generated secrets
4. **Token Expiry**: NextAuth handles token refresh automatically
5. **CSRF Protection**: NextAuth includes built-in CSRF protection

## Next Steps

- Customize the user interface to match your brand
- Add user roles and permissions
- Implement user profile management
- Add email verification if needed
- Set up user analytics and monitoring

## Support

If you encounter any issues:
1. Check the [NextAuth.js documentation](https://next-auth.js.org/)
2. Review the [Google OAuth documentation](https://developers.google.com/identity/protocols/oauth2)
3. Check the browser console for error messages
4. Verify all environment variables are set correctly
