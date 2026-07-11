import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "ParseMind AI - Transform PDFs Into AI-Ready Knowledge",
    template: "%s | ParseMind AI",
  },
  description: "The most advanced document understanding platform for modern AI systems. Convert PDFs to Markdown, JSON, HTML, CSV, XML with state-of-the-art AI.",
  keywords: ["PDF parsing", "OCR", "AI", "document understanding", "RAG", "LLM training", "Markdown"],
  openGraph: {
    title: "ParseMind AI - Transform PDFs Into AI-Ready Knowledge",
    description: "The most advanced document understanding platform for modern AI systems.",
    url: "https://parsemind.ai",
    siteName: "ParseMind AI",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParseMind AI - Transform PDFs Into AI-Ready Knowledge",
    description: "The most advanced document understanding platform for modern AI systems.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#04070D] text-white font-sans">
        <Providers>
          <div className="noise" />
          {children}
        </Providers>
      </body>
    </html>
  )
}
