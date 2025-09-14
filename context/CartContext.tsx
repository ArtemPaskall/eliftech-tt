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
  addOneToCart: (item: CartItem) => void
  removeOneFromCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  totalPrice: number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = getCartFromLocalStorage()
    if (storedCart && storedCart.length > 0) {
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

  const addOneToCart = (item: CartItem) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    )
  }

  const removeOneFromCart = (item: CartItem) => {
    setCart((prev) =>
      prev.map((cartItem) =>
        cartItem._id === item._id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addOneToCart,
        removeOneFromCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
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
