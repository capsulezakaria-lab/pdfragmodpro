import { NextRequest } from "next/server"
import { success, error, unauthorized, notFound } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return unauthorized()
    }

    const apiKey = authHeader.slice(7)
    const keyRecord = await prisma.apiKey.findUnique({ where: { key: apiKey } })
    if (!keyRecord) {
      return unauthorized("Invalid API key")
    }

    const { id } = await params
    const doc = await prisma.document.findUnique({ where: { id } })

    if (!doc || doc.userId !== keyRecord.userId) {
      return notFound("Document not found")
    }

    return success({
      id: doc.id,
      name: doc.name,
      pages: doc.pages,
      status: doc.status,
      confidence: doc.confidence,
      format: doc.format,
      language: doc.language,
      size: doc.size,
      created_at: doc.createdAt.toISOString(),
      processing_time: doc.processingTime,
      tables_count: doc.tablesCount,
      formulas_count: doc.formulasCount,
      images_count: doc.imagesCount,
      output: {
        markdown: doc.status === "complete" ? doc.outputMarkdown : null,
        json: doc.status === "complete" ? doc.outputJson : null,
        html: doc.status === "complete" ? doc.outputHtml : null,
      },
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return unauthorized()
    }

    const apiKey = authHeader.slice(7)
    const keyRecord = await prisma.apiKey.findUnique({ where: { key: apiKey } })
    if (!keyRecord) {
      return unauthorized("Invalid API key")
    }

    const { id } = await params
    const doc = await prisma.document.findUnique({ where: { id } })

    if (!doc || doc.userId !== keyRecord.userId) {
      return notFound("Document not found")
    }

    await prisma.document.delete({ where: { id } })
    return success({ deleted: true })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
