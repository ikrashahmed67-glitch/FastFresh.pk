import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

export type Category = {
  id: number
  name: string
  slug: string
  image_url: string | null
  created_at: string
}

export type Product = {
  id: number
  name: string
  slug: string
  description: string | null
  price: number
  sale_price: number | null
  image_url: string | null
  category_id: number | null
  stock_quantity: number
  unit: string
  is_featured: boolean
  is_new: boolean
  is_on_sale: boolean
  created_at: string
  updated_at: string
  category_name?: string
}

export type Order = {
  id: number
  customer_name: string
  customer_email: string | null
  customer_phone: string
  delivery_address: string
  city: string | null
  google_location: string | null
  total_amount: number
  status: string
  created_at: string
}
