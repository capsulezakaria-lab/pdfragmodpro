"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
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

  const transformValue =
    direction === "up" || direction === "down"
      ? useTransform(scrollYProgress, [0, 1], direction === "up" ? [speed * 100, -speed * 100] : [-speed * 100, speed * 100])
      : useTransform(scrollYProgress, [0, 1], [0, speed * 200])

  const xTransform =
    direction === "left" || direction === "right"
      ? useTransform(scrollYProgress, [0, 1], direction === "left" ? [speed * 100, -speed * 100] : [-speed * 100, speed * 100])
      : undefined

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={{
          y: direction === "up" || direction === "down" ? transformValue : undefined,
          x: xTransform,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
