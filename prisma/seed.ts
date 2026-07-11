import { readFileSync } from "fs"
import { resolve } from "path"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client"
import pg from "pg"

const envPath = resolve(process.cwd(), ".env")
const envContent = readFileSync(envPath, "utf-8")
const dbUrl = envContent.split("\n").find(l => l.startsWith("DATABASE_URL="))?.split("=").slice(1).join("=").replace(/^"|"$/g, "")

if (!dbUrl) {
  console.error("DATABASE_URL not found in .env")
  process.exit(1)
}

async function main() {
  console.log("Connecting to:", dbUrl!.substring(0, 40) + "...")

  const pool = new pg.Pool({ connectionString: dbUrl! })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })

  console.log("Seeding database...")

  const user = await prisma.user.upsert({
    where: { email: "john@example.com" },
    update: {},
    create: {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      plan: "pro",
      credits: 10000,
    },
  })

  console.log(`Created user: ${user.email}`)

  await prisma.apiKey.upsert({
    where: { key: "sk-prod-a1b2c3d4e5f6g7h8i9j0" },
    update: {},
    create: {
      userId: user.id,
      name: "Production",
      key: "sk-prod-a1b2c3d4e5f6g7h8i9j0",
      lastUsed: new Date(),
    },
  })

  await prisma.apiKey.upsert({
    where: { key: "sk-dev-k1l2m3n4o5p6q7r8s9t0" },
    update: {},
    create: {
      userId: user.id,
      name: "Development",
      key: "sk-dev-k1l2m3n4o5p6q7r8s9t0",
      lastUsed: new Date(Date.now() - 3600000),
    },
  })

  console.log("Created API keys")

  await prisma.document.create({
    data: {
      userId: user.id,
      name: "research_paper.pdf",
      pages: 24,
      status: "complete",
      confidence: 99.7,
      format: "markdown",
      size: 12400000,
      language: "en",
      tablesCount: 8,
      formulasCount: 24,
      imagesCount: 12,
      processingTime: 2.4,
      outputMarkdown: "# Quantum Computing: A Comprehensive Survey\n\n## Abstract\n\nThis paper presents a comprehensive survey of quantum computing...\n\n## 1. Introduction\n\nQuantum computing represents a paradigm shift...",
      outputJson: JSON.stringify({ id: "doc_001", pages: 24, confidence: 99.7 }),
      outputHtml: "<h1>Quantum Computing</h1><p>A comprehensive survey</p>",
    },
  })

  console.log("Created document: research_paper.pdf")

  await prisma.document.createMany({
    data: [
      { userId: user.id, name: "financial_report_q2.pdf", pages: 56, status: "complete", confidence: 98.2, format: "json", size: 32000000, language: "en", processingTime: 3.8 },
      { userId: user.id, name: "contract_agreement.pdf", pages: 12, status: "complete", confidence: 99.9, format: "markdown", size: 5600000, language: "en", processingTime: 1.2 },
      { userId: user.id, name: "technical_specs.pdf", pages: 89, status: "processing", format: "html", size: 45000000, language: "en" },
      { userId: user.id, name: "academic_journal.pdf", pages: 34, status: "complete", confidence: 97.8, format: "xml", size: 18000000, language: "en", processingTime: 4.1 },
    ],
  })

  console.log("Created additional documents")

  const usageData = [120, 340, 280, 510, 430, 190, 260]

  for (let i = 0; i < usageData.length; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    await prisma.usage.create({
      data: {
        userId: user.id,
        pagesUsed: usageData[i],
        apiCalls: usageData[i] * 4,
        storageUsed: usageData[i] * 500000,
        date: date.toISOString().split("T")[0],
      },
    })
  }

  console.log("Created usage records")
  console.log("Seeding complete!")

  await prisma.$disconnect()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
