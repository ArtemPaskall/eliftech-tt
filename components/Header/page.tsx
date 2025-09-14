import st from "./page.module.scss"
import "@/app/styles/globals.scss"
import Image from "next/image"
import Navigation from "@/components/Navigation/page"

export default function Header() {
  return (
    <header className={st["header"]}>
      <div className="wrapp-1200">
        <Navigation />
        <div className={st["header-wrapp"]}>
          <Image
            src="/header-img.png"
            alt="Flower"
            width={600}
            height={400}
            className={st["header-bouquet"]}
          ></Image>
          <div className={st["header-content"]}>
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
