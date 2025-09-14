"use client"
import st from "./page.module.scss"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import cartImg from "@/public/cart.svg"

export default function Navigation() {
  const { cart } = useCart()
  return (
    <nav className={st["header-nav"]}>
      <ul className={st["header-nav-inner"]}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>History</li>
        <li>Coupons</li>
      </ul>

      <Link href="cart" className={st["cart"]}>
        <Image
          src={cartImg}
          alt="cart"
          width={35}
          height={35}
          className={st["cart-img"]}
        ></Image>
        <div className={st["cart-value"]}>{cart.length}</div>
      </Link>
    </nav>
  )
}
