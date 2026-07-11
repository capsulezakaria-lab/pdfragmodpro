"use client"

import { Hero } from "@/components/landing/Hero"
import { SocialProof } from "@/components/landing/SocialProof"
import { FeaturesGrid } from "@/components/landing/FeaturesGrid"
import { LiveDemo } from "@/components/landing/LiveDemo"
import { AIPipeline } from "@/components/landing/AIPipeline"
import { APISection } from "@/components/landing/APISection"
import { Enterprise } from "@/components/landing/Enterprise"
import { Benchmarks } from "@/components/landing/Benchmarks"
import { Testimonials } from "@/components/landing/Testimonials"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"
import { CTA } from "@/components/landing/CTA"

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <FeaturesGrid />
      <LiveDemo />
      <AIPipeline />
      <APISection />
      <Enterprise />
      <Benchmarks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  )
}
