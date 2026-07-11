"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui"
import { Key, Copy, Eye, EyeOff, Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const initialKeys = [
  { id: "key_1", name: "Production", key: "sk-prod-a1b2c3d4e5f6g7h8i9j0", created: "2 days ago", lastUsed: "2 min ago" },
  { id: "key_2", name: "Development", key: "sk-dev-k1l2m3n4o5p6q7r8s9t0", created: "2 days ago", lastUsed: "1 hour ago" },
  { id: "key_3", name: "Staging", key: "sk-stg-u1v2w3x4y5z6a7b8c9d0", created: "2 days ago", lastUsed: "Never" },
]

export function ApiKeysList() {
  const [keys, setKeys] = useState(initialKeys)
  const [visibleKey, setVisibleKey] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function toggleVisibility(id: string) {
    setVisibleKey(visibleKey === id ? null : id)
  }

  async function copyKey(id: string, key: string) {
    await navigator.clipboard.writeText(key)
    setCopiedKey(id)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  function deleteKey(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id))
  }

  return (
    <div className="space-y-4">
      {keys.map((apiKey, i) => (
        <motion.div
          key={apiKey.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.03] transition-all group"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <Key className="h-4 w-4 text-white/50" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{apiKey.name}</div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-white/30">
                      {visibleKey === apiKey.id
                        ? apiKey.key
                        : `${apiKey.key.slice(0, 12)}${"•".repeat(20)}`}
                    </code>
                    <button
                      onClick={() => toggleVisibility(apiKey.id)}
                      className="p-0.5 text-white/20 hover:text-white/60 transition-colors cursor-pointer"
                    >
                      {visibleKey === apiKey.id ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => copyKey(apiKey.id, apiKey.key)}
                className="p-2 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-all cursor-pointer"
              >
                {copiedKey === apiKey.id ? (
                  <span className="text-[10px] text-[#00FF9D] font-medium">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => deleteKey(apiKey.id)}
                className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/[0.04] text-xs text-white/30">
            <span>Created {apiKey.created}</span>
            <span>Last used {apiKey.lastUsed}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
