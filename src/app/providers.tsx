"use client"

import { type ReactNode } from "react"
import { SmoothScroll } from "@/components/shared/SmoothScroll"
import { CursorGlow } from "@/components/shared/CursorGlow"
import { AuroraBackground } from "@/components/shared/AuroraBackground"
import { BlurCircles } from "@/components/shared/BlurCircles"
import { Particles } from "@/components/shared/Particles"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <SmoothScroll>
        <AuroraBackground />
        <BlurCircles />
        <Particles count={40} />
        {children}
      </SmoothScroll>
      <CursorGlow />
    </>
  )
}
