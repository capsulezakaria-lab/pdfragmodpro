"use client"

import { useEffect, useRef } from "react"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    let mouseX = -1000
    let mouseY = -1000
    let currentX = -1000
    let currentY = -1000

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    function animate() {
      if (!glow) return
      currentX += (mouseX - currentX) * 0.08
      currentY += (mouseY - currentY) * 0.08
      glow.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMouseMove)
    animate()

    return () => window.removeEventListener("mousemove", onMouseMove)
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[99999] h-[300px] w-[300px] rounded-full opacity-30 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(0,217,255,0.4) 0%, rgba(91,108,255,0.2) 40%, transparent 70%)",
        filter: "blur(40px)",
      }}
    />
  )
}
