import Header from "@/components/Header/page"
import st from "./page.module.scss"
import "@/app/styles/globals.scss"
import Link from "next/link"
import plus from "@/public/plus.svg"
import Image from "next/image"

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
        <div className={st["bottom-padding"]}>sdfsfd</div>
      </main>
    </>
  )
}
