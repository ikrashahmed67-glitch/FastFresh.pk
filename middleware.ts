import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers to prevent common attacks
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)")

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const userEmail = request.cookies.get("user_email")?.value
    if (!userEmail || userEmail.toLowerCase() !== "ikrashahmed67@gmail.com") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Require login for checkout
  if (request.nextUrl.pathname.startsWith("/checkout")) {
    const userEmail = request.cookies.get("user_email")?.value
    if (!userEmail) {
      return NextResponse.redirect(new URL("/login?redirect=checkout", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
