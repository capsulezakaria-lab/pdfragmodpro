"use client"

import { motion } from "framer-motion"
import { Button, Input, Textarea } from "@/components/ui"
import { User, Bell, Shield, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
]

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-white/40 mt-1">Manage your account settings and preferences.</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/[0.03] transition-all text-left cursor-pointer"
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </button>
            )
          })}
        </div>

        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Profile</h2>
            <p className="text-sm text-white/40 mb-6">Update your personal information.</p>
            <div className="space-y-5">
              <div className="flex items-center gap-6">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#8B5CF6] flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                  JD
                </div>
                <div>
                  <Button variant="glass" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-white/30 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="First Name" defaultValue="John" id="firstName" />
                <Input label="Last Name" defaultValue="Doe" id="lastName" />
              </div>
              <Input label="Email" type="email" defaultValue="john@example.com" id="email" />
              <div className="flex justify-end">
                <Button variant="primary" size="md">
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Notifications</h2>
            <p className="text-sm text-white/40 mb-6">Manage your notification preferences.</p>
            <div className="space-y-4">
              {[
                { label: "Document processing complete", desc: "Get notified when a document finishes processing" },
                { label: "Usage alerts", desc: "Receive alerts when you reach 80% of your monthly limit" },
                { label: "Product updates", desc: "Stay informed about new features and improvements" },
                { label: "Security alerts", desc: "Important security notifications about your account" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                  <div>
                    <div className="text-sm font-medium text-white/90">{item.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{item.desc}</div>
                  </div>
                  <div className={cn(
                    "relative h-6 w-10 rounded-full transition-colors duration-300 cursor-pointer",
                    true ? "bg-[#00D9FF]" : "bg-white/[0.1]"
                  )}>
                    <motion.div
                      animate={{ x: true ? 18 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-4 w-4 rounded-full bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Security</h2>
            <p className="text-sm text-white/40 mb-6">Manage your password and security settings.</p>
            <div className="space-y-5">
              <Input label="Current Password" type="password" id="currentPassword" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="New Password" type="password" id="newPassword" />
                <Input label="Confirm Password" type="password" id="confirmPassword" />
              </div>
              <div className="flex justify-end">
                <Button variant="primary" size="md">
                  Update Password
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-1">Danger Zone</h2>
            <p className="text-sm text-white/40 mb-6">Irreversible actions for your account.</p>
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/10">
              <div>
                <div className="text-sm font-medium text-red-400">Delete Account</div>
                <div className="text-xs text-white/40 mt-0.5">Permanently delete your account and all associated data.</div>
              </div>
              <Button variant="secondary" size="sm" className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                Delete
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
