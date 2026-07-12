"use client"

import { useState } from "react"
import Link from "next/link"
import { Container, Badge, Heading, Text, Button } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { ArrowLeft, Mail, Send } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Reveal type="fadeInUp">
          <div className="text-center mb-8">
            <Badge variant="glass" size="md" className="mb-6">Password Reset</Badge>
            <Heading as="h1" size="h2" className="mb-2">Forgot your password?</Heading>
            <Text className="text-white/40">Enter your email and we&apos;ll send you a reset link.</Text>
          </div>
        </Reveal>

        {sent ? (
          <Reveal type="fadeInUp" delay={0.1}>
            <div className="text-center p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <Mail className="h-12 w-12 text-[#00D9FF] mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-white mb-2">Check your email</h2>
              <p className="text-sm text-white/40 mb-6">We sent a password reset link to <span className="text-white">{email}</span></p>
              <Link href="/login" className="text-sm text-[#00D9FF] hover:underline">Back to login</Link>
            </div>
          </Reveal>
        ) : (
          <Reveal type="fadeInUp" delay={0.1}>
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-6">
              <div>
                <label className="block text-sm text-white/40 mb-2">Email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  required
                  className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
                  placeholder="you@example.com"
                />
              </div>
              <Button variant="gradient" size="lg" type="submit" className="w-full" icon={<Send className="h-4 w-4" />}>
                Send Reset Link
              </Button>
              <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-white/40 hover:text-white">
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Link>
            </form>
          </Reveal>
        )}
      </div>
    </div>
  )
}
