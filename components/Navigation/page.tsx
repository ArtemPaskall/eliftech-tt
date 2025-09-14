"use client"
import st from "./page.module.scss"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/context/CartContext"
import cartImg from "@/public/cart.svg"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const { cart } = useCart()
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/history", label: "History" },
    { href: "/coupons", label: "Coupons" },
  ]

  return (
    <nav className={st["header-nav"]}>
      <ul className={st["header-nav-inner"]}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? st["active"] : st["inactive"]}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="cart" className={st["cart"]}>
        <Image
          src={cartImg}
          alt="cart"
          width={35}
          height={35}
          className={st["cart-img"]}
        />
        <div className={st["cart-value"]}>{cart.length}</div>
      </Link>
    </nav>
  )
}
