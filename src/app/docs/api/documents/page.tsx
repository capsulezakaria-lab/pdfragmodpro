export default function DocumentsApiPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Documents API
      </h1>
      <p className="text-zinc-400 text-lg mb-8">List, retrieve, and delete parsed documents.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">List Documents</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm font-mono">GET</span>
            <code className="text-zinc-400">/api/v1/documents</code>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">curl</span> https://api.parsemind.ai/v1/documents?status=complete&limit=10 \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot;
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Document</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm font-mono">GET</span>
            <code className="text-zinc-400">/api/v1/documents/:id</code>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">curl</span> https://api.parsemind.ai/v1/documents/<span className="text-amber-400">doc_abc123</span> \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot;
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Delete Document</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm font-mono">DELETE</span>
            <code className="text-zinc-400">/api/v1/documents/:id</code>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">curl</span> -X DELETE https://api.parsemind.ai/v1/documents/<span className="text-amber-400">doc_abc123</span> \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot;
          </div>
        </section>
      </div>
    </div>
  )
}
