'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (provider = 'google') => {
    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const redirectToLogin = () => {
    router.push('/auth/signin')
  }

  return {
    user: session?.user,
    session,
    isLoading: status === 'loading',
    isAuthenticated: !!session,
    login,
    logout,
    redirectToLogin,
  }
}
