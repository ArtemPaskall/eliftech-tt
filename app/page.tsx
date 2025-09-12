import Header from "@/components/Header/page"
import st from "./page.module.scss"
import "@/app/styles/globals.scss"
import AddFlower from "@/components/AddFlower/page"

export default async function Home() {
  return (
    <>
      <Header />
      <main className="wrapp-1200">
        <div className={st["prod-title"]}>All Products</div>
        <AddFlower />
        <div>sdfsfd</div>
      </main>
    </>
  )
}
