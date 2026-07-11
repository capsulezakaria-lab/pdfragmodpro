"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

const activities = [
  { icon: CheckCircle, text: "research_paper.pdf processed", time: "2 min ago", color: "#00FF9D" },
  { icon: Clock, text: "financial_report_q2.pdf processing", time: "5 min ago", color: "#FFC857" },
  { icon: CheckCircle, text: "contract_agreement.pdf complete", time: "1 hour ago", color: "#00FF9D" },
  { icon: CheckCircle, text: "API key generated: prod-key-3", time: "2 hours ago", color: "#00D9FF" },
  { icon: AlertCircle, text: "invoice_batch_2024.pdf failed", time: "3 hours ago", color: "#FF4D6A" },
  { icon: CheckCircle, text: "Usage limit increased to 100K", time: "1 day ago", color: "#8B5CF6" },
]

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold text-white">Recent Activity</div>
        <button className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">View all</button>
      </div>
      <div className="space-y-0">
        {activities.map((activity, i) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="flex items-start gap-3 py-3 border-b border-white/[0.04] last:border-0"
            >
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${activity.color}15` }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: activity.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white/70 truncate">{activity.text}</div>
                <div className="text-xs text-white/30 mt-0.5">{activity.time}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
