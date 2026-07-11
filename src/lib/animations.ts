import { type Variants } from "framer-motion"

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const scaleInX: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const slideReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] },
  },
}

export const springHover = {
  whileHover: { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 15 } },
  whileTap: { scale: 0.98 },
}

export const cardHover = {
  whileHover: { y: -4, transition: { duration: 0.3, ease: "easeOut" } },
}

export const textReveal: Variants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.05,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export const gradientMove: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: { duration: 8, repeat: Infinity, ease: "linear" },
  },
}

export const floating: Variants = {
  animate: (delay: number = 0) => ({
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
  }),
}

export const glowPulse: Variants = {
  animate: {
    opacity: [0.3, 0.7, 0.3],
    scale: [1, 1.1, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
}

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const rotateReveal: Variants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export const counterAnimation = {
  animate: (value: number) => ({
    count: value,
    transition: { duration: 2, ease: [0.25, 0.1, 0.25, 1] },
  }),
}
