"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Star } from "lucide-react"
import { GithubIcon } from "@/components/ui/Icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { Logo } from "./Logo"

interface NavLink {
  label: string
  href: string
}

const links: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "API", href: "#api" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#04070D]/80 backdrop-blur-2xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-[#00D9FF] to-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://github.com/parsemind"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] transition-all duration-200"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden lg:inline">Star</span>
            <span className="flex items-center gap-1 text-white/40">
              <Star className="h-3 w-3" /> 2.4k
            </span>
          </Link>
          <Button variant="gradient" size="sm" asChild>
            <a href="/register">Start Free</a>
          </Button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden relative z-50 p-2 text-white/80 hover:text-white cursor-pointer"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-[#04070D]/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="glass" size="lg" className="w-48">
                  View on Github
                </Button>
                <Button variant="gradient" size="lg" className="w-48">
                  Start Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
