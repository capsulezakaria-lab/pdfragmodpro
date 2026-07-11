"use client"

import { forwardRef, type ElementType, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
type HeadingSize = "hero" | "display" | "h1" | "h2" | "h3" | "h4" | "h5"

interface HeadingProps {
  as?: HeadingLevel
  size?: HeadingSize
  gradient?: boolean
  glow?: boolean
  className?: string
  children?: ReactNode
  id?: string
}

const sizeStyles: Record<HeadingSize, string> = {
  hero: "text-[clamp(48px,8vw,96px)] leading-[0.95] tracking-[-0.03em] font-bold",
  display: "text-[clamp(40px,6vw,72px)] leading-[1.0] tracking-[-0.02em] font-bold",
  h1: "text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em] font-bold",
  h2: "text-[clamp(28px,4vw,44px)] leading-[1.15] tracking-[-0.015em] font-semibold",
  h3: "text-[clamp(22px,3vw,32px)] leading-[1.2] tracking-[-0.01em] font-semibold",
  h4: "text-[clamp(18px,2vw,24px)] leading-[1.25] tracking-[-0.005em] font-semibold",
  h5: "text-base leading-[1.3] font-medium",
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as: Tag = "h2", size, gradient = false, glow = false, className, children, id }, ref) => {
    const resolvedSize = size || (Tag === "h1" ? "h1" : Tag === "h2" ? "h2" : Tag === "h3" ? "h3" : Tag === "h4" ? "h4" : "h5")

    return (
      <motion.div
        ref={ref}
        id={id}
        className={cn("relative inline-block", glow && "glow")}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Tag
          className={cn(
            sizeStyles[resolvedSize],
            gradient && "gradient-text",
            "text-white",
            className
          )}
        >
          {children}
        </Tag>
      </motion.div>
    )
  }
)
Heading.displayName = "Heading"

interface TextProps {
  size?: "xs" | "sm" | "base" | "lg" | "xl"
  color?: "primary" | "secondary" | "tertiary"
  className?: string
  children?: ReactNode
}

const textSizeStyles: Record<string, string> = {
  xs: "text-xs leading-relaxed",
  sm: "text-sm leading-relaxed",
  base: "text-base leading-[1.7]",
  lg: "text-lg leading-[1.7]",
  xl: "text-xl leading-[1.7]",
}

const textColorStyles: Record<string, string> = {
  primary: "text-white",
  secondary: "text-white/72",
  tertiary: "text-white/40",
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = "base", color = "secondary", className, children }, ref) => {
    return (
      <motion.p
        ref={ref}
        className={cn(textSizeStyles[size], textColorStyles[color], className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.p>
    )
  }
)
Text.displayName = "Text"

export { Heading, Text }
