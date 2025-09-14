import Flower from "@/models/Flower"
import connectDB from "@/lib/mongoDB"

interface PATCHContext {
  params: Promise<{ id: string }>
}

export async function PATCH(req: Request, context: PATCHContext) {
  try {
    await connectDB()

    const { id } = await context.params

    if (!id) {
      return new Response(JSON.stringify({ message: "ID is required" }), {
        status: 400,
      })
    }

    const body = await req.json()
    const { favourite } = body

    const updatedFlower = await Flower.findByIdAndUpdate(
      id,
      { favourite },
      { new: true }
    )

    if (!updatedFlower) {
      return new Response(JSON.stringify({ message: "Flower not found" }), {
        status: 404,
      })
    }

    const plainFlower = {
      _id: updatedFlower._id.toString(),
      category: updatedFlower.category,
      title: updatedFlower.title,
      description: updatedFlower.description || "",
      price: updatedFlower.price,
      favourite: updatedFlower.favourite,
      createdAt: updatedFlower.createdAt.toString(),
    }

    return new Response(JSON.stringify(plainFlower), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    })
  }
}
