"use client"

import { type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  icon: ReactNode
  label: string
  value: string
  change?: string
  positive?: boolean
  gradient?: string
}

export function StatsCard({ icon, label, value, change, positive, gradient = "from-[#00D9FF] to-[#5B6CFF]" }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 overflow-hidden group hover:border-white/[0.12] transition-all duration-300"
    >
      <div
        className={cn(
          "absolute top-0 right-0 h-24 w-24 -translate-y-1/2 translate-x-1/2 rounded-full opacity-5 blur-2xl transition-opacity group-hover:opacity-10",
          `bg-gradient-to-br ${gradient}`
        )}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center",
            "bg-white/[0.05] border border-white/[0.08]"
          )}>
            {icon}
          </div>
          {change && (
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              positive ? "text-[#00FF9D] bg-[#00FF9D]/10" : "text-[#FF4D6A] bg-[#FF4D6A]/10"
            )}>
              {change}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-white/40 mt-1">{label}</div>
      </div>
    </motion.div>
  )
}
