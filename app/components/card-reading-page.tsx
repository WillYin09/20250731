"use client"

import React, { useEffect } from "react"
import { ArrowLeft, MoreHorizontal, Target, RotateCcw, Zap, Heart, Star, Loader2, Share2 } from "lucide-react"
import { useFavorites } from "../hooks/use-favorites"
import { useCardCollection } from "../hooks/use-card-collection"
import { useAudio } from "./audio-manager"
import { useCardReading, type FlyingCard } from "../hooks/use-card-reading"
import CollectionFullModal from "./collection-full-modal"
import AIChatSection from "./ai-chat-section"
import ShareModal from "./share-modal"
import TarotCardImage from "./tarot-card-image"
import FormattedReading from "./formatted-reading"
import QuestionInputSection from "./question-input-section"
import { getPresetQuestions } from "../utils/text-processing"
import { getCardMeaning, type TarotCardWithOrientation, type TarotCardData } from "../data/tarot-cards"

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
  const [showShareModal, setShowShareModal] = React.useState(false)
  const [activeCardTab, setActiveCardTab] = React.useState(0) // 新增：当前选中的卡牌Tab

  const presetQuestions = getPresetQuestions(spreadType)
  const totalCards = spreadLayout.positions.length
  const baseAngle = -60
  const angleStep = 120 / (state.deckCards.length - 1)

  useEffect(() => {
    if (state.phase === "reading" && state.revealedCards.length > 0) {
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
    }
  }, [state.phase, state.revealedCards.length])

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

  const handleShare = () => {
    if (state.comprehensiveSummary && state.revealedCards.length > 0) {
      setShowShareModal(true)
    }
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

  const getFavoriteButtonProps = () => {
    switch (state.favoriteState) {
      case "saving":
        return {
          backgroundColor: "#6b7280",
          text: "保存中...",
          icon: <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />,
          disabled: true,
        }
      case "saved":
        return {
          backgroundColor: "#10b981",
          text: "已收藏",
          icon: <Heart size={18} style={{ fill: "white" }} />,
          disabled: true,
        }
      case "error":
        return {
          backgroundColor: "#ef4444",
          text: "保存失败",
          icon: <Heart size={18} />,
          disabled: true,
        }
      default:
        return {
          backgroundColor: state.userRating > 0 ? "#FFD700" : "#6b7280",
          text: "收藏这次指引",
          icon: <Heart size={18} />,
          disabled: state.userRating === 0,
        }
    }
  }

  if (state.phase === "reading") {
    const buttonProps = getFavoriteButtonProps()

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
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 20px",
              paddingTop: "12px",
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
                zIndex: 1000,
                position: "relative",
                padding: "8px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                e.currentTarget.style.color = "#FFD700"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#F5F5DC"
              }}
            >
              <ArrowLeft size={18} />
              返回
            </button>
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                onClick={handleShare}
                disabled={!(state.comprehensiveSummary && state.revealedCards.length > 0)}
                style={{
                  background: "none",
                  border: "none",
                  color: state.comprehensiveSummary && state.revealedCards.length > 0 ? "#F5F5DC" : "#888888",
                  cursor: state.comprehensiveSummary && state.revealedCards.length > 0 ? "pointer" : "not-allowed",
                  padding: "6px",
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                  position: "relative"
                }}
                title={state.comprehensiveSummary && state.revealedCards.length > 0 ? "分享指引结果" : "请先完成AI解读后再分享"}
                onMouseEnter={(e) => {
                  if (state.comprehensiveSummary && state.revealedCards.length > 0) {
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                    e.currentTarget.style.color = "#FFD700"
                  }
                }}
                onMouseLeave={(e) => {
                  if (state.comprehensiveSummary && state.revealedCards.length > 0) {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.color = "#F5F5DC"
                  }
                }}
              >
                <Share2 size={18} />
              </button>
              <button
                onClick={resetReading}
                style={{ background: "none", border: "none", color: "#F5F5DC", cursor: "pointer" }}
              >
                <RotateCcw size={18} />
              </button>
              <button style={{ background: "none", border: "none", color: "#F5F5DC", cursor: "pointer" }}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Title */}
          <div style={{ textAlign: "center", padding: "10px 0 15px" }}>
            <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#FFD700", marginBottom: "6px" }}>
              {spreadType}解读
            </h1>
            {spreadLayout.description && (
              <p style={{ color: "#D4AF37", fontSize: "13px" }}>{spreadLayout.description}</p>
            )}
            {(state.selectedPresetQuestion || state.userQuestion) && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "6px 14px",
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                  borderRadius: "18px",
                  display: "inline-block",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                }}
              >
                <p style={{ color: "#FFD700", fontSize: "13px", margin: 0, fontWeight: "500" }}>
                  问题：{state.selectedPresetQuestion || state.userQuestion}
                </p>
              </div>
            )}
          </div>

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
            <div
              style={{
                padding: "16px",
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              {state.revealedCards.map((card, index) => {
                if (index !== activeCardTab) return null
                
                const cardData = {
                  ...card,
                  image: card.image || "",
                  translation: card.translation || card.name,
                }

                return (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <TarotCardImage card={adaptCardForImage(cardData)} isRevealed={true} width={50} height={75} className="shadow-md" />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC", margin: 0 }}>
                          {cardData.translation} ({cardData.name})
                        </h3>
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "2px 6px",
                            backgroundColor: "rgba(255, 215, 0, 0.2)",
                            color: "#FFD700",
                            borderRadius: "10px",
                            border: "1px solid rgba(255, 215, 0, 0.3)",
                          }}
                        >
                          {spreadLayout.positions[index].label}
                        </span>
                        {cardData.isReversed && (
                          <span
                            style={{
                              fontSize: "11px",
                              padding: "2px 6px",
                              backgroundColor: "rgba(239, 68, 68, 0.2)",
                              color: "#ef4444",
                              borderRadius: "10px",
                              border: "1px solid rgba(239, 68, 68, 0.3)",
                            }}
                          >
                            逆位
                          </span>
                        )}
                      </div>
                      <p style={{ color: "#FFD700", fontWeight: "500", fontSize: "13px", margin: "0 0 3px 0" }}>
                        {getCardMeaning(cardData as TarotCardData, cardData.isReversed)}
                      </p>
                      <p style={{ color: "#D4AF37", fontSize: "11px", margin: 0 }}>
                        {spreadLayout.positions[index].description}
                      </p>
                    </div>
                  </div>
                )
              })}
              
              {/* 卡牌描述 */}
              <p style={{ color: "#F5F5DC", lineHeight: "1.5", margin: 0, fontSize: "14px" }}>
                {state.revealedCards[activeCardTab]?.description}
              </p>
            </div>
          </div>

          {/* Summary */}
          <div style={{ padding: "0 20px 30px" }}>
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
            <div style={{ padding: "0 20px 30px" }}>
              <AIChatSection cards={state.revealedCards} question={state.userQuestion || state.selectedPresetQuestion || "寻求人生指导"} />
            </div>
          )}

          {/* Rating and Save Section */}
          <div style={{ padding: "0 20px 30px" }}>
            <div
              style={{
                padding: "16px",
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#F5F5DC", marginBottom: "12px" }}>
                为这次指引评分
              </h3>

              {/* Star Rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => updateState({ userRating: star })}
                    disabled={state.favoriteState === "saved"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: state.favoriteState === "saved" ? "not-allowed" : "pointer",
                      padding: "3px",
                      opacity: state.favoriteState === "saved" ? 0.6 : 1,
                    }}
                  >
                    <Star
                      size={22}
                      style={{
                        color: star <= state.userRating ? "#FFD700" : "#6b7280",
                        fill: star <= state.userRating ? "#FFD700" : "none",
                      }}
                    />
                  </button>
                ))}
                <span style={{ marginLeft: "6px", color: "#D4AF37", fontSize: "13px" }}>
                  {state.userRating > 0 ? `${state.userRating} 星` : "点击评分"}
                </span>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSaveReading}
                disabled={buttonProps.disabled}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "100%",
                  padding: "10px 16px",
                  backgroundColor: buttonProps.backgroundColor,
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: buttonProps.disabled ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  justifyContent: "center",
                }}
              >
                {buttonProps.icon}
                {buttonProps.text}
              </button>
            </div>
          </div>
        </div>

        <CollectionFullModal isOpen={showCollectionFullModal} onClose={() => setShowCollectionFullModal(false)} />

        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          reading={{
            spreadType,
            cards: state.revealedCards.map((card, index) => ({
              card,
              position: spreadLayout.positions[index].label,
              meaning: getCardMeaning(card, card.isReversed),
              reversed: card.isReversed,
            })),
            summary: state.comprehensiveSummary,
            date: new Date().toLocaleDateString("zh-CN"),
          }}
        />

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

      {/* Card Positions */}
      <div style={{ padding: "0 30px 4px", position: "relative", zIndex: 15 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${Math.max(350, 450 / spreadLayout.containerAspectRatio)}px`,
            maxWidth: spreadType === "凯尔特十字" ? "450px" : "550px",
            margin: "0 auto",
            marginBottom: "12px",
          }}
        >
          {spreadLayout.positions.map((position, index) => {
            const cardSize = getCardSize(position.size)
            const isOverlappingCard = spreadType === "凯尔特十字" && position.id === 2
            const overlayOffset = isOverlappingCard ? { x: 15, y: 10 } : { x: 0, y: 0 }

            return (
              <div
                key={position.id}
                style={{
                  position: "absolute",
                  left: `calc(${position.x + overlayOffset.x}% - ${cardSize.width / 2}px)`,
                  top: `calc(${position.y + overlayOffset.y}% - ${cardSize.height / 2}px)`,
                  textAlign: "center",
                  animation: `slideInFromTop 0.6s ease-out ${index * 0.1}s both`,
                  zIndex: isOverlappingCard ? 20 : 15,
                }}
              >
                <div
                  data-position={position.id}
                  style={{
                    width: `${cardSize.width + 4}px`,
                    height: `${cardSize.height + 4}px`,
                    borderRadius: "10px",
                    border: state.placedCards.has(position.id)
                      ? "2px solid #FFD700"
                      : "2px dashed rgba(255, 215, 0, 0.4)",
                    backgroundColor: state.placedCards.has(position.id)
                      ? "rgba(255, 215, 0, 0.2)"
                      : "rgba(54, 69, 79, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "6px",
                    padding: "2px",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                    boxShadow: state.placedCards.has(position.id) ? "0 0 15px rgba(255, 215, 0, 0.4)" : "none",
                    position: "relative",
                    transform: isOverlappingCard ? "rotate(90deg)" : "none",
                  }}
                  className={state.placedCards.has(position.id) ? "spread-position-filled" : "spread-position-empty"}
                >
                  {!state.placedCards.has(position.id) && state.phase === "selecting" && (
                    <span
                      style={{
                        fontSize: position.size === "large" ? "24px" : position.size === "small" ? "16px" : "20px",
                        fontWeight: "300",
                        color: "#D4AF37",
                      }}
                    >
                      {position.id}
                    </span>
                  )}

                  {state.placedCards.has(position.id) && state.phase === "selecting" && (
                    <TarotCardImage
                      width={cardSize.width}
                      height={cardSize.height}
                      className="shadow-md"
                      style={{ transform: isOverlappingCard ? "rotate(-90deg)" : "none" }}
                    />
                  )}

                  {state.phase === "revealing" && state.currentRevealIndex > index && (
                    <TarotCardImage
                      card={state.revealedCards[index]}
                      isRevealed={true}
                      width={cardSize.width}
                      height={cardSize.height}
                      className="shadow-md"
                      style={{ transform: isOverlappingCard ? "rotate(-90deg)" : "none" }}
                    />
                  )}
                </div>
                <div
                  style={{
                    position: "relative",
                    zIndex: 25,
                    backgroundColor: "rgba(26, 35, 126, 0.8)",
                    borderRadius: "6px",
                    padding: "3px 6px",
                    marginTop: "4px",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    minHeight: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#F5F5DC",
                      fontSize: spreadType === "凯尔特十字" ? "10px" : "11px",
                      fontWeight: "500",
                      marginBottom: "2px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                      lineHeight: "1.2",
                      textAlign: "center",
                    }}
                  >
                    {position.label}
                  </p>
                  {state.placedCards.has(position.id) && state.phase === "selecting" && (
                    <button
                      onClick={() => handleRedrawCard(position.id)}
                      style={{
                        marginTop: "1px",
                        padding: "2px 5px",
                        backgroundColor: "rgba(255, 215, 0, 0.9)",
                        color: "#1A237E",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "8px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.3)",
                        lineHeight: "1",
                      }}
                      className="micro-interaction"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)"
                        e.currentTarget.style.backgroundColor = "#FFD700"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)"
                        e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.9)"
                      }}
                    >
                      重抽
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Selection Progress */}
        <div style={{ textAlign: "center", marginBottom: "4px", position: "relative", zIndex: 20 }}>
          <p style={{ color: "#FFD700", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
            已选择 {state.selectedCards.length}/{totalCards} 张牌
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
            {Array.from({ length: totalCards }, (_, index) => (
              <div
                key={index}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: state.selectedCards.length > index ? "#FFD700" : "rgba(212, 175, 55, 0.3)",
                  transition: "all 0.3s ease",
                  animation: state.selectedCards.length > index ? "pulse 1s ease-in-out infinite" : "none",
                }}
              />
            ))}
          </div>
        </div>

        {/* AI Reading Button */}
        <div style={{ textAlign: "center", marginBottom: "4px", position: "relative", zIndex: 20 }}>
          {state.selectedCards.length === totalCards ? (
            <button
              onClick={() => {
                playCardFlipSound()
                playMysticalSound()
                startAIReading()
              }}
              disabled={state.isLoadingReading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                backgroundColor: "rgba(255, 215, 0, 0.9)",
                color: "#1A237E",
                border: "none",
                borderRadius: "20px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                boxShadow: "0 3px 12px rgba(255, 215, 0, 0.4)",
                transition: "all 0.3s ease",
                animation: "aiButtonAppear 0.6s ease-out",
              }}
              className="micro-interaction sound-feedback"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(255, 215, 0, 0.6)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
                e.currentTarget.style.boxShadow = "0 3px 12px rgba(255, 215, 0, 0.4)"
              }}
            >
              <Zap size={16} />
              点击查看牌阵解读
            </button>
          ) : (
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                backgroundColor: "rgba(255, 215, 0, 0.2)",
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
                animation: "glow 2s ease-in-out infinite alternate",
                border: "1px solid rgba(255, 215, 0, 0.3)",
              }}
            >
              <p style={{ color: "#FFD700", fontSize: "13px", fontWeight: "500", margin: 0 }}>抽张塔罗吧</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div style={{ textAlign: "center", marginBottom: "6px", position: "relative", zIndex: 5 }}>
          <p style={{ color: "#D4AF37", fontSize: "12px" }}>
            {state.selectedCards.length === totalCards
              ? ""
              : state.phase === "selecting"
                ? "左右滑动并根据你的直觉选择，单击即可选中"
                : "正在为您揭示命运的奥秘..."}
          </p>
        </div>
      </div>

      {/* Card Deck */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "200px",
          background: "linear-gradient(to top, rgba(26, 35, 126, 0.95) 0%, transparent 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "30px",
          marginTop: "12px",
          zIndex: 15,
          pointerEvents: "none",
        }}
        className="enhanced-starry-background"
      >
        <div style={{ position: "relative", width: "90vw", maxWidth: "700px", height: "160px", pointerEvents: "auto" }}>
          {state.deckCards.map((cardIndex, index) => {
            const totalCards = state.deckCards.length
            const angle = baseAngle + index * angleStep
            const radius = Math.min(window.innerWidth * 0.32, 160)
            const x = Math.sin((angle * Math.PI) / 180) * radius
            const y = Math.cos((angle * Math.PI) / 180) * 35

            const isSelected = state.selectedCards.includes(cardIndex)
            const isHovered = state.hoveredCard === cardIndex

            return (
              <div
                key={cardIndex}
                data-card-index={cardIndex}
                onClick={() => handleCardClick(cardIndex)}
                onMouseEnter={() => updateState({ hoveredCard: cardIndex })}
                onMouseLeave={() => updateState({ hoveredCard: null })}
                style={{
                  position: "absolute",
                  cursor: state.phase === "selecting" ? "pointer" : "default",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  left: `calc(50% + ${x}px - 35px)`,
                  bottom: `${25 + y}px`,
                  transform: `rotate(${angle}deg) ${isHovered ? "scale(1.08) translateY(-8px)" : ""}`,
                  zIndex: isHovered ? 30 : 20,
                  opacity: isSelected ? 0.3 : 0.9,
                  pointerEvents: state.phase === "selecting" && !isSelected ? "auto" : "none",
                  filter: isHovered ? "brightness(1.1) drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))" : "none",
                  overflow: "hidden",
                }}
                className="tarot-card-hover"
              >
                {/* 流动光线效果 */}
                {isHovered && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: -100,
                      width: 100,
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)",
                      animation: "flowingLight 0.8s ease-out forwards",
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  />
                )}
                {/* 水波纹效果 */}
                {isHovered && (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 0,
                      height: 0,
                      background: "radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%)",
                      borderRadius: "50%",
                      transform: "translate(-50%, -50%)",
                      animation: "rippleEffect 0.6s ease-out forwards",
                      zIndex: 1,
                      pointerEvents: "none",
                    }}
                  />
                )}
                <TarotCardImage 
                  width={70} 
                  height={105} 
                  className={`shadow-lg glow-effect`} 
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Flying Cards Animation */}
      {state.flyingCards.map((flyingCard) => (
        <div
          key={flyingCard.id}
          style={{
            position: "fixed",
            zIndex: 1000,
            pointerEvents: "none",
            animation: `flyToTarget 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            "--start-x": `${flyingCard.startX - 35}px`,
            "--start-y": `${flyingCard.startY - 52}px`,
            "--target-x": `${flyingCard.targetX - 35}px`,
            "--target-y": `${flyingCard.targetY - 52}px`,
          } as React.CSSProperties}
        >
          <TarotCardImage 
            width={70} 
            height={105} 
            className="shadow-lg glow-effect" 
          />
        </div>
      ))}

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
