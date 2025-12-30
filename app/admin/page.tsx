import { redirect } from "next/navigation"
import { getProducts, getCategories, getOrders } from "@/app/actions"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { isAdmin, getCurrentUser } from "@/lib/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - FastFresh",
  description: "Manage your FastFresh grocery store products, orders, and inventory.",
}

export default async function AdminPage() {
  const user = await getCurrentUser()
  const adminAccess = await isAdmin()

  if (!user || !adminAccess) {
    redirect("/login?redirect=/admin")
  }

  const [products, categories, orders] = await Promise.all([getProducts(), getCategories(), getOrders()])

  return <AdminDashboard initialProducts={products} categories={categories} orders={orders} />
}
