"use client"

import { motion } from "framer-motion"
import { DocumentsTable } from "@/components/dashboard"
import { Button } from "@/components/ui"
import { Upload, Filter, Search } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Documents</h1>
          <p className="text-sm text-white/40 mt-1">Manage and view all your parsed documents.</p>
        </div>
        <Button variant="gradient" size="md" icon={<Upload className="h-4 w-4" />}>
          Upload Document
        </Button>
      </motion.div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 focus:bg-white/[0.08] transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white/50 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DocumentsTable />
      </motion.div>
    </div>
  )
}
