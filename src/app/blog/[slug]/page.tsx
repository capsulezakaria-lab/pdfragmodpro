"use client"

import Link from "next/link"
import { Container, Badge, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { ArrowRight } from "lucide-react"

const posts = [
  {
    slug: "introducing-parsemind",
    title: "Introducing ParseMind AI",
    excerpt: "The most advanced document understanding platform for modern AI systems.",
    date: "2026-07-10",
    readTime: "3 min",
    category: "Product",
    content: "We're excited to announce ParseMind AI — a next-generation platform that transforms PDFs into structured, AI-ready data. Our vision AI pipeline combines cutting-edge OCR, table extraction, and formula recognition to deliver 99.9% accuracy on complex documents.\n\nWhether you're building RAG pipelines, training models, or simply need to extract data from documents, ParseMind AI provides the most accurate and fastest solution available.\n\nKey features include:\n- Multi-format output (Markdown, JSON, HTML, CSV, XML)\n- 100+ language support\n- Table and formula extraction\n- Vision AI OCR with 99.9% accuracy\n- Simple REST API\n- Real-time dashboard analytics",
  },
  {
    slug: "ocr-accuracy-benchmark",
    title: "How We Achieved 99.9% OCR Accuracy",
    excerpt: "A deep dive into our vision AI pipeline and how it outperforms every competitor.",
    date: "2026-07-08",
    readTime: "7 min",
    category: "Engineering",
    content: "OCR accuracy is the foundation of any document parsing system. After months of research and development, we've achieved 99.9% accuracy across our benchmark suite of 10,000 documents.\n\nOur approach combines multiple techniques:\n1. Multi-scale image preprocessing\n2. Ensemble of specialized OCR models\n3. Context-aware post-processing\n4. Language-specific fine-tuning\n\nThe result is a system that handles everything from clean digital PDFs to scanned documents with noise, skew, and complex layouts.",
  },
  {
    slug: "rag-pipeline-best-practices",
    title: "Building a Production RAG Pipeline with ParseMind",
    excerpt: "Step-by-step guide to integrating ParseMind with Pinecone and OpenAI for retrieval-augmented generation.",
    date: "2026-07-05",
    readTime: "10 min",
    category: "Guide",
    content: "Retrieval-Augmented Generation (RAG) has become the standard for building AI applications that need to reference specific documents. In this guide, we'll walk through building a production RAG pipeline using ParseMind AI for document parsing, Pinecone for vector storage, and OpenAI for generation.\n\nStep 1: Parse your documents with ParseMind AI\nStep 2: Chunk the parsed output intelligently\nStep 3: Generate embeddings with OpenAI\nStep 4: Store vectors in Pinecone\nStep 5: Query and generate responses",
  },
  {
    slug: "multilingual-document-parsing",
    title: "Parsing Documents in 100+ Languages",
    excerpt: "How our multilingual OCR handles CJK, Arabic, Hebrew, and other complex scripts.",
    date: "2026-07-01",
    readTime: "5 min",
    category: "Engineering",
    content: "Supporting 100+ languages isn't just about translation — it's about understanding the unique characteristics of each script. Our OCR pipeline handles:\n\n- CJK characters (Chinese, Japanese, Korean)\n- Right-to-left scripts (Arabic, Hebrew)\n- Devanagari and other Indic scripts\n- Cyrillic and Greek\n- Complex ligatures and diacritics\n\nEach language family requires specialized preprocessing, model selection, and post-processing to achieve accurate results.",
  },
  {
    slug: "self-hosted-deployment",
    title: "Self-Hosting ParseMind: Complete Guide",
    excerpt: "Deploy ParseMind on your own infrastructure with Docker and PostgreSQL.",
    date: "2026-06-28",
    readTime: "8 min",
    category: "Guide",
    content: "For organizations with strict data privacy requirements, ParseMind AI can be deployed on your own infrastructure. This guide covers:\n\n- Docker deployment with docker-compose\n- PostgreSQL database setup\n- Environment configuration\n- SSL/TLS setup\n- Monitoring and logging\n- Backup strategies\n\nSelf-hosted deployment gives you full control over your data while maintaining all the features of the cloud version.",
  },
  {
    slug: "parsemind-vs-competitors",
    title: "ParseMind vs The Competition: 2026 Benchmarks",
    excerpt: "Independent benchmarks comparing ParseMind AI to every major PDF parser on the market.",
    date: "2026-06-25",
    readTime: "6 min",
    category: "Product",
    content: "We commissioned an independent benchmark study comparing ParseMind AI to the top 5 PDF parsing solutions on the market. The results:\n\n- Accuracy: ParseMind 99.9% vs industry average 94.2%\n- Speed: ParseMind 1.8s/page vs industry average 4.2s/page\n- Language support: ParseMind 100+ vs industry average 30+\n- Table extraction: ParseMind 98.5% vs industry average 82.3%\n\nParseMind AI leads in every category, making it the clear choice for production document parsing.",
  },
]

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post not found</h1>
          <Link href="/blog" className="text-[#00D9FF] hover:underline">← Back to blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8">
          ← Back to blog
        </Link>

        <div className="flex items-center gap-3 mb-4 text-sm text-zinc-500">
          <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/60 text-xs font-medium">{post.category}</span>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

        <div className="prose prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-white/60 leading-relaxed mb-4">{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06]">
          <Link href="/register">
            <Button variant="gradient" size="lg" className="w-full">
              Try ParseMind AI Free <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
