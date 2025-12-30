"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, MapPin, Truck, CheckCircle, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { createOrder } from "@/app/actions"

type CheckoutFormProps = {
  userEmail: string
  userName?: string | null
  userPhone?: string | null
  userAddress?: string | null
  userLocation?: string | null
}

const FORMSPREE_URL = "https://formspree.io/f/xjklknvr"

export function CheckoutForm({ userEmail, userName, userPhone, userAddress, userLocation }: CheckoutFormProps) {
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [gettingLocation, setGettingLocation] = useState(false)
  const [locationSuccess, setLocationSuccess] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail,
    phone: userPhone || "",
    city: "Multan",
    address: userAddress || "",
    googleLocation: userLocation || "",
    notes: "",
  })

  const deliveryCharge = total >= 2000 ? 0 : 200
  const grandTotal = total + deliveryCharge

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setGettingLocation(true)
      setLocationSuccess(false)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
          setFormData({ ...formData, googleLocation: googleMapsUrl })
          setGettingLocation(false)
          setLocationSuccess(true)
          setTimeout(() => setLocationSuccess(false), 3000)
        },
        (error) => {
          alert("Unable to get location. Please enable location services or enter manually.")
          setGettingLocation(false)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const orderDetails = items
      .map((item) => `${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`)
      .join("\n")

    const orderData = {
      ...formData,
      orderItems: orderDetails,
      subtotal: `Rs. ${total.toFixed(0)}`,
      deliveryCharge: deliveryCharge === 0 ? "FREE" : `Rs. ${deliveryCharge}`,
      totalAmount: `Rs. ${grandTotal.toFixed(0)}`,
      orderDate: new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }),
    }

    try {
      // Send to Formspree
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      // Also save to database
      await createOrder({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        delivery_address: formData.address,
        city: formData.city,
        google_location: formData.googleLocation,
        total_amount: grandTotal,
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
      })

      if (response.ok) {
        setSuccess(true)
        clearCart()
      } else {
        alert("Failed to submit order. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !success) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products before checkout</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-lg mx-auto text-center">
          <CardContent className="pt-8 pb-8">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. We will contact you shortly to confirm delivery.
            </p>
            <p className="text-sm text-muted-foreground mb-6">Delivery will be made within Multan. Mon-Sun 8AM-10PM</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <Link href="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/account">View My Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="03XX XXXXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={formData.city} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground">Delivery available in Multan only</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="House/Flat no, Street, Area, Landmark..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="googleLocation">Google Maps Location</Label>
                  <div
                    onClick={!gettingLocation && !formData.googleLocation ? handleGetLocation : undefined}
                    className={`relative border-2 border-dashed rounded-lg p-4 transition-all ${
                      formData.googleLocation
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/30 hover:border-primary hover:bg-primary/5 cursor-pointer"
                    }`}
                  >
                    {gettingLocation ? (
                      <div className="flex items-center justify-center gap-3 py-2">
                        <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        <span className="text-muted-foreground">Getting your location...</span>
                      </div>
                    ) : formData.googleLocation ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Location captured successfully!</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            id="googleLocation"
                            value={formData.googleLocation}
                            onChange={(e) => setFormData({ ...formData, googleLocation: e.target.value })}
                            placeholder="Google Maps link"
                            className="flex-1 text-sm"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleGetLocation}
                            className="whitespace-nowrap bg-transparent"
                          >
                            <Navigation className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                        <a
                          href={formData.googleLocation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <MapPin className="h-3 w-3" />
                          View on Google Maps
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 py-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Navigation className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">Click here to get your location</span>
                        <span className="text-xs text-muted-foreground">Your GPS location will appear instantly</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We use your location to ensure accurate delivery. Your location is only used for this order.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions for delivery..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="bg-accent p-4 rounded-lg flex items-start gap-3">
              <Truck className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Delivery Information</p>
                <p className="text-sm text-muted-foreground">
                  Delivery available in Multan only. Orders are delivered Mon-Sun 8AM-10PM.
                  {total < 2000 && ` Add Rs. ${(2000 - total).toFixed(0)} more for free delivery!`}
                </p>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Placing Order...
                </>
              ) : (
                `Place Order - Rs. ${grandTotal.toFixed(0)}`
              )}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="truncate flex-1 mr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="font-medium">Rs. {(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rs. {total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery</span>
                  <span className={deliveryCharge === 0 ? "text-primary font-medium" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `Rs. ${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                  <span>Total</span>
                  <span className="text-primary">Rs. {grandTotal.toFixed(0)}</span>
                </div>
              </div>
              {total < 2000 && (
                <p className="text-xs text-center text-muted-foreground bg-accent p-2 rounded">
                  Add Rs. {(2000 - total).toFixed(0)} more for FREE delivery!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
