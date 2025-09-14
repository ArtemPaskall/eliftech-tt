"use client"
import { FlowerType } from "@/models/Flower"
import st from "./page.module.scss"
import { useCart } from "@/context/CartContext"
import { useState } from "react"

export default function AddToCartButton({ flower }: { flower: FlowerType }) {
  const { addToCart } = useCart()
  const [showMessage, setShowMessage] = useState(false)

  const handleClick = () => {
    addToCart(flower)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 1000)
  }

  return (
    <div className={st["add-button"]} onClick={handleClick}>
      Add to Cart
      {showMessage && <div className={st["add-message"]}>Added to cart</div>}
    </div>
  )
}
