"use client"

import React, { useEffect } from "react"
import { Zap, Loader2, Star, ArrowLeft, MoreHorizontal, Target, RotateCcw, Share2, Heart } from "lucide-react"
import { useFavorites } from "../hooks/use-favorites"
import { useCardCollection } from "../hooks/use-card-collection"
import { useAudio } from "./audio-manager"
import { useCardReading, type FlyingCard } from "../hooks/use-card-reading"
import CollectionFullModal from "./collection-full-modal"
import AIChatSection from "./ai-chat-section"
// 分享功能暂时移除
import TarotCardImage from "./tarot-card-image"
import FormattedReading from "./formatted-reading"
import QuestionInputSection from "./question-input-section"
import ReadingHeader from "./reading/ReadingHeader"
import ReadingActions from "./reading/ReadingActions"
import FlyingCardLayer from "./reading/FlyingCardLayer"
import SpreadCanvas from "./reading/SpreadCanvas"
import CardDeckFan from "./reading/CardDeckFan"
import ReadingProgress from "./reading/ReadingProgress"
import CollapsibleCardDetail from "./reading/CollapsibleCardDetail"
import { getPresetQuestions } from "../utils/text-processing"
import { getCardMeaning, type TarotCardWithOrientation, type TarotCardData } from "../data/tarot-cards"
import { readingCacheManager, type CachedReadingState } from "../utils/reading-cache-manager"

export interface CardReadingPageProps {
  spreadType: string
  onBack: () => void
}

export default function CardReadingPage({ spreadType, onBack }: CardReadingPageProps) {
  // 适配函数：将 TarotCardWithOrientation 转换为 TarotCardImage 期望的格式
  const adaptCardForImage = (card: TarotCardWithOrientation) => ({
    name: card.name,
    translation: card.translation,
    image: card.image,
    isReversed: card.isReversed,
  } as const)

  // 使用 ref 来跟踪当前的飞行卡牌，避免闭包问题
  const currentFlyingCardRef = React.useRef<FlyingCard | null>(null)
  // 使用 ref 来跟踪是否正在处理动画
  const isAnimatingRef = React.useRef(false)

  const {
    state,
    updateState,
    generateComprehensiveReading,
    startAIReading,
    resetReading,
    generateFavoriteSummary,
    handleCardSelect,
    spreadLayout,
  } = useCardReading(spreadType)
  const { addFavorite, isFavorited, canAddMore } = useFavorites()
  const { recordReading } = useCardCollection()
  const { playCardSelectSound, playCardFlipSound, playMysticalSound } = useAudio()

  const [showCollectionFullModal, setShowCollectionFullModal] = React.useState(false)
  // 分享功能暂时移除
  const [activeCardTab, setActiveCardTab] = React.useState(0) // 新增：当前选中的卡牌Tab
  const [isFromCache, setIsFromCache] = React.useState(false) // 新增：标记是否从缓存恢复

  const presetQuestions = getPresetQuestions(spreadType)
  const totalCards = spreadLayout.positions.length
  const baseAngle = -60
  const angleStep = 120 / (state.deckCards.length - 1)

  // 组件挂载时检查并恢复缓存状态
  useEffect(() => {
    const cachedState = readingCacheManager.restoreReadingState()
    if (cachedState && cachedState.spreadType === spreadType) {
      // 恢复缓存的状态
      updateState({
        revealedCards: cachedState.revealedCards,
        comprehensiveSummary: cachedState.comprehensiveSummary,
        userQuestion: cachedState.userQuestion || "",
        selectedPresetQuestion: cachedState.selectedPresetQuestion || "",
        phase: cachedState.phase as "selecting" | "revealing" | "reading",
        userRating: cachedState.userRating,
        favoriteState: cachedState.favoriteState as "idle" | "saving" | "saved" | "error",
      })
      setActiveCardTab(cachedState.activeCardTab)
      setIsFromCache(true) // 标记从缓存恢复
    }
  }, [spreadType])

  // 组件卸载时保存状态到缓存
  useEffect(() => {
    return () => {
    if (state.phase === "reading" && state.revealedCards.length > 0) {
        const cacheState: CachedReadingState = {
          spreadType,
          revealedCards: state.revealedCards,
          comprehensiveSummary: state.comprehensiveSummary || "",
          userQuestion: state.userQuestion || "",
          selectedPresetQuestion: state.selectedPresetQuestion || "",
          timestamp: Date.now(),
          phase: state.phase,
          activeCardTab,
          userRating: state.userRating,
          favoriteState: state.favoriteState,
          currentPage: "reading",
        }
        readingCacheManager.saveReadingState(cacheState)
      }
    }
  }, [state.phase, state.revealedCards, state.comprehensiveSummary, state.userQuestion, state.selectedPresetQuestion, state.userRating, state.favoriteState, activeCardTab, spreadType])

  useEffect(() => {
    if (state.phase === "reading" && state.revealedCards.length > 0 && !isFromCache) {
      const timestamp = Date.now()
      const newReadingId = `${spreadType}-${timestamp}`
      updateState({ readingId: newReadingId })
      generateComprehensiveReading()

      // 记录卡牌收集
      const cardData = state.revealedCards.map((card, index) => ({
        name: card.name,
        position: spreadLayout.positions[index].label,
        reversed: card.isReversed,
      }))
      recordReading(cardData, spreadType)

      // 检查是否已收藏
      const cards = state.revealedCards.map((card, index) => ({
        name: card.name,
        position: spreadLayout.positions[index].label,
      }))

      if (isFavorited(spreadType, cards, timestamp)) {
        updateState({ favoriteState: "saved" })
      } else {
        updateState({ favoriteState: "idle" })
      }

      // 阅读完成后将页面滚动到顶部，便于从头阅读
      try {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch {}
    }
  }, [state.phase, state.revealedCards.length, isFromCache])

  // 在 useEffect 中监听卡牌揭示状态
  useEffect(() => {
    if (state.phase === "revealing" && state.currentRevealIndex > 0) {
      // 为每张新揭示的卡牌播放翻牌音效
      const timer = setTimeout(() => {
        playCardFlipSound()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [state.currentRevealIndex, state.phase, playCardFlipSound])

  const getCardPositionElements = () => {
    const elements = []
    for (let i = 1; i <= totalCards; i++) {
      const element = document.querySelector(`[data-position="${i}"]`) as HTMLElement
      if (element) {
        const rect = element.getBoundingClientRect()
        elements.push({
          position: i,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        })
      }
    }
    return elements
  }

  const handleCardClick = (cardIndex: number) => {
    const targetPosition = state.selectedCards.length + 1
    const cardElement = document.querySelector(`[data-card-index="${cardIndex}"]`) as HTMLElement
    const positionElements = getCardPositionElements()
    const targetElement = positionElements.find((el) => el.position === targetPosition)

    if (!cardElement || !targetElement) return

    // 检查是否已经选择了这张卡牌
    if (state.selectedCards.includes(cardIndex)) return

    // 防止快速点击
    if (isAnimatingRef.current) return

    playCardSelectSound()

    const cardRect = cardElement.getBoundingClientRect()

    const flyingCard: FlyingCard = {
      id: Date.now(),
      startX: cardRect.left + cardRect.width / 2,
      startY: cardRect.top + cardRect.height / 2,
      targetX: targetElement.x,
      targetY: targetElement.y,
      targetPosition,
      cardIndex,
    }

    // 保存当前飞行卡牌的引用
    currentFlyingCardRef.current = flyingCard

    // 设置动画状态
    isAnimatingRef.current = true

    // 立即更新状态，添加飞行卡牌和选中卡牌
    updateState({
      flyingCards: [...state.flyingCards, flyingCard],
      selectedCards: [...state.selectedCards, cardIndex],
    })

    // 动画完成后，将卡牌从飞行状态移动到放置状态
    setTimeout(() => {
      const newPlacedCards = new Map(state.placedCards)
      newPlacedCards.set(targetPosition, cardIndex)
      updateState({
        flyingCards: state.flyingCards.filter((card) => card.id !== currentFlyingCardRef.current?.id),
        placedCards: newPlacedCards,
      })
      // 清理引用和动画状态
      currentFlyingCardRef.current = null
      isAnimatingRef.current = false
    }, 1500) // 动画持续时间
  }

  const handleRedrawCard = (position: number) => {
    const cardIndex = state.placedCards.get(position)
    if (cardIndex !== undefined) {
      playCardSelectSound()

      const newPlacedCards = new Map(state.placedCards)
      newPlacedCards.delete(position)
      const newSelectedCards = state.selectedCards.filter((index) => index !== cardIndex)

      updateState({
        placedCards: newPlacedCards,
        selectedCards: newSelectedCards,
      })

      setTimeout(() => {
        const availableCards = state.deckCards.filter((index) => !newSelectedCards.includes(index))
        if (availableCards.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableCards.length)
          const newCardIndex = availableCards[randomIndex]

          const positionElements = getCardPositionElements()
          const targetElement = positionElements.find((el) => el.position === position)

          if (targetElement) {
            const deckCenterX = window.innerWidth / 2
            const deckCenterY = window.innerHeight - 100

            const flyingCard: FlyingCard = {
              id: Date.now(),
              startX: deckCenterX,
              startY: deckCenterY,
              targetX: targetElement.x,
              targetY: targetElement.y,
              targetPosition: position,
              cardIndex: newCardIndex,
            }

            // 保存当前飞行卡牌的引用
            currentFlyingCardRef.current = flyingCard

            // 设置动画状态
            isAnimatingRef.current = true

            const updatedSelected = [...newSelectedCards, newCardIndex]
            updateState({
              flyingCards: [...state.flyingCards, flyingCard],
              selectedCards: updatedSelected,
            })

            setTimeout(() => {
              const newPlacedCards = new Map(state.placedCards)
              newPlacedCards.set(position, newCardIndex)
              updateState({
                flyingCards: state.flyingCards.filter((card) => card.id !== currentFlyingCardRef.current?.id),
                placedCards: newPlacedCards,
              })
              // 清理引用和动画状态
              currentFlyingCardRef.current = null
              isAnimatingRef.current = false
            }, 1500)
          }
        }
      }, 300)
    }
  }

  const handleSaveReading = async () => {
    if (state.favoriteState !== "idle" || state.userRating === 0) {
      return
    }

    if (!canAddMore()) {
      setShowCollectionFullModal(true)
      return
    }

    updateState({ favoriteState: "saving" })

    try {
      const mood = state.userRating >= 4 ? "积极" : state.userRating >= 3 ? "温暖" : "中性"

      // 使用新的精炼摘要生成方法
      const conciseSummary = generateFavoriteSummary()

      const result = addFavorite({
        spreadType,
        date: new Date().toLocaleDateString("zh-CN"),
        mood,
        summary: conciseSummary, // 使用清理后的精炼摘要
        rating: state.userRating,
        cards: state.revealedCards.map((card, index) => ({
          name: card.name,
          meaning: getCardMeaning(card, card.isReversed),
          position: spreadLayout.positions[index].label,
        })),
      })

      if (result.success) {
        updateState({ favoriteState: "saved" })
        playMysticalSound()
      } else {
        updateState({ favoriteState: "error" })
        setTimeout(() => updateState({ favoriteState: "idle" }), 2000)
        if (result.message?.includes("收藏夹已满")) {
          setShowCollectionFullModal(true)
        }
      }
    } catch (error) {
      console.error("收藏失败:", error)
      updateState({ favoriteState: "error" })
      setTimeout(() => updateState({ favoriteState: "idle" }), 2000)
    }
  }

  // 分享功能暂时移除
  const handleShare = () => {
    // 仅提示占位，后续重写
    console.info("分享功能已暂时下线，仅保留入口图标")
  }

  const getCardSize = (size?: "small" | "normal" | "large") => {
    let baseSize
    switch (size) {
      case "small":
        baseSize = { width: 60, height: 90 }
        break
      case "large":
        baseSize = { width: 90, height: 135 }
        break
      default:
        baseSize = { width: 75, height: 112 }
        break
    }
    
    // 为凯尔特十字使用更小的卡牌尺寸
    if (spreadType === "凯尔特十字") {
      return {
        width: Math.round(baseSize.width * 0.8), // 缩小20%
        height: Math.round(baseSize.height * 0.8)
      }
    }
    
    return baseSize
  }

  const handlePresetQuestionClick = (question: string) => {
    updateState({
      selectedPresetQuestion: question,
      userQuestion: "",
    })
  }

  const handleUserQuestionChange = (question: string) => {
    updateState({
      userQuestion: question,
      selectedPresetQuestion: "",
    })
  }

  const handleCustomQuestionSubmit = () => {
    if (state.userQuestion.trim()) {
      updateState({ selectedPresetQuestion: "" })
    }
  }



  if (state.phase === "reading") {

    return (
      <>
        <div
          className="starry-background"
          style={{
            minHeight: "100vh",
            paddingBottom: "140px",
            overflowY: "auto",
          }}
        >
          <ReadingHeader
            onBack={onBack}
            onShare={handleShare}
            onReset={() => {
              resetReading()
              setActiveCardTab(0)
              setIsFromCache(false) // 重置缓存标志
              readingCacheManager.clearCache()
            }}
            canShare={!!(state.comprehensiveSummary && state.revealedCards.length > 0)}
            spreadType={spreadType}
            spreadLayout={spreadLayout}
            selectedPresetQuestion={state.selectedPresetQuestion}
            userQuestion={state.userQuestion}
          />

          {/* Card Readings - 优化后的Tab模式 */}
          <div style={{ padding: "0 20px", marginBottom: "30px" }}>
            {/* Tab导航 */}
            <div style={{ 
              display: "flex", 
              gap: "8px", 
              marginBottom: "16px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              {state.revealedCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCardTab(index)}
                  style={{
                    padding: "8px 16px",
                    backgroundColor: activeCardTab === index 
                      ? "rgba(255, 215, 0, 0.9)" 
                      : "rgba(54, 69, 79, 0.6)",
                    color: activeCardTab === index ? "#1A237E" : "#F5F5DC",
                    border: activeCardTab === index 
                      ? "1px solid rgba(255, 215, 0, 0.8)" 
                      : "1px solid rgba(255, 215, 0, 0.3)",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                    boxShadow: activeCardTab === index 
                      ? "0 2px 8px rgba(255, 215, 0, 0.4)" 
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCardTab !== index) {
                      e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.3)"
                      e.currentTarget.style.transform = "translateY(-1px)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCardTab !== index) {
                      e.currentTarget.style.backgroundColor = "rgba(54, 69, 79, 0.6)"
                      e.currentTarget.style.transform = "translateY(0)"
                    }
                  }}
                >
                  {spreadLayout.positions[index].label}
                </button>
              ))}
            </div>

            {/* 当前选中的卡牌内容 */}
            <div style={{ padding: 0 }}>
              {state.revealedCards.map((card, index) => {
                if (index !== activeCardTab) return null

                return (
                  <CollapsibleCardDetail
                    key={index}
                    card={card}
                    positionLabel={spreadLayout.positions[index].label}
                    positionDescription={spreadLayout.positions[index].description}
                    isReversed={card.isReversed}
                    adaptCardForImage={adaptCardForImage}
                  />
                )
              })}
            </div>
          </div>

          {/* Summary */}
          <div style={{ padding: "0 20px 20px" }}>
            {state.isLoadingReading ? (
              <div
                style={{
                  padding: "16px",
                  background: "rgba(54, 69, 79, 0.9)",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  backdropFilter: "blur(15px)",
                }}
              >
                <Loader2 size={18} style={{ animation: "spin 1s linear infinite", color: "#FFD700" }} />
                <span style={{ color: "#FFD700", fontSize: "15px" }}>正在思考...</span>
              </div>
            ) : (
              <FormattedReading content={state.comprehensiveSummary} cards={state.revealedCards} />
            )}
          </div>

          {/* AI Chat Section */}
          {!state.isLoadingReading && state.comprehensiveSummary && (
            <div style={{ padding: "0 20px 20px" }}>
              <AIChatSection cards={state.revealedCards} question={state.userQuestion || state.selectedPresetQuestion || "寻求人生指导"} />
            </div>
          )}

          <ReadingActions
            userRating={state.userRating}
            favoriteState={state.favoriteState}
            onRatingChange={(rating) => updateState({ userRating: rating })}
            onSaveReading={handleSaveReading}
          />
        </div>

        <CollectionFullModal isOpen={showCollectionFullModal} onClose={() => setShowCollectionFullModal(false)} />

        {/* 分享入口暂时只保留一个图标占位，不再弹出分享功能 */}
        <div style={{display:"none"}} />

        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </>
    )
  }

  return (
    <div
      className="starry-background"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "visible",
      }}
    >


      {/* Header */}
                <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 20px",
              paddingTop: "12px",
              position: "relative",
              zIndex: 10,
            }}
          >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            color: "#F5F5DC",
            fontSize: "15px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-3px)"
            e.currentTarget.style.color = "#FFD700"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)"
            e.currentTarget.style.color = "#F5F5DC"
          }}
        >
          <ArrowLeft size={18} />
          返回
        </button>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#F5F5DC",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: "6px",
              borderRadius: "50%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
              e.currentTarget.style.transform = "scale(1.1)"
              e.currentTarget.style.color = "#FFD700"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.color = "#F5F5DC"
            }}
          >
            <MoreHorizontal size={18} />
          </button>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#F5F5DC",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: "6px",
              borderRadius: "50%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
              e.currentTarget.style.transform = "scale(1.1)"
              e.currentTarget.style.color = "#FFD700"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.color = "#F5F5DC"
            }}
          >
            <Target size={18} />
          </button>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", padding: "10px 0 10px", position: "relative", zIndex: 10 }}>
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#FFD700",
            marginBottom: "6px",
            animation: "fadeInDown 0.8s ease-out",
          }}
        >
          {spreadType}
        </h1>
        <p
          style={{
            color: "#D4AF37",
            fontSize: "14px",
            animation: "fadeInUp 0.8s ease-out 0.2s both",
          }}
        >
          {spreadLayout.description}
        </p>
      </div>

      {/* Question Input Section */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <QuestionInputSection
          presetQuestions={presetQuestions}
          selectedPresetQuestion={state.selectedPresetQuestion}
          userQuestion={state.userQuestion}
          onPresetQuestionClick={handlePresetQuestionClick}
          onUserQuestionChange={handleUserQuestionChange}
          onCustomQuestionSubmit={handleCustomQuestionSubmit}
        />
      </div>

      <SpreadCanvas
        spreadLayout={spreadLayout}
        spreadType={spreadType}
        state={state}
        getCardSize={getCardSize}
        handleRedrawCard={handleRedrawCard}
      />

      <ReadingProgress
        selectedCards={state.selectedCards}
        totalCards={totalCards}
        phase={state.phase}
        isLoadingReading={state.isLoadingReading}
        onStartAIReading={() => {
                playCardFlipSound()
                playMysticalSound()
                startAIReading()
        }}
      />

      <CardDeckFan
        deckCards={state.deckCards}
        selectedCards={state.selectedCards}
        hoveredCard={state.hoveredCard}
        phase={state.phase}
        baseAngle={baseAngle}
        angleStep={angleStep}
        onCardClick={handleCardClick}
        onCardHover={(cardIndex) => updateState({ hoveredCard: cardIndex })}
      />

      <FlyingCardLayer flyingCards={state.flyingCards} />

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes flyToTarget {
          0% {
            transform: scale(1.1) rotate(0deg);
            left: var(--start-x);
            top: var(--start-y);
          }
          50% {
            transform: scale(1.2) rotate(180deg) translateY(-40px);
          }
          100% {
            transform: scale(1) rotate(360deg);
            left: var(--target-x);
            top: var(--target-y);
          }
        }
        @keyframes aiButtonAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(15px);
          }
          50% {
            transform: scale(1.05) translateY(-3px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }
        @keyframes glow {
          from {
            box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
          }
          to {
            box-shadow: 0 0 16px rgba(255, 215, 0, 0.6);
          }
        }
        
        /* 卡牌流动动效动画 */
        
        @keyframes flowingLight {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        
        @keyframes rippleEffect {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 140px;
            height: 140px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
