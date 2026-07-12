"use client"

interface UsageChartProps {
  data: { date: string; pages: number }[]
}

export function UsageChart({ data }: UsageChartProps) {
  const max = Math.max(...data.map(d => d.pages), 1)

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
      <h3 className="text-sm font-medium text-white/60 mb-1">Usage (This Week)</h3>
      <p className="text-xs text-white/30 mb-6">{data.reduce((s, d) => s + d.pages, 0).toLocaleString()} pages processed</p>
      <div className="flex items-end gap-2 h-40">
        {data.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-white/20 text-sm">No usage data yet</div>
        ) : (
          data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full rounded-lg bg-gradient-to-t from-[#00D9FF]/20 to-[#5B6CFF]/10 transition-all" style={{ height: `${(d.pages / max) * 100}%`, minHeight: 4 }} />
              <span className="text-[10px] text-white/30">{new Date(d.date).toLocaleDateString("en", { weekday: "short" })}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
