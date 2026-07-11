"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Tab {
  label: string
  value: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.value)

  return (
    <div className={cn("", className)}>
      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06] w-fit mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer",
              activeTab === tab.value ? "text-white" : "text-white/50 hover:text-white/80"
            )}
          >
            {activeTab === tab.value && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 bg-white/10 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      <div>
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  )
}
