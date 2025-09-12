"use client"

import { useState } from "react"
import st from "./page.module.scss"

export default function AddFlower() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState<number>(0)
  const [image, setImage] = useState("")
  const [favourite, setFavourite] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const flower = {
      title,
      category,
      description,
      price,
      image,
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
        // очищаємо форму
        setTitle("")
        setCategory("")
        setDescription("")
        setPrice(0)
        setImage("")
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
    <form onSubmit={handleSubmit} className={st["form"]}>
      <h2 className="text-xl font-bold">Add a Flower</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        required
        className="border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="border p-2 rounded"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={favourite}
          onChange={(e) => setFavourite(e.target.checked)}
        />
        Favourite
      </label>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Flower
      </button>

      {message && <p>{message}</p>}
    </form>
  )
}
