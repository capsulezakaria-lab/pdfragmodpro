import { NextRequest } from "next/server"
import { success, error, unauthorized, generateApiKey } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { withRateLimit } from "@/lib/plan-limits"

async function apiKeysHandler(request: NextRequest) {
  try {
    const auth = request.headers.get("authorization")
    if (!auth?.startsWith("Bearer ")) return unauthorized()

    const token = auth.slice(7)
    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) return unauthorized("Invalid session")

    if (request.method === "GET") {
      const keys = await prisma.apiKey.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
      })
      return success({ keys })
    }

    if (request.method === "POST") {
      const body = await request.json()
      const { name } = body
      if (!name) return error("Key name is required", 422)

      const key = generateApiKey()
      const apiKey = await prisma.apiKey.create({
        data: { userId: session.userId, name, key },
      })
      return success({ ...apiKey, key }, 201)
    }

    return error("Method not allowed", 405)
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export const GET = withRateLimit(apiKeysHandler, "api-keys")
export const POST = withRateLimit(apiKeysHandler, "api-keys:create")
