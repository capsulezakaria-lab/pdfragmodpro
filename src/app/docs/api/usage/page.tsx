export default function UsageApiPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Usage API
      </h1>
      <div className="flex items-center gap-2 mb-8">
        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm font-mono">GET</span>
        <code className="text-zinc-400">/api/v1/usage</code>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Response</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            {'{'}<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;pagesUsed&quot;</span>: <span className="text-amber-400">2130</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;pagesLimit&quot;</span>: <span className="text-amber-400">10000</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;apiCalls&quot;</span>: <span className="text-amber-400">8520</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;storageUsed&quot;</span>: <span className="text-amber-400">2684354560</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;dailyUsage&quot;</span>: [<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'{ "date": "2026-07-06", "pages": 120 }'},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'{ "date": "2026-07-07", "pages": 340 }'},<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">...</span><br />
            &nbsp;&nbsp;]<br />
            {'}'}
          </div>
        </section>
      </div>
    </div>
  )
}
