"use client"

import { motion } from "framer-motion"
import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"

const benchmarks = [
  { metric: "OCR Accuracy", value: "99.9%", vs: "Industry avg: 95.2%", bar: 99, color: "#00D9FF" },
  { metric: "Table Extraction", value: "98.7%", vs: "Industry avg: 88.1%", bar: 95, color: "#5B6CFF" },
  { metric: "Formula Detection", value: "97.3%", vs: "Industry avg: 76.4%", bar: 92, color: "#8B5CF6" },
  { metric: "Processing Speed", value: "2.4s", vs: "Industry avg: 8.7s", bar: 85, color: "#00FF9D" },
  { metric: "Layout Preservation", value: "96.8%", vs: "Industry avg: 82.3%", bar: 90, color: "#00D9FF" },
  { metric: "Multilingual Support", value: "100+", vs: "Industry avg: 30+", bar: 100, color: "#FFC857" },
]

const competitors = [
  { name: "ParseMind AI", accuracy: 99.9, speed: 2.4, tables: 98.7, price: "$29/mo" },
  { name: "Competitor A", accuracy: 95.2, speed: 8.7, tables: 88.1, price: "$49/mo" },
  { name: "Competitor B", accuracy: 92.8, speed: 6.2, tables: 84.3, price: "$39/mo" },
  { name: "Competitor C", accuracy: 88.4, speed: 12.1, tables: 76.8, price: "$99/mo" },
]

export function Benchmarks() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <Container size="xl">
        <div className="text-center mb-20">
          <Reveal type="fadeInUp">
            <Badge variant="glass" size="md" className="mb-6">
              Benchmarks
            </Badge>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Heading as="h2" size="display" className="mb-4">
              Unmatched<br />
              <span className="gradient-text">performance</span>
            </Heading>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.2}>
            <Text size="lg" className="max-w-lg mx-auto">
              Independently verified benchmarks across accuracy, speed, and feature completeness.
            </Text>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-5">
            {benchmarks.map((bench, i) => (
              <Reveal key={bench.metric} type="fadeInUp" delay={0.05 * i}>
                <div className="group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/80">{bench.metric}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-white">{bench.value}</span>
                      <span className="text-xs text-white/30">{bench.vs}</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bench.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${bench.color}, ${bench.color}80)`,
                        boxShadow: `0 0 12px ${bench.color}40`,
                      }}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div>
            <Reveal type="fadeInRight">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.06]">
                  <Text size="sm" className="font-semibold">Competitive Comparison</Text>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left px-5 py-3 text-white/40 font-medium">Feature</th>
                        {competitors.map((c) => (
                          <th
                            key={c.name}
                            className={`px-4 py-3 text-left font-medium ${c.name === "ParseMind AI" ? "text-[#00D9FF]" : "text-white/40"}`}
                          >
                            {c.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Accuracy", key: "accuracy" as const, suffix: "%" },
                        { label: "Speed (sec)", key: "speed" as const, suffix: "s" },
                        { label: "Tables", key: "tables" as const, suffix: "%" },
                        { label: "Price", key: "price" as const, suffix: "" },
                      ].map((row) => (
                        <tr key={row.label} className="border-b border-white/[0.04] last:border-0">
                          <td className="px-5 py-3.5 text-white/60">{row.label}</td>
                          {competitors.map((c) => {
                            const val = c[row.key as keyof typeof c]
                            const isBest = c.name === "ParseMind AI"
                            return (
                              <td
                                key={c.name}
                                className={`px-4 py-3.5 ${isBest ? "text-white font-semibold" : "text-white/40"}`}
                              >
                                {val}{row.key !== "price" ? row.suffix : ""}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
