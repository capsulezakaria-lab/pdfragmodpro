export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface Feature {
  title: string
  description: string
  icon?: string
  gradient: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  content: string
}

export interface PricingPlan {
  name: string
  description: string
  price: string
  credits: string
  features: string[]
  cta: string
  popular: boolean
}

export interface FAQ {
  question: string
  answer: string
}

export interface ParsingResult {
  markdown: string
  json: string
  html: string
  csv: string
  xml: string
  pages: number
  language: string
  processingTime: number
  confidence: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: "free" | "pro" | "business" | "enterprise"
  credits: number
  createdAt: Date
}
