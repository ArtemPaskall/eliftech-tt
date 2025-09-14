import "@/app/styles/globals.scss"
import st from "./page.module.scss"
import connectDB from "@/lib/mongoDB"
import Order from "@/models/Orders"
import Navigation from "@/components/Navigation/page"
import { OrderItemType } from "@/models/Orders"
import Image from "next/image"

interface Props {
  params: Promise<{ id: string }>
}

export default async function OrderPage({ params }: Props) {
  try {
    const { id } = await params

    await connectDB()

    const orderFromDb = await Order.findOne({ id }).lean()
    if (!orderFromDb) {
      return <p>Order not found</p>
    }

    const order = {
      ...orderFromDb,
      items: orderFromDb.items.map((item: OrderItemType, index: number) => ({
        ...item,
        flowerImg: `${index % 10}.jpg`,
      })),
    }

    return (
      <div className={st["order"]}>
        <div className="wrapp-1200">
          <Navigation />
          <div className={st["main-order-wrapp"]}>
            <h1 className={st["order-header"]}>Order Details</h1>
            <div className={st["order-id"]}>Order N: {order.id}</div>
            <h2 className={st["items-header"]}>Items:</h2>
            <ul>
              {order.items.map((item) => (
                <li key={item._id} className={st["order-item"]}>
                  <div>
                    <Image
                      src={`/flowers/${item.flowerImg}`}
                      alt="Flower"
                      width={150}
                      height={150}
                      className={st["order-item-img"]}
                    />
                  </div>
                  <div className={st["order-info"]}>
                    <div className={st["order-quantity"]}>
                      {item.title} x {item.quantity}
                    </div>
                    <div className={st["order-quantity"]}>=</div>
                    <div className={st["order-price"]}>
                      {item.price * item.quantity} $
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className={st["order-wrapp"]}>
              <div>Total:</div>
              <div>{order.total} $</div>
            </div>
            <div className={st["order-wrapp"]}>
              <div>Name:</div>
              <div>{order.user.firstName}</div>
            </div>
            <div className={st["order-wrapp"]}>
              <div>Email:</div>
              <div>{order.user.email}</div>
            </div>
            <div className={st["order-wrapp"]}>
              <div>Phone:</div>
              <div>{order.user.phone}</div>
            </div>
            <div className={st["order-wrapp"]}>
              <div>Address:</div>
              <div>{order.user.address}</div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching order:", error)
    return <p>Failed to load order</p>
  }
}
