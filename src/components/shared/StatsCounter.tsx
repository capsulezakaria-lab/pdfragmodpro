"use client"

import { useRef } from "react"
import { motion, useInView, useTransform, useMotionValue, animate } from "framer-motion"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

interface StatsCounterProps {
  from?: number
  to: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
  className?: string
  label?: string
}

export function StatsCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  className,
  label,
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(from)
  const rounded = useTransform(count, (value) => {
    if (decimals === 0) return Math.floor(value).toLocaleString()
    return value.toFixed(decimals)
  })

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      })
      return controls.stop
    }
  }, [isInView, count, to, duration])

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <motion.div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </motion.div>
      {label && (
        <p className="mt-2 text-sm text-white/50 font-medium tracking-wide uppercase">
          {label}
        </p>
      )}
    </div>
  )
}
