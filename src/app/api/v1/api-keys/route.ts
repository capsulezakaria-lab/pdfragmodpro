import { NextRequest } from "next/server"
import { success, error, unauthorized, generateApiKey } from "@/lib/api-utils"
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

    const keys = await prisma.apiKey.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return success({
      keys: keys.map((k) => ({
        id: k.id,
        name: k.name,
        key: k.key,
        last_used: k.lastUsed?.toISOString() || null,
        created_at: k.createdAt.toISOString(),
      })),
    })
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await authenticate(request)
    if (!userId) return unauthorized()

    const body = await request.json()
    const { name } = body

    if (!name) {
      return error("Key name is required", 422)
    }

    const key = await prisma.apiKey.create({
      data: {
        userId,
        name,
        key: generateApiKey(),
      },
    })

    return success({
      id: key.id,
      name: key.name,
      key: key.key,
      created_at: key.createdAt.toISOString(),
    }, 201)
  } catch (e) {
    return error("Internal server error", 500)
  }
}
