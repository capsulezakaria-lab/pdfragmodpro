"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Container, Badge, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { GithubIcon } from "@/components/ui/Icons"

const floatingCards = [
  { label: "Pages", value: "12", sub: "processed", x: 0, y: 0, delay: 0 },
  { label: "Confidence", value: "99.8%", sub: "accuracy", x: 1, y: 0, delay: 0.1 },
  { label: "Formulas", value: "24", sub: "detected", x: 0, y: 1, delay: 0.2 },
  { label: "Tables", value: "8", sub: "extracted", x: 1, y: 1, delay: 0.3 },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16">
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative z-10">
            <Reveal type="fadeInUp" delay={0.1}>
              <Badge variant="gradient" size="lg" className="mb-6">
                AI-Powered Document Understanding
              </Badge>
            </Reveal>

            <Reveal type="fadeInUp" delay={0.2}>
              <h1 className="text-[clamp(40px,6vw,80px)] leading-[0.95] tracking-[-0.03em] font-bold text-white mb-6 text-balance">
                Turn Any PDF Into<br />
                <span className="gradient-text">AI-Ready Knowledge</span>
              </h1>
            </Reveal>

            <Reveal type="fadeInUp" delay={0.3}>
              <p className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-lg mb-10">
                The most advanced document understanding platform for modern AI systems. 
                Transform PDFs into Markdown, JSON, HTML, and structured datasets with state-of-the-art AI.
              </p>
            </Reveal>

            <Reveal type="fadeInUp" delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="gradient" size="xl" icon={<ArrowRight className="h-5 w-5" />} asChild>
                  <a href="/register">Start Free</a>
                </Button>
                <Button variant="glass" size="xl" icon={<Play className="h-5 w-5" />} asChild>
                  <a href="#demo">Watch Demo</a>
                </Button>
                <Button variant="ghost" size="xl" icon={<GithubIcon className="h-5 w-5" />} asChild>
                  <a href="https://github.com/capsulezakaria-lab/pdfragmodpro" target="_blank" rel="noopener noreferrer">GitHub</a>
                </Button>
              </div>
            </Reveal>

            <Reveal type="fadeInUp" delay={0.5}>
              <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/[0.06]">
                {[
                  { number: "10M+", label: "Docs Processed" },
                  { number: "99.9%", label: "Accuracy" },
                  { number: "100+", label: "Languages" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal type="fadeInRight" delay={0.3}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00D9FF]/10 via-[#5B6CFF]/10 to-[#8B5CF6]/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <div className="h-3 w-3 rounded-full bg-[#FF4D6A]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFC857]" />
                  <div className="h-3 w-3 rounded-full bg-[#00FF9D]" />
                  <span className="ml-2 text-xs text-white/30 font-mono">parsemind — live_demo.sh</span>
                </div>
                <div className="p-5 space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00FF9D]">$</span>
                    <span className="text-white/50">curl -X POST https://api.parsemind.ai/v1/parse \</span>
                  </div>
                  <div className="flex items-center gap-2 pl-5">
                    <span className="text-white/50">-F file=</span>
                    <span className="text-[#FFC857]">{'"research_paper.pdf"'}</span>
                  </div>
                  <div className="h-px bg-white/[0.06] my-3" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00FF9D] animate-pulse" />
                      <span className="text-[#00FF9D] text-xs">AI processing</span>
                    </div>
                    <p className="text-white/50">{'{'}</p>
                    <p className="pl-4 text-white/50">{'"status": '}<span className="text-[#00D9FF]">{'"complete"'}</span>,</p>
                    <p className="pl-4 text-white/50">{'"pages": '}<span className="text-[#FFC857]">24</span>,</p>
                    <p className="pl-4 text-white/50">{'"confidence": '}<span className="text-[#FFC857]">99.7</span>,</p>
                    <p className="pl-4 text-white/50">{'"language": '}<span className="text-[#00FF9D]">{'"en"'}</span>,</p>
                    <p className="pl-4 text-white/50">{'"format": '}<span className="text-[#00FF9D]">{'"markdown"'}</span>,</p>
                    <p className="text-white/50">{'}'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-4 border-t border-white/[0.06] bg-white/[0.02]">
                  {floatingCards.map((card) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + card.delay, duration: 0.4 }}
                      className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3"
                    >
                      <div className="text-xs text-white/40">{card.label}</div>
                      <div className="text-lg font-semibold text-white mt-0.5">{card.value}</div>
                      <div className="text-[10px] text-white/30">{card.sub}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="px-4 py-3 bg-[#00FF9D]/5 border-t border-white/[0.06] flex items-center gap-2">
                  <svg className="h-4 w-4 text-[#00FF9D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-xs text-[#00FF9D] font-medium">Markdown output ready — 2.4s processing time</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
