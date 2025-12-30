import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carrot,
  Apple,
  Milk,
  Fish,
  Croissant,
  Wheat,
  Droplets,
  Flame,
  Cookie,
  Coffee,
  Home,
  Sparkles,
} from "lucide-react"

const categories = [
  { name: "Vegetables", slug: "vegetables", icon: Carrot },
  { name: "Fruits", slug: "fruits", icon: Apple },
  { name: "Dairy & Eggs", slug: "dairy-eggs", icon: Milk },
  { name: "Meat & Fish", slug: "meat-fish", icon: Fish },
  { name: "Bakery", slug: "bakery", icon: Croissant },
  { name: "Rice & Flour", slug: "rice-flour", icon: Wheat },
  { name: "Cooking Oil", slug: "cooking-oil", icon: Droplets },
  { name: "Spices", slug: "spices", icon: Flame },
  { name: "Snacks", slug: "snacks", icon: Cookie },
]

export function CategoriesSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Shop by Category</h2>
          <p className="text-muted-foreground">Browse our wide range of fresh products</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.slug} href={`/category/${category.slug}`}>
                <Card className="hover:border-primary hover:shadow-md transition-all cursor-pointer h-full">
                  <CardContent className="p-3 md:p-4 flex flex-col items-center text-center">
                    <div className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                      <Icon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <span className="text-xs md:text-sm font-medium">{category.name}</span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
