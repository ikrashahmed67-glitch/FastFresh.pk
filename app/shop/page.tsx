import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getProducts, getCategories, searchProducts } from "@/app/actions"
import { ShopFilters } from "@/components/shop-filters"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop Fresh Groceries - FastFresh Multan",
  description:
    "Browse our complete collection of fresh vegetables, fruits, dairy, meat and more. Free delivery on orders above Rs. 2000 in Multan.",
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
  const params = await searchParams
  const searchQuery = params.search || ""
  const categoryFilter = params.category || ""

  const [products, categories] = await Promise.all([
    searchQuery ? searchProducts(searchQuery) : getProducts(),
    getCategories(),
  ])

  // Filter by category if specified
  const filteredProducts = categoryFilter
    ? products.filter((p) => p.category_name?.toLowerCase() === categoryFilter.toLowerCase())
    : products

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Shop Fresh Groceries"}
            </h1>
            <p className="text-muted-foreground">
              {searchQuery
                ? `Found ${filteredProducts.length} products`
                : "Browse our collection of fresh, quality products. Free delivery on orders above Rs. 2000!"}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <ShopFilters categories={categories} />
            </aside>

            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    {searchQuery ? `No products found for "${searchQuery}"` : "No products found"}
                  </p>
                  <a href="/shop" className="text-primary hover:underline">
                    View all products
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
