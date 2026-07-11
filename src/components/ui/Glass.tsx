import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: "light" | "medium" | "strong"
  border?: boolean
  hover?: boolean
}

const intensityStyles = {
  light: "bg-white/[0.03] backdrop-blur-xl saturate-[1.2]",
  medium: "bg-white/[0.05] backdrop-blur-2xl saturate-[1.4]",
  strong: "bg-white/[0.08] backdrop-blur-3xl saturate-[1.6]",
}

const Glass = forwardRef<HTMLDivElement, GlassProps>(
  ({ intensity = "light", border = true, hover = false, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          intensityStyles[intensity],
          border && "border border-white/[0.08]",
          hover && "hover:bg-white/[0.08] transition-all duration-300",
          "rounded-2xl",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Glass.displayName = "Glass"

export { Glass }
