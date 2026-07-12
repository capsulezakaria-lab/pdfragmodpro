export default function VectorDbPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Vector DB Integration
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Connect ParseMind output to your vector database for RAG pipelines.</p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Supported Vector Databases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Pinecone", "Weaviate", "Qdrant"].map((db) => (
              <div key={db} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center">
                <div className="text-white font-medium">{db}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ol className="space-y-4 text-zinc-400">
            <li className="flex gap-3">
              <span className="text-white font-bold">1.</span>
              <span>Parse your document with ParseMind API</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold">2.</span>
              <span>Receive structured output (Markdown/JSON)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold">3.</span>
              <span>Chunk the output into semantic segments</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold">4.</span>
              <span>Generate embeddings via OpenAI/Cohere</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-bold">5.</span>
              <span>Store in your vector database</span>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}
