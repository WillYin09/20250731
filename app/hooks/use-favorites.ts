"use client"

import { useState, useEffect, useCallback } from "react"
import { storageUtils, STORAGE_KEYS } from "../utils/storage-adapter"

export interface SavedReading {
  id: string
  spreadType: string
  date: string
  mood: "积极" | "温暖" | "中性" | "挑战" | "深刻"
  summary: string
  rating: number
  cards: Array<{
    name: string
    meaning: string
    position: string
  }>
  timestamp: number
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<SavedReading[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 从存储加载收藏数据
  useEffect(() => {
    const parsedFavorites = storageUtils.getJSON<SavedReading[]>(STORAGE_KEYS.FAVORITES, [])
    setFavorites(parsedFavorites)
    setIsLoading(false)
  }, [])

  // 保存到存储的辅助函数
  const saveFavoritesToStorage = useCallback((newFavorites: SavedReading[]) => {
    storageUtils.setJSON(STORAGE_KEYS.FAVORITES, newFavorites)
  }, [])

  // 添加收藏
  const addFavorite = useCallback(
    (reading: Omit<SavedReading, "id" | "timestamp">) => {
      // 检查是否已达到收藏上限（改为10条）
      if (favorites.length >= 10) {
        return { success: false, message: "收藏夹已满，最多只能收藏10条记录" }
      }

      const newReading: SavedReading = {
        ...reading,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }

      const newFavorites = [newReading, ...favorites]
      // 同步更新状态和localStorage
      setFavorites(newFavorites)
      saveFavoritesToStorage(newFavorites)

      return { success: true, id: newReading.id }
    },
    [favorites, saveFavoritesToStorage],
  )

  // 删除收藏
  const removeFavorite = useCallback(
    (id: string) => {
      const newFavorites = favorites.filter((fav) => fav.id !== id)

      setFavorites(newFavorites)
      saveFavoritesToStorage(newFavorites)
    },
    [favorites, saveFavoritesToStorage],
  )

  // 检查是否已收藏（基于唯一的组合标识）
  const isFavorited = useCallback(
    (spreadType: string, cards: Array<{ name: string; position: string }>, timestamp: number) => {
      if (isLoading) {
        return false // 加载中时返回false
      }

      // 创建一个基于牌阵类型、卡牌组合和时间戳的唯一标识
      const identifier = `${spreadType}-${cards.map((c) => `${c.name}-${c.position}`).join("-")}-${Math.floor(timestamp / 60000)}` // 精确到分钟

      const result = favorites.some((fav) => {
        const favIdentifier = `${fav.spreadType}-${fav.cards.map((c) => `${c.name}-${c.position}`).join("-")}-${Math.floor(fav.timestamp / 60000)}`
        return favIdentifier === identifier
      })

      return result
    },
    [favorites, isLoading],
  )

  // 获取最新的收藏（用于收藏页面展示）
  const getRecentFavorites = useCallback(
    (limit = 3) => {
      return favorites.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit)
    },
    [favorites],
  )

  // 获取所有收藏（按时间排序）
  const getAllFavorites = useCallback(() => {
    return favorites.sort((a, b) => b.timestamp - a.timestamp)
  }, [favorites])

  // 检查是否可以收藏更多
  const canAddMore = useCallback(() => {
    return favorites.length < 10
  }, [favorites])

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    getRecentFavorites,
    getAllFavorites,
    canAddMore,
    isLoading,
  }
}
