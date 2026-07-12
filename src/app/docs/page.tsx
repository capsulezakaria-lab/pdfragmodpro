import Link from "next/link"

const sections = [
  {
    title: "Getting Started",
    items: [
      { name: "Quick Start", href: "/docs/quickstart", description: "Get up and running in 5 minutes" },
      { name: "Authentication", href: "/docs/auth", description: "API keys and authentication" },
      { name: "Rate Limits", href: "/docs/rate-limits", description: "Understanding rate limits and quotas" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { name: "Parse Document", href: "/docs/api/parse", description: "POST /api/v1/parse — Upload and parse PDFs" },
      { name: "Documents", href: "/docs/api/documents", description: "GET/DELETE /api/v1/documents — List and manage documents" },
      { name: "API Keys", href: "/docs/api-keys", description: "Manage your API keys" },
      { name: "Usage", href: "/docs/api/usage", description: "Track your usage and quotas" },
    ],
  },
  {
    title: "SDKs & Libraries",
    items: [
      { name: "Python SDK", href: "/docs/python", description: "pip install parsemind" },
      { name: "TypeScript SDK", href: "/docs/typescript", description: "npm install @parsemind/sdk" },
      { name: "Go SDK", href: "/docs/go", description: "go get github.com/parsemind/go-sdk" },
    ],
  },
  {
    title: "Guides",
    items: [
      { name: "Output Formats", href: "/docs/output-formats", description: "Markdown, JSON, HTML, CSV, XML" },
      { name: "Vector DB Integration", href: "/docs/vector-db", description: "Connect to Pinecone, Weaviate, and more" },
      { name: "Self-Hosting", href: "/docs/self-hosting", description: "Deploy ParseMind on your infrastructure" },
    ],
  },
]

export default function DocsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Documentation
      </h1>
      <p className="text-zinc-400 text-lg mb-12 max-w-2xl">
        Everything you need to integrate ParseMind AI into your applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold mb-4 text-white">{section.title}</h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block p-4 rounded-lg border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all"
                >
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-sm text-zinc-500 mt-1">{item.description}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
