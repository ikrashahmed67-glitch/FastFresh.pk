"use client"

import { useState, useTransition } from "react"
import { Pencil, Trash2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteProduct } from "@/app/actions"
import type { Product } from "@/lib/db"

type ProductsTableProps = {
  products: Product[]
  onEdit: (product: Product) => void
}

export function ProductsTable({ products, onEdit }: ProductsTableProps) {
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (!deleteId) return

    startTransition(async () => {
      await deleteProduct(deleteId)
      setDeleteId(null)
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No products yet</h3>
        <p className="text-muted-foreground">Add your first product to get started.</p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Product</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">
                Category
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Price</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden md:table-cell">
                Stock
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden lg:table-cell">
                Status
              </th>
              <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border hover:bg-accent/50">
                <td className="py-3 px-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-muted rounded-md flex-shrink-0 hidden sm:block" />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{product.category_name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-sm hidden sm:table-cell">{product.category_name}</td>
                <td className="py-3 px-2">
                  <div>
                    <p className="font-medium text-sm text-primary">Rs. {product.sale_price || product.price}</p>
                    {product.sale_price && (
                      <p className="text-xs text-muted-foreground line-through">Rs. {product.price}</p>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2 hidden md:table-cell">
                  <span
                    className={`text-sm ${product.stock_quantity < 10 ? "text-destructive font-medium" : "text-muted-foreground"}`}
                  >
                    {product.stock_quantity} {product.unit}
                  </span>
                </td>
                <td className="py-3 px-2 hidden lg:table-cell">
                  <div className="flex gap-1 flex-wrap">
                    {product.is_featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                    {product.is_new && <Badge className="text-xs">New</Badge>}
                    {product.is_on_sale && (
                      <Badge variant="destructive" className="text-xs">
                        Sale
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(product)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => setDeleteId(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
