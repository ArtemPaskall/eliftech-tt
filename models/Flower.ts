import mongoose, { Schema, Document } from "mongoose"

export interface IFlower extends Document {
  category: string
  title: string
  description: string
  price: number
  image: string
  favourite: boolean
  createdAt: Date
}

const FlowerSchema = new Schema<IFlower>({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  favourite: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Flower ||
  mongoose.model<IFlower>("Flower", FlowerSchema)
