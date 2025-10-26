import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { apiService, User as ApiUser } from '@/services/api'

export type PortalUser = {
  id: string
  email: string
  name: string
  username?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  role?: string
}

type AuthContextShape = {
  user: PortalUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<PortalUser>
  register: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string
  ) => Promise<any>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextShape | undefined>(undefined)

// Convert API User to Portal User
const convertToPortalUser = (apiUser: ApiUser): PortalUser => {
  const portalUser: PortalUser = {
    id: apiUser.id.toString(),
    email: apiUser.email,
    name: apiUser.firstName && apiUser.lastName 
      ? `${apiUser.firstName} ${apiUser.lastName}`
      : apiUser.firstName || apiUser.lastName || apiUser.username
  }

  // Only add optional properties if they have values
  if (apiUser.username) portalUser.username = apiUser.username
  if (apiUser.firstName) portalUser.firstName = apiUser.firstName
  if (apiUser.lastName) portalUser.lastName = apiUser.lastName
  if (apiUser.phoneNumber) portalUser.phoneNumber = apiUser.phoneNumber
  if (apiUser.role) portalUser.role = apiUser.role

  return portalUser
}

export const PortalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PortalUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated on mount
  const checkAuth = useCallback(async () => {
    try {
      // Try to get current user from API
      const apiUser = await apiService.getMe()
      if (apiUser) {
        setUser(convertToPortalUser(apiUser))
      }
    } catch (error) {
      // User is not authenticated or token is invalid
      console.log('Not authenticated:', error)
      setUser(null)
      apiService.setAccessToken(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = async (email: string, password: string): Promise<PortalUser> => {
    try {
      const response = await apiService.login(email, password)
      const portalUser = convertToPortalUser(response.user)
      setUser(portalUser)
      return portalUser
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const register = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string
  ): Promise<any> => {
    try {
      const response = await apiService.register(
        username,
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phoneNumber
      )

      // If email verification is not required, set the user
      if (!response.emailVerificationRequired) {
        const portalUser = convertToPortalUser(response.user)
        setUser(portalUser)
      }

      return response
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      apiService.setAccessToken(null)
    }
  }

  const refreshUser = async () => {
    try {
      const apiUser = await apiService.getUserProfile()
      if (apiUser) {
        setUser(convertToPortalUser(apiUser))
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
    }
  }

  const value = useMemo(() => ({ 
    user, 
    isAuthenticated: !!user, 
    isLoading,
    login, 
    register,
    logout,
    refreshUser
  }), [user, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const usePortalAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('usePortalAuth must be used within PortalAuthProvider')
  return ctx
}

