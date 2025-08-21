'use client'

import dynamic from 'next/dynamic'

// 使用 dynamic import 完全避免服务端渲染
const GoogleAnalyticsClient = dynamic(
  () => import('./google-analytics-client'),
  { 
    ssr: false,
    loading: () => null
  }
)

export default function GoogleAnalytics() {
  return <GoogleAnalyticsClient />
}
