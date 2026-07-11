"use client"

import { Container, Badge, Heading } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Marquee } from "@/components/shared/Marquee"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "Neural Labs",
    content: "ParseMind AI transformed our RAG pipeline. We went from 60% to 98% retrieval accuracy.",
    initials: "SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "AI Engineer",
    company: "DataForge",
    content: "The OCR accuracy on complex layouts is incredible. Tables, math, multi-column—it handles everything.",
    initials: "MR",
  },
  {
    name: "Emily Watson",
    role: "Founder",
    company: "KnowledgeBot",
    content: "We process 50,000 documents daily. ParseMind's reliability and speed are unmatched.",
    initials: "EW",
  },
  {
    name: "Alex Kim",
    role: "Head of AI",
    company: "DocuMind",
    content: "The semantic understanding is next-level. It doesn't just extract text—it understands structure.",
    initials: "AK",
  },
  {
    name: "Jordan Taylor",
    role: "Principal Engineer",
    company: "ScaleAI",
    content: "We evaluated every PDF parser on the market. ParseMind was 10x better across every metric.",
    initials: "JT",
  },
  {
    name: "Priya Sharma",
    role: "VP Engineering",
    company: "InsightFlow",
    content: "The API is a dream to work with. Clean, well-documented, and incredibly fast response times.",
    initials: "PS",
  },
  {
    name: "David Park",
    role: "Research Scientist",
    company: "DeepRead",
    content: "For LLM training data extraction, ParseMind is the gold standard. Period.",
    initials: "DP",
  },
  {
    name: "Lisa Martinez",
    role: "Director of AI",
    company: "AutoDocs",
    content: "The self-hosted option gave us the security we needed without sacrificing any features.",
    initials: "LM",
  },
]

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <Container size="xl">
        <div className="text-center mb-16">
          <Reveal type="fadeInUp">
            <Badge variant="glass" size="md" className="mb-6">
              Testimonials
            </Badge>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Heading as="h2" size="display" className="mb-4">
              Loved by<br />
              <span className="gradient-text">AI builders</span>
            </Heading>
          </Reveal>
        </div>
      </Container>

      <div className="space-y-6">
        <Marquee direction="left" speed={35}>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
        <Marquee direction="right" speed={35}>
          {testimonials.slice().reverse().map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}

function TestimonialCard({
  name,
  role,
  company,
  content,
  initials,
}: {
  name: string
  role: string
  company: string
  content: string
  initials: string
}) {
  return (
    <div className="w-[380px] flex-shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 hover:bg-white/[0.05] transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-xs text-white/40">{role} at {company}</div>
        </div>
      </div>
      <p className="text-sm text-white/60 leading-relaxed">{content}</p>
      <div className="flex items-center gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} className="h-3.5 w-3.5 text-[#FFC857]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    </div>
  )
}
