import type React from "react"
import "@/app/globals.css"
import { Inter, Noto_Serif } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const notoSerif = Noto_Serif({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Tarot App",
  description: "Mystic yet modern tarot experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={`${inter.variable} ${notoSerif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
