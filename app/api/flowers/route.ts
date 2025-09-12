import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoDB"
import Flower from "@/models/Flower"

export async function POST(req: Request) {
  try {
    console.log("Connecting to DB...")
    await connectDB()
    console.log("DB connected")

    const data = await req.json()
    console.log("Received data:", data)

    const newFlower = await Flower.create(data)
    console.log("Flower created:", newFlower)

    return NextResponse.json(newFlower, { status: 201 })
  } catch (error: any) {
    console.error("Error in POST /api/flowers:", error)
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    )
  }
}
