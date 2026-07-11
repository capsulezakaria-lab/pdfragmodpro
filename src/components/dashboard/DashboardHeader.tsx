"use client"

import { Search, Bell, ChevronDown } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.06] bg-[#04070D]/80 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-8 h-16">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer">
            <Bell className="h-4 w-4 text-white/50" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#00D9FF]" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-white/[0.06] cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center text-xs font-bold text-white">
              JD
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-white">John Doe</div>
              <div className="text-xs text-white/40">Free Plan</div>
            </div>
            <ChevronDown className="h-4 w-4 text-white/30" />
          </div>
        </div>
      </div>
    </header>
  )
}
