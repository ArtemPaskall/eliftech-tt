import Image from "next/image"

export default function Error() {
  return (
    <div className={"not-found-wrapp"}>
      <Image
        src={"/dead.png"}
        alt={"Flower"}
        width={300}
        height={300}
        className={"dead-img"}
      />
      <div className={"not-found-text"}>The page was not found</div>
    </div>
  )
}
