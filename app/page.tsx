import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { ProductsSection } from "@/components/products-section"
import { getFeaturedProducts, getNewProducts, getOnSaleProducts } from "@/app/actions"

export default async function HomePage() {
  const [featuredProducts, newProducts, saleProducts] = await Promise.all([
    getFeaturedProducts(),
    getNewProducts(),
    getOnSaleProducts(),
  ])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <ProductsSection
          title="Featured Products"
          subtitle="Hand-picked quality products for you"
          products={featuredProducts}
        />
        <div className="bg-accent/50">
          <ProductsSection title="New Arrivals" subtitle="Fresh additions to our collection" products={newProducts} />
        </div>
        <ProductsSection title="On Sale" subtitle="Great deals on quality products" products={saleProducts} />
      </main>
      <Footer />
    </div>
  )
}
