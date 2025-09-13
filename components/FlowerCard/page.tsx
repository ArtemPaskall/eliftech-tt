import { IFlower } from "@/models/Flower"
import st from "./page.module.scss"
import Image from "next/image"

export default function FlowerCard({ flower }: { flower: IFlower }) {
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
        <div className={st["add-button"]}>Add to Cart</div>
      </div>
      <div className={st["like-wrapp"]}>
        <Image
          src={"like7.svg"}
          alt="like image"
          className={st["like-img"]}
          width={20}
          height={20}
        />

        <div className={st["date"]}>
          {" "}
          {flower.createdAt.toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}
