"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import { getRandomTarotCards, getCardMeaning, type TarotCardData, type TarotCardWithOrientation } from "../data/tarot-cards"
import { getSpreadLayout } from "../data/spread-layouts"
import { generateConciseSummary } from "../utils/text-processing"

export interface FlyingCard {
  id: number
  startX: number
  startY: number
  targetX: number
  targetY: number
  targetPosition: number
  cardIndex: number
}

export interface CardReadingState {
  phase: "selecting" | "revealing" | "reading"
  selectedCards: number[]
  revealedCards: TarotCardWithOrientation[]
  currentRevealIndex: number
  deckCards: number[]
  hoveredCard: number | null
  flyingCards: FlyingCard[]
  placedCards: Map<number, number>
  comprehensiveSummary: string
  isLoadingReading: boolean
  userQuestion: string
  selectedPresetQuestion: string
  userRating: number
  favoriteState: "idle" | "saving" | "saved" | "error"
  readingId: string
}

export function useCardReading(spreadType: string) {
  const [state, setState] = useState<CardReadingState>({
    phase: "selecting",
    selectedCards: [],
    revealedCards: [],
    currentRevealIndex: 0,
    deckCards: Array.from({ length: 15 }, (_, i) => i),
    hoveredCard: null,
    flyingCards: [],
    placedCards: new Map(),
    comprehensiveSummary: "",
    isLoadingReading: false,
    userQuestion: "",
    selectedPresetQuestion: "",
    userRating: 0,
    favoriteState: "idle",
    readingId: "",
  })

  // 防止快速点击的锁定机制
  const isProcessingRef = useRef(false)
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const spreadLayout = getSpreadLayout(spreadType)

  // 缓存已生成的卡牌数据，避免重复计算
  const cachedCards = useMemo(() => {
    if (state.revealedCards.length === 0) return []

    return state.revealedCards.map((card, index) => ({
      ...card,
      meaning: getCardMeaning(card, card.isReversed),
      description: card.description,
      index,
      // 添加缓存标记
      cached: true,
    }))
  }, [state.revealedCards])

  const updateState = useCallback((updates: Partial<CardReadingState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }, [])

  const generateComprehensiveReading = useCallback(async () => {
    updateState({ isLoadingReading: true })
    try {
      const finalQuestion = state.selectedPresetQuestion || state.userQuestion || "寻求人生指导"
      const cardsToUse = cachedCards.length > 0 ? cachedCards : state.revealedCards
      
      // 调用服务端API，让服务端处理Qwen调用
      const response = await fetch("/api/tarot-reading", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cards: cardsToUse.map((card, index) => ({
            name: card.name,
            translation: card.translation,
            meaning: getCardMeaning(card, card.isReversed),
            reversed: card.isReversed,
            description: card.description,
          })),
          spreadType,
          question: finalQuestion,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success && data.text) {
        updateState({
          comprehensiveSummary: data.text,
          isLoadingReading: false,
        })
      } else {
        throw new Error(data.error || "解读生成失败")
      }
    } catch (error) {
      console.error("生成解读失败:", error)
      updateState({
        comprehensiveSummary: "星辰的指引暂时模糊，但请相信，答案就在你的心中。静下心来，聆听内在的声音，它会为你点亮前行的道路。",
        isLoadingReading: false,
      })
    }
  }, [cachedCards, spreadType, state.selectedPresetQuestion, state.userQuestion, updateState])

  const startAIReading = useCallback(() => {
    updateState({ phase: "revealing" })

    // 生成卡牌数据并确保包含完整信息
    const realCards = getRandomTarotCards(spreadLayout.positions.length)
    const cards = realCards.map((card, index) => ({
      ...card,
      meaning: getCardMeaning(card, card.isReversed),
      description: card.description,
      index,
    }))

    updateState({ revealedCards: cards })

    cards.forEach((_, index) => {
      setTimeout(() => {
        updateState({ currentRevealIndex: index + 1 })
        if (index === cards.length - 1) {
          setTimeout(() => {
            updateState({ phase: "reading" })
          }, 1000)
        }
      }, index * 1500)
    })
  }, [spreadLayout.positions.length])

  const resetReading = useCallback(() => {
    // 清理所有定时器
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
      animationTimeoutRef.current = null
    }

    isProcessingRef.current = false

    setState({
      phase: "selecting",
      selectedCards: [],
      revealedCards: [],
      currentRevealIndex: 0,
      deckCards: Array.from({ length: 15 }, (_, i) => i),
      hoveredCard: null,
      flyingCards: [],
      placedCards: new Map(),
      comprehensiveSummary: "",
      isLoadingReading: false,
      userQuestion: "",
      selectedPresetQuestion: "",
      userRating: 0,
      favoriteState: "idle",
      readingId: "",
    })
  }, [])

  // 生成精炼的收藏摘要
  const generateFavoriteSummary = useCallback(() => {
    return generateConciseSummary(state.comprehensiveSummary, 350)
  }, [state.comprehensiveSummary])

  // 安全的卡牌选择处理，防止快速点击
  const handleCardSelect = useCallback(
    (cardIndex: number, targetPosition: number, onAnimationComplete: () => void) => {
      // 防止重复处理
      if (isProcessingRef.current) {
        return false
      }

      const totalCards = spreadLayout.positions.length
      if (state.selectedCards.length >= totalCards || state.selectedCards.includes(cardIndex)) {
        return false
      }

      isProcessingRef.current = true

      // 设置动画完成的回调
      animationTimeoutRef.current = setTimeout(() => {
        isProcessingRef.current = false
        onAnimationComplete()
      }, 1600) // 稍微长于动画时间

      return true
    },
    [state.selectedCards, spreadLayout.positions.length],
  )

  return {
    state,
    updateState,
    generateComprehensiveReading,
    startAIReading,
    resetReading,
    generateFavoriteSummary,
    handleCardSelect,
    spreadLayout,
    cachedCards,
  }
}
