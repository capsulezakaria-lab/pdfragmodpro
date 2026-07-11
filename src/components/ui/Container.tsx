"use client"

import { forwardRef } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ContainerProps extends HTMLMotionProps<"div"> {
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const sizeStyles = {
  sm: "max-w-4xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "xl", className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn("mx-auto w-full px-6 sm:px-8 lg:px-12", sizeStyles[size], className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Container.displayName = "Container"

interface SectionProps extends ContainerProps {
  id?: string
  background?: boolean
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, size = "xl", background = false, className, children, ...props }, ref) => {
    return (
      <section
        id={id}
        className={cn(
          "relative py-24 md:py-32 lg:py-40",
          background && "bg-white/[0.02]",
          className
        )}
      >
        <Container ref={ref} size={size} {...props}>
          {children}
        </Container>
      </section>
    )
  }
)
Section.displayName = "Section"

export { Container, Section }
