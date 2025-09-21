'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  email: string
  name: string
  loginTime: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = () => {
      const authStatus = localStorage.getItem('adminAuth')
      const userData = localStorage.getItem('adminUser')
      
      if (authStatus === 'true' && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('adminAuth')
          localStorage.removeItem('adminUser')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      const isAdminRoute = pathname?.startsWith('/admin')
      const isLoginPage = pathname === '/admin/login'
      
      if (isAdminRoute && !isLoginPage && !user) {
        router.push('/admin/login')
      } else if (isLoginPage && user) {
        router.push('/admin')
      }
    }
  }, [user, pathname, router, isLoading])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication - in production, use proper authentication
    if (email === 'admin@nextgenregistry.com' && password === 'admin123') {
      const userData = {
        email: email,
        name: 'Admin User',
        loginTime: new Date().toISOString()
      }
      
      localStorage.setItem('adminAuth', 'true')
      localStorage.setItem('adminUser', JSON.stringify(userData))
      setUser(userData)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminUser')
    setUser(null)
    router.push('/admin/login')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
