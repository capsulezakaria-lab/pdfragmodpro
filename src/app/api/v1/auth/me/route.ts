import { NextRequest } from "next/server"
import { success, error, unauthorized, getAuthToken } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const token = getAuthToken(request)
    if (!token) {
      return unauthorized()
    }

    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) {
      return unauthorized("Invalid or expired session")
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } })
    if (!user) {
      return unauthorized("User not found")
    }

    return success({
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      credits: user.credits,
      created_at: user.createdAt.toISOString(),
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
