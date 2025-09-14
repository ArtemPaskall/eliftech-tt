import "@/app/styles/globals.scss"
import st from "./page.module.scss"
import connectDB from "@/lib/mongoDB"
import Order from "@/models/Orders"
import Navigation from "@/components/Navigation/page"

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: Props) {
  try {
    const { id } = await params

    await connectDB()

    const order = await Order.findOne({ id }).lean()

    if (!order) {
      return <p>Order not found</p>
    }

    return (
      <div className={st["order"]}>
        <div className="wrapp-1200">
          <Navigation />
          <h1 className={st["order-header"]}>Order Details</h1>
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
      </div>
    )
  } catch (error) {
    console.error("Error fetching order:", error)
    return <p>Failed to load order</p>
  }
}
