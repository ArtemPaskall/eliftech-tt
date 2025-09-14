import Header from "@/components/Header/page"
import st from "./page.module.scss"
import "@/app/styles/globals.scss"
import Link from "next/link"
import plus from "@/public/plus.svg"
import Image from "next/image"
import { categories } from "@/models/categories"
import connectDB from "@/lib/mongoDB"
import Flower, { FlowerType } from "@/models/Flower"
import FlowerCard from "@/components/FlowerCard/page"

export default async function Home() {
  await connectDB()
  const flowersFromDb = await Flower.find().lean()

  const flowers: FlowerType[] = flowersFromDb.map((f, index) => ({
    ...f,
    _id: f._id.toString(),
    createdAt: new Date(f.createdAt).toISOString(),
    flowerImg: `${index % 10}.jpg`,
  }))

  return (
    <>
      <Header />
      <main className="wrapp-1200">
        <div className={st["prod-title"]}>All Products</div>
        <div className={st["content-block"]}>
          <div className={st["category-wrapp"]}>
            <Link href={"add-flower"} className={st["add-flower-link"]}>
              <Image src={plus} alt="plus" className={st["plus-img"]}></Image>
              Add Flower
            </Link>
            <div className={st["category-wrapp-2"]}>
              <div className={st["category-button"]}>All Flowers</div>
              {categories.map((category) => (
                <div key={category} className={st["category-button"]}>
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div className={st["content-wrapp"]}>
            {flowers.map((flower) => (
              <FlowerCard key={flower._id} flower={flower} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
