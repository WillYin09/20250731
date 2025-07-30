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
    console.log("Loaded favorites from storage:", parsedFavorites.length)
    setFavorites(parsedFavorites)
    setIsLoading(false)
  }, [])

  // 保存到存储的辅助函数
  const saveFavoritesToStorage = useCallback((newFavorites: SavedReading[]) => {
    storageUtils.setJSON(STORAGE_KEYS.FAVORITES, newFavorites)
    console.log("Saved favorites to storage:", newFavorites.length)
  }, [])

  // 添加收藏
  const addFavorite = useCallback(
    (reading: Omit<SavedReading, "id" | "timestamp">) => {
      console.log("Adding favorite, current favorites count:", favorites.length)

      // 检查是否已达到收藏上限（改为10条）
      if (favorites.length >= 10) {
        console.log("Favorites limit reached")
        return { success: false, message: "收藏夹已满，最多只能收藏10条记录" }
      }

      const newReading: SavedReading = {
        ...reading,
        id: Date.now().toString(),
        timestamp: Date.now(),
      }

      const newFavorites = [newReading, ...favorites]
      console.log("Creating new favorites array, count will be:", newFavorites.length)

      // 同步更新状态和localStorage
      setFavorites(newFavorites)
      saveFavoritesToStorage(newFavorites)

      console.log("Favorite added successfully, new count:", newFavorites.length)
      return { success: true, id: newReading.id }
    },
    [favorites, saveFavoritesToStorage],
  )

  // 删除收藏
  const removeFavorite = useCallback(
    (id: string) => {
      console.log("Removing favorite with id:", id)
      const newFavorites = favorites.filter((fav) => fav.id !== id)
      console.log("After removal, count will be:", newFavorites.length)

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

      console.log("Checking if favorited:", {
        identifier,
        result,
        favoritesCount: favorites.length,
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
