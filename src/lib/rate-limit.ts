import { NextRequest } from "next/server"
import { rateLimited } from "@/lib/api-utils"

const hits = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown"
}

function getKey(request: NextRequest, scope: string): string {
  const auth = request.headers.get("authorization")
  if (auth?.startsWith("Bearer ")) {
    return `api:${scope}:${auth.slice(7)}`
  }
  return `ip:${scope}:${getClientIp(request)}`
}

export function rateLimit(
  request: NextRequest,
  options: {
    scope?: string
    limit?: number
    windowMs?: number
  } = {}
): { allowed: boolean; remaining: number; resetAt: number } {
  const { scope = "default", limit = 60, windowMs = 60_000 } = options
  const key = getKey(request, scope)
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs }
  }

  entry.count++
  const remaining = Math.max(0, limit - entry.count)
  return { allowed: remaining > 0, remaining, resetAt: entry.resetAt }
}

export function addRateLimitHeaders(
  response: Response,
  result: { remaining: number; resetAt: number; limit: number }
) {
  const headers = new Headers(response.headers)
  headers.set("X-RateLimit-Limit", String(result.limit))
  headers.set("X-RateLimit-Remaining", String(result.remaining))
  headers.set("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)))
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
}

const cleanupInterval = setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of hits.entries()) {
    if (now > entry.resetAt) hits.delete(key)
  }
}, 60_000)

if (typeof cleanupInterval.unref === "function") cleanupInterval.unref()
