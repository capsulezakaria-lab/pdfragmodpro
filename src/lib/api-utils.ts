import { NextResponse } from "next/server"
import crypto from "crypto"

export function success<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status })
}

export function error(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { success: false, error: { message, ...(details ? { details } : {}) } },
    { status }
  )
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json(
    { success: false, error: { message } },
    { status: 401 }
  )
}

export function notFound(message = "Not found") {
  return NextResponse.json(
    { success: false, error: { message } },
    { status: 404 }
  )
}

export function rateLimited(message = "Too many requests") {
  return NextResponse.json(
    { success: false, error: { message } },
    { status: 429 }
  )
}

export function getAuthToken(request: Request): string | null {
  const auth = request.headers.get("authorization")
  if (!auth || !auth.startsWith("Bearer ")) return null
  return auth.slice(7)
}

export function generateId(): string {
  return crypto.randomUUID()
}

export function generateApiKey(): string {
  return "sk-" + crypto.randomBytes(32).toString("hex")
}
