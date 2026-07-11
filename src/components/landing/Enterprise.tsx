"use client"

import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import {
  Shield,
  Lock,
  FileCheck,
  Key,
  Users,
  BarChart3,
  Server,
  Building2,
} from "lucide-react"

const features = [
  { icon: Shield, label: "SOC 2 Type II", desc: "Certified security controls" },
  { icon: Lock, label: "End-to-End Encryption", desc: "AES-256 at rest, TLS 1.3 in transit" },
  { icon: FileCheck, label: "GDPR Compliant", desc: "Data protection by design" },
  { icon: Key, label: "SSO & SAML", desc: "Okta, Azure AD, Google Workspace" },
  { icon: Users, label: "Role-Based Access", desc: "Granular permission controls" },
  { icon: BarChart3, label: "Audit Logs", desc: "Complete activity trail" },
  { icon: Server, label: "Self-Hosted", desc: "Deploy on your infrastructure" },
  { icon: Building2, label: "SLA Guarantee", desc: "99.99% uptime, 1-hour support" },
]

export function Enterprise() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal type="fadeInLeft">
              <Badge variant="glass" size="md" className="mb-6">
                Enterprise
              </Badge>
            </Reveal>
            <Reveal type="fadeInLeft" delay={0.1}>
              <Heading as="h2" size="h1" className="mb-4">
                Built for the<br />
                <span className="gradient-text">most demanding</span><br />
                organizations
              </Heading>
            </Reveal>
            <Reveal type="fadeInLeft" delay={0.2}>
              <Text size="lg" className="max-w-md mb-8">
                Enterprise-grade security, compliance, and control. Deploy on your infrastructure, 
                integrate with your stack, and scale to millions of documents.
              </Text>
            </Reveal>
            <Reveal type="fadeInLeft" delay={0.3}>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["/avatars/1.jpg", "/avatars/2.jpg", "/avatars/3.jpg"].map((src, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#04070D] bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center text-[10px] font-bold text-white"
                    >
                      {["AC", "MD", "SK"][i]}
                    </div>
                  ))}
                </div>
                <Text size="sm" color="tertiary">
                  Trusted by Fortune 500 security teams
                </Text>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <Reveal key={feature.label} type="fadeInUp" delay={0.05 * i}>
                  <div className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all duration-300">
                    <div
                      className="h-9 w-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: `${["#00D9FF", "#5B6CFF", "#8B5CF6", "#00FF9D", "#FFC857", "#00D9FF", "#5B6CFF", "#8B5CF6"][i]}15` }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: ["#00D9FF", "#5B6CFF", "#8B5CF6", "#00FF9D", "#FFC857", "#00D9FF", "#5B6CFF", "#8B5CF6"][i] }}
                      />
                    </div>
                    <div className="text-sm font-semibold text-white/90 mb-0.5">{feature.label}</div>
                    <div className="text-xs text-white/40">{feature.desc}</div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
