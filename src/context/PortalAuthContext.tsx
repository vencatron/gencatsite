import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { apiService, User as ApiUser, ACCESS_TOKEN_STORAGE_KEY } from '@/services/api'

const LAST_ACTIVITY_STORAGE_KEY = 'portalLastActivity'
const SESSION_TIMEOUT_MS = 15 * 60 * 1000
const ACTIVITY_EVENTS: Array<keyof WindowEventMap> = ['click', 'keydown', 'mousemove', 'touchstart']

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

const isBrowser = () => typeof window !== 'undefined'

const getStoredNumber = (key: string) => {
  if (!isBrowser()) return null
  const raw = window.localStorage.getItem(key)
  return raw ? parseInt(raw, 10) : null
}

const storeNumber = (key: string, value: number) => {
  if (!isBrowser()) return
  window.localStorage.setItem(key, value.toString())
}

const removeStoredItem = (key: string) => {
  if (!isBrowser()) return
  window.localStorage.removeItem(key)
}

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
  const lastActivityRef = useRef<number>(getStoredNumber(LAST_ACTIVITY_STORAGE_KEY) ?? Date.now())

  const recordActivity = useCallback(() => {
    const now = Date.now()
    lastActivityRef.current = now
    storeNumber(LAST_ACTIVITY_STORAGE_KEY, now)
  }, [])

  const clearActivity = useCallback(() => {
    lastActivityRef.current = 0
    removeStoredItem(LAST_ACTIVITY_STORAGE_KEY)
  }, [])

  const hydrateAccessToken = useCallback(() => {
    if (!isBrowser()) return
    const storedToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    if (storedToken) {
      apiService.setAccessToken(storedToken)
    }
  }, [])

  // Check if user is authenticated on mount
  const checkAuth = useCallback(async () => {
    setIsLoading(true)
    try {
      // Try to get current user from API
      const apiUser = await apiService.getMe()
      if (apiUser) {
        setUser(convertToPortalUser(apiUser))
        recordActivity()
      }
    } catch (error) {
      // User is not authenticated or token is invalid
      console.log('Not authenticated:', error)
      setUser(null)
      apiService.setAccessToken(null)
      clearActivity()
    } finally {
      setIsLoading(false)
    }
  }, [recordActivity, clearActivity])

  useEffect(() => {
    hydrateAccessToken()
    checkAuth()
  }, [checkAuth, hydrateAccessToken])

  const login = useCallback(async (email: string, password: string): Promise<PortalUser> => {
    try {
      const response = await apiService.login(email, password)
      const portalUser = convertToPortalUser(response.user)
      setUser(portalUser)
      recordActivity()
      return portalUser
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }, [recordActivity])

  const register = useCallback(async (
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
        recordActivity()
      }

      return response
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    }
  }, [recordActivity])

  const logout = useCallback(async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setUser(null)
      apiService.setAccessToken(null)
      clearActivity()
    }
  }, [clearActivity])

  useEffect(() => {
    if (!user) {
      clearActivity()
      return
    }

    if (!isBrowser()) return

    recordActivity()

    const handleActivity = () => recordActivity()
    ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, handleActivity))

    const intervalId = window.setInterval(() => {
      const lastActivity = lastActivityRef.current
      if (!lastActivity) return
      if (Date.now() - lastActivity > SESSION_TIMEOUT_MS) {
        logout().catch((err) => console.error('Auto logout error:', err))
      }
    }, 60000)

    return () => {
      ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, handleActivity))
      window.clearInterval(intervalId)
    }
  }, [user, recordActivity, logout, clearActivity])

  const refreshUser = useCallback(async () => {
    try {
      const apiUser = await apiService.getUserProfile()
      if (apiUser) {
        setUser(convertToPortalUser(apiUser))
        recordActivity()
      }
    } catch (error) {
      console.error('Failed to refresh user:', error)
    }
  }, [recordActivity])

  const value = useMemo(() => ({ 
    user, 
    isAuthenticated: !!user, 
    isLoading,
    login, 
    register,
    logout,
    refreshUser
  }), [user, isLoading, login, register, logout, refreshUser])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const usePortalAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('usePortalAuth must be used within PortalAuthProvider')
  return ctx
}
