import { NextRequest } from "next/server"
import { success, error, unauthorized } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { withRateLimit } from "@/lib/plan-limits"

async function apiKeyDeleteHandler(
  request: NextRequest,
  context?: { params: Promise<Record<string, string>> }
) {
  try {
    const auth = request.headers.get("authorization")
    if (!auth?.startsWith("Bearer ")) return unauthorized()

    const token = auth.slice(7)
    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) return unauthorized("Invalid session")

    const params = await context?.params
    const id = params?.id
    if (!id) return error("API key ID is required", 422)

    const key = await prisma.apiKey.findFirst({ where: { id, userId: session.userId } })
    if (!key) return error("API key not found", 404)

    await prisma.apiKey.delete({ where: { id } })
    return success({ deleted: true })
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export const DELETE = withRateLimit(apiKeyDeleteHandler, "api-keys:delete")
