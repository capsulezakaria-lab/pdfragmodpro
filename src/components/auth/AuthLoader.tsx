"use client"

import { useEffect } from "react"
import { useAuthStore } from "@/stores/auth"

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const { loadFromStorage, loading } = useAuthStore()

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00D9FF] border-t-transparent" />
          <p className="text-sm text-white/40">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
