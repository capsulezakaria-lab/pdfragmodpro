"use client"

import { useState } from "react"
import { useAuthStore } from "@/stores/auth"
import { Button } from "@/components/ui"
import { Save, Trash2, Lock, Bell, User } from "lucide-react"

export default function SettingsPage() {
  const { user, setUser, logout } = useAuthStore()
  const [tab, setTab] = useState("profile")
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [saved, setSaved] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  async function handleSaveProfile() {
    const token = localStorage.getItem("parsemind_token")
    const res = await fetch("/api/v1/auth/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, email }),
    })
    if (res.ok) {
      const data = await res.json()
      if (data.data?.user) setUser(data.data.user, token!)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  async function handleUpdatePassword() {
    const token = localStorage.getItem("parsemind_token")
    await fetch("/api/v1/auth/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    setCurrentPassword("")
    setNewPassword("")
  }

  async function handleDeleteAccount() {
    const token = localStorage.getItem("parsemind_token")
    const res = await fetch("/api/v1/auth/delete", { method: "DELETE", headers: { Authorization: `Bearer ${token}` } })
    if (res.ok) { logout(); window.location.href = "/" }
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "danger", label: "Danger Zone", icon: Trash2 },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${tab === t.id ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/60"}`}>
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 max-w-xl">
          <h3 className="text-sm font-medium text-white/60 mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/40 mb-1">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white outline-none focus:border-white/20" />
            </div>
            <div>
              <label className="block text-sm text-white/40 mb-1">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white outline-none focus:border-white/20" />
            </div>
            <Button variant="gradient" size="md" icon={<Save className="h-4 w-4" />} onClick={handleSaveProfile}>
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>
      )}

      {tab === "security" && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 max-w-xl">
          <h3 className="text-sm font-medium text-white/60 mb-4">Update Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/40 mb-1">Current Password</label>
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white outline-none focus:border-white/20" />
            </div>
            <div>
              <label className="block text-sm text-white/40 mb-1">New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full h-10 px-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-sm text-white outline-none focus:border-white/20" />
            </div>
            <Button variant="gradient" size="md" onClick={handleUpdatePassword} disabled={!currentPassword || !newPassword}>Update Password</Button>
          </div>
        </div>
      )}

      {tab === "notifications" && (
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 max-w-xl">
          <h3 className="text-sm font-medium text-white/60 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            {["Email notifications", "Push notifications", "Weekly reports", "Security alerts"].map(item => (
              <label key={item} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-white/60">{item}</span>
                <div className="h-5 w-9 rounded-full bg-white/10 relative"><div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-[#00D9FF] transition-all" /></div>
              </label>
            ))}
          </div>
        </div>
      )}

      {tab === "danger" && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 max-w-xl">
          <h3 className="text-sm font-medium text-red-400 mb-2">Delete Account</h3>
          <p className="text-sm text-white/40 mb-4">This action is irreversible. All your data will be permanently deleted.</p>
          {!deleteConfirm ? (
            <Button variant="ghost" size="md" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" icon={<Trash2 className="h-4 w-4" />} onClick={() => setDeleteConfirm(true)}>Delete Account</Button>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="md" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
              <Button variant="gradient" size="md" className="!from-red-600 !to-red-500" onClick={handleDeleteAccount}>Confirm Delete</Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
