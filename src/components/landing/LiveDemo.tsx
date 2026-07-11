"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container, Badge, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Upload, FileText, Check, Loader2, Download, Copy, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

type DemoState = "idle" | "uploading" | "processing" | "complete"

const mockOutput = `| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /v1/parse | Parse a PDF document |
| GET    | /v1/jobs/:id | Get job status |
| GET    | /v1/documents | List documents |

\`\`\`json
{
  "id": "doc_abc123",
  "status": "complete",
  "pages": 24,
  "confidence": 99.7,
  "tables": 8,
  "formulas": 24,
  "images": 12,
  "language": "en"
}
\`\`\`

# Quantum Computing: A Comprehensive Survey

## Abstract

This paper presents a comprehensive survey of quantum computing...
`

export function LiveDemo() {
  const [state, setState] = useState<DemoState>("idle")
  const [progress, setProgress] = useState(0)

  const handleUpload = useCallback(() => {
    if (state !== "idle") return
    setState("uploading")
    setTimeout(() => {
      setState("processing")
      let p = 0
      const interval = setInterval(() => {
        p += Math.random() * 15 + 5
        if (p >= 100) {
          p = 100
          clearInterval(interval)
          setTimeout(() => setState("complete"), 300)
        }
        setProgress(Math.min(p, 100))
      }, 400)
    }, 800)
  }, [state])

  function reset() {
    setState("idle")
    setProgress(0)
  }

  return (
    <section id="demo" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <Container size="xl">
        <div className="text-center mb-16">
          <Reveal type="fadeInUp">
            <Badge variant="glass" size="md" className="mb-6">
              Live Demo
            </Badge>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Heading as="h2" size="display" className="mb-4">
              See it in<br />
              <span className="gradient-text">action</span>
            </Heading>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.2}>
            <Text size="lg" className="max-w-lg mx-auto">
              Upload a PDF and watch ParseMind AI transform it into clean, structured data in seconds.
            </Text>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          <div className="lg:col-span-2">
            <div
              onClick={handleUpload}
              className={cn(
                "relative rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center text-center transition-all duration-300 min-h-[300px] cursor-pointer",
                state === "idle"
                  ? "border-white/[0.12] bg-white/[0.02] hover:border-[#00D9FF]/40 hover:bg-white/[0.04]"
                  : "border-white/[0.12] bg-white/[0.02]"
              )}
            >
              <AnimatePresence mode="wait">
                {state === "idle" && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                      <Upload className="h-8 w-8 text-white/40" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Drop PDF here or click to upload</p>
                      <p className="text-sm text-white/40 mt-1">Supports PDF, PNG, JPG, TIFF</p>
                    </div>
                  </motion.div>
                )}
                {state === "uploading" && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/20 flex items-center justify-center">
                      <FileText className="h-8 w-8 text-[#00D9FF]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">research_paper.pdf</p>
                      <p className="text-sm text-white/40 mt-1">12.4 MB — Uploading...</p>
                    </div>
                    <div className="w-48 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00D9FF] to-[#5B6CFF]"
                      />
                    </div>
                  </motion.div>
                )}
                {state === "processing" && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-[#5B6CFF]/10 border border-[#5B6CFF]/20 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-[#5B6CFF] animate-spin" />
                    </div>
                    <div>
                      <p className="text-white font-medium">AI is analyzing your document...</p>
                      <p className="text-sm text-white/40 mt-1">
                        OCR &bull; Layout &bull; Semantic Understanding
                      </p>
                    </div>
                    <div className="w-48 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        animate={{ width: `${progress}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#5B6CFF] to-[#8B5CF6]"
                      />
                    </div>
                    <p className="text-xs text-white/30">{Math.round(progress)}%</p>
                  </motion.div>
                )}
                {state === "complete" && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="h-16 w-16 rounded-2xl bg-[#00FF9D]/10 border border-[#00FF9D]/20 flex items-center justify-center">
                      <Check className="h-8 w-8 text-[#00FF9D]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Processing Complete</p>
                      <p className="text-sm text-white/40 mt-1">24 pages &bull; 99.7% confidence &bull; 2.4s</p>
                    </div>
                    <Button variant="glass" size="sm" onClick={reset}>
                      Parse Another
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/[0.06] bg-[#04070D] overflow-hidden h-full">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#FF4D6A]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFC857]" />
                  <div className="h-3 w-3 rounded-full bg-[#00FF9D]" />
                  <span className="ml-2 text-xs text-white/30 font-mono">output.md</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white/80 transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-5 overflow-auto max-h-[350px]">
                <pre className="text-sm font-mono text-white/70 leading-relaxed whitespace-pre-wrap">
                  {state === "complete"
                    ? mockOutput
                    : state === "processing"
                    ? "// AI is processing your document...\n// This may take a few seconds\n\n"
                    : "// Upload a PDF to see the parsed output here\n// Supports Markdown, JSON, HTML, CSV, XML\n"}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
