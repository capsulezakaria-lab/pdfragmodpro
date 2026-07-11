import { NextRequest } from "next/server"
import { success, error, unauthorized } from "@/lib/api-utils"
import prisma from "@/lib/db"

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const format = searchParams.get("format")
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100)
    const offset = Number(searchParams.get("offset")) || 0

    const where: Record<string, unknown> = { userId: keyRecord.userId }
    if (status) where.status = status
    if (format) where.format = format

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
        select: {
          id: true, name: true, pages: true, status: true,
          confidence: true, format: true, language: true,
          createdAt: true, processingTime: true,
        },
      }),
      prisma.document.count({ where }),
    ])

    return success({
      documents: documents.map((d) => ({
        id: d.id,
        name: d.name,
        pages: d.pages,
        status: d.status,
        confidence: d.confidence,
        format: d.format,
        language: d.language,
        created_at: d.createdAt.toISOString(),
        processing_time: d.processingTime,
      })),
      total,
      limit,
      offset,
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
