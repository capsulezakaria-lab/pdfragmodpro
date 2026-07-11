"use client"

import { forwardRef, type InputHTMLAttributes, useState } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  glass?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, glass = true, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2 transition-colors duration-200",
              focused ? "text-white" : "text-white/60"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            onFocus={(e) => {
              setFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              props.onBlur?.(e)
            }}
            className={cn(
              "w-full px-4 py-3 text-white placeholder:text-white/30 rounded-xl outline-none transition-all duration-300",
              glass
                ? "bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] focus:border-white/20 focus:bg-white/[0.08]"
                : "bg-white/5 border border-white/10 focus:border-white/20",
              error && "border-red-500/50 focus:border-red-500",
              className
            )}
            {...props}
          />
          {focused && (
            <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-[#00D9FF]/20 ring-offset-1 ring-offset-transparent" />
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  glass?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, glass = true, className, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2 transition-colors duration-200",
              focused ? "text-white" : "text-white/60"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            onFocus={(e) => {
              setFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setFocused(false)
              props.onBlur?.(e)
            }}
            className={cn(
              "w-full px-4 py-3 text-white placeholder:text-white/30 rounded-xl outline-none transition-all duration-300 resize-none min-h-[120px]",
              glass
                ? "bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] focus:border-white/20 focus:bg-white/[0.08]"
                : "bg-white/5 border border-white/10 focus:border-white/20",
              error && "border-red-500/50 focus:border-red-500",
              className
            )}
            {...props}
          />
          {focused && (
            <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-[#00D9FF]/20 ring-offset-1 ring-offset-transparent" />
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Input, Textarea }
