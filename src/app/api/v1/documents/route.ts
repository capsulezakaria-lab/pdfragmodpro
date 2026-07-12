import { NextRequest } from "next/server"
import { success, error, unauthorized } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { withRateLimit } from "@/lib/plan-limits"

async function documentsHandler(request: NextRequest) {
  try {
    const auth = request.headers.get("authorization")
    if (!auth?.startsWith("Bearer ")) return unauthorized()

    const token = auth.slice(7)
    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) return unauthorized("Invalid session")

    if (request.method === "GET") {
      const documents = await prisma.document.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: "desc" },
      })
      return success({ documents, total: documents.length })
    }

    if (request.method === "DELETE") {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get("id")
      if (!id) return error("Document ID is required", 422)

      const doc = await prisma.document.findFirst({ where: { id, userId: session.userId } })
      if (!doc) return error("Document not found", 404)

      await prisma.document.delete({ where: { id } })
      return success({ deleted: true })
    }

    return error("Method not allowed", 405)
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export const GET = withRateLimit(documentsHandler, "documents")
export const DELETE = withRateLimit(documentsHandler, "documents:delete")
