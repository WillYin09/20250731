"use client"

import { useState, useCallback, useMemo, useRef } from "react"
import { getRandomTarotCards, getCardMeaning, type TarotCardData } from "../data/tarot-cards"
import { getSpreadLayout } from "../data/spread-layouts"
import { callDeepSeekAPI } from "../services/deepseek-api"
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

      // 使用缓存的卡牌数据
      const cardsToUse = cachedCards.length > 0 ? cachedCards : state.revealedCards

      // 构建卡牌描述
      const cardDescriptions = cardsToUse
        .map((card, index) => {
          const position = spreadLayout.positions[index]
          return `位置${index + 1}（${position.label}）：${card.translation || card.name}（${card.name}）${card.reversed ? " - 逆位" : " - 正位"}
含义：${getCardMeaning(card, card.reversed)}
描述：${card.description || "经典卡牌"}
位置说明：${position.description}`
        })
        .join("\n\n")

      // 构建专业的卡牌解读提示词
      const systemPrompt = `你是一位经验丰富、充满智慧的情绪指引师，拥有深厚的心理学知识和直觉洞察力。你的解读风格温暖、专业且富有启发性，能够为咨询者提供深刻的人生指导。

用户的具体问题是："${finalQuestion}"

请务必围绕用户的问题进行解读，并严格按照以下4个模块格式提供详细的卡牌解读：

### 整体解读
- 直接回应用户的问题："${finalQuestion}"
- 从整体牌面给出初步答案和指导方向
- 总体能量分析和趋势概述

### 深度分析
对每张牌进行详细解读，格式为：
位置1 (位置名)：牌名 (正位/逆位)

含义与关联：
- 详细解释该牌在此位置的含义
- 与用户问题的关联分析

指导建议：
- 实用的指导建议
- 具体的行动方向

重要：请不要在位置标题前使用###符号，直接写"位置1 (位置名)：牌名 (正位/逆位)"即可。

### 行动建议
1. 针对用户问题的具体行动指导
2. 需要注意的事项和潜在挑战
3. 如何运用这次解读的智慧
4. 时机把握和优先级安排

### 祝福与展望
- 对未来的积极展望
- 温暖的祝福和鼓励
- 最终的智慧总结

请用中文回答，语言要温暖、专业、富有启发性。重要提示：请严格按照上述格式，使用###标记主要模块标题。`

      const userPrompt = `请为以下卡牌指引提供详细解读：

牌阵类型：${spreadType}
用户问题：${finalQuestion}
牌阵说明：${spreadLayout.description}

抽到的卡牌：
${cardDescriptions}

请提供深入、实用且富有启发性的解读，特别要针对用户的问题"${finalQuestion}"给出具体的指导和建议。`

      console.log("🤖 开始调用 DeepSeek API...")

      // 调用 DeepSeek API
      const aiResponse = await callDeepSeekAPI([
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ])

      if (aiResponse && aiResponse.trim()) {
        let finalReading = aiResponse.trim()
        if (
          !finalReading.endsWith("。") &&
          !finalReading.endsWith("？") &&
          !finalReading.endsWith("！") &&
          !finalReading.endsWith("🌟")
        ) {
          finalReading += "\n\n愿星光指引您前行的道路，愿智慧伴随您每一个选择。🌟"
        }

        updateState({ comprehensiveSummary: finalReading })
        console.log("✅ DeepSeek API 响应成功")
      } else {
        throw new Error("AI返回内容为空")
      }
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
