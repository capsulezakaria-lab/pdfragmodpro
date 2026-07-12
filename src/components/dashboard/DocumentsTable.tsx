"use client"

interface Document {
  id: string
  name: string
  pages: number
  status: string
  confidence: number | null
  format: string
  createdAt: string
}

interface DocumentsTableProps {
  documents: Document[]
}

export function DocumentsTable({ documents }: DocumentsTableProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
      <h3 className="text-sm font-medium text-white/60 mb-4">Recent Documents</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left py-3 px-2 text-xs text-white/40 font-medium">Name</th>
              <th className="text-left py-3 px-2 text-xs text-white/40 font-medium">Pages</th>
              <th className="text-left py-3 px-2 text-xs text-white/40 font-medium">Status</th>
              <th className="text-left py-3 px-2 text-xs text-white/40 font-medium">Confidence</th>
              <th className="text-left py-3 px-2 text-xs text-white/40 font-medium">Format</th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 ? (
              <tr><td colSpan={5} className="py-8 text-center text-white/20 text-sm">No documents yet</td></tr>
            ) : (
              documents.map((doc) => (
                <tr key={doc.id} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                  <td className="py-3 px-2 text-sm text-white">{doc.name}</td>
                  <td className="py-3 px-2 text-sm text-white/50">{doc.pages}</td>
                  <td className="py-3 px-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${doc.status === "complete" ? "bg-emerald-500/10 text-emerald-400" : doc.status === "processing" ? "bg-amber-500/10 text-amber-400" : "bg-red-500/10 text-red-400"}`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm text-white/50">{doc.confidence ? `${doc.confidence}%` : "—"}</td>
                  <td className="py-3 px-2 text-sm text-white/50 capitalize">{doc.format}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
