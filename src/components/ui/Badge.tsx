import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gradient" | "success" | "warning" | "glass"
  size?: "sm" | "md" | "lg"
}

const variantStyles = {
  default: "bg-white/10 text-white/80",
  gradient: "gradient-text bg-white/5 border border-white/10",
  success: "bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D]/20",
  warning: "bg-[#FFC857]/10 text-[#FFC857] border border-[#FFC857]/20",
  glass: "glass text-white/80",
}

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-[11px] tracking-wide",
  md: "px-3 py-1 text-xs tracking-wide",
  lg: "px-4 py-1.5 text-sm tracking-wider",
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-medium rounded-full uppercase tracking-wider",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
