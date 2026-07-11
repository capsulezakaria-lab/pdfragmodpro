"use client"

import { forwardRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps {
  glass?: boolean
  glow?: boolean
  hover?: boolean
  gradient?: boolean
  border?: boolean
  className?: string
  children?: ReactNode
  style?: React.CSSProperties
  id?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      glass = false,
      glow = false,
      hover = true,
      gradient = false,
      border = true,
      className,
      children,
      style,
      id,
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        id={id}
        style={style}
        whileHover={
          hover
            ? { y: -4, transition: { duration: 0.3, ease: "easeOut" } }
            : undefined
        }
        className={cn(
          "relative rounded-2xl p-6 transition-all duration-300",
          glass && "glass backdrop-blur-xl",
          glow && "glow",
          border && !glass && "border border-white/[0.06]",
          gradient && "gradient-border",
          !glass && "bg-white/[0.03]",
          hover && "cursor-pointer",
          className
        )}
      >
        {gradient && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00D9FF]/5 via-[#5B6CFF]/5 to-[#8B5CF6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
        {children}
      </motion.div>
    )
  }
)
Card.displayName = "Card"

interface BentoCardProps extends CardProps {
  colSpan?: number
  rowSpan?: number
}

const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  (
    {
      colSpan = 1,
      rowSpan = 1,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          colSpan > 1 && `col-span-${colSpan}`,
          rowSpan > 1 && `row-span-${rowSpan}`,
          className
        )}
        style={{
          gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
          gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </Card>
    )
  }
)
BentoCard.displayName = "BentoCard"

export { Card, BentoCard }
