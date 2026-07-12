export default function TypeScriptPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        TypeScript SDK
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Official TypeScript/Node.js library for ParseMind AI.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            npm install @parsemind/sdk
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">import</span> {'{ ParseMindAI }'} <span className="text-blue-400">from</span> <span className="text-emerald-400">&quot;@parsemind/sdk&quot;</span><br /><br />
            <span className="text-blue-400">const</span> client = <span className="text-blue-400">new</span> ParseMindAI({'{'}<br />
            &nbsp;&nbsp;apiKey: <span className="text-emerald-400">&quot;sk-prod-...&quot;</span>,<br />
            {'}'})<br /><br />
            <span className="text-blue-400">const</span> result = <span className="text-blue-400">await</span> client.parse({'{'}<br />
            &nbsp;&nbsp;file: <span className="text-emerald-400">&quot;document.pdf&quot;</span>,<br />
            &nbsp;&nbsp;format: <span className="text-emerald-400">&quot;markdown&quot;</span>,<br />
            {'}'})<br /><br />
            console.log(result.text)
          </div>
        </section>
      </div>
    </div>
  )
}
