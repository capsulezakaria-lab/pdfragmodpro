"use client"

import { forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GradientTextProps extends HTMLMotionProps<"span"> {
  from?: string
  via?: string
  to?: string
  animate?: boolean
}

const GradientText = forwardRef<HTMLSpanElement, GradientTextProps>(
  (
    {
      from = "#00D9FF",
      via = "#5B6CFF",
      to = "#8B5CF6",
      animate = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.span
        ref={ref}
        className={cn(
          "inline-block bg-clip-text text-transparent",
          animate && "animate-shimmer bg-[length:200%_auto]",
          className
        )}
        style={{
          backgroundImage: `linear-gradient(135deg, ${from}, ${via}, ${to})`,
          backgroundSize: animate ? "200% auto" : undefined,
        }}
        {...props}
      >
        {children}
      </motion.span>
    )
  }
)
GradientText.displayName = "GradientText"

export { GradientText }
