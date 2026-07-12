import { NextRequest } from "next/server"
import { success, error, unauthorized, getAuthToken } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { stripe, PLANS } from "@/lib/stripe"

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

    const body = await request.json().catch(() => ({}))
    const { priceId, plan } = body as { priceId?: string; plan?: string }

    if (!priceId && !plan) {
      return error("priceId or plan is required", 422)
    }

    const targetPlan = plan as keyof typeof PLANS
    const selectedPriceId = priceId || PLANS[targetPlan]?.priceId
    if (!selectedPriceId) {
      return error("Invalid plan or missing price ID", 422)
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) return error("User not found", 404)

    let customerId = user.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      })
      customerId = customer.id
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customerId },
      })
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: selectedPriceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/pricing`,
      metadata: { userId, plan: targetPlan },
    })

    return success({ checkoutUrl: session.url, sessionId: session.id })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
