"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Container, Badge, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying",
    price: "$0",
    credits: "100 pages/mo",
    features: [
      "100 PDF pages/month",
      "Basic OCR",
      "Markdown & JSON export",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For developers & small teams",
    price: "$29",
    credits: "10,000 pages/mo",
    features: [
      "10,000 PDF pages/month",
      "Advanced OCR, 100+ languages",
      "All output formats",
      "API access",
      "Priority support",
      "Vector database integration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    description: "For growing companies",
    price: "$99",
    credits: "100,000 pages/mo",
    features: [
      "100,000 PDF pages/month",
      "Everything in Pro",
      "Team collaboration",
      "Analytics dashboard",
      "SSO & role permissions",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "For organizations",
    price: "Custom",
    credits: "Unlimited",
    features: [
      "Unlimited PDF pages",
      "Self-hosted deployment",
      "SOC 2, GDPR, HIPAA",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">Pricing</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-4">
            Simple, transparent<br />
            <span className="gradient-text">pricing</span>
          </Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text size="lg" className="max-w-lg mx-auto mb-8">
            Start free, scale as you grow. No hidden fees, no surprise charges.
          </Text>
        </Reveal>

        <Reveal type="fadeInUp" delay={0.3}>
          <div className="flex items-center gap-3 justify-center mb-12">
            <span className={cn("text-sm", !annual ? "text-white" : "text-white/40")}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative h-7 w-12 rounded-full transition-colors duration-300 cursor-pointer",
                annual ? "bg-[#00D9FF]" : "bg-white/[0.1]"
              )}
            >
              <motion.div
                animate={{ x: annual ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 h-5 w-5 rounded-full bg-white"
              />
            </button>
            <span className={cn("text-sm", annual ? "text-white" : "text-white/40")}>
              Annual <span className="text-[#00FF9D]">Save 20%</span>
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} type="fadeInUp" delay={0.1 * i}>
              <div
                className={cn(
                  "group relative rounded-2xl p-6 border transition-all duration-500 h-full flex flex-col",
                  plan.popular
                    ? "border-[#00D9FF]/30 bg-white/[0.04]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                    <p className="text-sm text-white/40 mt-1">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">
                        {annual && plan.price !== "Custom"
                          ? `$${Math.round(parseInt(plan.price.slice(1)) * 0.8 * 12)}`
                          : plan.price}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="text-sm text-white/40">/{annual ? "yr" : "mo"}</span>
                      )}
                    </div>
                    <p className="text-xs text-white/30 mt-1">{plan.credits}</p>
                  </div>
                  <ul className="mt-6 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-[#00FF9D] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/60">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "gradient" : "glass"}
                    size="md"
                    className="w-full mt-8"
                    asChild
                    href={plan.name === "Enterprise" ? "/contact" : "/register"}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal type="fadeInUp" delay={0.6}>
          <div className="mt-12 text-center text-sm text-white/30">
            All plans include SSL, 99.9% uptime SLA, and GDPR compliance.
          </div>
        </Reveal>
      </div>
    </div>
  )
}
