import mongoose, { Schema, Model } from "mongoose"
import { categories } from "./categories"

export type FlowerType = {
  _id: string
  category: string
  title: string
  description?: string
  price: number
  favourite: boolean
  createdAt: string
  flowerImg?: string
}

const FlowerSchema = new Schema<FlowerType>({
  category: {
    type: String,
    required: true,
    enum: categories as unknown as string[],
  },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  favourite: { type: Boolean, default: false },
  createdAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
})

const Flower: Model<FlowerType> =
  (mongoose.models.Flower as Model<FlowerType>) ||
  mongoose.model<FlowerType>("Flower", FlowerSchema)

export default Flower
