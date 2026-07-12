export default function OutputFormatsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Output Formats
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Choose the output format that best fits your use case.</p>

      <div className="space-y-6">
        {[
          { name: "Markdown", ext: ".md", desc: "Optimized for LLMs and RAG pipelines. Preserves headings, lists, and structure.", example: "# Abstract\n\nThis paper presents..." },
          { name: "JSON", ext: ".json", desc: "Structured data with full metadata. Ideal for programmatic processing.", example: '{"title": "...", "pages": 24, "sections": [...]}' },
          { name: "HTML", ext: ".html", desc: "Web-ready output with semantic tags. Perfect for rendering in browsers.", example: '<h1>Title</h1><p>Content...</p>' },
          { name: "CSV", ext: ".csv", desc: "Tabular data export. Best for spreadsheets and data analysis.", example: 'Title,Page,Content\nAbstract,1,"..."' },
          { name: "XML", ext: ".xml", desc: "Structured markup. Compatible with enterprise systems.", example: '<document><title>...</title></document>' },
        ].map((format) => (
          <div key={format.name} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-xl font-semibold text-white">{format.name}</h3>
              <code className="text-zinc-500 text-sm bg-zinc-800 px-2 py-1 rounded">{format.ext}</code>
            </div>
            <p className="text-zinc-400 mb-3">{format.desc}</p>
            <div className="bg-zinc-950 rounded p-3 font-mono text-sm text-zinc-500">{format.example}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
