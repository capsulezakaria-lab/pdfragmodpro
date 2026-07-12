"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { use } from "react"
import { Button } from "@/components/ui"
import { ArrowLeft, Download, Copy, Share2 } from "lucide-react"
import Link from "next/link"

export default function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { token } = useAuthStore()
  const [doc, setDoc] = useState<{
    name: string
    pages: number
    language: string
    status: string
    confidence: number | null
    tablesCount: number
    formulasCount: number
    imagesCount: number
    format: string
    outputMarkdown: string | null
    outputJson: string | null
  } | null>(null)

  useEffect(() => {
    if (!token) return
    fetch(`/api/v1/documents/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setDoc(d.data))
      .catch(() => {})
  }, [id, token])

  if (!doc) return <div className="text-white/30">Loading...</div>

  return (
    <div>
      <Link href="/dashboard/documents" className="flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Documents
      </Link>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{doc.name}</h1>
          <p className="text-sm text-white/40 mt-1">{doc.pages} pages &bull; {doc.language}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="sm" icon={<Copy className="h-4 w-4" />} onClick={() => { navigator.clipboard.writeText(doc.outputMarkdown || doc.outputJson || "") }}>Copy</Button>
          <Button variant="glass" size="sm" icon={<Download className="h-4 w-4" />} onClick={() => { const b = new Blob([doc.outputMarkdown || ""], { type: "text/markdown" }); const u = URL.createObjectURL(b); const a = document.createElement("a"); a.href = u; a.download = doc.name.replace(".pdf", ".md"); a.click() }}>Download</Button>
          <Button variant="glass" size="sm" icon={<Share2 className="h-4 w-4" />} onClick={() => navigator.clipboard.writeText(window.location.href)}>Share</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-medium text-white/60 mb-3">Output Preview</h3>
          <pre className="text-sm text-white/60 whitespace-pre-wrap font-mono leading-relaxed">{doc.outputMarkdown || doc.outputJson || "No output available"}</pre>
        </div>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="text-sm font-medium text-white/60 mb-4">Document Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-white/40">Status</span><span className={`capitalize ${doc.status === "complete" ? "text-emerald-400" : "text-amber-400"}`}>{doc.status}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Confidence</span><span className="text-white">{doc.confidence ? `${doc.confidence}%` : "—"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Pages</span><span className="text-white">{doc.pages}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Tables</span><span className="text-white">{doc.tablesCount || 0}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Formulas</span><span className="text-white">{doc.formulasCount || 0}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Images</span><span className="text-white">{doc.imagesCount || 0}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/40">Format</span><span className="text-white capitalize">{doc.format}</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
