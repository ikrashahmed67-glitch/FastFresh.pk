import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - FastFresh Multan",
  description:
    "Get in touch with FastFresh. Contact us for orders, queries, or feedback. We deliver fresh groceries in Multan.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions or need help? We are here for you. Reach out through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <a href="tel:03007902508" className="text-primary hover:underline">
                    0300 7902508
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a href="mailto:ikrashahmed67@gmail.com" className="text-primary hover:underline text-sm">
                    ikrashahmed67@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-muted-foreground">Multan, Pakistan</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Hours</h3>
                  <p className="text-muted-foreground">Mon-Sun: 8AM - 10PM</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Delivery Area</h4>
                      <p className="text-sm text-muted-foreground">
                        We currently deliver only in Multan. Planning to expand soon!
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Delivery Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Monday to Sunday, 8:00 AM to 10:00 PM. Orders placed after 8 PM may be delivered next day.
                      </p>
                    </div>
                  </div>
                  <div className="bg-accent p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Delivery Charges:</strong> Rs. 200 per order
                    </p>
                    <p className="text-sm text-primary font-medium">FREE delivery on orders above Rs. 2000!</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">How do I place an order?</h4>
                    <p className="text-sm text-muted-foreground">
                      Simply browse our products, add to cart, and checkout. You need to login before placing an order.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">What payment methods do you accept?</h4>
                    <p className="text-sm text-muted-foreground">
                      We accept Cash on Delivery (COD). Pay when your order arrives!
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Can I return products?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes! If you are not satisfied with the quality, contact us immediately and we will resolve the
                      issue.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">How fresh are your products?</h4>
                    <p className="text-sm text-muted-foreground">
                      We source fresh products daily from local suppliers. Quality is our top priority!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-accent/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Order?</h2>
            <p className="text-muted-foreground mb-6">
              Browse our fresh collection and get quality groceries delivered to your door.
            </p>
            <a
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
