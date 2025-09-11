import Header from "@/components/Header/page"
import st from "./page.module.scss"
import "@/app/styles/globals.scss"

export default function Home() {
  return (
    <>
      <Header />
      <main className="wrapp-1200">
        <div className={st["prod-title"]}>All Products</div>
        <div>
          <div>dd</div>
          <div>dd</div>
        </div>
      </main>
    </>
  )
}
