"use client"

import { useState } from "react"
import st from "./page.module.scss"
import Header from "@/components/Header/page"
import { categories } from "@/models/categories"

export default function AddFlower() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [favourite, setFavourite] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const flower = {
      title,
      category,
      description,
      price,
      favourite,
    }

    try {
      const res = await fetch("/api/flowers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(flower),
      })

      if (res.ok) {
        setMessage("Flower added successfully!")
        setTitle("")
        setCategory("")
        setDescription("")
        setPrice(0)
        setFavourite(false)
      } else {
        setMessage("Failed to add flower.")
      }
    } catch (err) {
      console.error(err)
      setMessage("Error adding flower.")
    }
  }

  return (
    <>
      <Header />
      <div className="wrapp-1200">
        <form onSubmit={handleSubmit} className={st["form"]}>
          <h2 className={st["add-flower-title"]}>Add a Flower</h2>

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Flower type
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price === 0 ? "" : price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />

          <label className={st["checkbox-wrapp"]}>
            <input
              type="checkbox"
              checked={favourite}
              onChange={(e) => setFavourite(e.target.checked)}
            />
            Favourite
          </label>

          <button type="submit" className={st["add-button"]}>
            Add Flower
          </button>

          {message && <p className={st["submit-result-message"]}>{message}</p>}
        </form>
      </div>
    </>
  )
}
