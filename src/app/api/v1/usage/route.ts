import { NextRequest } from "next/server"
import { success, error, unauthorized } from "@/lib/api-utils"
import prisma from "@/lib/db"

async function authenticate(request: NextRequest): Promise<string | null> {
  const auth = request.headers.get("authorization")
  if (!auth?.startsWith("Bearer ")) return null
  const token = auth.slice(7)
  const session = await prisma.session.findUnique({ where: { token } })
  return session?.userId || null
}

export async function GET(request: NextRequest) {
  try {
    const userId = await authenticate(request)
    if (!userId) return unauthorized()

    const usageRecords = await prisma.usage.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    })

    const totalPages = usageRecords.reduce((sum, r) => sum + r.pagesUsed, 0)
    const totalApiCalls = usageRecords.reduce((sum, r) => sum + r.apiCalls, 0)
    const totalStorage = usageRecords.reduce((sum, r) => sum + r.storageUsed, 0)

    const dailyBreakdown: Record<string, { pages: number; api_calls: number }> = {}
    for (const record of usageRecords) {
      if (!dailyBreakdown[record.date]) {
        dailyBreakdown[record.date] = { pages: 0, api_calls: 0 }
      }
      dailyBreakdown[record.date].pages += record.pagesUsed
      dailyBreakdown[record.date].api_calls += record.apiCalls
    }

    return success({
      summary: {
        total_pages: totalPages,
        total_api_calls: totalApiCalls,
        total_storage_bytes: totalStorage,
        total_storage_formatted: `${(totalStorage / (1024 * 1024)).toFixed(1)} MB`,
      },
      daily: Object.entries(dailyBreakdown).map(([date, data]) => ({
        date,
        pages: data.pages,
        api_calls: data.api_calls,
      })),
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
