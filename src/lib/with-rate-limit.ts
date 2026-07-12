import { NextRequest, NextResponse } from "next/server"
import { rateLimit, addRateLimitHeaders } from "@/lib/rate-limit"
import { rateLimited } from "@/lib/api-utils"

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

export function withRateLimit(
  handler: RouteHandler,
  options: {
    rpm?: number
    rpd?: number
    scope?: string
  } = {}
) {
  return async (request: NextRequest, context?: { params: Promise<Record<string, string>> }) => {
    const { rpm = 60, rpd = 1000, scope = "default" } = options

    const minuteResult = rateLimit(request, { scope, limit: rpm, windowMs: 60_000 })
    if (!minuteResult.allowed) {
      const resp = rateLimited("Rate limit exceeded. Try again in a few seconds.")
      return addRateLimitHeaders(resp, { ...minuteResult, limit: rpm })
    }

    const dayResult = rateLimit(request, { scope: `${scope}:daily`, limit: rpd, windowMs: 86_400_000 })
    if (!dayResult.allowed) {
      const resp = rateLimited("Daily rate limit exceeded. Upgrade your plan for higher limits.")
      return addRateLimitHeaders(resp, { ...dayResult, limit: rpd })
    }

    const response = await handler(request, context)
    return addRateLimitHeaders(response, { ...minuteResult, limit: rpm })
  }
}
