"use client"

import Link from "next/link"
import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { ArrowUpRight } from "lucide-react"

const changes = [
  {
    version: "1.0.0",
    date: "2026-07-10",
    tag: "Latest",
    items: [
      "ParseMind AI v1.0 launch",
      "PDF to Markdown, JSON, HTML, CSV, XML conversion",
      "Vision AI OCR with 99.9% accuracy",
      "100+ language support",
      "Table and formula extraction",
      "API with REST endpoints",
      "Dashboard with analytics",
      "Stripe billing integration",
    ],
  },
  {
    version: "0.9.0",
    date: "2026-06-28",
    tag: "Beta",
    items: [
      "Beta launch with core parsing features",
      "Basic OCR pipeline",
      "Markdown and JSON export",
      "User authentication and API keys",
      "Usage tracking",
    ],
  },
  {
    version: "0.8.0",
    date: "2026-06-15",
    tag: "Alpha",
    items: [
      "Internal alpha testing",
      "PDF parsing prototype",
      "Table detection v1",
      "Multi-page document handling",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">Changelog</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-4">
            What&apos;s <span className="gradient-text">new</span>
          </Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text size="lg" className="mb-12">
            Track every update, improvement, and fix.
          </Text>
        </Reveal>

        <div className="space-y-8">
          {changes.map((release, i) => (
            <Reveal key={release.version} type="fadeInUp" delay={0.1 * i}>
              <div className="relative pl-8 border-l border-white/[0.08]">
                <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-[#00D9FF] -translate-x-[5px]" />
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-mono text-white/60">v{release.version}</span>
                  <span className="text-xs text-white/30">{release.date}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-xs text-white/50">{release.tag}</span>
                </div>
                <ul className="space-y-2">
                  {release.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="text-[#00FF9D] mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
