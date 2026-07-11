"use client"

import { cn } from "@/lib/utils"

interface BlurCirclesProps {
  className?: string
}

export function BlurCircles({ className }: BlurCirclesProps) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}>
      <div
        className="absolute -top-[20%] -left-[10%] h-[50%] w-[40%] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(0,217,255,0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-[30%] -right-[10%] h-[45%] w-[35%] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(91,108,255,0.12), transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute -bottom-[15%] left-[20%] h-[40%] w-[50%] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  )
}
