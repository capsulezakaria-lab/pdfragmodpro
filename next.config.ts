import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
    {
      source: "/:path*",
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.stripe.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' blob: data: https://*",
            "font-src 'self'",
            "connect-src 'self' https://api.stripe.com",
            "frame-src https://*.stripe.com",
            "media-src 'self'",
          ].join("; "),
        },
      ],
    },
  ],
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  generateEtags: true,
}

export default nextConfig
