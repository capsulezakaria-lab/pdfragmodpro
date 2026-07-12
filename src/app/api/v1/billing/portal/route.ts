import { NextRequest } from "next/server"
import { success, error, unauthorized, getAuthToken } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { stripe } from "@/lib/stripe"

async function authenticate(request: NextRequest): Promise<string | null> {
  const token = getAuthToken(request)
  if (!token) return null
  const session = await prisma.session.findUnique({ where: { token } })
  return session?.userId || null
}

export async function POST(request: NextRequest) {
  try {
    const userId = await authenticate(request)
    if (!userId) return unauthorized()

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return error("User not found", 404)
    if (!user.stripeCustomerId) return error("No billing account found. Subscribe to a plan first.", 404)

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard`,
    })

    return success({ portalUrl: portalSession.url })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
