"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "blurReveal"
  | "rotateReveal"

interface RevealProps {
  children: ReactNode
  type?: AnimationType
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  className?: string
  as?: "div" | "span" | "section"
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blurReveal: {
    hidden: { opacity: 0, filter: "blur(20px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  rotateReveal: {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 },
  },
}

export function Reveal({
  children,
  type = "fadeInUp",
  delay = 0,
  duration = 0.7,
  once = true,
  threshold = 0.1,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const animation = animations[type]

  const MotionTag = Tag === "span" ? motion.span : Tag === "section" ? motion.section : motion.div

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: animation.hidden,
        visible: {
          ...animation.visible,
          transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  )
}
