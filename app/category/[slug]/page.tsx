import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, getCategories } from "@/app/actions"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Truck } from "lucide-react"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${categoryName} - FastFresh Multan`,
    description: `Shop fresh ${categoryName.toLowerCase()} at FastFresh. We provide you with all the fresh and clean equipment. Free delivery on orders above Rs. 2000 in Multan.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const [products, categories] = await Promise.all([getProductsByCategory(slug), getCategories()])

  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h1>
            <p className="text-muted-foreground">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 md:p-4 mb-6 md:mb-8 flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary flex-shrink-0" />
            <p className="text-sm">
              <span className="font-medium">Free delivery</span> on orders above Rs. 2000! Delivery in Multan only.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No products found in this category.</p>
              <Link href="/shop" className="text-primary hover:underline">
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
