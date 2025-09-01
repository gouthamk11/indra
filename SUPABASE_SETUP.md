# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key

## 2. Create the Database Table

Run this SQL in your Supabase SQL editor:

```sql
-- Create api_keys table
CREATE TABLE api_keys (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL DEFAULT 'dev',
  key VARCHAR(255) NOT NULL UNIQUE,
  usage INTEGER DEFAULT 0,
  monthly_limit INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX idx_api_keys_created_at ON api_keys(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can customize this based on your needs)
CREATE POLICY "Allow all operations" ON api_keys FOR ALL USING (true);
```

## 3. Environment Variables

Create a `.env.local` file in your project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace the values with your actual Supabase project URL and anon key.

## 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/dashboards`
3. Try creating, editing, and deleting API keys
4. Check your Supabase dashboard to see the data being stored

## 5. Security Considerations

- The current setup allows all operations. In production, you should implement proper authentication and authorization
- Consider adding user-specific policies to the RLS policies
- Store sensitive data like API keys securely
- Implement rate limiting for API endpoints

## 6. Database Schema

The `api_keys` table has the following structure:

- `id`: Primary key (auto-incrementing)
- `name`: API key name/identifier
- `type`: Key type (dev/live)
- `key`: The actual API key value
- `usage`: Current usage count
- `monthly_limit`: Optional monthly usage limit
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp
