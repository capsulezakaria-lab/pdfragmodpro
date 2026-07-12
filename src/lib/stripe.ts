import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-06-24.dahlia",
  typescript: true,
})

export const PLANS = {
  free: {
    name: "Free",
    pagesPerMonth: 100,
    priceId: null,
    features: ["100 PDF pages/month", "Basic OCR", "Markdown & JSON export", "Community support"],
  },
  pro: {
    name: "Pro",
    pagesPerMonth: 10_000,
    priceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro",
    features: ["10,000 PDF pages/month", "Advanced OCR, 100+ languages", "All output formats", "API access", "Priority support", "Vector database integration"],
  },
  business: {
    name: "Business",
    pagesPerMonth: 100_000,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || "price_business",
    features: ["100,000 PDF pages/month", "Everything in Pro", "Team collaboration", "Analytics dashboard", "SSO & role permissions", "Dedicated support"],
  },
  enterprise: {
    name: "Enterprise",
    pagesPerMonth: Infinity,
    priceId: null,
    features: ["Unlimited PDF pages", "Self-hosted deployment", "SOC 2, GDPR, HIPAA", "Custom integrations", "SLA guarantee", "Dedicated account manager"],
  },
} as const

export type PlanSlug = keyof typeof PLANS
