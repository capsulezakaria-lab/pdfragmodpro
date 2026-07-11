"use client"

import { motion } from "framer-motion"
import { ApiKeysList } from "@/components/dashboard"
import { Button } from "@/components/ui"
import { Plus } from "lucide-react"

export default function ApiKeysPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-sm text-white/40 mt-1">Manage your API keys for programmatic access.</p>
        </div>
        <Button variant="gradient" size="md" icon={<Plus className="h-4 w-4" />}>
          Create Key
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
      >
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white mb-1">Security Notice</h3>
            <p className="text-sm text-white/40 leading-relaxed">
              API keys grant full access to your account. Treat them like passwords. 
              Never share them publicly or embed them in client-side code.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <ApiKeysList />
      </motion.div>
    </div>
  )
}
