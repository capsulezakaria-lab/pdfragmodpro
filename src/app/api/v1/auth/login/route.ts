import { NextRequest } from "next/server"
import { success, error, generateId } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return error("Email and password are required", 422)
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user || user.password !== password) {
      return error("Invalid email or password", 401)
    }

    const token = generateId()
    const session = await prisma.session.create({
      data: { token, userId: user.id },
    })

    return success({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
        credits: user.credits,
      },
      token: session.token,
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
