"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Minus, Plus, Truck, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/db"

type ProductDetailProps = {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0
  const finalPrice = product.sale_price || product.price

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg?height=600&width=600&query=fresh grocery product"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.is_new && <Badge className="bg-primary text-primary-foreground">New</Badge>}
            {product.is_on_sale && discount > 0 && <Badge variant="destructive">-{discount}% OFF</Badge>}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            {product.category_name && <p className="text-sm text-muted-foreground mb-2">{product.category_name}</p>}
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">Rs. {finalPrice}</span>
              {product.sale_price && (
                <span className="text-xl text-muted-foreground line-through">Rs. {product.price}</span>
              )}
              <span className="text-muted-foreground">/ {product.unit}</span>
            </div>
          </div>

          {product.description && <p className="text-muted-foreground leading-relaxed">{product.description}</p>}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - Rs. {(finalPrice * quantity).toFixed(0)}
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Truck className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-sm">Free Delivery</h4>
                  <p className="text-xs text-muted-foreground">On orders above Rs. 2000</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-3 p-4">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h4 className="font-semibold text-sm">Quality Guaranteed</h4>
                  <p className="text-xs text-muted-foreground">100% fresh products</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <p className="text-sm">
              <strong>Delivery:</strong> Available in Multan only. Rs. 200 delivery charge (Free on orders above Rs.
              2000)
            </p>
            <p className="text-sm mt-1">
              <strong>Hours:</strong> Mon-Sun 8AM - 10PM
            </p>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
