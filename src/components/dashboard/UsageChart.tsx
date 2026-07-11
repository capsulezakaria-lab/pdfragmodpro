"use client"

import { motion } from "framer-motion"

const data = [
  { day: "Mon", pages: 120 },
  { day: "Tue", pages: 340 },
  { day: "Wed", pages: 280 },
  { day: "Thu", pages: 510 },
  { day: "Fri", pages: 430 },
  { day: "Sat", pages: 190 },
  { day: "Sun", pages: 260 },
]

export function UsageChart() {
  const max = Math.max(...data.map((d) => d.pages))

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-sm font-semibold text-white">Usage (This Week)</div>
          <div className="text-xs text-white/40 mt-0.5">2,130 pages processed</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#00D9FF]" />
          <span className="text-xs text-white/40">Pages</span>
        </div>
      </div>

      <div className="flex items-end gap-3 h-40">
        {data.map((item, i) => (
          <div key={item.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-[10px] text-white/30 font-medium"
            >
              {item.pages}
            </motion.span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.pages / max) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full rounded-lg bg-gradient-to-t from-[#00D9FF] to-[#5B6CFF] opacity-70 hover:opacity-100 transition-opacity"
              style={{ minHeight: 4 }}
            />
            <span className="text-[10px] text-white/30 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
