import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabaseServer } from './supabase-server'

// Validate required environment variables
const requiredEnvVars = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
}

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '))
  if (process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: "openid email profile"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and user data to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.id || user?.id
        token.picture = profile?.picture || user?.image
        token.name = profile?.name || user?.name
        token.email = profile?.email || user?.email
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user data from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id
      session.user.image = token.picture
      session.user.name = token.name
      session.user.email = token.email
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Check if user already exists in Supabase
        const { data: existingUser, error: fetchError } = await supabaseServer
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single()

        // If user doesn't exist, create a new user record
        if (fetchError && fetchError.code === 'PGRST116') { // PGRST116 = no rows returned
          const { error: insertError } = await supabaseServer
            .from('users')
            .insert({
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              provider: account.provider,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })

          if (insertError) {
            console.error('Error creating user in Supabase:', insertError)
            // Don't block sign-in if database insert fails
          } else {
            console.log('New user created in Supabase:', user.email)
          }
        } else if (fetchError) {
          console.error('Error checking user existence:', fetchError)
          // Don't block sign-in if database check fails
        } else {
          // User exists, update their last login time
          const { error: updateError } = await supabaseServer
            .from('users')
            .update({ 
              updated_at: new Date().toISOString(),
              last_login: new Date().toISOString()
            })
            .eq('id', user.id)

          if (updateError) {
            console.error('Error updating user login time:', updateError)
          }
        }
      } catch (error) {
        console.error('Unexpected error in signIn callback:', error)
        // Don't block sign-in if there's an unexpected error
      }

      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
}

export default NextAuth(authOptions)
