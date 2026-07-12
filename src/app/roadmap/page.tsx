"use client"

import Link from "next/link"
import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Check, Clock, ArrowRight } from "lucide-react"

const roadmap = [
  {
    phase: "Phase 1",
    title: "Foundation",
    status: "done",
    items: [
      { text: "Core PDF parsing engine", done: true },
      { text: "Vision AI OCR pipeline", done: true },
      { text: "Multi-format export", done: true },
      { text: "REST API", done: true },
      { text: "Dashboard UI", done: true },
    ],
  },
  {
    phase: "Phase 2",
    title: "Intelligence",
    status: "done",
    items: [
      { text: "Table extraction v2", done: true },
      { text: "Formula recognition", done: true },
      { text: "Image extraction", done: true },
      { text: "100+ language support", done: true },
      { text: "Confidence scoring", done: true },
    ],
  },
  {
    phase: "Phase 3",
    title: "Scale",
    status: "in-progress",
    items: [
      { text: "Batch processing", done: true },
      { text: "Webhook callbacks", done: true },
      { text: "Vector DB integration", done: false },
      { text: "Custom model training", done: false },
      { text: "Multi-user teams", done: false },
    ],
  },
  {
    phase: "Phase 4",
    title: "Enterprise",
    status: "upcoming",
    items: [
      { text: "SSO & RBAC", done: false },
      { text: "SOC 2 compliance", done: false },
      { text: "Self-hosted deployment", done: false },
      { text: "Custom SLA", done: false },
      { text: "Dedicated support", done: false },
    ],
  },
]

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">Roadmap</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-4">
            Where we&apos;re <span className="gradient-text">going</span>
          </Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text size="lg" className="mb-12">
            Our vision for the future of document intelligence.
          </Text>
        </Reveal>

        <div className="space-y-6">
          {roadmap.map((phase, i) => (
            <Reveal key={phase.phase} type="fadeInUp" delay={0.1 * i}>
              <div className={`p-6 rounded-2xl border transition-all ${
                phase.status === "done"
                  ? "border-emerald-500/20 bg-emerald-500/5"
                  : phase.status === "in-progress"
                  ? "border-[#00D9FF]/20 bg-[#00D9FF]/5"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-white/40">{phase.phase}</span>
                  <h3 className="text-lg font-semibold text-white">{phase.title}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    phase.status === "done"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : phase.status === "in-progress"
                      ? "bg-[#00D9FF]/10 text-[#00D9FF]"
                      : "bg-white/[0.06] text-white/40"
                  }`}>
                    {phase.status === "done" ? "Done" : phase.status === "in-progress" ? "In Progress" : "Upcoming"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {phase.items.map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm">
                      {item.done ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Clock className="h-4 w-4 text-white/20" />
                      )}
                      <span className={item.done ? "text-white/60" : "text-white/30"}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
