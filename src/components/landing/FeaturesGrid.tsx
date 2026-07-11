"use client"

import { motion } from "framer-motion"
import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import {
  Scan,
  Languages,
  Table,
  Image,
  Sigma,
  ListOrdered,
  Layout,
  FileJson,
  FileText,
  Braces,
  Globe,
  Code2,
  Cloud,
  Building2,
  Database,
  Cpu,
} from "lucide-react"

const featureGroups = [
  {
    title: "Core Technology",
    color: "#00D9FF",
    items: [
      { icon: Scan, label: "AI OCR", desc: "99.9% accuracy" },
      { icon: Languages, label: "100+ Languages", desc: "CJK, Arabic, Hebrew" },
      { icon: Table, label: "Tables & Charts", desc: "Structure preserved" },
      { icon: Image, label: "Image Extraction", desc: "Figures & diagrams" },
    ],
  },
  {
    title: "Advanced Analysis",
    color: "#5B6CFF",
    items: [
      { icon: Sigma, label: "Math Formulas", desc: "LaTeX conversion" },
      { icon: ListOrdered, label: "Reading Order", desc: "Natural flow" },
      { icon: Layout, label: "Bounding Boxes", desc: "Positional data" },
      { icon: Cpu, label: "Layout Analysis", desc: "Multi-column" },
    ],
  },
  {
    title: "Output Formats",
    color: "#8B5CF6",
    items: [
      { icon: FileText, label: "Markdown", desc: "LLM-optimized" },
      { icon: FileJson, label: "JSON", desc: "Structured data" },
      { icon: Globe, label: "HTML", desc: "Web-ready" },
      { icon: Braces, label: "CSV & XML", desc: "Tabular export" },
    ],
  },
  {
    title: "Developer Tools",
    color: "#00FF9D",
    items: [
      { icon: Code2, label: "API & SDK", desc: "REST + 6 languages" },
      { icon: Cloud, label: "Cloud & Self-Host", desc: "Your infrastructure" },
      { icon: Database, label: "Vector DB Ready", desc: "Pinecone, Weaviate" },
      { icon: Building2, label: "Enterprise", desc: "SOC 2, HIPAA" },
    ],
  },
]

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <Container size="xl">
        <div className="text-center mb-20">
          <Reveal type="fadeInUp">
            <Badge variant="glass" size="md" className="mb-6">
              Features
            </Badge>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Heading as="h2" size="display" className="mb-4">
              Everything you need to<br />
              <span className="gradient-text">understand documents</span>
            </Heading>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.2}>
            <Text size="lg" className="max-w-xl mx-auto">
              From OCR to vector embeddings, ParseMind AI provides the complete pipeline for turning PDFs into AI-ready data.
            </Text>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featureGroups.map((group, gi) => (
            <div
              key={group.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at 50% 50%, ${group.color}08, transparent 60%)`,
                }}
              />
              <div className="relative z-10">
                <h3 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: group.color }}>
                  {group.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {group.items.map((feature, fi) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={feature.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fi * 0.05, duration: 0.4 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04] hover:bg-white/[0.06] transition-all duration-200"
                      >
                        <div
                          className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${group.color}15` }}
                        >
                          <Icon className="h-4 w-4" style={{ color: group.color }} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white/90">{feature.label}</div>
                          <div className="text-xs text-white/40 mt-0.5">{feature.desc}</div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
