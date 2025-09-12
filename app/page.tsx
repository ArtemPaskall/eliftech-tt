import Header from "@/components/Header/page"
import st from "./page.module.scss"
import "@/app/styles/globals.scss"
import Link from "next/link"
import plus from "@/public/plus.svg"
import Image from "next/image"
import { categories } from "@/models/categories"

export default async function Home() {
  return (
    <>
      <Header />
      <main className="wrapp-1200">
        <div className={st["prod-title"]}>All Products</div>
        <Link href={"add-flower"} className={st["add-flower-link"]}>
          <Image src={plus} alt="plus" className={st["plus-img"]}></Image>
          Add Flower
        </Link>
        <div className={st["content-wrapp"]}>
          <div className={st["category-wrapp"]}>
            {categories.map((category) => (
              <div key={category} className={st["category-button"]}>
                {category}
              </div>
            ))}
          </div>
          <div>
            
          </div>
        </div>
      </main>
    </>
  )
}
