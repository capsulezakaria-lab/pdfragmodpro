import { NextRequest } from "next/server"
import { success, error, unauthorized } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { withRateLimit } from "@/lib/plan-limits"

async function documentDetailHandler(
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
    if (!id) return error("Document ID is required", 422)

    const doc = await prisma.document.findFirst({ where: { id, userId: session.userId } })
    if (!doc) return error("Document not found", 404)

    return success(doc)
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export const GET = withRateLimit(documentDetailHandler, "document-detail")
