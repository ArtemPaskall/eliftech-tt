import Navigation from "@/components/Navigation/page"
import "@/app/styles/globals.scss"
import st from "./page.module.scss"
import connectDB from "@/lib/mongoDB"
import Order from "@/models/Orders"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function History() {
  try {
    await connectDB()

    const ordersFromDb = await Order.find().lean()

    if (!ordersFromDb || ordersFromDb.length === 0) {
      return (
        <div className={st["history"]}>
          <div className="wrapp-1200">
            <Navigation />
            <p className={st["not-found-text"]}>No orders found</p>
          </div>
        </div>
      )
    }

    const orders = ordersFromDb.map((order) => ({
      ...order,
      items: order.items.map((item, index) => ({
        ...item,
        flowerImg: `${index % 10}.jpg`,
      })),
    }))

    return (
      <div className={st["history"]}>
        <div className="wrapp-1200">
          <Navigation />
          <h1 className={st["history-header"]}>Order History</h1>
          <ul className={st["history-list"]}>
            {orders.map((order) => (
              <li key={order._id} className={st["history-item"]}>
                <div className={st["order-header"]}>Order N: {order.id}</div>
                <div className={st["order-total"]}>
                  Total{" "}
                  <span className={st["order-total-discount"]}>
                    (with discount)
                  </span>{" "}
                  : {order.total} $
                </div>
                <div className={st["order-items"]}>Items:</div>
                <ul className={st["order-item-wrapp"]}>
                  {order.items.map((item) => (
                    <li key={item._id} className={st["order-item"]}>
                      <Image
                        src={`/flowers/${item.flowerImg}`}
                        alt="Flower"
                        width={100}
                        height={100}
                        className={st["order-item-img"]}
                      />
                      <div className={st["order-text"]}>
                        {item.title} x {item.quantity} ={" "}
                        <span className={st["order-green"]}>
                          {" "}
                          {item.price * item.quantity} $
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching orders:", error)
    return (
      <div className={st["history"]}>
        <div className="wrapp-1200">
          <Navigation />
          <p>Failed to load orders</p>
        </div>
      </div>
    )
  }
}
