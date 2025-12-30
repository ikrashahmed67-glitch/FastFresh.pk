"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, MapPin, Phone, Mail, ChevronDown, ChevronUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateOrderStatus } from "@/app/actions"
import type { Order } from "@/lib/db"

type OrdersTableProps = {
  orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter()
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null)

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
        <p className="text-muted-foreground">Orders will appear here when customers make purchases.</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const handleStatusChange = async (orderId: number, status: string) => {
    await updateOrderStatus(orderId, status)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="border border-border rounded-lg overflow-hidden">
          <div
            className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="font-bold text-lg">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-PK", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-lg text-primary">Rs. {order.total_amount}</p>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(order.status)}`}>
                    {order.status || "Pending"}
                  </Badge>
                </div>
                {expandedOrder === order.id ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>

          {expandedOrder === order.id && (
            <div className="border-t border-border p-4 bg-accent/30 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Customer Details</h4>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium">{order.customer_name}</p>
                    <p className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {order.customer_phone}
                    </p>
                    {order.customer_email && (
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {order.customer_email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delivery Address</h4>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3 mt-1 flex-shrink-0" />
                      {order.delivery_address}
                    </p>
                    {order.google_location && (
                      <a
                        href={order.google_location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View on Google Maps
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <span className="text-sm font-medium">Update Status:</span>
                <Select
                  defaultValue={order.status || "pending"}
                  onValueChange={(value) => handleStatusChange(order.id, value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
