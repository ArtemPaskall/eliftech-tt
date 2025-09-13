"use client"
import Image from "next/image"
import st from "./page.module.scss"
import { useState } from "react"
import { FlowerType } from "@/models/Flower"

export default function LikeButton({ flower }: { flower: FlowerType }) {
  const [isFav, setIsFav] = useState(flower.favourite)
  const [loading, setLoading] = useState(false)

  const toggleFavourite = async () => {
    if (loading) return
    const newValue = !isFav
    setIsFav(newValue)

    try {
      setLoading(true)
      const res = await fetch(`/api/flowers/${flower._id}/favourite`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favourite: newValue }),
      })

      if (!res.ok) {
        throw new Error("Failed to update favourite")
      }
    } catch (err) {
      console.error(err)
      setIsFav(!newValue)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Image
      onClick={toggleFavourite}
      src={!isFav ? "like1.svg" : "like2.svg"}
      alt="like image"
      className={st["like-img"]}
      width={20}
      height={20}
    />
  )
}
