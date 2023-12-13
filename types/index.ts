import { Database } from './supabase'

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row']

export type Product = Tables<'products'>
export type Cart = Tables<'carts'>
export type Order = Tables<'orders'>

export type LineItem = {
    slug: string
    name: string
    price: number
    quantity: number
}

export type Payment = {
    card: string
    last4: string
}

export type Shipping = {
    name: string
    address: Address
    method: string
    carrier: string
    amount: number
}

export type Address = {
    line1: string
    line2?: string
    postal_code: string
    city: string
    state?: string
    country: string
}

export type Customer = {
    name: string
    email: string
    address: Address
}
