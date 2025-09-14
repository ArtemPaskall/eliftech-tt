import mongoose, { Schema, Model } from "mongoose"

export type OrderItemType = {
  _id: string
  title: string
  price: number
  quantity: number
}

export type OrderType = {
  _id: string
  id: string
  user: {
    firstName: string
    email: string
    phone: string
    address: string
  }
  items: OrderItemType[]
  total: number
  createdAt: string
}

const OrderItemSchema = new Schema<OrderItemType>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const OrderSchema = new Schema<OrderType>({
  id: { type: String, required: true },
  user: {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [OrderItemSchema],
  total: { type: Number, required: true },
  createdAt: {
    type: String,
    default: () => new Date().toISOString(),
  },
})

const Order: Model<OrderType> =
  (mongoose.models.Order as Model<OrderType>) ||
  mongoose.model<OrderType>("Order", OrderSchema)

export default Order
