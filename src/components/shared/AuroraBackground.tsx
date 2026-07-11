"use client"

import { useEffect, useRef } from "react"

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function draw() {
      if (!ctx || !canvas) return
      time += 0.002

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.3) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.4) * 100,
        0,
        canvas.width * 0.3 + Math.sin(time * 0.3) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.4) * 100,
        canvas.width * 0.6
      )

      gradient.addColorStop(0, `rgba(0, 217, 255, ${0.04 + Math.sin(time) * 0.02})`)
      gradient.addColorStop(0.3, `rgba(91, 108, 255, ${0.03 + Math.sin(time + 1) * 0.015})`)
      gradient.addColorStop(0.6, `rgba(139, 92, 246, ${0.02 + Math.sin(time + 2) * 0.01})`)
      gradient.addColorStop(1, "transparent")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.25) * 150,
        canvas.height * 0.7 + Math.sin(time * 0.35) * 100,
        0,
        canvas.width * 0.7 + Math.cos(time * 0.25) * 150,
        canvas.height * 0.7 + Math.sin(time * 0.35) * 100,
        canvas.width * 0.5
      )

      gradient2.addColorStop(0, `rgba(0, 255, 157, ${0.02 + Math.cos(time * 0.7) * 0.01})`)
      gradient2.addColorStop(0.5, `rgba(91, 108, 255, ${0.025 + Math.sin(time * 0.5) * 0.01})`)
      gradient2.addColorStop(1, "transparent")

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.8 }}
    />
  )
}
