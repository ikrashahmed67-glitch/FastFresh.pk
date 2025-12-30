import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Truck, Shield, Clock, Users, Leaf, Heart } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - FastFresh Multan",
  description:
    "Learn about FastFresh - We provide you with all the fresh and clean equipment. Quality groceries delivered to your doorstep in Multan.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About FastFresh</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We provide you with all the fresh and clean equipment. Your trusted partner for quality groceries in
              Multan.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  FastFresh was founded with a simple mission: to bring fresh, quality groceries directly to the
                  doorsteps of Multan residents. We understand how important it is to have access to clean, fresh
                  products for your family.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We carefully source our products from trusted local suppliers and farmers to ensure you get the best
                  quality vegetables, fruits, dairy, and meat products every time you order.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment is to provide you with all the fresh and clean equipment you need, delivered right to
                  your door with care and speed.
                </p>
              </div>
              <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary-foreground font-bold text-3xl">FF</span>
                  </div>
                  <p className="text-muted-foreground">Fresh & Clean Equipment</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-accent/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fresh Products</h3>
                <p className="text-muted-foreground text-sm">
                  We source directly from local farms and suppliers to ensure maximum freshness.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-muted-foreground text-sm">
                  100% quality guarantee on all products. Not satisfied? We will make it right.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Same day delivery in Multan. Free delivery on orders above Rs. 2000!
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Convenient Hours</h3>
                <p className="text-muted-foreground text-sm">
                  We are open Mon-Sun from 8AM to 10PM for your convenience.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Local Business</h3>
                <p className="text-muted-foreground text-sm">
                  Proudly serving Multan. We understand local tastes and preferences.
                </p>
              </div>
              <div className="bg-card p-6 rounded-xl border border-border text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Customer First</h3>
                <p className="text-muted-foreground text-sm">
                  Your satisfaction is our priority. Contact us for any concerns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Delivery Information</h2>
              <p className="text-lg mb-6 opacity-90">We deliver fresh groceries to your doorstep in Multan</p>
              <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div>
                  <p className="text-3xl font-bold">Rs. 200</p>
                  <p className="text-sm opacity-80">Delivery Charge</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">FREE</p>
                  <p className="text-sm opacity-80">On orders above Rs. 2000</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">8AM-10PM</p>
                  <p className="text-sm opacity-80">Mon-Sun Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
