"use client"

import Navigation from "@/components/Navigation/page"
import "@/app/styles/globals.scss"
import st from "./page.module.scss"
import { useRouter } from "next/navigation"

export default function Coupons() {
  const router = useRouter()
  const handleCopy = (code: number) => {
    localStorage.setItem("coupon", code.toString())
    alert(`Coupon "${code}" saved!`)
    router.push("/cart")
  }

  const coupons = [10, 25, 50]

  return (
    <div className={st["coupons"]}>
      <div className="wrapp-1200">
        <Navigation />
        <ul className={st["coupons-wrapp"]}>
          {coupons.map((discount, index) => (
            <li key={index} className={st["coupons-item"]}>
              <div className={st["discount-title"]}>Discount</div>
              <div className={st["discount-value"]}>{discount} %</div>
              <div
                className={st["copy-button"]}
                onClick={() => handleCopy(discount)}
              >
                Copy
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
