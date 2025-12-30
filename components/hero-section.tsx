import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, Shield, Clock } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div className="space-y-4 md:space-y-6 text-center lg:text-left">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Free Delivery on Orders Above Rs. 2000!
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              Fresh Groceries <span className="text-primary">Delivered</span> to Your Door
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              We provide you with all the fresh and clean equipment. Shop from a wide range of quality products at the
              best prices in Multan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Delivery in Multan Only | Mon-Sun 8AM-10PM | Rs. 200 Delivery Charge
            </p>
          </div>
          <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 order-first lg:order-last">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl md:rounded-3xl" />
            <div className="absolute inset-2 md:inset-4 bg-muted rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden">
              <img src="/fresh-vegetables-fruits-groceries-basket.jpg" alt="Fresh Groceries" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Features bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12 lg:mt-16">
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-xl border border-border">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Truck className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Fast Delivery</h3>
              <p className="text-xs text-muted-foreground">Same day in Multan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-xl border border-border">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Quality Guaranteed</h3>
              <p className="text-xs text-muted-foreground">100% fresh products</p>
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-card rounded-xl border border-border">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Open Daily</h3>
              <p className="text-xs text-muted-foreground">8AM - 10PM Mon-Sun</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
