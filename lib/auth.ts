"use server"

import { cookies } from "next/headers"
import { sql } from "@/lib/db"

const ADMIN_EMAIL = "ikrashahmed67@gmail.com"

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + process.env.POSTGRES_PASSWORD) // Using env as salt
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

function checkRateLimit(email: string): { allowed: boolean; message?: string } {
  const now = Date.now()
  const attempt = loginAttempts.get(email)

  if (attempt) {
    if (now - attempt.lastAttempt > LOCKOUT_TIME) {
      loginAttempts.delete(email)
    } else if (attempt.count >= MAX_ATTEMPTS) {
      const remainingTime = Math.ceil((LOCKOUT_TIME - (now - attempt.lastAttempt)) / 60000)
      return { allowed: false, message: `Too many attempts. Please try again in ${remainingTime} minutes.` }
    }
  }
  return { allowed: true }
}

function recordLoginAttempt(email: string, success: boolean) {
  if (success) {
    loginAttempts.delete(email)
  } else {
    const attempt = loginAttempts.get(email) || { count: 0, lastAttempt: Date.now() }
    loginAttempts.set(email, { count: attempt.count + 1, lastAttempt: Date.now() })
  }
}

function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim()
}

export type User = {
  id: number
  email: string
  name: string | null
  phone: string | null
  address: string | null
  city: string | null
  google_location: string | null
  isAdmin: boolean
}

export async function signup(
  email: string,
  name: string,
  password: string,
): Promise<{ success: boolean; error?: string; user?: User }> {
  const sanitizedEmail = sanitizeInput(email).toLowerCase()
  const sanitizedName = sanitizeInput(name)

  if (!sanitizedEmail || !sanitizedEmail.includes("@") || !sanitizedEmail.includes(".")) {
    return { success: false, error: "Please enter a valid email address" }
  }

  if (!sanitizedName || sanitizedName.length < 2) {
    return { success: false, error: "Please enter your name (at least 2 characters)" }
  }

  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" }
  }

  try {
    const existingUsers = await sql`SELECT * FROM users WHERE email = ${sanitizedEmail}`
    if (existingUsers.length > 0) {
      return { success: false, error: "An account with this email already exists. Please login instead." }
    }

    const passwordHash = await hashPassword(password)

    const result = await sql`
      INSERT INTO users (email, name, password_hash)
      VALUES (${sanitizedEmail}, ${sanitizedName}, ${passwordHash})
      RETURNING *
    `

    const newUser = result[0]

    const cookieStore = await cookies()
    cookieStore.set("user_email", sanitizedEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        phone: newUser.phone,
        address: newUser.address,
        city: newUser.city,
        google_location: newUser.google_location,
        isAdmin: sanitizedEmail === ADMIN_EMAIL.toLowerCase(),
      },
    }
  } catch (error) {
    console.error("Signup error:", error)
    return { success: false, error: "Failed to create account. Please try again." }
  }
}

export async function login(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string; user?: User }> {
  const sanitizedEmail = sanitizeInput(email).toLowerCase()

  if (!sanitizedEmail || !sanitizedEmail.includes("@")) {
    return { success: false, error: "Please enter a valid email" }
  }

  const rateCheck = checkRateLimit(sanitizedEmail)
  if (!rateCheck.allowed) {
    return { success: false, error: rateCheck.message }
  }

  try {
    const users = await sql`SELECT * FROM users WHERE email = ${sanitizedEmail}`

    if (users.length === 0) {
      recordLoginAttempt(sanitizedEmail, false)
      return { success: false, error: "No account found with this email. Please sign up first." }
    }

    const dbUser = users[0]

    const isValidPassword = await verifyPassword(password, dbUser.password_hash || "")
    if (!isValidPassword && dbUser.password_hash) {
      recordLoginAttempt(sanitizedEmail, false)
      return { success: false, error: "Incorrect password. Please try again." }
    }

    recordLoginAttempt(sanitizedEmail, true)

    const cookieStore = await cookies()
    cookieStore.set("user_email", sanitizedEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return {
      success: true,
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        phone: dbUser.phone,
        address: dbUser.address,
        city: dbUser.city,
        google_location: dbUser.google_location,
        isAdmin: sanitizedEmail === ADMIN_EMAIL.toLowerCase(),
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed. Please try again." }
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("user_email")
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const email = cookieStore.get("user_email")?.value

  if (!email) return null

  try {
    const users = await sql`SELECT * FROM users WHERE email = ${email.toLowerCase()}`

    if (users.length === 0) {
      // User cookie exists but not in DB - clear cookie
      const cookieStore = await cookies()
      cookieStore.delete("user_email")
      return null
    }

    const dbUser = users[0]
    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      phone: dbUser.phone,
      address: dbUser.address,
      city: dbUser.city,
      google_location: dbUser.google_location,
      isAdmin: email.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    }
  } catch (error) {
    return {
      email,
      id: 0,
      name: null,
      phone: null,
      address: null,
      city: null,
      google_location: null,
      isAdmin: email.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
    }
  }
}

export async function updateUserProfile(data: {
  name?: string
  phone?: string
  address?: string
  city?: string
  google_location?: string
}): Promise<{ success: boolean; error?: string }> {
  const cookieStore = await cookies()
  const email = cookieStore.get("user_email")?.value

  if (!email) {
    return { success: false, error: "Not logged in" }
  }

  try {
    await sql`
      UPDATE users SET
        name = COALESCE(${data.name}, name),
        phone = COALESCE(${data.phone}, phone),
        address = COALESCE(${data.address}, address),
        city = COALESCE(${data.city}, city),
        google_location = COALESCE(${data.google_location}, google_location),
        updated_at = CURRENT_TIMESTAMP
      WHERE email = ${email.toLowerCase()}
    `
    return { success: true }
  } catch (error) {
    return { success: false, error: "Failed to update profile" }
  }
}

export async function getUserOrders(): Promise<any[]> {
  const cookieStore = await cookies()
  const email = cookieStore.get("user_email")?.value

  if (!email) return []

  try {
    const orders = await sql`
      SELECT * FROM orders 
      WHERE customer_email = ${email.toLowerCase()}
      ORDER BY created_at DESC
    `
    return orders
  } catch (error) {
    return []
  }
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser()
  return user?.isAdmin ?? false
}
