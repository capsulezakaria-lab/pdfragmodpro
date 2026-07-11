"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  className?: string
  title?: string
}

export function CodeBlock({
  code,
  language = "typescript",
  showLineNumbers = true,
  className,
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = code.split("\n")

  return (
    <div className={cn("group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#04070D]", className)}>
      {title && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <span className="text-sm text-white/50 font-mono">{title}</span>
          <span className="text-xs text-white/30 uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="p-5 overflow-x-auto">
          <code className="text-sm font-mono leading-relaxed text-white/80">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-white/20 w-10 flex-shrink-0 text-right pr-4">
                    {i + 1}
                  </span>
                )}
                <span>{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        >
          {copied ? (
            <Check className="h-4 w-4 text-[#00FF9D]" />
          ) : (
            <Copy className="h-4 w-4 text-white/50" />
          )}
        </motion.button>
      </div>
    </div>
  )
}
