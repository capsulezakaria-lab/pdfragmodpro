"use client"

import { useState } from "react"
import { Container, Badge, Heading, Text, Button, Input, Textarea } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"
import { Mail, MessageSquare, Send } from "lucide-react"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">Contact</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-4">
            Get in <span className="gradient-text">touch</span>
          </Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text size="lg" className="mb-12">
            Have a question, feature request, or need help? We&apos;d love to hear from you.
          </Text>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Reveal type="fadeInUp" delay={0.3}>
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <Mail className="h-6 w-6 text-[#00D9FF] mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
              <p className="text-sm text-white/40">support@parsemind.ai</p>
            </div>
          </Reveal>
          <Reveal type="fadeInUp" delay={0.4}>
            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <MessageSquare className="h-6 w-6 text-[#00FF9D] mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">Live Chat</h3>
              <p className="text-sm text-white/40">Available Mon-Fri, 9am-6pm EST</p>
            </div>
          </Reveal>
        </div>

        {sent ? (
          <Reveal type="fadeInUp">
            <div className="text-center p-12 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              <div className="text-4xl mb-4">✓</div>
              <Heading as="h2" size="h2" className="mb-2">Message Sent</Heading>
              <Text className="text-white/40">We&apos;ll get back to you within 24 hours.</Text>
            </div>
          </Reveal>
        ) : (
          <Reveal type="fadeInUp" delay={0.5}>
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-white/40 mb-2">Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} required className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm text-white/40 mb-2">Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20" placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-2">Subject</label>
                <input value={subject} onChange={e => setSubject(e.target.value)} required className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20" placeholder="How can we help?" />
              </div>
              <div>
                <label className="block text-sm text-white/40 mb-2">Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 resize-none" placeholder="Tell us more..." />
              </div>
              <Button variant="gradient" size="lg" type="submit" icon={<Send className="h-4 w-4" />}>Send Message</Button>
            </form>
          </Reveal>
        )}
      </div>
    </div>
  )
}
