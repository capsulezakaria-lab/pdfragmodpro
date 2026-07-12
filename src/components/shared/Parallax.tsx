"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxProps {
  children: ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export function Parallax({
  children,
  speed = 0.5,
  direction = "up",
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yTransform: MotionValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [speed * 100, -speed * 100] :
    direction === "down" ? [-speed * 100, speed * 100] :
    [0, 0]
  )

  const xTransform: MotionValue = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? [speed * 100, -speed * 100] :
    direction === "right" ? [-speed * 100, speed * 100] :
    [0, 0]
  )

  const isVertical = direction === "up" || direction === "down"

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          y: isVertical ? yTransform : undefined,
          x: !isVertical ? xTransform : undefined,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
