import { NextRequest } from "next/server"
import { success, error, unauthorized, getAuthToken } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function DELETE(request: NextRequest) {
  try {
    const token = getAuthToken(request)
    if (!token) return unauthorized()

    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) return unauthorized("Invalid session")

    await prisma.session.deleteMany({ where: { userId: session.userId } })
    await prisma.apiKey.deleteMany({ where: { userId: session.userId } })
    await prisma.document.deleteMany({ where: { userId: session.userId } })
    await prisma.usage.deleteMany({ where: { userId: session.userId } })
    await prisma.user.delete({ where: { id: session.userId } })

    return success({ message: "Account deleted successfully" })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
