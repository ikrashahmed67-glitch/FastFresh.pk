import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartPage } from "@/components/cart-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Cart - FastFresh",
  description: "View your shopping cart and proceed to checkout.",
}

export default function Cart() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
