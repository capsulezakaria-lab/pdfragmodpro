"use client"

import { motion } from "framer-motion"
import { UsageChart } from "@/components/dashboard"
import { Button } from "@/components/ui"
import { BarChart3, FileText, Clock, Database } from "lucide-react"

export default function UsagePage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Usage</h1>
          <p className="text-sm text-white/40 mt-1">Monitor your document processing and API usage.</p>
        </div>
        <Button variant="glass" size="md">
          Export Report
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: <FileText className="h-4 w-4 text-[#00D9FF]" />, label: "Total Pages", value: "34,891", desc: "All time" },
          { icon: <BarChart3 className="h-4 w-4 text-[#5B6CFF]" />, label: "API Calls", value: "142,503", desc: "This month" },
          { icon: <Clock className="h-4 w-4 text-[#00FF9D]" />, label: "Avg Response", value: "284ms", desc: "Last 7 days" },
          { icon: <Database className="h-4 w-4 text-[#8B5CF6]" />, label: "Storage", value: "2.4 GB", desc: "Of 5 GB limit" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-white/40 mt-0.5">{stat.label}</div>
            <div className="text-xs text-white/30 mt-0.5">{stat.desc}</div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <UsageChart />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Current Plan</h3>
            <p className="text-xs text-white/40 mt-0.5">Free tier &mdash; 100 pages/month</p>
          </div>
          <Button variant="gradient" size="sm">
            Upgrade Plan
          </Button>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-white/60">Pages Used</span>
              <span className="text-white font-medium">45 / 100</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "45%" }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#00D9FF] to-[#5B6CFF]"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-white/60">Storage Used</span>
              <span className="text-white font-medium">2.4 GB / 5 GB</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "48%" }}
                transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[#5B6CFF] to-[#8B5CF6]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
