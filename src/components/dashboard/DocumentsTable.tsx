"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, MoreHorizontal, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const documents = [
  { id: "doc_001", name: "research_paper.pdf", pages: 24, status: "complete", confidence: 99.7, date: "2 min ago", format: "Markdown" },
  { id: "doc_002", name: "financial_report_q2.pdf", pages: 56, status: "complete", confidence: 98.2, date: "15 min ago", format: "JSON" },
  { id: "doc_003", name: "contract_agreement.pdf", pages: 12, status: "complete", confidence: 99.9, date: "1 hour ago", format: "Markdown" },
  { id: "doc_004", name: "technical_specs.pdf", pages: 89, status: "processing", confidence: null, date: "Just now", format: "HTML" },
  { id: "doc_005", name: "invoice_batch_2024.pdf", pages: 8, status: "failed", confidence: null, date: "3 hours ago", format: "CSV" },
  { id: "doc_006", name: "academic_journal.pdf", pages: 34, status: "complete", confidence: 97.8, date: "5 hours ago", format: "XML" },
  { id: "doc_007", name: "legal_briefing.pdf", pages: 18, status: "complete", confidence: 99.1, date: "1 day ago", format: "Markdown" },
]

export function DocumentsTable({ limit }: { limit?: number }) {
  const items = limit ? documents.slice(0, limit) : documents

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {["Name", "Pages", "Status", "Confidence", "Format", "Date", ""].map((header) => (
                <th key={header} className="text-left px-5 py-3.5 text-xs font-medium text-white/40 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((doc, i) => (
              <motion.tr
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-5 py-4">
                  <Link href={`/dashboard/documents/${doc.id}`} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white/40" />
                    </div>
                    <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                      {doc.name}
                    </span>
                  </Link>
                </td>
                <td className="px-5 py-4 text-sm text-white/40">{doc.pages}</td>
                <td className="px-5 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 text-xs font-medium",
                    doc.status === "complete" && "text-[#00FF9D]",
                    doc.status === "processing" && "text-[#FFC857]",
                    doc.status === "failed" && "text-[#FF4D6A]"
                  )}>
                    {doc.status === "complete" && <CheckCircle className="h-3.5 w-3.5" />}
                    {doc.status === "processing" && <Clock className="h-3.5 w-3.5 animate-pulse" />}
                    {doc.status === "failed" && <AlertCircle className="h-3.5 w-3.5" />}
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-white/80 font-medium">
                  {doc.confidence ? `${doc.confidence}%` : "—"}
                </td>
                <td className="px-5 py-4">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.05] text-white/50 border border-white/[0.06]">
                    {doc.format}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-white/40">{doc.date}</td>
                <td className="px-5 py-4">
                  <button className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
