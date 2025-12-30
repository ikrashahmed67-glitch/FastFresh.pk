"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, User, Menu, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { logout } from "@/lib/auth"

const categories = [
  { name: "Vegetables", slug: "vegetables" },
  { name: "Fruits", slug: "fruits" },
  { name: "Dairy & Eggs", slug: "dairy-eggs" },
  { name: "Meat & Fish", slug: "meat-fish" },
  { name: "Bakery", slug: "bakery" },
  { name: "Rice & Flour", slug: "rice-flour" },
  { name: "Cooking Oil", slug: "cooking-oil" },
  { name: "Spices", slug: "spices" },
]

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const { items, total } = useCart()
  const { user, setUser, isLoggedIn } = useAuth()
  const router = useRouter()
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0)

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setShowMobileSearch(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <p className="text-xs sm:text-sm">Delivery in Multan Only | Mon-Sun 8AM-10PM</p>
          <p className="hidden md:block text-balance font-medium">Free Delivery on Orders Above Rs. 2000!</p>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="hidden sm:inline text-xs">{user?.email}</span>
                {user?.isAdmin && (
                  <Link href="/admin" className="hover:underline font-medium">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="hover:underline flex items-center gap-1">
                  <LogOut className="h-3 w-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:underline flex items-center gap-1">
                <LogIn className="h-3 w-3" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="p-6 border-b border-border">
                <Link href="/" className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">FF</span>
                  </div>
                  <span className="font-bold text-xl text-primary">FastFresh</span>
                </Link>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="block px-4 py-3 rounded-lg hover:bg-accent transition-colors font-medium"
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                  <li className="border-t border-border pt-2 mt-2">
                    <p className="px-4 py-2 text-sm text-muted-foreground font-medium">Categories</p>
                  </li>
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <SheetClose asChild>
                        <Link
                          href={`/category/${category.slug}`}
                          className="block px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                        >
                          {category.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">FF</span>
            </div>
            <span className="font-bold text-xl md:text-2xl text-primary hidden sm:block">FastFresh</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for fresh groceries..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Link href={isLoggedIn ? "/account" : "/login"}>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
          </div>
        </div>

        {showMobileSearch && (
          <form onSubmit={handleSearch} className="mt-3 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for fresh groceries..."
                className="pl-10 pr-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </form>
        )}
      </div>

      <nav className="border-t border-border hidden lg:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto py-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-md transition-colors whitespace-nowrap"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
