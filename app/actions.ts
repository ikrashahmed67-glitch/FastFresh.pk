"use server"

import { sql, type Product, type Category, type Order } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getCategories(): Promise<Category[]> {
  const categories = await sql`SELECT * FROM categories ORDER BY name`
  return categories as Category[]
}

export async function getProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    ORDER BY p.created_at DESC
  `
  return products as Product[]
}

export async function searchProducts(query: string): Promise<Product[]> {
  const searchTerm = `%${query.toLowerCase()}%`
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE LOWER(p.name) LIKE ${searchTerm} 
       OR LOWER(p.description) LIKE ${searchTerm}
       OR LOWER(c.name) LIKE ${searchTerm}
    ORDER BY p.created_at DESC
  `
  return products as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.slug = ${slug}
    LIMIT 1
  `
  return (products[0] as Product) || null
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.is_featured = TRUE 
    ORDER BY p.created_at DESC 
    LIMIT 8
  `
  return products as Product[]
}

export async function getNewProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.is_new = TRUE 
    ORDER BY p.created_at DESC 
    LIMIT 8
  `
  return products as Product[]
}

export async function getOnSaleProducts(): Promise<Product[]> {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE p.is_on_sale = TRUE AND p.sale_price IS NOT NULL 
    ORDER BY p.created_at DESC 
    LIMIT 8
  `
  return products as Product[]
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await sql`
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE c.slug = ${categorySlug}
    ORDER BY p.created_at DESC
  `
  return products as Product[]
}

export async function createProduct(data: {
  name: string
  description: string
  price: number
  sale_price?: number
  image_url?: string
  category_id: number
  stock_quantity: number
  unit: string
  is_featured: boolean
  is_new: boolean
  is_on_sale: boolean
}): Promise<Product> {
  const slug = data.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  const result = await sql`
    INSERT INTO products (name, slug, description, price, sale_price, image_url, category_id, stock_quantity, unit, is_featured, is_new, is_on_sale)
    VALUES (${data.name}, ${slug}, ${data.description}, ${data.price}, ${data.sale_price || null}, ${data.image_url || null}, ${data.category_id}, ${data.stock_quantity}, ${data.unit}, ${data.is_featured}, ${data.is_new}, ${data.is_on_sale})
    RETURNING *
  `

  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin")

  return result[0] as Product
}

export async function updateProduct(
  id: number,
  data: {
    name?: string
    description?: string
    price?: number
    sale_price?: number | null
    image_url?: string
    category_id?: number
    stock_quantity?: number
    unit?: string
    is_featured?: boolean
    is_new?: boolean
    is_on_sale?: boolean
  },
): Promise<Product> {
  const slug = data.name
    ? data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    : undefined

  const result = await sql`
    UPDATE products SET
      name = COALESCE(${data.name}, name),
      slug = COALESCE(${slug}, slug),
      description = COALESCE(${data.description}, description),
      price = COALESCE(${data.price}, price),
      sale_price = ${data.sale_price},
      image_url = COALESCE(${data.image_url}, image_url),
      category_id = COALESCE(${data.category_id}, category_id),
      stock_quantity = COALESCE(${data.stock_quantity}, stock_quantity),
      unit = COALESCE(${data.unit}, unit),
      is_featured = COALESCE(${data.is_featured}, is_featured),
      is_new = COALESCE(${data.is_new}, is_new),
      is_on_sale = COALESCE(${data.is_on_sale}, is_on_sale),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `

  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin")

  return result[0] as Product
}

export async function deleteProduct(id: number): Promise<void> {
  await sql`DELETE FROM products WHERE id = ${id}`
  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin")
}

export async function createCategory(data: { name: string; image_url?: string }): Promise<Category> {
  const slug = data.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  const result = await sql`
    INSERT INTO categories (name, slug, image_url)
    VALUES (${data.name}, ${slug}, ${data.image_url || null})
    RETURNING *
  `

  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin")

  return result[0] as Category
}

export async function updateCategory(id: number, data: { name?: string; image_url?: string }): Promise<Category> {
  const slug = data.name
    ? data.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    : undefined

  const result = await sql`
    UPDATE categories SET
      name = COALESCE(${data.name}, name),
      slug = COALESCE(${slug}, slug),
      image_url = COALESCE(${data.image_url}, image_url)
    WHERE id = ${id}
    RETURNING *
  `

  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin")

  return result[0] as Category
}

export async function deleteCategory(id: number): Promise<void> {
  await sql`DELETE FROM categories WHERE id = ${id}`
  revalidatePath("/")
  revalidatePath("/shop")
  revalidatePath("/admin")
}

export async function createOrder(data: {
  customer_name: string
  customer_email?: string
  customer_phone: string
  delivery_address: string
  city?: string
  google_location?: string
  total_amount: number
  items: { product_id: number; product_name: string; quantity: number; price: number }[]
}): Promise<Order> {
  const orderResult = await sql`
    INSERT INTO orders (customer_name, customer_email, customer_phone, delivery_address, city, google_location, total_amount, status)
    VALUES (${data.customer_name}, ${data.customer_email || null}, ${data.customer_phone}, ${data.delivery_address}, ${data.city || "Multan"}, ${data.google_location || null}, ${data.total_amount}, 'pending')
    RETURNING *
  `

  const order = orderResult[0] as Order

  for (const item of data.items) {
    await sql`
      INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
      VALUES (${order.id}, ${item.product_id}, ${item.product_name}, ${item.quantity}, ${item.price})
    `
  }

  revalidatePath("/admin")
  revalidatePath("/account")

  return order
}

export async function getOrders(): Promise<Order[]> {
  const orders = await sql`SELECT * FROM orders ORDER BY created_at DESC`
  return orders as Order[]
}

export async function getOrderItems(orderId: number): Promise<any[]> {
  const items = await sql`SELECT * FROM order_items WHERE order_id = ${orderId}`
  return items
}

export async function updateOrderStatus(id: number, status: string): Promise<void> {
  await sql`UPDATE orders SET status = ${status} WHERE id = ${id}`
  revalidatePath("/admin")
  revalidatePath("/account")
}
