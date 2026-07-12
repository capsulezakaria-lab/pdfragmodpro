import { NextRequest } from "next/server"
import { success, error, unauthorized, getAuthToken } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function PUT(request: NextRequest) {
  try {
    const token = getAuthToken(request)
    if (!token) return unauthorized()

    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) return unauthorized("Invalid session")

    const body = await request.json()
    const { name, email } = body

    if (email) {
      const existing = await prisma.user.findFirst({ where: { email: email.toLowerCase(), NOT: { id: session.userId } } })
      if (existing) return error("Email already in use", 409)
    }

    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: {
        ...(name && { name }),
        ...(email && { email: email.toLowerCase() }),
      },
    })

    return success({
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        plan: updated.plan,
        credits: updated.credits,
      },
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
