import { NextRequest } from "next/server"
import { success, error } from "@/lib/api-utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const event = body.type as string

    switch (event) {
      case "checkout.session.completed": {
        const session = body.data.object
        console.log(`Payment completed: ${session.id}`)
        break
      }
      case "customer.subscription.updated": {
        const subscription = body.data.object
        console.log(`Subscription updated: ${subscription.id}`)
        break
      }
      case "customer.subscription.deleted": {
        const subscription = body.data.object
        console.log(`Subscription cancelled: ${subscription.id}`)
        break
      }
      case "invoice.paid": {
        const invoice = body.data.object
        console.log(`Invoice paid: ${invoice.id}`)
        break
      }
      default:
        console.log(`Unhandled event type: ${event}`)
    }

    return success({ received: true })
  } catch (e) {
    return error("Internal server error", 500)
  }
}
