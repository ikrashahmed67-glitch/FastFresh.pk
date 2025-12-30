"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
  id: number
  email: string
  name: string | null
  phone: string | null
  address: string | null
  city: string | null
  google_location: string | null
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  setUser: (user: User | null) => void
  isLoggedIn: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser: User | null }) {
  const [user, setUser] = useState<User | null>(initialUser)

  return <AuthContext.Provider value={{ user, setUser, isLoggedIn: !!user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
