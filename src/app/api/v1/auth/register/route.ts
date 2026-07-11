import { NextRequest } from "next/server"
import { success, error, generateId } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, password } = body

    if (!firstName || !lastName || !email || !password) {
      return error("All fields are required: firstName, lastName, email, password", 422)
    }

    if (password.length < 8) {
      return error("Password must be at least 8 characters", 422)
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return error("Invalid email address", 422)
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
    if (existing) {
      return error("An account with this email already exists", 409)
    }

    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: email.toLowerCase(),
        password,
        plan: "free",
        credits: 100,
      },
    })

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
    }, 201)
  } catch (e) {
    return error("Internal server error", 500)
  }
}
