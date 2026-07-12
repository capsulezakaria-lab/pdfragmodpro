import { NextRequest } from "next/server"
import { success, error, unauthorized } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { withRateLimit } from "@/lib/plan-limits"

async function usageHandler(request: NextRequest) {
  try {
    const auth = request.headers.get("authorization")
    if (!auth?.startsWith("Bearer ")) return unauthorized()

    const token = auth.slice(7)
    const session = await prisma.session.findUnique({ where: { token } })
    if (!session) return unauthorized("Invalid session")

    const user = await prisma.user.findUnique({ where: { id: session.userId } })
    if (!user) return unauthorized("User not found")

    const usageRecords = await prisma.usage.findMany({
      where: { userId: session.userId },
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
      pagesUsed: totalPages,
      pagesLimit: user.credits,
      apiCalls: totalApiCalls,
      storageUsed: totalStorage,
      plan: user.plan,
      dailyUsage: Object.entries(dailyBreakdown).map(([date, data]) => ({
        date,
        pages: data.pages,
        api_calls: data.api_calls,
      })),
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export const GET = withRateLimit(usageHandler, "usage")
