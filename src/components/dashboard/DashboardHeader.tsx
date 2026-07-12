"use client"

import { Search, Bell, ChevronDown, LogOut, User, Settings } from "lucide-react"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

export function DashboardHeader() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function handleLogout() {
    const token = localStorage.getItem("parsemind_token")
    if (token) {
      await fetch("/api/v1/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {})
    }
    logout()
    router.push("/login")
  }

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

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

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 pl-4 border-l border-white/[0.06] cursor-pointer"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center text-xs font-bold text-white">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-white">{user?.name || "User"}</div>
                <div className="text-xs text-white/40 capitalize">{user?.plan || "Free"} Plan</div>
              </div>
              <ChevronDown className={`h-4 w-4 text-white/30 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#0a0f18] border border-white/[0.08] shadow-2xl py-1 z-50">
                <button
                  onClick={() => { setDropdownOpen(false); router.push("/dashboard/settings") }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
                >
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => { setDropdownOpen(false); router.push("/dashboard/settings") }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <div className="border-t border-white/[0.06] my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
