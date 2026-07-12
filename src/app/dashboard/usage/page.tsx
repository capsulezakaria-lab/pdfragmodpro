"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui"

interface UsageData {
  pagesUsed: number
  pagesLimit: number
  apiCalls: number
  storageUsed: number
}

export default function UsagePage() {
  const { user } = useAuthStore()
  const [usage, setUsage] = useState<UsageData | null>(null)
  const { token } = useAuthStore()

  useEffect(() => {
    if (!token) return
    fetch("/api/v1/usage", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setUsage(d.data))
      .catch(() => {})
  }, [token])

  const pagesUsed = usage?.pagesUsed || 0
  const pagesLimit = usage?.pagesLimit || 100
  const apiCalls = usage?.apiCalls || 0
  const storageGB = usage?.storageUsed ? (usage.storageUsed / 1073741824).toFixed(2) : "0"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Usage</h1>
        <Button variant="gradient" size="md">Upgrade Plan</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="text-xs text-white/40 mb-1">Pages Processed</div>
          <div className="text-2xl font-bold text-white">{pagesUsed.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="text-xs text-white/40 mb-1">API Calls</div>
          <div className="text-2xl font-bold text-white">{apiCalls.toLocaleString()}</div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="text-xs text-white/40 mb-1">Storage</div>
          <div className="text-2xl font-bold text-white">{storageGB} GB</div>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <div className="text-xs text-white/40 mb-1">Plan</div>
          <div className="text-2xl font-bold text-white capitalize">{user?.plan || "Free"}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-sm font-medium text-white/60 mb-4">Plan Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/40">Pages</span>
              <span className="text-white/60">{pagesUsed} / {pagesLimit}</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-[#00D9FF] to-[#5B6CFF] transition-all" style={{ width: `${Math.min((pagesUsed / pagesLimit) * 100, 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
