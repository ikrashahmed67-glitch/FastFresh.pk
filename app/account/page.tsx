import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountDetails } from "@/components/account-details"
import { getCurrentUser, getUserOrders } from "@/lib/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Account - FastFresh",
  description: "View your account details and order history.",
}

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const orders = await getUserOrders()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <AccountDetails user={user} orders={orders} />
      </main>
      <Footer />
    </div>
  )
}
