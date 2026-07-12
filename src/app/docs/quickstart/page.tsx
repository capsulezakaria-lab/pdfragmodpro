export default function QuickStartPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Quick Start
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Get up and running with ParseMind AI in 5 minutes.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Get your API key</h2>
          <p className="text-zinc-400 mb-4">Sign up for a free account and navigate to the API Keys section in your dashboard.</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-zinc-500"># Your API key will look like this</span><br />
            <span className="text-emerald-400">sk-prod-a1b2c3d4e5f6g7h8i9j0</span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Make your first request</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-zinc-500"># cURL</span><br />
            <span className="text-blue-400">curl</span> -X POST https://api.parsemind.ai/v1/parse \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot; \<br />
            &nbsp;&nbsp;-F file=&quot;document.pdf&quot;
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Parse the response</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-zinc-500">// Response</span><br />
            {'{'}<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;status&quot;</span>: <span className="text-emerald-400">&quot;complete&quot;</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;pages&quot;</span>: <span className="text-amber-400">24</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;confidence&quot;</span>: <span className="text-amber-400">99.7</span>,<br />
            &nbsp;&nbsp;<span className="text-blue-400">&quot;output&quot;</span>: <span className="text-emerald-400">&quot;# Abstract\nThis paper...&quot;</span><br />
            {'}'}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Next steps</h2>
          <ul className="space-y-2 text-zinc-400">
            <li>→ <a href="/docs/auth" className="text-white hover:underline">Authentication</a> — Learn about API keys and tokens</li>
            <li>→ <a href="/docs/output-formats" className="text-white hover:underline">Output Formats</a> — Explore Markdown, JSON, HTML, CSV, XML</li>
            <li>→ <a href="/docs/python" className="text-white hover:underline">Python SDK</a> — Use ParseMind in Python</li>
            <li>→ <a href="/docs/vector-db" className="text-white hover:underline">Vector DB Integration</a> — Connect to Pinecone, Weaviate</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
