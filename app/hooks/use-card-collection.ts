"use client"

import { useState, useEffect, useCallback } from "react"
import { TAROT_CARDS } from "../data/tarot-cards"
import { storageUtils, STORAGE_KEYS } from "../utils/storage-adapter"

export interface CardEncounter {
  date: string
  spreadType: string
  position: string
  reversed: boolean
  readingId: string
}

export interface CollectedCard {
  cardName: string
  firstEncounter: string
  totalDraws: number
  normalDraws: number
  reversedDraws: number
  encounters: CardEncounter[]
  isUnlocked: boolean
}

export interface CardCollection {
  [cardName: string]: CollectedCard
}

export function useCardCollection() {
  const [collection, setCollection] = useState<CardCollection>({})
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([])

  // 从存储加载收藏数据
  useEffect(() => {
    const savedCollection = storageUtils.getJSON<CardCollection>(STORAGE_KEYS.CARD_COLLECTION, {})
    setCollection(savedCollection)
  }, [])

  // 保存到存储
  const saveCollection = (newCollection: CardCollection) => {
    setCollection(newCollection)
    storageUtils.setJSON(STORAGE_KEYS.CARD_COLLECTION, newCollection)
  }

  // 记录卡牌遭遇
  const recordCardEncounter = useCallback(
    (
      cardName: string,
      spreadType: string,
      position: string,
      reversed: boolean,
      readingId: string = Date.now().toString(),
    ) => {
      const today = new Date().toLocaleDateString("zh-CN")
      const encounter: CardEncounter = {
        date: today,
        spreadType,
        position,
        reversed,
        readingId,
      }

      const newCollection = { ...collection }

      if (!newCollection[cardName]) {
        // 首次遇到这张牌
        newCollection[cardName] = {
          cardName,
          firstEncounter: today,
          totalDraws: 1,
          normalDraws: reversed ? 0 : 1,
          reversedDraws: reversed ? 1 : 0,
          encounters: [encounter],
          isUnlocked: true,
        }

        // 标记为新解锁
        setNewlyUnlocked((prev) => [...prev, cardName])

        // 3秒后清除新解锁标记
        setTimeout(() => {
          setNewlyUnlocked((prev) => prev.filter((name) => name !== cardName))
        }, 3000)
      } else {
        // 已经遇到过的牌
        const existing = newCollection[cardName]
        newCollection[cardName] = {
          ...existing,
          totalDraws: existing.totalDraws + 1,
          normalDraws: existing.normalDraws + (reversed ? 0 : 1),
          reversedDraws: existing.reversedDraws + (reversed ? 1 : 0),
          encounters: [...existing.encounters, encounter],
        }
      }

      saveCollection(newCollection)
      return newCollection[cardName]
    },
    [collection],
  )

  // 批量记录多张卡牌（用于指引结束时）
  const recordReading = useCallback(
    (cards: Array<{ name: string; position: string; reversed: boolean }>, spreadType: string) => {
      const readingId = Date.now().toString()
      const newlyUnlockedCards: string[] = []

      cards.forEach((card) => {
        const wasUnlocked = collection[card.name]?.isUnlocked || false
        recordCardEncounter(card.name, spreadType, card.position, card.reversed, readingId)

        if (!wasUnlocked) {
          newlyUnlockedCards.push(card.name)
        }
      })

      return newlyUnlockedCards
    },
    [collection, recordCardEncounter],
  )

  // 获取卡牌统计信息
  const getCardStats = useCallback(
    (cardName: string) => {
      return collection[cardName] || null
    },
    [collection],
  )

  // 获取收集进度
  const getCollectionProgress = useCallback(() => {
    const totalCards = TAROT_CARDS.length
    const unlockedCards = Object.values(collection).filter((card) => card.isUnlocked).length
    return {
      total: totalCards,
      unlocked: unlockedCards,
      percentage: Math.round((unlockedCards / totalCards) * 100),
    }
  }, [collection])

  // 检查卡牌是否已解锁
  const isCardUnlocked = useCallback(
    (cardName: string) => {
      return collection[cardName]?.isUnlocked || false
    },
    [collection],
  )

  // 获取最近解锁的卡牌
  const getRecentlyUnlocked = useCallback(
    (limit = 5) => {
      return Object.values(collection)
        .filter((card) => card.isUnlocked)
        .sort((a, b) => new Date(b.firstEncounter).getTime() - new Date(a.firstEncounter).getTime())
        .slice(0, limit)
    },
    [collection],
  )

  return {
    collection,
    recordCardEncounter,
    recordReading,
    getCardStats,
    getCollectionProgress,
    isCardUnlocked,
    getRecentlyUnlocked,
    newlyUnlocked,
  }
}
