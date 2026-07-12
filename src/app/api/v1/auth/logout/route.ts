import { NextRequest } from "next/server"
import { success, error, getAuthToken } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const token = getAuthToken(request)
    if (!token) {
      return error("No token provided", 401)
    }

    await prisma.session.delete({ where: { token } })

    return success({ message: "Logged out" })
  } catch {
    return error("Internal server error", 500)
  }
}
