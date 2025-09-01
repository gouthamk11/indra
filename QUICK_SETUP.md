# Quick Setup Guide

## 🚨 Current Issue
The error you're seeing is because Supabase environment variables are not configured.

## ✅ Quick Fix

### 1. Create Environment File
Create a file called `.env.local` in your project root (`indra/.env.local`) with:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2. Get Your Supabase Credentials

1. **Go to [supabase.com](https://supabase.com)**
2. **Create a new project** (or use existing)
3. **Go to Settings → API**
4. **Copy the values:**
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Create Database Table
In your Supabase dashboard, go to **SQL Editor** and run:

```sql
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

CREATE INDEX idx_api_keys_created_at ON api_keys(created_at);
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations" ON api_keys FOR ALL USING (true);
```

### 4. Restart Your Dev Server
```bash
npm run dev
```

## 🎯 What This Fixes
- ✅ Removes the "supabaseUrl is required" error
- ✅ Connects your dashboard to a real database
- ✅ Enables full CRUD operations
- ✅ Data persists between sessions

## 🔍 Test It
1. Go to `/dashboards`
2. Try creating a new API key
3. Check your Supabase dashboard to see the data

## 📝 Example .env.local
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjU2NzI5NiwiZXhwIjoxOTUyMTQzMjk2fQ.example
```
