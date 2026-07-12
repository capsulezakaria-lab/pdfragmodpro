import { NextRequest } from "next/server"
import { success, error, unauthorized, getAuthToken } from "@/lib/api-utils"
import prisma from "@/lib/db"
import bcrypt from "bcryptjs"

export async function PUT(request: NextRequest) {
  try {
    const token = getAuthToken(request)
    if (!token) return unauthorized()

    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) return unauthorized("Invalid session")

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return error("Current password and new password are required", 422)
    }

    if (newPassword.length < 8) {
      return error("New password must be at least 8 characters", 422)
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } })
    if (!user) return unauthorized("User not found")

    const valid = await bcrypt.compare(currentPassword, user.password)
    if (!valid) return error("Current password is incorrect", 401)

    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({
      where: { id: session.userId },
      data: { password: hashedPassword },
    })

    return success({ message: "Password updated successfully" })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
