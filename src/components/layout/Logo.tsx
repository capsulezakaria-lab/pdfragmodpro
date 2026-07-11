"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  showText?: boolean
  className?: string
  link?: boolean
}

export function Logo({ showText = true, className, link = true }: LogoProps) {
  const content = (
    <motion.div
      className={cn("flex items-center gap-2.5", className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#00D9FF] via-[#5B6CFF] to-[#8B5CF6] opacity-90" />
        <div className="absolute inset-[2px] rounded-[6px] bg-[#04070D]" />
        <svg
          viewBox="0 0 24 24"
          className="relative h-4 w-4"
          fill="none"
          stroke="url(#logo-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#00D9FF" />
              <stop offset="0.5" stopColor="#5B6CFF" />
              <stop offset="1" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          <path d="M8 7h8" />
          <path d="M8 11h6" />
          <path d="M8 15h4" />
        </svg>
      </div>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-white">
          Parse<span className="gradient-text">Mind</span>
        </span>
      )}
    </motion.div>
  )

  if (link) {
    return <Link href="/">{content}</Link>
  }

  return content
}
