"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Edit2, Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteCategory } from "@/app/actions"
import type { Category } from "@/lib/db"

type CategoriesTableProps = {
  categories: Category[]
  onEdit: (category: Category) => void
}

export function CategoriesTable({ categories, onEdit }: CategoriesTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? Products in this category will not be deleted.")) {
      return
    }

    setDeletingId(id)
    try {
      await deleteCategory(id)
      router.refresh()
    } catch (error) {
      alert("Failed to delete category")
    } finally {
      setDeletingId(null)
    }
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No categories yet</h3>
        <p className="text-muted-foreground">Add categories to organize your products.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Image</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Name</th>
            <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground hidden sm:table-cell">Slug</th>
            <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-border hover:bg-accent/50">
              <td className="py-3 px-2">
                <div className="h-10 w-10 bg-muted rounded overflow-hidden">
                  {category.image_url ? (
                    <img
                      src={category.image_url || "/placeholder.svg"}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                      N/A
                    </div>
                  )}
                </div>
              </td>
              <td className="py-3 px-2 font-medium">{category.name}</td>
              <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{category.slug}</td>
              <td className="py-3 px-2">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(category)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(category.id)}
                    disabled={deletingId === category.id}
                  >
                    {deletingId === category.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
