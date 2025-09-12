import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// For server-side operations, we need the service role key
// This should only be used in server-side code (API routes, auth callbacks, etc.)
if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Supabase server environment variables are not set. Please check your .env.local file.')
}

export const supabaseServer = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-service-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)
