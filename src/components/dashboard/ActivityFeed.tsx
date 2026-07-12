"use client"

interface Document {
  id: string
  name: string
  status: string
}

interface ActivityFeedProps {
  documents: Document[]
}

export function ActivityFeed({ documents }: ActivityFeedProps) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
      <h3 className="text-sm font-medium text-white/60 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {documents.length === 0 ? (
          <p className="text-sm text-white/20">No activity yet</p>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${doc.status === "complete" ? "bg-emerald-400" : doc.status === "processing" ? "bg-amber-400" : "bg-red-400"}`} />
              <span className="text-sm text-white/60 truncate">{doc.name}</span>
              <span className="text-xs text-white/30 ml-auto capitalize">{doc.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
