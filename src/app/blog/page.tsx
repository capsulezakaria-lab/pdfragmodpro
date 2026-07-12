"use client"

import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"

const posts = [
  {
    slug: "introducing-parsemind",
    title: "Introducing ParseMind AI",
    excerpt: "The most advanced document understanding platform for modern AI systems.",
    date: "2026-07-10",
    readTime: "3 min",
    category: "Product",
  },
  {
    slug: "ocr-accuracy-benchmark",
    title: "How We Achieved 99.9% OCR Accuracy",
    excerpt: "A deep dive into our vision AI pipeline and how it outperforms every competitor.",
    date: "2026-07-08",
    readTime: "7 min",
    category: "Engineering",
  },
  {
    slug: "rag-pipeline-best-practices",
    title: "Building a Production RAG Pipeline with ParseMind",
    excerpt: "Step-by-step guide to integrating ParseMind with Pinecone and OpenAI for retrieval-augmented generation.",
    date: "2026-07-05",
    readTime: "10 min",
    category: "Guide",
  },
  {
    slug: "multilingual-document-parsing",
    title: "Parsing Documents in 100+ Languages",
    excerpt: "How our multilingual OCR handles CJK, Arabic, Hebrew, and other complex scripts.",
    date: "2026-07-01",
    readTime: "5 min",
    category: "Engineering",
  },
  {
    slug: "self-hosted-deployment",
    title: "Self-Hosting ParseMind: Complete Guide",
    excerpt: "Deploy ParseMind on your own infrastructure with Docker and PostgreSQL.",
    date: "2026-06-28",
    readTime: "8 min",
    category: "Guide",
  },
  {
    slug: "parsemind-vs-competitors",
    title: "ParseMind vs The Competition: 2026 Benchmarks",
    excerpt: "Independent benchmarks comparing ParseMind AI to every major PDF parser on the market.",
    date: "2026-06-25",
    readTime: "6 min",
    category: "Product",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Blog
        </h1>
        <p className="text-zinc-400 text-lg mb-12">
          News, guides, and deep dives from the ParseMind team.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-6 rounded-2xl border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-3 text-sm text-zinc-500">
                <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/60 text-xs font-medium">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                {post.title}
              </h2>
              <p className="text-zinc-400 text-sm mb-3">{post.excerpt}</p>
              <span className="flex items-center gap-1 text-sm text-white/40 group-hover:text-[#00D9FF] transition-colors">
                Read more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
