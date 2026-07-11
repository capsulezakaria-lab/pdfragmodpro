"use client"

import { Container, Badge, Heading } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Accordion } from "@/components/shared/Accordion"

const faqItems = [
  {
    title: "What file types does ParseMind AI support?",
    content: "ParseMind AI supports PDF, scanned documents, images (PNG, JPG, TIFF), and even handwritten documents. Our AI engine handles everything from simple text PDFs to complex multi-column layouts with tables, charts, and mathematical formulas.",
  },
  {
    title: "How accurate is the OCR?",
    content: "Our OCR engine achieves 99.9% accuracy on clean documents and 97%+ on challenging documents with unusual fonts, low quality, or complex layouts. We support 100+ languages including CJK, Arabic, and Cyrillic scripts.",
  },
  {
    title: "Can I self-host ParseMind AI?",
    content: "Yes! Our Enterprise plan includes self-hosted deployment options. You can deploy on-premise, in your VPC, or on any cloud provider. All processing stays within your infrastructure for complete data control.",
  },
  {
    title: "What output formats are available?",
    content: "We support Markdown, JSON, HTML, CSV, and XML. Each format preserves the original document structure including tables, headings, lists, and reading order. Our Markdown output is particularly optimized for LLM consumption.",
  },
  {
    title: "How does ParseMind AI integrate with vector databases?",
    content: "ParseMind AI has native integrations with Pinecone, Weaviate, Chroma, Qdrant, and Milvus. We handle chunking, embedding generation, and direct ingestion into your vector database of choice.",
  },
  {
    title: "Is my data secure?",
    content: "Absolutely. We use end-to-end encryption (AES-256), all data is encrypted in transit (TLS 1.3) and at rest. We are SOC 2 Type II certified, GDPR compliant, and HIPAA eligible. Enterprise customers can request a full security audit.",
  },
  {
    title: "What kind of support do you offer?",
    content: "Free plan includes community support via Discord. Pro and Business plans include email and chat support with 4-hour response time. Enterprise customers get a dedicated account manager with 1-hour SLA and 24/7 phone support.",
  },
]

export function FAQ() {
  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <Container size="md">
        <div className="text-center mb-16">
          <Reveal type="fadeInUp">
            <Badge variant="glass" size="md" className="mb-6">
              FAQ
            </Badge>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.1}>
            <Heading as="h2" size="display" className="mb-4">
              Frequently asked<br />
              <span className="gradient-text">questions</span>
            </Heading>
          </Reveal>
        </div>

        <Reveal type="fadeInUp" delay={0.2}>
          <Accordion items={faqItems} />
        </Reveal>
      </Container>
    </section>
  )
}
