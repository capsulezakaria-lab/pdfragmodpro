export default function PythonPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Python SDK
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Official Python library for ParseMind AI.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            pip install parsemind
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-blue-400">from</span> parsemind <span className="text-blue-400">import</span> ParseMindAI<br /><br />
            client = ParseMindAI(api_key=<span className="text-emerald-400">&quot;sk-prod-...&quot;</span>)<br /><br />
            result = client.parse(<br />
            &nbsp;&nbsp;file=<span className="text-emerald-400">&quot;document.pdf&quot;</span>,<br />
            &nbsp;&nbsp;output_format=<span className="text-emerald-400">&quot;markdown&quot;</span>,<br />
            )<br /><br />
            print(result.text)<br />
            <span className="text-zinc-500"># &quot;# Abstract\nQuantum computing...&quot;</span>
          </div>
        </section>
      </div>
    </div>
  )
}
