import { NextRequest, NextResponse } from "next/server"
import { rateLimit, addRateLimitHeaders } from "@/lib/rate-limit"

type RouteHandler = (
  request: NextRequest,
  context?: { params: Promise<Record<string, string>> }
) => Promise<NextResponse> | NextResponse

const PLAN_LIMITS: Record<string, { rpm: number; rpd: number }> = {
  free: { rpm: 10, rpd: 200 },
  pro: { rpm: 60, rpd: 5000 },
  business: { rpm: 120, rpd: 20000 },
  enterprise: { rpm: 600, rpd: 100000 },
}

export function withRateLimit(handler: RouteHandler, scope = "default") {
  return async (request: NextRequest, context?: { params: Promise<Record<string, string>> }) => {
    const limits = PLAN_LIMITS.free

    const minuteResult = rateLimit(request, { scope, limit: limits.rpm, windowMs: 60_000 })
    if (!minuteResult.allowed) {
      const resp = NextResponse.json(
        { success: false, error: { message: "Rate limit exceeded. Try again in a few seconds." } },
        { status: 429 }
      )
      return addRateLimitHeaders(resp, { ...minuteResult, limit: limits.rpm })
    }

    const dayResult = rateLimit(request, { scope: `${scope}:daily`, limit: limits.rpd, windowMs: 86_400_000 })
    if (!dayResult.allowed) {
      const resp = NextResponse.json(
        { success: false, error: { message: "Daily rate limit exceeded. Upgrade your plan for higher limits." } },
        { status: 429 }
      )
      return addRateLimitHeaders(resp, { ...dayResult, limit: limits.rpd })
    }

    const response = await handler(request, context)
    return addRateLimitHeaders(response, { ...minuteResult, limit: limits.rpm })
  }
}

export async function checkPlanLimits(
  userId: string,
  prisma: any
): Promise<{ allowed: boolean; error?: string }> {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return { allowed: false, error: "User not found" }

  const limits = PLAN_LIMITS[user.plan] || PLAN_LIMITS.free

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const usage = await prisma.usage.aggregate({
    where: {
      userId,
      date: { gte: startOfMonth.toISOString().split("T")[0] },
    },
    _sum: { pagesUsed: true, apiCalls: true },
  })

  const pagesUsed = usage._sum.pagesUsed || 0
  const apiCalls = usage._sum.apiCalls || 0

  if (user.credits <= 0) {
    return { allowed: false, error: "No credits remaining. Upgrade your plan or wait for monthly reset." }
  }

  return { allowed: true }
}
