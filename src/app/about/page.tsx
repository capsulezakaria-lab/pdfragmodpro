"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Container, Badge, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Shield, Zap, Globe, Brain, ArrowRight, Check } from "lucide-react"

const stats = [
  { value: "99.9%", label: "OCR Accuracy" },
  { value: "100+", label: "Languages" },
  { value: "50K+", label: "Pages Parsed" },
  { value: "<2s", label: "Avg. Parse Time" },
]

const values = [
  { icon: Brain, title: "AI-First", description: "Every feature is powered by cutting-edge machine learning models." },
  { icon: Shield, title: "Security", description: "SOC 2 compliant. Your documents are encrypted at rest and in transit." },
  { icon: Zap, title: "Speed", description: "Optimized for performance. Parse thousands of pages in seconds." },
  { icon: Globe, title: "Global", description: "Supporting 100+ languages and serving users in 190+ countries." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">About</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-6">
            Making documents <span className="gradient-text">understandable</span>
          </Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text size="lg" className="max-w-2xl mb-16">
            ParseMind AI was built to solve a simple problem: turning PDFs into structured data that AI systems can actually use. We combine vision AI, OCR, and language models to extract everything from text and tables to formulas and diagrams.
          </Text>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} type="fadeInUp" delay={0.1 * i}>
              <div className="text-center p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mb-20">
          <Reveal type="fadeInUp">
            <Heading as="h2" size="h2" className="mb-8">Our Values</Heading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.title} type="fadeInUp" delay={0.1 * i}>
                <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                  <v.icon className="h-6 w-6 text-[#00D9FF] mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-white/40">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal type="fadeInUp">
          <div className="text-center p-12 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent">
            <Heading as="h2" size="h2" className="mb-4">Ready to get started?</Heading>
            <Text className="mb-6 text-white/40">Start parsing documents in minutes. No credit card required.</Text>
            <Button variant="gradient" size="lg" asChild href="/register">
              Get Started Free <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
