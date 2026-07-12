export default function SelfHostingPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Self-Hosting
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Deploy ParseMind AI on your own infrastructure.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Requirements</h2>
          <ul className="space-y-2 text-zinc-400 list-disc list-inside">
            <li>Docker & Docker Compose</li>
            <li>PostgreSQL database</li>
            <li>Minimum 2GB RAM</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Docker Deployment</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 font-mono text-sm">
            <span className="text-zinc-500"># Clone the repository</span><br />
            git clone https://github.com/capsulezakaria-lab/pdfragmodpro.git<br />
            cd pdfragmodpro<br /><br />
            <span className="text-zinc-500"># Configure environment</span><br />
            cp .env.example .env<br />
            <span className="text-zinc-500"># Edit .env with your DATABASE_URL</span><br /><br />
            <span className="text-zinc-500"># Start</span><br />
            docker compose up -d
          </div>
        </section>
      </div>
    </div>
  )
}
