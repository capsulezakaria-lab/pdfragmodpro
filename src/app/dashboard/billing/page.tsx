"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui"
import { CreditCard, ExternalLink, Check, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

const plans = [
  { id: "free", name: "Free", price: "$0", pages: "100 pages/mo", features: ["100 PDF pages/month", "Basic OCR", "Markdown & JSON export"] },
  { id: "pro", name: "Pro", price: "$29", pages: "10,000 pages/mo", features: ["10,000 PDF pages/month", "Advanced OCR, 100+ languages", "All output formats", "API access"], popular: true },
  { id: "business", name: "Business", price: "$99", pages: "100,000 pages/mo", features: ["100,000 PDF pages/month", "Everything in Pro", "Team collaboration", "Analytics dashboard"] },
]

export default function BillingPage() {
  const { user, token, setUser } = useAuthStore()
  const [loading, setLoading] = useState<string | null>(null)

  async function handleUpgrade(plan: string) {
    if (!token) return
    setLoading(plan)
    try {
      const res = await fetch("/api/v1/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (data.success && data.data?.checkoutUrl) {
        window.location.assign(data.data.checkoutUrl)
      }
    } catch {}
    setLoading(null)
  }

  async function handleManageBilling() {
    if (!token) return
    setLoading("portal")
    try {
      const res = await fetch("/api/v1/billing/portal", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success && data.data?.portalUrl) {
        window.location.assign(data.data.portalUrl)
      }
    } catch {}
    setLoading(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        {user?.plan !== "free" && (
          <Button variant="glass" size="md" icon={<CreditCard className="h-4 w-4" />} onClick={handleManageBilling} loading={loading === "portal"}>
            Manage Billing
          </Button>
        )}
      </div>

      <div className="mb-8 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/40">Current Plan</p>
            <p className="text-2xl font-bold text-white capitalize">{user?.plan || "Free"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-white/40">Credits Remaining</p>
            <p className="text-2xl font-bold text-[#00D9FF]">{user?.credits?.toLocaleString() || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => {
          const isCurrent = user?.plan === plan.id
          return (
            <div key={plan.id} className={`relative rounded-2xl p-6 border transition-all ${plan.popular ? "border-[#00D9FF]/30 bg-white/[0.04]" : "border-white/[0.06] bg-white/[0.02]"}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-white/40">/mo</span>
              </div>
              <p className="text-xs text-white/30 mt-1">{plan.pages}</p>
              <ul className="mt-4 space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-white/50">
                    <Check className="h-4 w-4 text-[#00FF9D] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant={isCurrent ? "glass" : plan.popular ? "gradient" : "glass"}
                size="md"
                className="w-full mt-6"
                disabled={isCurrent}
                onClick={() => handleUpgrade(plan.id)}
                loading={loading === plan.id}
              >
                {isCurrent ? "Current Plan" : plan.id === "free" ? "Downgrade" : "Upgrade"}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
