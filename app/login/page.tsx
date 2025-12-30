import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"
import { getCurrentUser } from "@/lib/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - FastFresh",
  description: "Login to your FastFresh account to place orders and track deliveries.",
}

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) {
    redirect("/account")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
