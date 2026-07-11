"use client"

import { motion } from "framer-motion"
import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import {
  FileText,
  Scan,
  Eye,
  Layout,
  Brain,
  FileDown,
  Database,
  Cpu,
} from "lucide-react"

const steps = [
  { icon: FileText, label: "PDF", desc: "Input document", color: "#FF4D6A" },
  { icon: Scan, label: "OCR", desc: "Text extraction", color: "#FFC857" },
  { icon: Eye, label: "Vision AI", desc: "Visual analysis", color: "#00D9FF" },
  { icon: Layout, label: "Layout Analysis", desc: "Structure detection", color: "#5B6CFF" },
  { icon: Brain, label: "Semantic Understanding", desc: "Context & meaning", color: "#8B5CF6" },
  { icon: FileDown, label: "Markdown", desc: "Structured output", color: "#00FF9D" },
  { icon: Database, label: "Vector Database", desc: "Embedding storage", color: "#00D9FF" },
  { icon: Cpu, label: "LLM", desc: "AI ready", color: "#8B5CF6" },
]

export function AIPipeline() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <Container size="xl">
        <div className="text-center mb-20">
          <Reveal type="fadeInUp">
            <Badge variant="glass" size="md" className="mb-6">
              AI Pipeline
            </Badge>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Heading as="h2" size="display" className="mb-4">
              From PDF to<br />
              <span className="gradient-text">AI-ready data</span>
            </Heading>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.2}>
            <Text size="lg" className="max-w-lg mx-auto">
              Eight stages of intelligent processing. Each step is optimized for speed, accuracy, and scale.
            </Text>
          </Reveal>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-12 left-[52px] right-[52px] h-px bg-gradient-to-r from-[#FF4D6A] via-[#00D9FF] via-[#5B6CFF] via-[#8B5CF6] via-[#00FF9D] to-[#8B5CF6] opacity-30 hidden lg:block" />

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, y: -4 }}
                    className="relative h-14 w-14 rounded-2xl flex items-center justify-center mb-3 border"
                    style={{
                      background: `${step.color}12`,
                      borderColor: `${step.color}25`,
                    }}
                  >
                    <Icon className="h-6 w-6" style={{ color: step.color }} />
                    <div
                      className="absolute -inset-1 rounded-3xl opacity-20 blur-md"
                      style={{ background: step.color }}
                    />
                  </motion.div>
                  <div className="text-sm font-semibold text-white/90">{step.label}</div>
                  <div className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">{step.desc}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
