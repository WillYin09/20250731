"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import { getRandomTarotCards, getCardMeaning, type TarotCardData } from "../data/tarot-cards"
import { getSpreadLayout } from "../data/spread-layouts"
import { callDeepSeekAPI } from "../services/deepseek-api"
import { callQwenAPI } from "../services/qwen-api"
import { getBriefCardMeaning, generateConciseSummary } from "../utils/text-processing"

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
  revealedCards: (TarotCardData & { reversed: boolean })[]
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
      meaning: getCardMeaning(card, card.reversed),
      description: card.description || card.description,
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
            meaning: getCardMeaning(card, card.reversed),
            reversed: card.reversed,
            description: card.description,
          })),
          spreadType,
          question: finalQuestion,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.text) {
          updateState({ comprehensiveSummary: data.text })
          console.log(`✅ ${data.source} API 响应成功`)
          return
        }
      }

      throw new Error("API调用失败")
    } catch (error) {
      console.error("AI解读生成失败:", error)
      const fallbackReading = generateFallbackReading()
      updateState({ comprehensiveSummary: fallbackReading })
    } finally {
      updateState({ isLoadingReading: false })
    }
  }, [state.selectedPresetQuestion, state.userQuestion, cachedCards, state.revealedCards, spreadLayout, spreadType])

  const generateFallbackReading = useCallback(() => {
    const finalQuestion = state.selectedPresetQuestion || state.userQuestion || "寻求人生指导"
    const cardsToUse = cachedCards.length > 0 ? cachedCards : state.revealedCards

    return `## 【第一部分：问题回应】

针对您的问题"${finalQuestion}"，这次${spreadType}为您展现了当前的能量状态和发展趋势。从整体来看，卡牌组合显示了一个充满可能性的局面，为您的问题提供了明确的指导方向。

## 【第二部分：逐牌解读】

${cardsToUse
  .map((card, index) => {
    const position = spreadLayout.positions[index]
    const meaning = getCardMeaning(card, card.reversed)
    const firstKeyword = meaning.split("，")[0] || meaning.split(",")[0] || meaning
    return `${card.translation}·${card.reversed ? "逆位" : "正位"}｜${position.label}｜${firstKeyword}

在${position.label}的位置上，${card.translation}${card.reversed ? "逆位" : "正位"}提醒您${meaning}。这张牌在此位置暗示着${position.description}的重要性，与您的问题"${finalQuestion}"密切相关。`
  })
  .join("\n\n")}

## 【第三部分：综合分析】

从整体牌面来看，您当前正处在一个重要的转折点。卡牌之间的能量相互呼应，为您的问题"${finalQuestion}"指出了前进的方向。保持内心的平静和清晰，相信自己的直觉。

## 【第四部分：行动建议】

1. 保持开放的心态，接受变化带来的机遇
2. 相信自己的内在智慧和直觉
3. 在行动前仔细思考，但不要过度犹豫
4. 寻求内心的平衡，关注精神层面的成长

愿这次指引为您带来启发和指引，记住，未来掌握在您自己手中。🌟`
  }, [state.selectedPresetQuestion, state.userQuestion, cachedCards, state.revealedCards, spreadLayout, spreadType])

  const startAIReading = useCallback(() => {
    updateState({ phase: "revealing" })

    // 生成卡牌数据并确保包含完整信息
    const realCards = getRandomTarotCards(spreadLayout.positions.length)
    const cards = realCards.map((card, index) => ({
      ...card,
      meaning: getCardMeaning(card, card.reversed),
      description: card.description,
      index,
    }))

    console.log("🎴 生成的卡牌数据:", cards)

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
        console.log("正在处理中，忽略点击")
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
