"use client"

import { useState, useEffect, useCallback } from "react"
import { useCardCollection } from "./use-card-collection"
import { TAROT_CARDS } from "../data/tarot-cards"
import { storageUtils, STORAGE_KEYS } from "../utils/storage-adapter"

export interface UserStats {
  totalDraws: number
  consecutiveLoginDays: number
  mostFrequentCard: string | null
  lastLoginDate: string
  elementalBalance: {
    fire: number // 权杖
    water: number // 圣杯
    air: number // 宝剑
    earth: number // 星币
  }
}

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>({
    totalDraws: 0,
    consecutiveLoginDays: 1,
    mostFrequentCard: null,
    lastLoginDate: new Date().toDateString(),
    elementalBalance: { fire: 0, water: 0, air: 0, earth: 0 },
  })

  const { collection } = useCardCollection()

  // 获取卡牌元素
  const getCardElement = (cardName: string): keyof UserStats["elementalBalance"] => {
    if (cardName.includes("Wands") || cardName.includes("权杖")) return "fire"
    if (cardName.includes("Cups") || cardName.includes("圣杯")) return "water"
    if (cardName.includes("Swords") || cardName.includes("宝剑")) return "air"
    if (cardName.includes("Pentacles") || cardName.includes("星币") || cardName.includes("金币")) return "earth"

    // 大阿卡纳牌的元素分配
    const majorArcanaElements: Record<string, keyof UserStats["elementalBalance"]> = {
      "The Fool": "air",
      "The Magician": "fire",
      "The High Priestess": "water",
      "The Empress": "earth",
      "The Emperor": "fire",
      "The Hierophant": "earth",
      "The Lovers": "air",
      "The Chariot": "water",
      Strength: "fire",
      "The Hermit": "earth",
      "The Wheel of Fortune": "fire",
      Justice: "air",
      "The Hanged Man": "water",
      Death: "water",
      Temperance: "fire",
      "The Devil": "earth",
      "The Tower": "fire",
      "The Star": "air",
      "The Moon": "water",
      "The Sun": "fire",
      Judgement: "fire",
      "The World": "earth",
    }

    return majorArcanaElements[cardName] || "earth"
  }

  // 计算统计数据
  const calculateStats = useCallback(() => {
    const today = new Date().toDateString()
    const currentStats = storageUtils.getJSON<UserStats>(STORAGE_KEYS.USER_STATS, stats)

    // 计算连续登录天数
    const lastLogin = new Date(currentStats.lastLoginDate)
    const todayDate = new Date(today)
    const daysDiff = Math.floor((todayDate.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24))

    let consecutiveDays = currentStats.consecutiveLoginDays
    if (daysDiff === 1) {
      consecutiveDays += 1
    } else if (daysDiff > 1) {
      consecutiveDays = 1
    }

    // 计算总抽牌次数和元素平衡
    let totalDraws = 0
    const elementCounts = { fire: 0, water: 0, air: 0, earth: 0 }
    const cardFrequency: Record<string, number> = {}

    Object.values(collection).forEach((card) => {
      totalDraws += card.totalDraws
      cardFrequency[card.cardName] = card.totalDraws

      // 计算近期30次抽牌的元素分布
      const recentEncounters = card.encounters.slice(-30)
      recentEncounters.forEach(() => {
        const element = getCardElement(card.cardName)
        elementCounts[element]++
      })
    })

    // 找出最常出现的牌
    let mostFrequentCard = null
    let maxCount = 0
    Object.entries(cardFrequency).forEach(([cardName, count]) => {
      if (count > maxCount) {
        maxCount = count
        mostFrequentCard = cardName
      }
    })

    // 转换为中文名称
    if (mostFrequentCard) {
      const tarotCard = TAROT_CARDS.find((card) => card.name === mostFrequentCard)
      mostFrequentCard = tarotCard?.translation || mostFrequentCard
    }

    // 标准化元素平衡（转换为百分比）
    const totalElements = Object.values(elementCounts).reduce((sum, count) => sum + count, 0)
    const elementalBalance = {
      fire: totalElements > 0 ? (elementCounts.fire / totalElements) * 100 : 25,
      water: totalElements > 0 ? (elementCounts.water / totalElements) * 100 : 25,
      air: totalElements > 0 ? (elementCounts.air / totalElements) * 100 : 25,
      earth: totalElements > 0 ? (elementCounts.earth / totalElements) * 100 : 25,
    }

    const newStats: UserStats = {
      totalDraws,
      consecutiveLoginDays: consecutiveDays,
      mostFrequentCard,
      lastLoginDate: today,
      elementalBalance,
    }

    setStats(newStats)
    storageUtils.setJSON(STORAGE_KEYS.USER_STATS, newStats)
  }, [collection, stats])

  useEffect(() => {
    calculateStats()
  }, [collection])

  return {
    stats,
    refreshStats: calculateStats,
  }
}
