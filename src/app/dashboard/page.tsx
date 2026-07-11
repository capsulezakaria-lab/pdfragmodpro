"use client"

import { motion } from "framer-motion"
import { StatsCard, DocumentsTable, UsageChart, ActivityFeed } from "@/components/dashboard"
import { FileText, Scan, Database, Clock } from "lucide-react"

const stats = [
  { icon: <FileText className="h-4 w-4 text-[#00D9FF]" />, label: "Documents Processed", value: "1,247", change: "+12.5%", positive: true, gradient: "from-[#00D9FF] to-[#5B6CFF]" },
  { icon: <Scan className="h-4 w-4 text-[#5B6CFF]" />, label: "Pages Parsed", value: "34,891", change: "+8.2%", positive: true, gradient: "from-[#5B6CFF] to-[#8B5CF6]" },
  { icon: <Database className="h-4 w-4 text-[#00FF9D]" />, label: "Storage Used", value: "2.4 GB", change: "+3.1%", positive: true, gradient: "from-[#00FF9D] to-[#00D9FF]" },
  { icon: <Clock className="h-4 w-4 text-[#FFC857]" />, label: "Avg. Processing Time", value: "2.4s", change: "-15%", positive: true, gradient: "from-[#FFC857] to-[#FF4D6A]" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-sm text-white/40 mt-1">Welcome back, John. Here&apos;s your document processing summary.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UsageChart />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Recent Documents</h2>
              <a href="/dashboard/documents" className="text-sm text-[#00D9FF] hover:underline">View all</a>
            </div>
            <DocumentsTable limit={5} />
          </div>
        </div>
        <div className="space-y-6">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
