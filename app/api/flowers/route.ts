import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoDB"
import Flower from "@/models/Flower"

export async function POST(req: Request) {
  try {
    await connectDB()

    const data = await req.json()

    const newFlower = await Flower.create(data)

    return NextResponse.json(newFlower, { status: 201 })
  } catch (error: any) {
    console.error("Error in POST /api/flowers:", error)
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    )
  }
}
