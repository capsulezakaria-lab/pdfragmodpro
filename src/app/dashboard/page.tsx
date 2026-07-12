"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { UsageChart } from "@/components/dashboard/UsageChart"
import { DocumentsTable } from "@/components/dashboard/DocumentsTable"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { FileText, Clock, HardDrive, Zap } from "lucide-react"

interface Document {
  id: string
  name: string
  pages: number
  status: string
  confidence: number | null
  format: string
  createdAt: string
  processingTime?: number
}

interface UsageData {
  pagesUsed: number
  apiCalls: number
  storageUsed: number
  dailyUsage: { date: string; pages: number }[]
}

export default function DashboardPage() {
  const { user, token } = useAuthStore()
  const [docs, setDocs] = useState<Document[]>([])
  const [usage, setUsage] = useState<UsageData | null>(null)

  useEffect(() => {
    if (!token) return
    const headers = { Authorization: `Bearer ${token}` }

    fetch("/api/v1/documents", { headers })
      .then(r => r.json())
      .then(d => setDocs(d.data?.documents || []))
      .catch(() => {})

    fetch("/api/v1/usage", { headers })
      .then(r => r.json())
      .then(d => setUsage(d.data))
      .catch(() => {})
  }, [token])

  const totalDocs = docs.length
  const totalPages = docs.reduce((s, d) => s + d.pages, 0)
  const avgTime = docs.filter(d => d.processingTime).length
    ? (docs.reduce((s, d) => s + (d.processingTime || 0), 0) / docs.filter(d => d.processingTime).length).toFixed(1) + "s"
    : "—"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name?.split(" ")[0] || "User"}</h1>
        <p className="text-sm text-white/40 mt-1">Here&apos;s your document processing summary.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Documents Processed" value={totalDocs.toLocaleString()} change={totalDocs > 0 ? "+100%" : "0%"} icon={<FileText className="h-5 w-5" />} />
        <StatsCard label="Pages Parsed" value={totalPages.toLocaleString()} change={totalPages > 0 ? "+100%" : "0%"} icon={<Clock className="h-5 w-5" />} />
        <StatsCard label="Avg. Processing Time" value={avgTime} change="-15%" icon={<Zap className="h-5 w-5" />} />
        <StatsCard label="Plan" value={user?.plan?.toUpperCase() || "FREE"} change={`${user?.credits || 100} pages`} icon={<HardDrive className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UsageChart data={usage?.dailyUsage || []} />
        </div>
        <div>
          <ActivityFeed documents={docs.slice(0, 6)} />
        </div>
      </div>

      <div className="mt-6">
        <DocumentsTable documents={docs.slice(0, 5)} />
      </div>
    </div>
  )
}
