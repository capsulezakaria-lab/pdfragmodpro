import { NextRequest } from "next/server"
import { success, error } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { stripe, PLANS } from "@/lib/stripe"
import { PlanSlug } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const sig = request.headers.get("stripe-signature")

    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
      return error("Missing stripe-signature header or webhook secret", 400)
    }

    let event
    try {
      event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return error("Invalid signature", 400)
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const userId = session.metadata?.userId
        const plan = session.metadata?.plan as PlanSlug | undefined

        if (userId && plan && PLANS[plan]) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan,
              credits: PLANS[plan].pagesPerMonth,
              stripeSubscriptionId: session.subscription as string,
            },
          })
          console.log(`User ${userId} upgraded to ${plan}`)
        }
        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          const priceId = subscription.items.data[0]?.price.id
          let plan: PlanSlug = "free"

          if (priceId === PLANS.pro.priceId) plan = "pro"
          else if (priceId === PLANS.business.priceId) plan = "business"

          await prisma.user.update({
            where: { id: userId },
            data: {
              plan,
              credits: PLANS[plan].pagesPerMonth,
            },
          })
          console.log(`Subscription updated for user ${userId}: ${plan}`)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const userId = subscription.metadata?.userId

        if (userId) {
          await prisma.user.update({
            where: { id: userId },
            data: {
              plan: "free",
              credits: PLANS.free.pagesPerMonth,
              stripeSubscriptionId: null,
            },
          })
          console.log(`Subscription cancelled for user ${userId}`)
        }
        break
      }

      case "invoice.paid": {
        const invoice = event.data.object
        const customerId = invoice.customer as string

        const user = await prisma.user.findFirst({
          where: { stripeCustomerId: customerId },
        })

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: { credits: PLANS[user.plan as PlanSlug]?.pagesPerMonth || 100 },
          })
          console.log(`Credits reset for user ${user.id}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return success({ received: true })
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export const runtime = "nodejs"
