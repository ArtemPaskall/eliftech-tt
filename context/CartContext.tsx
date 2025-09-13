"use client"
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react"
import { FlowerType } from "@/models/Flower"
import {
  saveCartToLocalStorage,
  getCartFromLocalStorage,
} from "@/lib/localStorageHndler"

export type CartItem = FlowerType & { quantity: number }

type CartContextType = {
  cart: CartItem[]
  addToCart: (flower: FlowerType) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = getCartFromLocalStorage()
    if (storedCart.length > 0) {
      setCart(storedCart)
    }
  }, [])

  useEffect(() => {
    saveCartToLocalStorage(cart)
  }, [cart])

  const addToCart = (flower: FlowerType) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === flower._id)
      if (existing) {
        return prev.map((item) =>
          item._id === flower._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...flower, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    )
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
