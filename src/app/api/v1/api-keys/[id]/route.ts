import { NextRequest } from "next/server"
import { success, error, unauthorized, notFound } from "@/lib/api-utils"
import prisma from "@/lib/db"

async function authenticate(request: NextRequest): Promise<string | null> {
  const auth = request.headers.get("authorization")
  if (!auth?.startsWith("Bearer ")) return null
  const token = auth.slice(7)
  const session = await prisma.session.findUnique({ where: { token } })
  return session?.userId || null
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await authenticate(request)
    if (!userId) return unauthorized()

    const { id } = await params
    const key = await prisma.apiKey.findUnique({ where: { id } })

    if (!key || key.userId !== userId) {
      return notFound("API key not found")
    }

    await prisma.apiKey.delete({ where: { id } })
    return success({ deleted: true })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
