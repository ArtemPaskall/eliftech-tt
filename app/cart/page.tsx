"use client"
import Navigation from "@/components/Navigation/page"
import "@/app/styles/globals.scss"
import st from "./page.module.scss"
import { useCart } from "@/context/CartContext"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Cart() {
  const router = useRouter()

  const {
    cart,
    removeOneFromCart,
    addOneToCart,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart()

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (cart.length === 0) return alert("Cart is empty!")

    const order = {
      user: formData,
      items: cart,
      total: discountedTotal,
    }

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      })

      const data = await res.json()
      if (data.success) {
        clearCart()
        router.push(`/order/${data.orderId}`)
      }
    } catch (err) {
      console.error(err)
      alert("Failed to create order")
    }
  }

  const [discountedTotal, setDiscountedTotal] = useState(totalPrice)
  const [coupon, setCoupon] = useState<number | null>(null)
  const [isCouponApplied, setIsCouponApplied] = useState(false)

  useEffect(() => {
    const storedCoupon = localStorage.getItem("coupon")
    if (storedCoupon) {
      setCoupon(parseInt(storedCoupon, 10))
    }
    setDiscountedTotal(totalPrice)
  }, [totalPrice])

  const applyCoupon = () => {
    if (!coupon) return

    const discounted = totalPrice * (1 - coupon / 100)
    setDiscountedTotal(discounted)
    setIsCouponApplied(true)

    localStorage.removeItem("coupon")

    alert(`Coupon applied! New total: ${discounted.toFixed(2)} $`)
  }

  return (
    <div className={st["cart"]}>
      <div className="wrapp-1200">
        <Navigation />
        <div className={st["cart-wrapp"]}>
          <div className={st["cart-form"]}>
            <form id="orderForm" className={st["form"]} onSubmit={handleSubmit}>
              <div className={st["form-group"]}>
                <label htmlFor="firstName">Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={st["form-group"]}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={st["form-group"]}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={st["form-group"]}>
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </form>
          </div>

          <div className={st["cart-block"]}>
            {cart.length === 0 ? (
              <p className={st["empty-cart"]}>Your cart is empty</p>
            ) : (
              <div>
                <ul className={st["cart-list"]}>
                  {cart.map((item) => (
                    <li key={item._id} className={st["cart-card"]}>
                      <Image
                        src="/delete.png"
                        alt="flower"
                        width={20}
                        height={20}
                        className={st["delete-img"]}
                        onClick={() => removeFromCart(item._id)}
                      />
                      <Image
                        src={`/flowers/${item.flowerImg}`}
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
                        <div className={st["counter-wrapp"]}>
                          <div
                            className={st["counter-minus"]}
                            onClick={() => removeOneFromCart(item)}
                          >
                            {" "}
                            -{" "}
                          </div>
                          <div className={st["counter-value"]}>
                            {item.quantity}
                          </div>
                          <div
                            className={st["counter-plus"]}
                            onClick={() => addOneToCart(item)}
                          >
                            {" "}
                            +{" "}
                          </div>
                        </div>
                        <div className={st["total-wrapp"]}>
                          <div className={st["total-title"]}>Total:</div>
                          <div className={st["total-price"]}>
                            {item.price * item.quantity} $
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {coupon ? (
                  !isCouponApplied && (
                    <button
                      onClick={applyCoupon}
                      className={st["coupon-apply"]}
                    >
                      Apply Coupon: {coupon}%
                    </button>
                  )
                ) : (
                  <div>
                    <Link href="/coupons" className={st["coupon-link"]}>
                      Have a coupon? Copy it here
                      <Image
                        src={"/arrow.jpg"}
                        alt="Arrow"
                        width={35}
                        height={35}
                      />
                    </Link>
                  </div>
                )}

                <div className={st["price-total"]}>
                  <div className={st["total-title"]}>Total:</div>
                  <div className={st["total-price"]}>
                    {discountedTotal.toFixed(0)} $
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <button form="orderForm" type="submit" className={st["order-button"]}>
          Submit
        </button>
      </div>
    </div>
  )
}
