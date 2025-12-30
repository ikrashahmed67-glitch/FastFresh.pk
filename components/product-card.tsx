"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/db"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-square bg-muted">
          <Image
            src={product.image_url || "/placeholder.svg?height=300&width=300&query=fresh grocery"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.is_new && <Badge className="bg-primary text-primary-foreground">New</Badge>}
            {product.is_on_sale && discount > 0 && <Badge variant="destructive">-{discount}%</Badge>}
          </div>
        </div>
      </Link>
      <CardContent className="p-3 md:p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category_name}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {product.sale_price ? (
            <>
              <span className="font-bold text-primary">Rs. {product.sale_price}</span>
              <span className="text-xs text-muted-foreground line-through">Rs. {product.price}</span>
            </>
          ) : (
            <span className="font-bold text-primary">Rs. {product.price}</span>
          )}
          <span className="text-xs text-muted-foreground">/ {product.unit}</span>
        </div>
        <Button
          className="w-full"
          size="sm"
          onClick={(e) => {
            e.preventDefault()
            addItem(product)
          }}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </CardContent>
    </Card>
  )
}
