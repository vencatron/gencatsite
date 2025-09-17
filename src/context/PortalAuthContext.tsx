import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type PortalUser = {
  id: string
  email: string
  name: string
}

type AuthContextShape = {
  user: PortalUser | null
  isAuthenticated: boolean
  login: (email: string, _password: string) => Promise<PortalUser>
  logout: () => void
}

const AuthContext = createContext<AuthContextShape | undefined>(undefined)

const STORAGE_KEY = 'portal_user'

export const PortalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PortalUser | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      setUser(null)
    }
  }, [])

  const login = async (email: string, _password: string) => {
    // Simulated login — accept any email pw combo
    const u: PortalUser = {
      id: `u_${Date.now()}`,
      email,
      name: email.split('@')[0] || 'Client',
    }
    setUser(u)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    return u
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const usePortalAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('usePortalAuth must be used within PortalAuthProvider')
  return ctx
}

