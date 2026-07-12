import { create } from "zustand"

interface User {
  id: string
  name: string
  email: string
  plan: string
  credits: number
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  setUser: (user: User, token: string) => void
  logout: () => void
  loadFromStorage: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,

  setUser: (user, token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("parsemind_token", token)
      localStorage.setItem("parsemind_user", JSON.stringify(user))
    }
    set({ user, token, loading: false })
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("parsemind_token")
      localStorage.removeItem("parsemind_user")
    }
    set({ user: null, token: null, loading: false })
  },

  loadFromStorage: async () => {
    if (typeof window === "undefined") {
      set({ loading: false })
      return
    }

    const token = localStorage.getItem("parsemind_token")
    const userStr = localStorage.getItem("parsemind_user")

    if (!token || !userStr) {
      set({ loading: false })
      return
    }

    try {
      const res = await fetch("/api/v1/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        set({ user: data.data.user, token, loading: false })
      } else {
        localStorage.removeItem("parsemind_token")
        localStorage.removeItem("parsemind_user")
        set({ loading: false })
      }
    } catch {
      const user = JSON.parse(userStr)
      set({ user, token, loading: false })
    }
  },
}))
