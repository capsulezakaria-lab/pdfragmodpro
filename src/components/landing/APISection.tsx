"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Container, Badge, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

type Language = "python" | "javascript" | "typescript" | "go" | "rust" | "curl"

const snippets: Record<Language, { label: string; code: string }> = {
  python: {
    label: "Python",
    code: `from parsemind import ParseMindAI

client = ParseMindAI(api_key="sk-...")

result = client.parse(
    file="research_paper.pdf",
    output_format="markdown",
    ocr_language="auto",
)

print(result.text)
# "## Abstract\nQuantum computing..."
`,
  },
  javascript: {
    label: "JavaScript",
    code: `import { ParseMindAI } from "parsemind-ai";

const client = new ParseMindAI({
  apiKey: "sk-...",
});

const result = await client.parse({
  file: "research_paper.pdf",
  outputFormat: "markdown",
  ocrLanguage: "auto",
});

console.log(result.text);
// "## Abstract\nQuantum computing..."
`,
  },
  typescript: {
    label: "TypeScript",
    code: `import { ParseMindAI, type ParseResult } from "parsemind-ai";

const client = new ParseMindAI({
  apiKey: "sk-...",
});

const result: ParseResult = await client.parse({
  file: "research_paper.pdf",
  outputFormat: "markdown",
});

console.log(result.confidence);
// 99.7
`,
  },
  go: {
    label: "Go",
    code: `package main

import (
    "fmt"
    "github.com/parsemind/parsemind-go"
)

func main() {
    client := parsemind.NewClient("sk-...")
    
    result, err := client.Parse(
        "research_paper.pdf",
        parsemind.FormatMarkdown,
    )
    if err != nil {
        panic(err)
    }
    
    fmt.Println(result.Text)
}
`,
  },
  rust: {
    label: "Rust",
    code: `use parsemind_ai::{Client, OutputFormat};

#[tokio::main]
async fn main() {
    let client = Client::new("sk-...");
    
    let result = client
        .parse("research_paper.pdf")
        .format(OutputFormat::Markdown)
        .send()
        .await
        .unwrap();
    
    println!("{}", result.text);
}
`,
  },
  curl: {
    label: "cURL",
    code: `curl -X POST https://api.parsemind.ai/v1/parse \\
  -H "Authorization: Bearer sk-..." \\
  -F "file=@research_paper.pdf" \\
  -F "output_format=markdown" \\
  -F "ocr_language=auto"

# Response:
# {
#   "status": "complete",
#   "pages": 24,
#   "confidence": 99.7,
#   "text": "## Abstract..."
# }
`,
  },
}

const languages = Object.keys(snippets) as Language[]

export function APISection() {
  const [activeLang, setActiveLang] = useState<Language>("python")
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(snippets[activeLang].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="api" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <Container size="xl">
        <div className="text-center mb-16">
          <Reveal type="fadeInUp">
            <Badge variant="glass" size="md" className="mb-6">
              API
            </Badge>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Heading as="h2" size="display" className="mb-4">
              Developer-first<br />
              <span className="gradient-text">API design</span>
            </Heading>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.2}>
            <Text size="lg" className="max-w-lg mx-auto">
              Clean, idiomatic SDKs in every major language. One API, infinite possibilities.
            </Text>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] mb-4">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer",
                  activeLang === lang ? "text-white" : "text-white/50 hover:text-white/80"
                )}
              >
                {activeLang === lang && (
                  <motion.div
                    layoutId="lang-bg"
                    className="absolute inset-0 bg-white/10 rounded-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{snippets[lang].label}</span>
              </button>
            ))}
          </div>

          <div className="relative rounded-2xl border border-white/[0.06] bg-[#04070D] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="text-sm text-white/50 font-mono">
                {snippets[activeLang].label.toLowerCase()}
              </span>
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[#00FF9D]" />
                ) : (
                  <Copy className="h-4 w-4 text-white/50" />
                )}
              </motion.button>
            </div>
            <pre className="p-5 overflow-x-auto">
              <code className="text-sm font-mono leading-relaxed text-white/80 whitespace-pre">
                {snippets[activeLang].code}
              </code>
            </pre>
          </div>

          <Reveal type="fadeInUp">
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button variant="glass" size="md">
                View Documentation
              </Button>
              <Button variant="ghost" size="md">
                API Reference →
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
