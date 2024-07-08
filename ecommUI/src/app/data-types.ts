export interface SignUp {
    name: string
    password: string
    email: string
}

export interface Login {
    email: string
    password: string
}

export interface Product {
    name: string
    price: number
    color: string
    category: string
    description: string
    imageUrl: string
    id: string
    quantity: number | undefined
    productId: undefined | string
}

export interface Cart {
    id: string | undefined
    name: string
    price: number
    color: string
    category: string
    description: string
    imageUrl: string
    quantity: number | undefined
    userId: string
    productId: string
}

export interface priceSummary {
    price: number
    discount: number
    tax: number
    delivery: number
    total: number
}

export interface Order {
    id:number | undefined
    name: string
    email: string
    mobile: string
    address: string
    pin: number
    totalPrice: number
    userId: string | undefined
}