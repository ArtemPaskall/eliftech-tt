// models/Order.ts
import { Schema, model, models } from "mongoose"
import { CartItem } from "@/context/CartContext"

const CartItemSchema = new Schema<CartItem>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const OrderSchema = new Schema({
  id: { type: String, required: true },
  user: {
    firstName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [CartItemSchema],
  total: { type: Number, required: true },
  createdAt: { type: String, required: true },
})

const Order = models.Order || model("Order", OrderSchema)
export default Order
