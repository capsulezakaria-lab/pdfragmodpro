"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui"
import { Plus, Upload, Search, Filter } from "lucide-react"
import Link from "next/link"

interface Document {
  id: string
  name: string
  pages: number
  status: string
  confidence: number | null
  format: string
  size: number
  language: string
  createdAt: string
}

export default function DocumentsPage() {
  const { token } = useAuthStore()
  const [docs, setDocs] = useState<Document[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [uploading, setUploading] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (!token) return
    fetch("/api/v1/documents", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setDocs(d.data?.documents || []))
      .catch(() => {})
  }, [token])

  const filtered = docs.filter(d => {
    if (filter !== "all" && d.status !== filter) return false
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  async function handleUpload() {
    if (!selectedFile || !token) return
    setUploading(true)
    const form = new FormData()
    form.append("file", selectedFile)

    try {
      const res = await fetch("/api/v1/parse", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      const data = await res.json()
      if (data.success) {
        setDocs(prev => [{ ...data.data, name: selectedFile.name }, ...prev])
        setUploadOpen(false)
        setSelectedFile(null)
      }
    } catch {}
    setUploading(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Documents</h1>
        <Button variant="gradient" size="md" icon={<Upload className="h-4 w-4" />} onClick={() => setUploadOpen(true)}>
          Upload Document
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
          />
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-10 pl-3 pr-8 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white/60 outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="complete">Complete</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>
          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-white/30 pointer-events-none" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Name</th>
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Pages</th>
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Status</th>
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Confidence</th>
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Format</th>
              <th className="text-left py-3 px-4 text-xs text-white/40 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="py-12 text-center text-white/20">No documents found</td></tr>
            ) : (
              filtered.map(doc => (
                <tr key={doc.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-3 px-4">
                    <Link href={`/dashboard/documents/${doc.id}`} className="text-sm text-white hover:text-[#00D9FF] transition-colors">{doc.name}</Link>
                  </td>
                  <td className="py-3 px-4 text-sm text-white/50">{doc.pages}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${doc.status === "complete" ? "bg-emerald-500/10 text-emerald-400" : doc.status === "processing" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>{doc.status}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white/50">{doc.confidence ? `${doc.confidence}%` : "—"}</td>
                  <td className="py-3 px-4 text-sm text-white/50 capitalize">{doc.format}</td>
                  <td className="py-3 px-4 text-sm text-white/30">{new Date(doc.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#0a0f18] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-white mb-4">Upload Document</h2>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-white/20 transition-colors">
              <Upload className="h-8 w-8 text-white/30 mx-auto mb-3" />
              {selectedFile ? (
                <p className="text-sm text-white/60">{selectedFile.name}</p>
              ) : (
                <p className="text-sm text-white/40">Drag & drop or click to select</p>
              )}
              <input type="file" accept=".pdf,.png,.jpg,.tiff" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="ghost" size="md" onClick={() => { setUploadOpen(false); setSelectedFile(null) }}>Cancel</Button>
              <Button variant="gradient" size="md" loading={uploading} onClick={handleUpload} disabled={!selectedFile}>Upload</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
