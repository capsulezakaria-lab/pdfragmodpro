import { cn } from "@/lib/utils"

interface DividerProps {
  variant?: "line" | "gradient" | "glass"
  className?: string
}

export function Divider({ variant = "line", className }: DividerProps) {
  return (
    <div className={cn("w-full", className)}>
      {variant === "gradient" && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#00D9FF]/50 via-[#5B6CFF]/50 to-transparent" />
      )}
      {variant === "glass" && (
        <div className="h-px w-full bg-white/[0.06]" />
      )}
      {variant === "line" && (
        <div className="h-px w-full bg-white/[0.08]" />
      )}
    </div>
  )
}
