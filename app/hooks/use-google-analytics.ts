'use client'

import { useEffect, useState, useCallback } from 'react'

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
  const [isClient, setIsClient] = useState(false)
  const [pathname, setPathname] = useState('')
  const [searchParams, setSearchParams] = useState('')

  // 确保只在客户端运行
  useEffect(() => {
    setIsClient(true)
    
    // 在客户端获取当前路径和搜索参数
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname)
      setSearchParams(window.location.search)
    }
  }, [])

  // 路由变化时上报 page_view - 只在客户端执行
  useEffect(() => {
    if (!isClient || typeof window === 'undefined' || !window.gtag) {
      return
    }

    // 监听路由变化
    const handleRouteChange = () => {
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: window.location.pathname + window.location.search,
          page_title: document.title,
        })
      }
    }

    // 使用 History API 监听路由变化
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      handleRouteChange()
    }

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args)
      handleRouteChange()
    }

    // 监听 popstate 事件
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      // 清理事件监听器
      history.pushState = originalPushState
      history.replaceState = originalReplaceState
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [isClient])

  // 自定义事件上报函数
  const trackEvent = useCallback((
    eventName: string,
    parameters?: Record<string, any>
  ) => {
    if (!isClient || typeof window === 'undefined' || !window.gtag) {
      return
    }

    window.gtag('event', eventName, {
      event_category: 'tarot_app',
      ...parameters,
    })
  }, [isClient])

  // 预定义的塔罗牌相关事件
  const trackStartReading = useCallback((spreadType?: string) => {
    trackEvent('start_reading', {
      spread_type: spreadType,
      event_label: '开始占卜',
    })
  }, [trackEvent])

  const trackDrawCard = useCallback((cardName?: string, position?: string) => {
    trackEvent('draw_card', {
      card_name: cardName,
      position: position,
      event_label: '抽牌',
    })
  }, [trackEvent])

  const trackViewCardDetail = useCallback((cardName: string) => {
    trackEvent('view_card_detail', {
      card_name: cardName,
      event_label: '查看牌义',
    })
  }, [trackEvent])

  const trackCompleteReading = useCallback((spreadType?: string, cardCount?: number) => {
    trackEvent('complete_reading', {
      spread_type: spreadType,
      card_count: cardCount,
      event_label: '完成解读',
    })
  }, [trackEvent])

  const trackSaveReading = useCallback((spreadType?: string, rating?: number, mood?: string) => {
    trackEvent('save_reading', {
      spread_type: spreadType,
      rating: rating,
      mood: mood,
      event_label: '收藏解读',
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackStartReading,
    trackDrawCard,
    trackViewCardDetail,
    trackCompleteReading,
    trackSaveReading,
    isClient,
  }
}
