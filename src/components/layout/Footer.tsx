"use client"

import Link from "next/link"
import { Logo } from "./Logo"
import { Container } from "@/components/ui"
import { Divider } from "@/components/ui"
import { MessageCircle, Heart } from "lucide-react"
import { GithubIcon, TwitterIcon } from "@/components/ui/Icons"

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "API", href: "#api" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api-docs" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "https://discord.gg/parsemind" },
      { label: "Status", href: "https://status.parsemind.ai" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "SDK & Tools", href: "/docs/sdk" },
      { label: "GitHub", href: "https://github.com/parsemind" },
      { label: "Python SDK", href: "/docs/python" },
      { label: "TypeScript SDK", href: "/docs/typescript" },
      { label: "Go SDK", href: "/docs/go" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-white/[0.01]">
      <Container size="xl" className="py-20 md:py-28">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-white/40 leading-relaxed max-w-xs">
              The most advanced document understanding platform for modern AI systems.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <Link href="https://github.com/parsemind" target="_blank" className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] transition-all duration-200">
                <GithubIcon className="h-4 w-4 text-white/60" />
              </Link>
              <Link href="https://twitter.com/parsemind" target="_blank" className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] transition-all duration-200">
                <TwitterIcon className="h-4 w-4 text-white/60" />
              </Link>
              <Link href="https://discord.gg/parsemind" target="_blank" className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.06] transition-all duration-200">
                <MessageCircle className="h-4 w-4 text-white/60" />
              </Link>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white/90 mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider variant="glass" className="my-12" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} ParseMind AI. All rights reserved.
          </p>
          <p className="text-sm text-white/30 flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-[#FF4D6A]" /> for AI builders
          </p>
        </div>
      </Container>
    </footer>
  )
}
