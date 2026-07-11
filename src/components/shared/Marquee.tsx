"use client"

import { type ReactNode, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  children: ReactNode[]
  direction?: "left" | "right"
  speed?: number
  className?: string
  itemClassName?: string
}

export function Marquee({
  children,
  direction = "left",
  speed = 30,
  className,
  itemClassName,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const duration = children.length * speed

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="flex gap-6"
        animate={{
          x: direction === "left" ? ["0%", `-${100 / children.length * 100}%`] : [`-${100 / children.length * 100}%`, "0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...children, ...children].map((child, i) => (
          <div key={i} className={cn("flex-shrink-0", itemClassName)}>
            {child}
          </div>
        ))}
      </motion.div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#04070D] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#04070D] to-transparent pointer-events-none z-10" />
    </div>
  )
}
