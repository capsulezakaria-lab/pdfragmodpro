export default function ParseApiPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Parse Document
      </h1>
      <div className="flex items-center gap-2 mb-8">
        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-sm font-mono">POST</span>
        <code className="text-zinc-400">/api/v1/parse</code>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Request</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">curl</span> -X POST https://api.parsemind.ai/v1/parse \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot; \<br />
            &nbsp;&nbsp;-F file=&quot;document.pdf&quot; \<br />
            &nbsp;&nbsp;-F format=<span className="text-emerald-400">&quot;markdown&quot;</span> \<br />
            &nbsp;&nbsp;-F language=<span className="text-emerald-400">&quot;auto&quot;</span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Parameters</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-4 px-4 text-white">Parameter</th>
                  <th className="text-left py-4 px-4 text-white">Type</th>
                  <th className="text-left py-4 px-4 text-white">Required</th>
                  <th className="text-left py-4 px-4 text-white">Description</th>
                </tr>
              </thead>
              <tbody className="text-zinc-400">
                <tr className="border-b border-zinc-800/50">
                  <td className="py-4 px-4 font-mono text-emerald-400">file</td>
                  <td className="py-4 px-4">File</td>
                  <td className="py-4 px-4">Yes</td>
                  <td className="py-4 px-4">PDF file to parse</td>
                </tr>
                <tr className="border-b border-zinc-800/50">
                  <td className="py-4 px-4 font-mono text-emerald-400">format</td>
                  <td className="py-4 px-4">String</td>
                  <td className="py-4 px-4">No</td>
                  <td className="py-4 px-4">Output format: markdown, json, html, csv, xml (default: markdown)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-mono text-emerald-400">language</td>
                  <td className="py-4 px-4">String</td>
                  <td className="py-4 px-4">No</td>
                  <td className="py-4 px-4">Document language: auto, en, fr, ar, etc. (default: auto)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Response</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-zinc-500">// 202 Accepted</span><br />
            {'{'}<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;id&quot;</span>: <span className="text-emerald-400">&quot;doc_abc123&quot;</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;processing&quot;</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;pages&quot;</span>: <span className="text-amber-400">24</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;confidence&quot;</span>: <span className="text-amber-400">99.7</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;language&quot;</span>: <span className="text-emerald-400">&quot;en&quot;</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;format&quot;</span>: <span className="text-emerald-400">&quot;markdown&quot;</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;output&quot;</span>: <span className="text-emerald-400">&quot;# Abstract\n...&quot;</span><br />
            {'}'}
          </div>
        </section>
      </div>
    </div>
  )
}
