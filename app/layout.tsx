import type React from "react"
import "@/app/globals.css"
import { Inter, Noto_Serif } from "next/font/google"
import type { Metadata } from "next"
import StructuredData from "./components/structured-data"
import GoogleAnalytics from "./components/google-analytics"

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
  title: "塔罗牌在线解读 - 免费塔罗牌占卜与学习平台",
  description: "专业的塔罗牌在线解读平台，提供78张塔罗牌详细含义、免费占卜、牌阵解读、塔罗牌学习指南。支持三牌阵、情感牌阵、职场牌阵等多种牌阵，助你探索内心世界。",
  keywords: "塔罗牌,塔罗牌解读,塔罗牌占卜,塔罗牌学习,塔罗牌含义,免费塔罗牌,塔罗牌牌阵,塔罗牌教程",
  authors: [{ name: "塔罗牌解读平台" }],
  creator: "塔罗牌解读平台",
  publisher: "塔罗牌解读平台",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "塔罗牌在线解读 - 免费塔罗牌占卜与学习平台",
    description: "专业的塔罗牌在线解读平台，提供78张塔罗牌详细含义、免费占卜、牌阵解读、塔罗牌学习指南。",
    url: 'https://your-domain.com',
    siteName: '塔罗牌解读平台',
    images: [
      {
        url: '/images/tarot/card-back.png',
        width: 1200,
        height: 630,
        alt: '塔罗牌解读平台',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "塔罗牌在线解读 - 免费塔罗牌占卜与学习平台",
    description: "专业的塔罗牌在线解读平台，提供78张塔罗牌详细含义、免费占卜、牌阵解读、塔罗牌学习指南。",
    images: ['/images/tarot/card-back.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={`${inter.variable} ${notoSerif.variable}`}>
      <head>
        <StructuredData type="website" />
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  )
}
