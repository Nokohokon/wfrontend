'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'

type User = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (updatedUser: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (Cookies.get('cookie-preferences') === 'true') {
      const storedUser = Cookies.get('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    if (Cookies.get('cookie-preferences') === 'true') {
      Cookies.set('user', JSON.stringify(userData), { expires: 7 })
    }
  }

  const logout = () => {
    setUser(null)
    Cookies.remove('user')
  }

  const updateUser = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser }
      setUser(newUser)
      Cookies.set('user', JSON.stringify(newUser), { expires: 7 })
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

