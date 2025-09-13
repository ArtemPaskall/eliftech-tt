import { CartItem } from "@/context/CartContext"

export const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem("cart")
  return data ? JSON.parse(data) : []
}
