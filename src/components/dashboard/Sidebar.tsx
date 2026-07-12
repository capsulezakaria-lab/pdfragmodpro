"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Logo } from "@/components/layout/Logo"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/auth"
import {
  LayoutDashboard,
  FileText,
  Key,
  BarChart3,
  Settings,
  HelpCircle,
  CreditCard,
  type LucideIcon,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Documents", href: "/dashboard/documents", icon: FileText },
  { label: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { label: "Usage", href: "/dashboard/usage", icon: BarChart3 },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()

  return (
    <aside className="fixed top-0 left-0 z-30 h-screen w-64 border-r border-white/[0.06] bg-[#04070D]/90 backdrop-blur-2xl flex flex-col">
      <div className="px-6 py-5 border-b border-white/[0.06]">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "text-white bg-white/[0.06]"
                  : "text-white/50 hover:text-white hover:bg-white/[0.03]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-white/[0.06]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.06]">
        <Link
          href="/docs"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.03] transition-all duration-200"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Help & Docs</span>
        </Link>
        <div className="mt-4 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="text-xs text-white/50 mb-1 capitalize">{user?.plan || "Free"} Plan</div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-white/40">
              <span className="text-white font-semibold">{user?.credits || 100}</span> / 100 pages
            </div>
            <Link href="/pricing" className="text-xs text-[#00D9FF] hover:underline">
              Upgrade
            </Link>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "45%" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-[#00D9FF] to-[#5B6CFF]"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
