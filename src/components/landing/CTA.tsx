"use client"

import { Container, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(0,217,255,0.15), transparent 60%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <Container size="md">
        <div className="relative text-center">
          <Reveal type="scaleIn">
            <Heading as="h2" size="h1" className="mb-4">
              Ready to transform your<br />
              <span className="gradient-text">documents into intelligence</span>
            </Heading>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Text size="lg" className="max-w-lg mx-auto mb-10">
              Join thousands of AI teams using ParseMind AI to power their document understanding pipeline. 
              Start free, no credit card required.
            </Text>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.2}>
            <div className="flex items-center justify-center gap-4">
              <Button variant="gradient" size="xl" icon={<ArrowRight className="h-5 w-5" />}>
                Start Free
              </Button>
              <Button variant="glass" size="xl">
                Talk to Sales
              </Button>
            </div>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.3}>
            <p className="mt-6 text-sm text-white/30">
              No credit card required &bull; Free tier includes 100 pages &bull; Cancel anytime
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
