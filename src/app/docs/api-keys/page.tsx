export default function ApiKeysPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        API Keys
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Manage your API keys from the dashboard.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Create a Key</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-zinc-500"># Via API</span><br />
            <span className="text-blue-400">curl</span> -X POST https://api.parsemind.ai/v1/api-keys \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot; \<br />
            &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \<br />
            &nbsp;&nbsp;-d '{'{"name": "my-key"}'}'
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">List Keys</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">curl</span> https://api.parsemind.ai/v1/api-keys \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot;
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Revoke a Key</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">curl</span> -X DELETE https://api.parsemind.ai/v1/api-keys/<span className="text-amber-400">key_id</span> \<br />
            &nbsp;&nbsp;-H &quot;Authorization: Bearer sk-prod-...&quot;
          </div>
        </section>
      </div>
    </div>
  )
}
