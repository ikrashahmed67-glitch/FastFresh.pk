"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Package, MapPin, Phone, Mail, LogOut, Edit2, Save, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { logout, updateUserProfile } from "@/lib/auth"
import { useAuth } from "@/components/auth-provider"

type AccountDetailsProps = {
  user: {
    id: number
    email: string
    name: string | null
    phone: string | null
    address: string | null
    city: string | null
    google_location: string | null
    isAdmin: boolean
  }
  orders: any[]
}

export function AccountDetails({ user, orders }: AccountDetailsProps) {
  const router = useRouter()
  const { setUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "Multan",
    google_location: user.google_location || "",
  })

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  const handleSave = async () => {
    setLoading(true)
    const result = await updateUserProfile(formData)
    if (result.success) {
      setEditing(false)
      router.refresh()
    }
    setLoading(false)
  }

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
          setFormData({ ...formData, google_location: googleMapsUrl })
        },
        (error) => {
          alert("Unable to get location. Please enable location services.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Account</h1>
          <p className="text-muted-foreground">Manage your profile and view orders</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <Package className="h-4 w-4" />
            Orders ({orders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your account details and delivery address</CardDescription>
              </div>
              {!editing ? (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)} className="gap-2">
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditing(false)} className="gap-2">
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={loading} className="gap-2">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </Label>
                  <Input value={user.email} disabled className="bg-muted" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Full Name
                  </Label>
                  {editing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  ) : (
                    <Input value={formData.name || "Not set"} disabled className="bg-muted" />
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone Number
                  </Label>
                  {editing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="03XX XXXXXXX"
                    />
                  ) : (
                    <Input value={formData.phone || "Not set"} disabled className="bg-muted" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input value={formData.city} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">Delivery available in Multan only</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Delivery Address
                </Label>
                {editing ? (
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House/Flat no, Street, Area, Landmark..."
                    rows={3}
                  />
                ) : (
                  <Textarea value={formData.address || "Not set"} disabled className="bg-muted" rows={3} />
                )}
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Google Maps Location
                </Label>
                {editing ? (
                  <div className="flex gap-2">
                    <Input
                      value={formData.google_location}
                      onChange={(e) => setFormData({ ...formData, google_location: e.target.value })}
                      placeholder="Google Maps link"
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={handleGetLocation}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Get Location
                    </Button>
                  </div>
                ) : (
                  <Input value={formData.google_location || "Not set"} disabled className="bg-muted" />
                )}
                <p className="text-xs text-muted-foreground">Click "Get Location" to auto-fill your current location</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All your past orders from FastFresh</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                  <Button asChild>
                    <a href="/shop">Browse Products</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("en-PK", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={order.status === "delivered" ? "default" : "secondary"}>
                            {order.status || "Pending"}
                          </Badge>
                          <p className="text-lg font-bold text-primary mt-1">Rs. {order.total_amount}</p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {order.delivery_address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
