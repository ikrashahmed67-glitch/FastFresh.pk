"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCategory, updateCategory } from "@/app/actions"
import type { Category } from "@/lib/db"

type CategoryFormProps = {
  category?: Category | null
  onClose: () => void
}

export function CategoryForm({ category, onClose }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: category?.name || "",
    image_url: category?.image_url || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (category) {
        await updateCategory(category.id, formData)
      } else {
        await createCategory(formData)
      }
      router.refresh()
      onClose()
    } catch (error) {
      console.error("Failed to save category:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{category ? "Edit Category" : "Add New Category"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Vegetables, Fruits, Dairy"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image_url">Image URL (Optional)</Label>
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {formData.image_url && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground mb-2">Preview:</p>
            <img
              src={formData.image_url || "/placeholder.svg"}
              alt="Category preview"
              className="h-20 w-20 object-cover rounded-lg border border-border"
            />
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : category ? (
              "Update Category"
            ) : (
              "Add Category"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
