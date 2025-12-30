"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { createProduct, updateProduct } from "@/app/actions"
import type { Category, Product } from "@/lib/db"

type ProductFormProps = {
  categories: Category[]
  product?: Product | null
  onClose: () => void
}

export function ProductForm({ categories, product, onClose }: ProductFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    sale_price: product?.sale_price?.toString() || "",
    image_url: product?.image_url || "",
    category_id: product?.category_id?.toString() || "",
    stock_quantity: product?.stock_quantity?.toString() || "0",
    unit: product?.unit || "piece",
    is_featured: product?.is_featured || false,
    is_new: product?.is_new || false,
    is_on_sale: product?.is_on_sale || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.name || !formData.price || !formData.category_id) {
      setError("Please fill in all required fields")
      return
    }

    startTransition(async () => {
      try {
        const data = {
          name: formData.name,
          description: formData.description,
          price: Number.parseFloat(formData.price),
          sale_price: formData.sale_price ? Number.parseFloat(formData.sale_price) : undefined,
          image_url: formData.image_url || undefined,
          category_id: Number.parseInt(formData.category_id),
          stock_quantity: Number.parseInt(formData.stock_quantity) || 0,
          unit: formData.unit,
          is_featured: formData.is_featured,
          is_new: formData.is_new,
          is_on_sale: formData.is_on_sale,
        }

        if (product) {
          await updateProduct(product.id, data)
        } else {
          await createProduct(data)
        }
        onClose()
      } catch (err) {
        setError("Failed to save product. Please try again.")
      }
    })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{product ? "Edit Product" : "Add New Product"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs.) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sale_price">Sale Price (Rs.)</Label>
            <Input
              id="sale_price"
              type="number"
              step="0.01"
              value={formData.sale_price}
              onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
              placeholder="0.00 (optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              type="number"
              value={formData.stock_quantity}
              onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Unit</Label>
            <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="piece">Piece</SelectItem>
                <SelectItem value="kg">Kilogram (kg)</SelectItem>
                <SelectItem value="g">Gram (g)</SelectItem>
                <SelectItem value="liter">Liter</SelectItem>
                <SelectItem value="ml">Milliliter (ml)</SelectItem>
                <SelectItem value="dozen">Dozen</SelectItem>
                <SelectItem value="pack">Pack</SelectItem>
                <SelectItem value="bundle">Bundle</SelectItem>
                <SelectItem value="250g">250g</SelectItem>
                <SelectItem value="500g">500g</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter product description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="flex flex-wrap gap-6 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked as boolean })}
            />
            <Label htmlFor="is_featured" className="text-sm font-normal">
              Featured Product
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_new"
              checked={formData.is_new}
              onCheckedChange={(checked) => setFormData({ ...formData, is_new: checked as boolean })}
            />
            <Label htmlFor="is_new" className="text-sm font-normal">
              New Arrival
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_on_sale"
              checked={formData.is_on_sale}
              onCheckedChange={(checked) => setFormData({ ...formData, is_on_sale: checked as boolean })}
            />
            <Label htmlFor="is_on_sale" className="text-sm font-normal">
              On Sale
            </Label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending ? "Saving..." : product ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  )
}
