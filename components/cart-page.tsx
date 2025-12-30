"use client"

import Link from "next/link"
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"

export function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { isLoggedIn } = useAuth()

  const deliveryCharge = total >= 2000 ? 0 : 200
  const grandTotal = total + deliveryCharge

  if (items.length === 0) {
    return (
      <div className="w-full px-3 sm:px-4 md:px-6 lg:container lg:mx-auto py-16 text-center">
        <ShoppingCart className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like you have not added any products to your cart yet. Start shopping now!
        </p>
        <Button asChild size="lg">
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full px-3 sm:px-4 md:px-6 lg:container lg:mx-auto py-6 sm:py-8">
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4 sm:mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-20 w-20 sm:h-24 sm:w-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image_url && (
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base sm:text-lg truncate">{item.name}</h3>
                        <p className="text-primary font-bold text-base sm:text-lg">Rs. {item.price}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Unit: {item.unit || "piece"}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive h-8 w-8 flex-shrink-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 sm:h-8 sm:w-8 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-semibold text-base sm:text-lg">
                        Rs. {(item.price * item.quantity).toFixed(0)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto bg-transparent">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span className="font-medium">Rs. {total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Delivery (Multan only)</span>
                  <span className={deliveryCharge === 0 ? "text-primary font-medium" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `Rs. ${deliveryCharge}`}
                  </span>
                </div>
              </div>

              {total < 2000 && (
                <div className="bg-accent p-2 sm:p-3 rounded-lg flex items-start gap-2">
                  <Truck className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm">
                    Add <span className="font-bold">Rs. {(2000 - total).toFixed(0)}</span> more for FREE delivery!
                  </p>
                </div>
              )}

              <div className="border-t border-border pt-3 sm:pt-4">
                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">Rs. {grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link href={isLoggedIn ? "/checkout" : "/login?redirect=/checkout"}>
                  {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
                </Link>
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Delivery available in Multan only. Mon-Sun 8AM-10PM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
