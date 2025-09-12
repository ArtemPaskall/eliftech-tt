import mongoose, { Schema, Document, Model } from "mongoose"
import { categories } from "./categories"

export interface IFlower extends Document {
  category: string
  title: string
  description?: string
  price: number
  favourite: boolean
  createdAt: Date
}

const FlowerSchema = new Schema<IFlower>({
  category: {
    type: String,
    required: true,
    enum: categories as unknown as string[],
  },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  favourite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

// Безпечний патерн для dev hot-reload
const Flower: Model<IFlower> =
  (mongoose.models.Flower as Model<IFlower>) ||
  mongoose.model<IFlower>("Flower", FlowerSchema)

export default Flower
