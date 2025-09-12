# Supabase User Storage Setup Guide

This guide will help you set up automatic user data storage in Supabase when users log in with Google SSO.

## Prerequisites

- Supabase project created
- Google SSO already configured
- Environment variables set up

## Step 1: Set Up Supabase Database

### 1.1 Create the Users Table

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the following SQL to create the users table:

```sql
-- Create users table for storing user authentication data
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Google user ID
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  image TEXT,
  provider TEXT NOT NULL DEFAULT 'google',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id);

CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (auth.role() = 'service_role');

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
```

### 1.2 Get Your Service Role Key

1. In your Supabase dashboard, go to Settings > API
2. Copy the "service_role" key (not the anon key)
3. This key has elevated permissions needed for server-side operations

## Step 2: Update Environment Variables

Add the following to your `.env.local` file:

```env
# Existing variables...
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# NEW: Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## Step 3: How It Works

### 3.1 User Registration Flow

When a user signs in for the first time:

1. **Authentication**: User authenticates with Google
2. **Database Check**: System checks if user exists in Supabase `users` table
3. **User Creation**: If user doesn't exist, creates new record with:
   - `id`: Google user ID
   - `email`: User's email address
   - `name`: User's display name
   - `image`: Profile picture URL
   - `provider`: 'google'
   - `created_at`: Current timestamp
   - `updated_at`: Current timestamp

### 3.2 Returning User Flow

When a returning user signs in:

1. **Authentication**: User authenticates with Google
2. **Database Check**: System finds existing user record
3. **Update**: Updates `updated_at` and `last_login` timestamps

### 3.3 Error Handling

- Database errors don't block user authentication
- All errors are logged to console for debugging
- Users can still sign in even if database operations fail

## Step 4: Database Schema

### Users Table Structure

| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (Primary Key) | Google user ID |
| `email` | TEXT (Unique) | User's email address |
| `name` | TEXT | User's display name |
| `image` | TEXT | Profile picture URL |
| `provider` | TEXT | Authentication provider ('google') |
| `created_at` | TIMESTAMP | When user first signed up |
| `updated_at` | TIMESTAMP | Last profile update |
| `last_login` | TIMESTAMP | Last login time |

### Indexes

- `idx_users_email`: Fast email lookups
- `idx_users_provider`: Filter by authentication provider
- `idx_users_created_at`: Analytics and reporting

### Security

- **Row Level Security (RLS)**: Enabled for data protection
- **Policies**: Users can only view their own data
- **Service Role**: Can manage all user records for authentication

## Step 5: Testing

### 5.1 Test New User Registration

1. Sign out if currently signed in
2. Clear your browser data/cookies
3. Sign in with a Google account
4. Check your Supabase dashboard > Table Editor > users
5. Verify a new record was created

### 5.2 Test Returning User

1. Sign out and sign back in with the same account
2. Check the `updated_at` and `last_login` fields were updated
3. Verify no duplicate records were created

### 5.3 Check Logs

Monitor your application logs for:
- "New user created in Supabase: [email]"
- Any error messages related to database operations

## Step 6: Monitoring and Analytics

### 6.1 User Analytics

You can now query user data for analytics:

```sql
-- Total users
SELECT COUNT(*) FROM users;

-- Users by provider
SELECT provider, COUNT(*) FROM users GROUP BY provider;

-- New users this month
SELECT COUNT(*) FROM users 
WHERE created_at >= DATE_TRUNC('month', NOW());

-- Most active users
SELECT name, email, last_login 
FROM users 
ORDER BY last_login DESC 
LIMIT 10;
```

### 6.2 User Management

You can manage users directly in Supabase:

```sql
-- Update user information
UPDATE users 
SET name = 'New Name' 
WHERE email = 'user@example.com';

-- Delete a user
DELETE FROM users 
WHERE email = 'user@example.com';
```

## Step 7: Production Considerations

### 7.1 Security

- Never expose the service role key in client-side code
- Use environment variables for all sensitive data
- Regularly rotate your service role key

### 7.2 Performance

- The database operations are optimized with indexes
- User creation/updates happen asynchronously
- Authentication is not blocked by database operations

### 7.3 Backup

- Enable automatic backups in Supabase
- Consider exporting user data regularly
- Test your backup restoration process

## Troubleshooting

### Common Issues

1. **"Service role key not found"**
   - Ensure `SUPABASE_SERVICE_ROLE_KEY` is set in `.env.local`
   - Restart your development server after adding the key

2. **"Table 'users' doesn't exist"**
   - Run the SQL migration in your Supabase dashboard
   - Check that the table was created successfully

3. **"Permission denied"**
   - Verify your service role key is correct
   - Check that RLS policies are set up properly

4. **Users not being created**
   - Check browser console for error messages
   - Verify Supabase connection in your dashboard
   - Ensure all environment variables are set

### Debug Mode

Enable debug logging by adding to your `.env.local`:

```env
NEXTAUTH_DEBUG=true
```

This will show detailed authentication flow information in your console.

## Next Steps

- Set up user profile management
- Add user preferences and settings
- Implement user roles and permissions
- Create user analytics dashboard
- Set up email notifications for new users
