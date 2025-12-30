import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Truck } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="bg-primary/90 text-primary-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              <span className="font-medium">Free Delivery on Orders Above Rs. 2000!</span>
            </div>
            <span className="hidden sm:inline">|</span>
            <span>Delivery in Multan Only - Rs. 200 delivery charge</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">FF</span>
              </div>
              <span className="font-bold text-xl text-primary">FastFresh</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We provide you with all the fresh and clean equipment. Quality groceries delivered to your doorstep in
              Multan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/vegetables"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Vegetables
                </Link>
              </li>
              <li>
                <Link
                  href="/category/fruits"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Fruits
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dairy-eggs"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link
                  href="/category/meat-fish"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Meat & Fish
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">0320 8684757</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">ikrashahmed67@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Multan, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Mon-Sun: 8AM - 10PM</span>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a target="blank" href="https://www.instagram.com/ikrashrao2009/" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-muted mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} FastFresh. All rights reserved.</p>
          <p className="text-muted-foreground text-xs mt-2">Delivery available in Multan only</p>
        </div>
      </div>
    </footer>
  )
}
