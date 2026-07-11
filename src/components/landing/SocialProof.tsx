"use client"

import { Container, Text } from "@/components/ui"
import { Marquee } from "@/components/shared/Marquee"
import { StatsCounter } from "@/components/shared/StatsCounter"
import { Reveal } from "@/components/shared/Reveal"

const logos = [
  "OpenAI", "Google", "Meta", "Microsoft", "Apple",
  "Amazon", "Nvidia", "Anthropic", "Hugging Face", "Stability AI",
  "Cohere", "Mistral", "Databricks", "Snowflake", "Palantir",
]

const stats = [
  { to: 10_000_000, suffix: "+", label: "Documents Processed" },
  { to: 100, suffix: "+", label: "Languages Supported" },
  { to: 50_000, suffix: "+", label: "Active Developers" },
  { to: 500, suffix: "+", label: "Enterprise Customers" },
]

export function SocialProof() {
  return (
    <section className="relative py-20 border-t border-white/[0.06]">
      <Container size="xl">
        <Reveal type="fadeInUp">
          <Text size="sm" color="tertiary" className="text-center uppercase tracking-widest mb-8">
            Trusted by leading AI teams worldwide
          </Text>
        </Reveal>

        <Marquee direction="left" speed={25}>
          {logos.map((name) => (
            <div
              key={name}
              className="h-12 px-8 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center"
            >
              <span className="text-sm font-semibold text-white/30 tracking-tight whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </Marquee>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} type="fadeInUp" delay={0.1 * i}>
              <StatsCounter
                to={stat.to}
                suffix={stat.suffix}
                label={stat.label}
                duration={2.5}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
