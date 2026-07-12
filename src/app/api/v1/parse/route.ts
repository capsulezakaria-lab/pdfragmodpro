import { NextRequest } from "next/server"
import { success, error, unauthorized } from "@/lib/api-utils"
import prisma from "@/lib/db"
import { withRateLimit, checkPlanLimits } from "@/lib/plan-limits"

async function parseHandler(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return unauthorized("Missing or invalid API key")
    }

    const apiKey = authHeader.slice(7)
    const keyRecord = await prisma.apiKey.findUnique({ where: { key: apiKey } })
    if (!keyRecord) {
      return unauthorized("Invalid API key")
    }

    const planCheck = await checkPlanLimits(keyRecord.userId, prisma)
    if (!planCheck.allowed) {
      return error(planCheck.error!, 403)
    }

    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsed: new Date() },
    })

    const formData = await request.formData()
    const file = formData.get("file") as File | null
    const outputFormat = (formData.get("output_format") as string) || "markdown"
    const ocrLanguage = (formData.get("ocr_language") as string) || "auto"

    if (!file) {
      return error("File is required", 422)
    }

    const validFormats = ["markdown", "json", "html", "csv", "xml"]
    if (!validFormats.includes(outputFormat)) {
      return error(`Invalid output format. Must be one of: ${validFormats.join(", ")}`, 422)
    }

    const pages = Math.floor(Math.random() * 50) + 5
    const confidence = 95 + Math.random() * 4.9
    const processingTime = 1.5 + Math.random() * 3

    const doc = await prisma.document.create({
      data: {
        userId: keyRecord.userId,
        name: file.name,
        pages,
        status: "processing",
        format: outputFormat,
        size: file.size,
        language: ocrLanguage === "auto" ? "en" : ocrLanguage,
      },
    })

    await prisma.user.update({
      where: { id: keyRecord.userId },
      data: { credits: { decrement: pages } },
    })

    setTimeout(async () => {
      try {
        await prisma.document.update({
          where: { id: doc.id },
          data: {
            status: "complete",
            confidence: Math.round(confidence * 10) / 10,
            processingTime: Math.round(processingTime * 10) / 10,
            tablesCount: Math.floor(Math.random() * 15) + 1,
            formulasCount: Math.floor(Math.random() * 30),
            imagesCount: Math.floor(Math.random() * 10),
            outputMarkdown: `# ${file.name.replace(".pdf", "")}\n\n## Abstract\n\nProcessed by ParseMind AI.\n\n## Content\n\n${generateMarkdownContent(pages)}`,
            outputJson: JSON.stringify({ id: doc.id, pages, confidence: Math.round(confidence * 10) / 10 }),
            outputHtml: `<h1>${file.name}</h1><p>Processed by ParseMind AI</p>`,
          },
        })

        await prisma.usage.create({
          data: {
            userId: keyRecord.userId,
            pagesUsed: pages,
            apiCalls: 1,
            storageUsed: file.size,
            date: new Date().toISOString().split("T")[0],
          },
        })
      } catch (e) {
        await prisma.document.update({
          where: { id: doc.id },
          data: { status: "failed" },
        })
      }
    }, 2000)

    return success({
      id: doc.id,
      status: "processing",
      pages,
      estimated_time: `${processingTime.toFixed(1)}s`,
      format: outputFormat,
    }, 202)
  } catch (e) {
    return error("Internal server error", 500)
  }
}

export const POST = withRateLimit(parseHandler, "parse")

function generateMarkdownContent(pages: number): string {
  const sections = [
    "Introduction", "Background", "Methodology", "Results",
    "Discussion", "Conclusion", "References",
  ]
  return sections.slice(0, Math.min(pages, sections.length))
    .map((s) => `## ${s}\n\nContent for ${s} section.\n\n`)
    .join("\n")
}
