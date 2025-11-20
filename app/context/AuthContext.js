'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('usuario')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (email) => {
    const userData = { email, logado: true }
    setUser(userData)
    localStorage.setItem('usuario', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('usuario')
  }

  const getInitials = (email) => {
    if (!email) return ''
    const name = email.split('@')[0]
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, getInitials }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
