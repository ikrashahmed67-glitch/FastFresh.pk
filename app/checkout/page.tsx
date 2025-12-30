import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { getCurrentUser } from "@/lib/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout - FastFresh Multan",
  description: "Complete your order. Free delivery on orders above Rs. 2000 in Multan.",
}

export default async function CheckoutPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login?redirect=/checkout")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CheckoutForm
          userEmail={user.email}
          userName={user.name}
          userPhone={user.phone}
          userAddress={user.address}
          userLocation={user.google_location}
        />
      </main>
      <Footer />
    </div>
  )
}
