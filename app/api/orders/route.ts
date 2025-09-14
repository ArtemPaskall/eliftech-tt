import { NextResponse } from "next/server"
import connectDB from "@/lib/mongoDB"
import Order from "@/models/Orders"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: Request) {
  try {
    await connectDB()

    const data = await req.json()

    const newOrder = await Order.create({
      id: uuidv4(),
      user: data.user,
      items: data.items,
      total: data.total,
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json(
      { success: true, orderId: newOrder.id },
      { status: 201 }
    )
  } catch (error: unknown) {
    console.error("Error in POST /api/orders:", error)

    const message = error instanceof Error ? error.message : "Unknown error"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
