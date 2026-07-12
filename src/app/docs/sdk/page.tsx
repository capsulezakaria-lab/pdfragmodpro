"use client"

import Link from "next/link"
import { Container, Badge, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { ArrowRight, Code, Terminal, Package } from "lucide-react"

const sdks = [
  {
    name: "Python",
    icon: "🐍",
    install: "pip install parsemind",
    description: "Full-featured Python SDK with async support, type hints, and Pydantic models.",
    docs: "/docs/python",
  },
  {
    name: "TypeScript",
    icon: "📦",
    install: "npm install parsemind",
    description: "TypeScript-first SDK with full type safety, tree-shaking, and React hooks.",
    docs: "/docs/typescript",
  },
  {
    name: "Go",
    icon: "🔵",
    install: "go get github.com/parsemind/parsemind-go",
    description: "Lightweight Go client with context support and automatic retries.",
    docs: "/docs/go",
  },
]

export default function SDKPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">SDKs</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-4">
            Official <span className="gradient-text">SDKs</span>
          </Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text size="lg" className="mb-12">
            Libraries for Python, TypeScript, and Go. Type-safe, well-documented, and production-ready.
          </Text>
        </Reveal>

        <div className="space-y-6">
          {sdks.map((sdk, i) => (
            <Reveal key={sdk.name} type="fadeInUp" delay={0.1 * i}>
              <Link href={sdk.docs} className="group block p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{sdk.icon}</span>
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#00D9FF] transition-colors">{sdk.name}</h3>
                    </div>
                    <p className="text-sm text-white/40 mb-3">{sdk.description}</p>
                    <code className="text-sm text-[#00FF9D] bg-black/30 rounded-lg px-3 py-1.5">{sdk.install}</code>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/20 group-hover:text-[#00D9FF] transition-colors mt-2" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal type="fadeInUp" delay={0.4}>
          <div className="mt-12 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-lg font-semibold text-white mb-3">Quick Example</h3>
            <pre className="text-sm text-white/60 bg-black/30 rounded-xl p-4 overflow-x-auto">
              <code>{`from parsemind import ParseMind

client = ParseMind(api_key="pm_...")
result = client.parse("document.pdf")
print(result.markdown)`}</code>
            </pre>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
