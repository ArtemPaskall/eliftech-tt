import { FlowerType } from "@/models/Flower"
import st from "./page.module.scss"
import Image from "next/image"
import LikeButton from "../LikeButton/page"
import AddToCartButton from "../AddToCartButton/page"

export default function FlowerCard({ flower }: { flower: FlowerType }) {
  return (
    <div className={st["flower-card"]}>
      <Image
        src={"/flowers/0.jpg"}
        alt="Flower"
        width={75}
        height={75}
        className={st["flower-img"]}
      />
      <div>{flower.title}</div>

      <div className={st["price-wrapp"]}>
        <div className={st["price-title"]}>{flower.price} $</div>
        <AddToCartButton flower={flower} />
      </div>
      <div className={st["like-wrapp"]}>
        <LikeButton flower={flower} />
        <div className={st["date"]}>
          {new Date(flower.createdAt).toLocaleDateString("uk-UA")}
        </div>
      </div>
    </div>
  )
}
