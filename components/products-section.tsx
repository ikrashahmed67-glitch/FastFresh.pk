import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/db"

type ProductsSectionProps = {
  title: string
  subtitle?: string
  products: Product[]
}

export function ProductsSection({ title, subtitle, products }: ProductsSectionProps) {
  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
