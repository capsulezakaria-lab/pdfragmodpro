"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion } from "framer-motion"

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  function onMouseMove(e: MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  function onMouseLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0px, 0px)"
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ transition: "transform 0.2s cubic-bezier(0.25, 0.1, 0.25, 1)" }}
    >
      {children}
    </motion.div>
  )
}
