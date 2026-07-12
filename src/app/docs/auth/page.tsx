export default function AuthPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Authentication
      </h1>
      <p className="text-zinc-400 text-lg mb-8">ParseMind uses API keys to authenticate requests.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">API Keys</h2>
          <p className="text-zinc-400 mb-4">Include your API key in the Authorization header:</p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">Authorization</span>: Bearer <span className="text-emerald-400">sk-prod-...</span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Key Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <div className="font-mono text-emerald-400 mb-2">sk-prod-...</div>
              <div className="text-white font-medium">Production Key</div>
              <div className="text-zinc-500 text-sm">Full access to all API endpoints</div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
              <div className="font-mono text-amber-400 mb-2">sk-dev-...</div>
              <div className="text-white font-medium">Development Key</div>
              <div className="text-zinc-500 text-sm">Rate limited, for testing only</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Security Best Practices</h2>
          <ul className="space-y-2 text-zinc-400 list-disc list-inside">
            <li>Never expose API keys in client-side code</li>
            <li>Use environment variables to store keys</li>
            <li>Rotate keys regularly</li>
            <li>Use separate keys for development and production</li>
          </ul>
        </section>
      </div>
    </div>
  )
}
