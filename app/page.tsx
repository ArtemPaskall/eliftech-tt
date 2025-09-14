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

export default async function Home(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams
  const activeCategory = searchParams.category || "All Flowers"

  await connectDB()

  type FlowerFilter = {
    category?: string
  }

  const filter: FlowerFilter = {}

  if (searchParams.category && searchParams.category !== "All Flowers") {
    filter.category = searchParams.category
  }

  const flowersFromDb = await Flower.find(filter).lean()

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
              <Image src={plus} alt="plus" className={st["plus-img"]} />
              Add Flower
            </Link>

            <div className={st["category-wrapp-2"]}>
              <Link
                href="/"
                className={`${st["category-button"]} ${
                  activeCategory === "All Flowers" ? st.active : ""
                }`}
              >
                All Flowers
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/?category=${category}`}
                  className={`${st["category-button"]} ${
                    activeCategory === category ? st.active : ""
                  }`}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className={st["content-wrapp"]}>
            {flowers.length ? (
              flowers.map((flower) => (
                <FlowerCard key={flower._id} flower={flower} />
              ))
            ) : (
              <div className={st["not-found-text"]}>No flowers found</div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
