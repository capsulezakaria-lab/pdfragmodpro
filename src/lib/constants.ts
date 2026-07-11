export const SITE = {
  name: "ParseMind AI",
  tagline: "Transform PDFs into AI-Ready Knowledge",
  description: "The most advanced document understanding platform for modern AI systems.",
  url: "https://parsemind.ai",
  logo: "/logo.svg",
  ogImage: "/og.jpg",
  links: {
    github: "https://github.com/parsemind",
    discord: "https://discord.gg/parsemind",
    twitter: "https://twitter.com/parsemind",
    docs: "https://docs.parsemind.ai",
  },
}

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "API", href: "#api" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

export const FEATURES = [
  {
    title: "AI-Powered OCR",
    description: "State-of-the-art optical character recognition with 99.9% accuracy across 100+ languages.",
    gradient: "from-[#00D9FF] to-[#5B6CFF]",
  },
  {
    title: "Smart Layout Analysis",
    description: "Automatic detection of tables, charts, images, math formulas, and reading order.",
    gradient: "from-[#5B6CFF] to-[#8B5CF6]",
  },
  {
    title: "Multiple Output Formats",
    description: "Export to Markdown, JSON, HTML, CSV, XML — ready for any AI pipeline.",
    gradient: "from-[#8B5CF6] to-[#00D9FF]",
  },
  {
    title: "RAG-Optimized",
    description: "Chunking, embedding, and vector database integration built-in for Retrieval Augmented Generation.",
    gradient: "from-[#00FF9D] to-[#00D9FF]",
  },
  {
    title: "Enterprise Security",
    description: "SOC 2, GDPR, HIPAA compliant with end-to-end encryption and audit logging.",
    gradient: "from-[#FFC857] to-[#FF4D6A]",
  },
  {
    title: "Developer First",
    description: "REST API, SDKs in Python, TypeScript, Go, Rust. Open source and self-hostable.",
    gradient: "from-[#00D9FF] to-[#8B5CF6]",
  },
]

export const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "Neural Labs",
    avatar: "/avatars/1.jpg",
    content: "ParseMind AI transformed our RAG pipeline. We went from 60% to 98% retrieval accuracy.",
  },
  {
    name: "Marcus Rodriguez",
    role: "AI Engineer",
    company: "DataForge",
    avatar: "/avatars/2.jpg",
    content: "The OCR accuracy on complex layouts is incredible. Tables, math, multi-column—it handles everything.",
  },
  {
    name: "Emily Watson",
    role: "Founder",
    company: "KnowledgeBot",
    avatar: "/avatars/3.jpg",
    content: "We process 50,000 documents daily. ParseMind's reliability and speed are unmatched.",
  },
  {
    name: "Alex Kim",
    role: "Head of AI",
    company: "DocuMind",
    avatar: "/avatars/4.jpg",
    content: "The semantic understanding is next-level. It doesn't just extract text—it understands structure.",
  },
  {
    name: "Jordan Taylor",
    role: "Principal Engineer",
    company: "ScaleAI",
    avatar: "/avatars/5.jpg",
    content: "We evaluated every PDF parser on the market. ParseMind was 10x better across every metric.",
  },
  {
    name: "Priya Sharma",
    role: "VP Engineering",
    company: "InsightFlow",
    avatar: "/avatars/6.jpg",
    content: "The API is a dream to work with. Clean, well-documented, and incredibly fast response times.",
  },
  {
    name: "David Park",
    role: "Research Scientist",
    company: "DeepRead",
    avatar: "/avatars/7.jpg",
    content: "For LLM training data extraction, ParseMind is the gold standard. Period.",
  },
  {
    name: "Lisa Martinez",
    role: "Director of AI",
    company: "AutoDocs",
    avatar: "/avatars/8.jpg",
    content: "The self-hosted option gave us the security we needed without sacrificing any features.",
  },
]

export const PRICING_PLANS = [
  {
    name: "Free",
    description: "Perfect for trying out ParseMind AI",
    price: "$0",
    credits: "100",
    features: [
      "100 PDF pages/month",
      "Basic OCR",
      "Markdown & JSON export",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For individual developers and small teams",
    price: "$29",
    credits: "10,000",
    features: [
      "10,000 PDF pages/month",
      "Advanced OCR with 100+ languages",
      "All output formats",
      "API access",
      "Priority support",
      "Vector database integration",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    description: "For growing teams and companies",
    price: "$99",
    credits: "100,000",
    features: [
      "100,000 PDF pages/month",
      "Everything in Pro",
      "Team collaboration",
      "Analytics dashboard",
      "SSO & role permissions",
      "Audit logs",
      "Dedicated support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs",
    price: "Custom",
    credits: "Unlimited",
    features: [
      "Unlimited PDF pages",
      "Self-hosted deployment",
      "SOC 2, GDPR, HIPAA compliance",
      "Custom integrations",
      "SLA guarantee",
      "Dedicated account manager",
      "On-premise option",
      "Custom model fine-tuning",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export const FAQS = [
  {
    question: "What file types does ParseMind AI support?",
    answer: "ParseMind AI supports PDF, scanned documents, images (PNG, JPG, TIFF), and even handwritten documents. Our AI engine handles everything from simple text PDFs to complex multi-column layouts with tables, charts, and mathematical formulas.",
  },
  {
    question: "How accurate is the OCR?",
    answer: "Our OCR engine achieves 99.9% accuracy on clean documents and 97%+ on challenging documents with unusual fonts, low quality, or complex layouts. We support 100+ languages including CJK, Arabic, and Cyrillic scripts.",
  },
  {
    question: "Can I self-host ParseMind AI?",
    answer: "Yes! Our Enterprise plan includes self-hosted deployment options. You can deploy on-premise, in your VPC, or on any cloud provider. All processing stays within your infrastructure for complete data control.",
  },
  {
    question: "What output formats are available?",
    answer: "We support Markdown, JSON, HTML, CSV, and XML. Each format preserves the original document structure including tables, headings, lists, and reading order. Our Markdown output is particularly optimized for LLM consumption.",
  },
  {
    question: "How does ParseMind AI integrate with vector databases?",
    answer: "ParseMind AI has native integrations with Pinecone, Weaviate, Chroma, Qdrant, and Milvus. We handle chunking, embedding generation, and direct ingestion into your vector database of choice.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use end-to-end encryption (AES-256), all data is encrypted in transit (TLS 1.3) and at rest. We are SOC 2 Type II certified, GDPR compliant, and HIPAA eligible. Enterprise customers can request a full security audit.",
  },
  {
    question: "What kind of support do you offer?",
    answer: "Free plan includes community support via Discord. Pro and Business plans include email and chat support with 4-hour response time. Enterprise customers get a dedicated account manager with 1-hour SLA and 24/7 phone support.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time with no penalties. If you're on a monthly plan, you'll retain access until the end of your billing period. Annual plans come with a 30-day money-back guarantee.",
  },
]
