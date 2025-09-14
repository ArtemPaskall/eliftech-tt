// app/order/[id]/page.tsx
import connectDB from "@/lib/mongoDB"
import Order from "@/models/Orders"

interface Props {
  params: { id: string }
}

export default async function OrderPage({ params }: Props) {
  try {
    await connectDB() // підключення до MongoDB через mongoose

    // Знаходимо замовлення по рядковому id
    const order = await Order.findOne({ id: params.id }).lean()
    console.log(order)

    if (!order) {
      return <p>Order not found</p>
    }

    return (
      <div style={{ padding: "20px" }}>
        <h1>Order Details</h1>
        <p>
          <strong>Name:</strong> {order.user.firstName}
        </p>
        <p>
          <strong>Email:</strong> {order.user.email}
        </p>
        <p>
          <strong>Phone:</strong> {order.user.phone}
        </p>
        <p>
          <strong>Address:</strong> {order.user.address}
        </p>
        <p>
          <strong>Total:</strong> {order.total} $
        </p>

        <h2>Items:</h2>
        <ul>
          {order.items.map((item) => (
            <li key={item._id}>
              {item.title} x {item.quantity} = {item.price * item.quantity} $
            </li>
          ))}
        </ul>
      </div>
    )
  } catch (error: any) {
    console.error("Error fetching order:", error)
    return <p>Failed to load order</p>
  }
}
