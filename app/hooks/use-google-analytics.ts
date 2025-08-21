'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-FPZG3ZXKNE'

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void
  }
}

export function useGoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 路由变化时上报 page_view
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const searchParamsString = searchParams ? searchParams.toString() : ''
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + searchParamsString,
        page_title: document.title,
      })
    }
  }, [pathname, searchParams])

  // 自定义事件上报函数
  const trackEvent = (
    eventName: string,
    parameters?: Record<string, any>
  ) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'tarot_app',
        ...parameters,
      })
    }
  }

  // 预定义的塔罗牌相关事件
  const trackStartReading = (spreadType?: string) => {
    trackEvent('start_reading', {
      spread_type: spreadType,
      event_label: '开始占卜',
    })
  }

  const trackDrawCard = (cardName?: string, position?: string) => {
    trackEvent('draw_card', {
      card_name: cardName,
      position: position,
      event_label: '抽牌',
    })
  }

  const trackViewCardDetail = (cardName: string) => {
    trackEvent('view_card_detail', {
      card_name: cardName,
      event_label: '查看牌义',
    })
  }

  const trackCompleteReading = (spreadType?: string, cardCount?: number) => {
    trackEvent('complete_reading', {
      spread_type: spreadType,
      card_count: cardCount,
      event_label: '完成解读',
    })
  }

  const trackSaveReading = (spreadType?: string, rating?: number, mood?: string) => {
    trackEvent('save_reading', {
      spread_type: spreadType,
      rating: rating,
      mood: mood,
      event_label: '收藏解读',
    })
  }

  return {
    trackEvent,
    trackStartReading,
    trackDrawCard,
    trackViewCardDetail,
    trackCompleteReading,
    trackSaveReading,
  }
}
