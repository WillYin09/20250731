"use client"

import { useState, useEffect, useCallback } from "react"
import { useFavorites } from "./use-favorites"
import { TAROT_CARDS } from "../data/tarot-cards"

export interface RecentReading {
  id: string
  type: string
  date: string
  result: string
  color: string
  cards: Array<{
    name: string
    translation: string
    position: string
    meaning: string
    reversed: boolean
  }>
  summary: string
  rating: number
}

export function useRecentReadings() {
  const [recentReadings, setRecentReadings] = useState<RecentReading[]>([])
  const { favorites } = useFavorites()

  // 从收藏数据中提取最近指引记录
  const extractRecentReadings = useCallback(() => {
    if (!favorites || favorites.length === 0) {
      return []
    }

    // 按时间排序，获取最近3次收藏的指引
    const sortedReadings = favorites
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 3)

    // 转换为RecentReading格式
    const recentReadings: RecentReading[] = sortedReadings.map((reading) => {
      // 计算日期显示
      const readingDate = new Date(reading.timestamp)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - readingDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      let dateDisplay = ""
      if (diffDays === 0) {
        dateDisplay = "今天"
      } else if (diffDays === 1) {
        dateDisplay = "昨天"
      } else if (diffDays <= 7) {
        dateDisplay = `${diffDays}天前`
      } else {
        dateDisplay = reading.date
      }

      // 根据mood判断结果
      const result = reading.mood
      
      return {
        id: reading.id,
        type: reading.spreadType,
        date: dateDisplay,
        result,
        color: getResultColor(result),
        cards: reading.cards.map(card => ({
          name: card.name,
          translation: getCardTranslation(card.name),
          position: card.position,
          meaning: card.meaning,
          reversed: false // 收藏数据中没有reversed信息，默认为false
        })),
        summary: reading.summary,
        rating: reading.rating,
      }
    })

    return recentReadings
  }, [favorites])

  // 获取卡牌翻译
  const getCardTranslation = (cardName: string) => {
    const card = TAROT_CARDS.find(c => c.name === cardName)
    return card?.translation || cardName
  }

  // 获取结果对应的颜色
  const getResultColor = (result: string) => {
    switch (result) {
      case "积极": return "bg-green-100 text-green-700"
      case "温暖": return "bg-yellow-100 text-yellow-700"
      case "挑战": return "bg-red-100 text-red-700"
      case "深刻": return "bg-purple-100 text-purple-700"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  // 更新最近指引记录
  useEffect(() => {
    const readings = extractRecentReadings()
    setRecentReadings(readings)
  }, [extractRecentReadings])

  const getReadingHistory = (limit = 10) => {
    return recentReadings.slice(0, limit)
  }

  const addReading = (reading: Omit<RecentReading, "id">) => {
    const newReading: RecentReading = {
      ...reading,
      id: Date.now().toString(),
    }

    setRecentReadings((prev) => [newReading, ...prev.slice(0, 2)]) // 只保留最近3条
  }

  return {
    recentReadings,
    getReadingHistory,
    addReading,
  }
}
