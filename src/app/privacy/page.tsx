"use client"

import { Container, Badge, Heading, Text } from "@/components/ui"
import { Reveal } from "@/components/shared/Reveal"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Reveal type="fadeInUp">
          <Badge variant="glass" size="md" className="mb-6">Legal</Badge>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.1}>
          <Heading as="h1" size="display" className="mb-6">Privacy Policy</Heading>
        </Reveal>
        <Reveal type="fadeInUp" delay={0.2}>
          <Text className="text-white/40 mb-8">Last updated: July 13, 2026</Text>
        </Reveal>

        <Reveal type="fadeInUp" delay={0.3}>
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                We collect information you provide directly, including your name, email address, payment information, and any documents you upload for processing. We also collect usage data such as API calls, pages processed, and feature interactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                We use your information to provide and improve our services, process your documents, communicate with you about your account, send product updates, and ensure the security of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Document Processing</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                Your documents are processed securely and are never stored permanently on our servers. After processing, document content is retained for the duration of your session and then permanently deleted. We do not access or use your document content for any purpose other than providing the requested service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                We implement industry-standard security measures including AES-256 encryption at rest, TLS 1.3 encryption in transit, SOC 2 compliance, and regular security audits. All data is stored in secure, geographically distributed data centers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Data Sharing</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                We do not sell your personal information. We may share data with trusted service providers who assist in operating our platform, and as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                You have the right to access, correct, or delete your personal data. You may also export your data at any time through the dashboard or by contacting support.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                For privacy-related inquiries, please contact us at privacy@parsemind.ai.
              </p>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
