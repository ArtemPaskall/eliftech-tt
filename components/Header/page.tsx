"use client"
import st from "./page.module.scss"
import "@/app/styles/globals.scss"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { cart } = useCart()

  return (
    <header className={st["header"]}>
      <div className="wrapp-1200">
        <nav className={st["header-nav"]}>
          <ul className={st["header-nav-inner"]}>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>History</li>
            <li>Coupons</li>
          </ul>

          <Link href="cart" className={st["cart"]}>
            <Image src="cart.svg" alt="cart" width={35} height={35}></Image>
            <div className={st["cart-value"]}>{cart.length}</div>
          </Link>
        </nav>
        <div className={st["header-wrapp"]}>
          <Image
            src="/header-bouquet.png"
            alt="Flower"
            width={400}
            height={400}
            className={st["header-bouquet"]}
          ></Image>
          <div>
            <div className={st["shop-name"]}>flower boutique</div>
            <div className={st["shop-description"]}>
              Fresh, hand-picked flowers and unique bouquets, crafted to
              brighten every moment and delivered with care.
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
