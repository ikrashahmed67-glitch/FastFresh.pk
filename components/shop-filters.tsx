"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Category } from "@/lib/db"

type ShopFiltersProps = {
  categories: Category[]
}

export function ShopFilters({ categories }: ShopFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Categories</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <ul className="space-y-2">
          <li>
            <Link href="/shop" className="block px-3 py-2 rounded-md hover:bg-accent transition-colors font-medium">
              All Products
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                className="block px-3 py-2 rounded-md hover:bg-accent transition-colors"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
