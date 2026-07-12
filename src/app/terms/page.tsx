"use client"

import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">Legal</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-6">Terms of Service</Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text className="text-white/40 mb-8">Last updated: July 13, 2026</Text>
        </Reveal>

        <Reveal type="fadeInUp" delay={0.3}>
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                By accessing or using ParseMind AI, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Use of Service</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                You may use ParseMind AI for lawful purposes only. You are responsible for all content you upload and process through our service. You agree not to use the service for any illegal or unauthorized purpose.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Account and API Keys</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                You are responsible for maintaining the security of your account and API keys. You must notify us immediately of any unauthorized use. We are not liable for any loss arising from unauthorized use of your credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Payment and Billing</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                Paid plans are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change pricing with 30 days notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Intellectual Property</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                You retain all rights to your documents and data. We do not claim ownership over any content processed through our service. Our platform, including all code and models, is owned by ParseMind AI.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                ParseMind AI is provided &quot;as is&quot; without warranties. We shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid by you in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Termination</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                We may terminate or suspend your account at any time for violations of these terms. You may cancel your account at any time through the dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Changes to Terms</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
