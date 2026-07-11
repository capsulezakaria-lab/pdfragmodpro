"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui"
import { ArrowLeft, Download, Copy, Share2, FileText, Clock, CheckCircle, Tag } from "lucide-react"
import Link from "next/link"

const docData = {
  id: "doc_001",
  name: "research_paper.pdf",
  pages: 24,
  status: "complete",
  confidence: 99.7,
  language: "English",
  format: "Markdown",
  created: "2 minutes ago",
  processingTime: "2.4s",
  size: "12.4 MB",
  tables: 8,
  formulas: 24,
  images: 12,
}

export default function DocumentDetailPage() {
  const params = useParams()

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          href="/dashboard/documents"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documents
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
              <FileText className="h-7 w-7 text-white/50" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{docData.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-sm text-white/40">
                <span>{docData.size}</span>
                <span>&bull;</span>
                <span>{docData.pages} pages</span>
                <span>&bull;</span>
                <span>{docData.language}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="glass" size="sm" icon={<Download className="h-4 w-4" />}>
              Download
            </Button>
            <Button variant="glass" size="sm" icon={<Copy className="h-4 w-4" />}>
              Copy
            </Button>
            <Button variant="glass" size="sm" icon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <span className="text-sm font-medium text-white/70">Output Preview</span>
              <div className="flex items-center gap-1.5 text-xs text-white/30">
                <div className="h-1.5 w-1.5 rounded-full bg-[#00FF9D]" />
                Markdown
              </div>
            </div>
            <pre className="p-5 overflow-x-auto text-sm font-mono text-white/60 leading-relaxed">{`# Quantum Computing: A Comprehensive Survey

## Abstract

This paper presents a comprehensive survey of quantum computing...
  
## 1. Introduction

Quantum computing represents a paradigm shift...

### 1.1 Background

\`\`\`python
def quantum_algorithm():
    # Implementation
    pass
\`\`\`

## 2. Methodology

| Approach | Accuracy | Speed |
|----------|----------|-------|
| Method A | 95.2%    | 2.1s  |
| Method B | 98.7%    | 1.8s  |

## 3. Results

$$\\sum_{i=1}^{n} x_i$$`}</pre>
          </motion.div>
        </div>

        <div className="space-y-4">
          {[
            { icon: CheckCircle, label: "Status", value: docData.status.charAt(0).toUpperCase() + docData.status.slice(1), color: "#00FF9D" },
            { icon: Clock, label: "Processing Time", value: docData.processingTime, color: "#00D9FF" },
            { icon: Tag, label: "Confidence", value: `${docData.confidence}%`, color: "#5B6CFF" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ background: `${item.color}15` }}>
                  <item.icon className="h-4 w-4" style={{ color: item.color }} />
                </div>
                <div className="text-sm text-white/50">{item.label}</div>
              </div>
              <div className="text-lg font-semibold text-white">{item.value}</div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
          >
            <div className="text-sm text-white/50 mb-3">Document Stats</div>
            <div className="space-y-2">
              {[
                { label: "Pages", value: "24" },
                { label: "Tables", value: "8" },
                { label: "Formulas", value: "24" },
                { label: "Images", value: "12" },
                { label: "Language", value: "English" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-sm">
                  <span className="text-white/40">{stat.label}</span>
                  <span className="text-white/80 font-medium">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
