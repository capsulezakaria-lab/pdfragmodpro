"use client"

import { forwardRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "ghost" | "glass" | "gradient"
type ButtonSize = "sm" | "md" | "lg" | "xl"

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  id?: string
  asChild?: boolean
  href?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10",
  secondary:
    "bg-white/5 text-white hover:bg-white/10 border border-white/10",
  ghost:
    "text-white/70 hover:text-white hover:bg-white/5",
  glass:
    "glass text-white hover:bg-white/10 hover:border-white/20",
  gradient:
    "relative overflow-hidden text-white font-semibold before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00D9FF] before:via-[#5B6CFF] before:to-[#8B5CF6] before:transition-transform before:duration-300 hover:before:scale-105 before:z-0",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-6 text-sm gap-2 rounded-xl",
  lg: "h-13 px-8 text-base gap-2.5 rounded-xl",
  xl: "h-15 px-10 text-lg gap-3 rounded-2xl",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      className,
      children,
      disabled,
      asChild,
      href,
      ...props
    },
    ref
  ) => {
    const isGradient = variant === "gradient"

    const content = (
      <>
        {isGradient && (
          <span className="absolute inset-[1px] rounded-[inherit] bg-[#04070D] z-[1] transition-opacity duration-300 group-hover:opacity-80" />
        )}
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {icon && !loading && <span className="relative z-[2]">{icon}</span>}
        <span className={cn("relative z-[2]", loading && "opacity-0")}>{children}</span>
      </>
    )

    const classes = cn(
      "group relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#04070D] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
      variantStyles[variant],
      sizeStyles[size],
      isGradient && "before:rounded-[inherit]",
      className
    )

    if (asChild && href) {
      return (
        <a href={href} className={classes}>
          {content}
        </a>
      )
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, type ButtonVariant, type ButtonSize }
