"use client"
import { FlowerType } from "@/models/Flower"
import st from "./page.module.scss"
import { useCart } from "@/context/CartContext"

export default function AddToCartButton({ flower }: { flower: FlowerType }) {
  const { addToCart } = useCart()
  return (
    <div className={st["add-button"]} onClick={() => addToCart(flower)}>
      Add to Cart
    </div>
  )
}
