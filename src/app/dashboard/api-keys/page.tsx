"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui"
import { Plus, Eye, EyeOff, Copy, Trash2, Key } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  lastUsed: string | null
  createdAt: string
}

export default function ApiKeysPage() {
  const { token } = useAuthStore()
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKey, setNewKey] = useState("")
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!token) return
    fetch("/api/v1/api-keys", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setKeys(d.data?.keys || []))
      .catch(() => {})
  }, [token])

  async function handleCreate() {
    if (!token || !newKeyName) return
    setCreating(true)
    const res = await fetch("/api/v1/api-keys", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: newKeyName }),
    })
    const data = await res.json()
    if (data.success) {
      setNewKey(data.data.key)
      setKeys(prev => [...prev, data.data])
      setNewKeyName("")
    }
    setCreating(false)
  }

  async function handleDelete(id: string) {
    if (!token) return
    await fetch(`/api/v1/api-keys/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    setKeys(prev => prev.filter(k => k.id !== id))
  }

  function maskKey(key: string) {
    return key.slice(0, 10) + "..." + key.slice(-4)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">API Keys</h1>
        <Button variant="gradient" size="md" icon={<Plus className="h-4 w-4" />} onClick={() => setCreateOpen(true)}>Create Key</Button>
      </div>

      {newKey && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <p className="text-sm text-emerald-400 mb-2">API key created. Copy it now — it won&apos;t be shown again.</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-sm text-white font-mono bg-black/30 rounded-lg px-3 py-2">{newKey}</code>
            <Button variant="glass" size="sm" icon={<Copy className="h-4 w-4" />} onClick={() => navigator.clipboard.writeText(newKey)}>Copy</Button>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Key</th>
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Last Used</th>
              <th className="text-right py-3 px-4 text-xs text-white/40 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map(k => (
              <tr key={k.id} className="border-b border-white/[0.04]">
                <td className="py-3 px-4 text-sm text-white flex items-center gap-2"><Key className="h-4 w-4 text-white/30" />{k.name}</td>
                <td className="py-3 px-4 text-sm text-white/40 font-mono">{maskKey(k.key)}</td>
                <td className="py-3 px-4 text-sm text-white/30">{k.lastUsed ? new Date(k.lastUsed).toLocaleDateString() : "Never"}</td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => navigator.clipboard.writeText(k.key)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/40 hover:text-white cursor-pointer"><Copy className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(k.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 ml-1 cursor-pointer"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {keys.length === 0 && (
              <tr><td colSpan={4} className="py-12 text-center text-white/20 text-sm">No API keys yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0f18] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold text-white mb-4">Create API Key</h2>
            <input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="Key name (e.g., production)" className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 mb-4" />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" size="md" onClick={() => { setCreateOpen(false); setNewKeyName("") }}>Cancel</Button>
              <Button variant="gradient" size="md" loading={creating} onClick={handleCreate} disabled={!newKeyName}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
