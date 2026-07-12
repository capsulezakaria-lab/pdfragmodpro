export default function GoPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Go SDK
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Official Go library for ParseMind AI.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            go get github.com/parsemind/go-sdk
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">client</span> := parsemind.<span className="text-emerald-400">NewClient</span>(<span className="text-emerald-400">&quot;sk-prod-...&quot;</span>)<br /><br />
            result, err := client.<span className="text-emerald-400">Parse</span>(&parsemind.ParseRequest{'{'}<br />
            &nbsp;&nbsp;File: <span className="text-emerald-400">&quot;document.pdf&quot;</span>,<br />
            &nbsp;&nbsp;Format: <span className="text-emerald-400">&quot;markdown&quot;</span>,<br />
            {'}'})
          </div>
        </section>
      </div>
    </div>
  )
}
