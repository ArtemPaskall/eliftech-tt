"use client"
import Navigation from "@/components/Navigation/page"
import "@/app/styles/globals.scss"
import st from "./page.module.scss"
import { useCart } from "@/context/CartContext"
import Image from "next/image"

export default function Cart() {
  const { cart } = useCart()
  console.log(cart)

  return (
    <div className={st["cart"]}>
      <div className="wrapp-1200">
        <Navigation />
        <div className={st["cart-wrapp"]}>
          <div className={st["cart-form"]}>
            <form className={st["form"]}>
              <div className={st["form-group"]}>
                <label htmlFor="firstName">Name</label>
                <input type="text" id="firstName" name="firstName" required />
              </div>

              <div className={st["form-group"]}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className={st["form-group"]}>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className={st["form-group"]}>
                <label htmlFor="address">Address</label>
                <textarea id="address" name="address" rows={3} required />
              </div>
            </form>
          </div>
          {cart.length === 0 ? (
            <p className={st["empty-cart"]}>Your cart is empty</p>
          ) : (
            <ul className={st["cart-list"]}>
              {cart.map((item) => (
                <li key={item._id} className={st["cart-card"]}>
                  <Image
                    src="/flowers/0.jpg"
                    alt="flower"
                    width={150}
                    height={150}
                    className={st["card-img"]}
                  />
                  <div className={st["card-content"]}>
                    <div className={st["card-title"]}>{item.title}</div>
                    <div className={st["card-price"]}>
                      Price:&nbsp;
                      <span className={st["card-price-span"]}>
                        {item.price} $
                      </span>
                    </div>
                    <div className={st["total-wrapp"]}>
                      <div>Total:</div>
                      <div>555$</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
