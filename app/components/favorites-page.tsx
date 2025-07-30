"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Star,
  Trash2,
  BookOpen,
  Sparkles,
  Calendar,
  Eye,
  Lock,
  TrendingUp,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { useFavorites } from "../hooks/use-favorites"
import { useCardCollection } from "../hooks/use-card-collection"
import { TAROT_CARDS } from "../data/tarot-cards"
import CardDetailModal from "./card-detail-modal"
import SavedReadingDetailModal from "./saved-reading-detail-modal"
import TarotCardImage from "./tarot-card-image"
import type { SavedReading } from "../hooks/use-favorites"

export default function FavoritesPage() {
  const { getRecentFavorites, getAllFavorites, removeFavorite } = useFavorites()
  const { getCollectionProgress, isCardUnlocked, getCardStats } = useCardCollection()
  const [selectedCard, setSelectedCard] = useState<{ card: any; stats: any } | null>(null)
  const [selectedReading, setSelectedReading] = useState<SavedReading | null>(null)
  const [showReadingDetail, setShowReadingDetail] = useState(false)
  const [showAllReadings, setShowAllReadings] = useState(false)
  const [showAllCards, setShowAllCards] = useState(false)

  const recentReadings = getRecentFavorites(3)
  const allReadings = getAllFavorites()
  const collectionProgress = getCollectionProgress()

  const displayedReadings = showAllReadings ? allReadings : recentReadings
  const displayedCards = showAllCards ? TAROT_CARDS : TAROT_CARDS.slice(0, 12)

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "积极":
        return "bg-green-100 text-green-700 border-green-200"
      case "温暖":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "深刻":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "挑战":
        return "bg-orange-100 text-orange-700 border-orange-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleCardClick = (card: any) => {
    if (isCardUnlocked(card.name)) {
      const stats = getCardStats(card.name)
      setSelectedCard({ card, stats })
    }
  }

  const handleViewReadingDetail = (reading: SavedReading) => {
    console.log("Viewing reading detail:", reading)
    setSelectedReading(reading)
    setShowReadingDetail(true)
  }

  const handleCloseReadingDetail = () => {
    setShowReadingDetail(false)
    setSelectedReading(null)
  }

  const toggleShowAllReadings = () => {
    setShowAllReadings(!showAllReadings)
  }

  const toggleShowAllCards = () => {
    setShowAllCards(!showAllCards)
  }

  return (
    <div className="space-y-6 pb-8 starry-background min-h-screen">
      {/* Header - 移动端优化 */}
      <div className="text-center space-y-2 pt-4 px-4">
        <h1 className="serif-font text-xl font-bold" style={{ color: "#FFD700" }}>
          我的收藏
        </h1>
        <p style={{ color: "#D4AF37", fontSize: "14px" }}>珍藏的指引记录与心爱的卡牌</p>
      </div>

      {/* Collection Progress - 移动端优化 */}
      <div className="mx-4">
        <Card
          className="border-0 shadow-md"
          style={{
            backgroundColor: "rgba(54, 69, 79, 0.9)",
            border: "1px solid rgba(255, 215, 0, 0.2)",
            backdropFilter: "blur(15px)",
          }}
        >
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: "#FFD700" }} />
              <h2 className="serif-font text-base font-semibold" style={{ color: "#F5F5DC" }}>
                收集进度
              </h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "#D4AF37" }}>
                  已解锁卡牌
                </span>
                <span className="text-lg font-bold" style={{ color: "#FFD700" }}>
                  {collectionProgress.unlocked}/{collectionProgress.total}
                </span>
              </div>

              <div
                className="w-full bg-gray-200 rounded-full h-2"
                style={{ backgroundColor: "rgba(107, 114, 128, 0.3)" }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${collectionProgress.percentage}%`,
                    background: "linear-gradient(to right, #FFD700, #B8860B)",
                  }}
                />
              </div>

              <div className="text-center">
                <span className="text-xl font-bold" style={{ color: "#FFD700" }}>
                  {collectionProgress.percentage}%
                </span>
                <span className="text-sm ml-2" style={{ color: "#D4AF37" }}>
                  完成度
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Favorite Readings - 移动端优化 */}
      <div className="space-y-3 mx-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4" style={{ color: "#FFD700" }} />
                      <h2 className="serif-font text-base font-semibold" style={{ color: "#F5F5DC" }}>
              收藏的指引
            </h2>
          {allReadings.length > 0 && (
            <span className="text-sm" style={{ color: "#D4AF37" }}>
              ({allReadings.length} 条记录)
            </span>
          )}
        </div>

        {allReadings.length === 0 ? (
          <Card
            className="border-0 shadow-md"
            style={{
              backgroundColor: "rgba(54, 69, 79, 0.9)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div className="p-6 text-center space-y-3">
              <div
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: "rgba(107, 114, 128, 0.3)" }}
              >
                <Heart className="w-6 h-6" style={{ color: "#6b7280" }} />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm" style={{ color: "#F5F5DC" }}>
                  还没有收藏的指引
                </h3>
                <p className="text-xs" style={{ color: "#D4AF37" }}>
                  完成指引后，给结果评分并收藏，就能在这里查看历史记录了
                </p>
              </div>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {displayedReadings.map((reading) => (
              <Card
                key={reading.id}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
                style={{
                  backgroundColor: "rgba(54, 69, 79, 0.9)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  backdropFilter: "blur(15px)",
                }}
              >
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="serif-font font-semibold text-sm" style={{ color: "#F5F5DC" }}>
                          {reading.spreadType}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border`}
                          style={{
                            backgroundColor: "rgba(255, 215, 0, 0.1)",
                            color: "#FFD700",
                            borderColor: "rgba(255, 215, 0, 0.3)",
                          }}
                        >
                          {reading.mood}
                        </span>
                        <div className="flex items-center gap-1 text-xs" style={{ color: "#D4AF37" }}>
                          <Calendar className="w-3 h-3" />
                          {reading.date}
                        </div>
                      </div>

                      {/* Cards Summary - 移动端优化 */}
                      <div className="flex items-center gap-2 text-xs" style={{ color: "#D4AF37" }}>
                        <Sparkles className="w-3 h-3 flex-shrink-0" />
                        <div className="truncate">
                          {reading.cards.map((card, index) => (
                            <span key={index}>
                              {card.name}({card.position}){index < reading.cards.length - 1 && " • "}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < reading.rating ? "fill-current" : ""}`}
                            style={{ color: i < reading.rating ? "#FFD700" : "#6b7280" }}
                          />
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-red-500/20"
                        style={{ color: "#D4AF37" }}
                        onClick={() => removeFavorite(reading.id)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#ef4444"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#D4AF37"
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#D4AF37" }}>
                    {reading.summary.length > 80 ? `${reading.summary.substring(0, 80)}...` : reading.summary}
                  </p>

                  {/* Action Button */}
                  <div className="pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto font-medium text-xs hover:bg-transparent"
                      style={{ color: "#FFD700" }}
                      onClick={() => handleViewReadingDetail(reading)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#B8860B"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#FFD700"
                      }}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      查看详情
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Toggle Button for Readings */}
        {allReadings.length > 3 && (
          <div className="text-center pt-3">
            <Button
              variant="outline"
              className="text-sm bg-transparent hover:bg-transparent"
              style={{
                color: "#FFD700",
                borderColor: "rgba(255, 215, 0, 0.3)",
                backgroundColor: "rgba(255, 215, 0, 0.1)",
                backdropFilter: "blur(10px)",
              }}
              onClick={toggleShowAllReadings}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.5)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)"
              }}
            >
              <div className="flex items-center gap-2">
                {showAllReadings ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    收起收藏
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    查看全部收藏 ({allReadings.length})
                  </>
                )}
              </div>
            </Button>
          </div>
        )}
      </div>

      {/* Tarot Card Collection - 移动端优化 */}
      <div className="space-y-3 mx-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" style={{ color: "#B8860B" }} />
          <h2 className="serif-font text-base font-semibold" style={{ color: "#F5F5DC" }}>
            卡牌图鉴
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {displayedCards.map((card) => {
            const isUnlocked = isCardUnlocked(card.name)
            const stats = getCardStats(card.name)

            return (
              <Card
                key={card.name}
                className={`border-0 shadow-md transition-all duration-300 cursor-pointer ${
                  isUnlocked ? "hover:shadow-lg glow-effect" : "opacity-60"
                }`}
                style={{
                  backgroundColor: "rgba(54, 69, 79, 0.9)",
                  border: isUnlocked ? "1px solid rgba(255, 215, 0, 0.2)" : "1px solid rgba(107, 114, 128, 0.3)",
                  backdropFilter: "blur(15px)",
                }}
                onClick={() => handleCardClick(card)}
              >
                <div className="p-2 text-center space-y-1 relative">
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center z-10">
                      <Lock className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className="w-10 h-15 mx-auto relative">
                    {isUnlocked ? (
                      <TarotCardImage card={card} isRevealed={true} width={40} height={60} className="shadow-sm" />
                    ) : (
                      <div
                        className="w-full h-full rounded-md flex items-center justify-center"
                        style={{ backgroundColor: "rgba(107, 114, 128, 0.3)" }}
                      >
                        <Sparkles className="w-3 h-3" style={{ color: "#6b7280" }} />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="serif-font font-semibold text-xs truncate" style={{ color: "#F5F5DC" }}>
                      {isUnlocked ? card.translation : "???"}
                    </h3>
                    {isUnlocked && stats && (
                      <p className="text-xs font-medium" style={{ color: "#FFD700" }}>
                        抽取 {stats.totalDraws} 次
                      </p>
                    )}
                    {!isUnlocked && (
                      <p className="text-xs" style={{ color: "#6b7280" }}>
                        未解锁
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Toggle Button for Cards */}
        <div className="text-center pt-3">
          <Button
            variant="outline"
            className="text-sm bg-transparent hover:bg-transparent"
            style={{
              color: "#B8860B",
              borderColor: "rgba(184, 134, 11, 0.3)",
              backgroundColor: "rgba(184, 134, 11, 0.1)",
              backdropFilter: "blur(10px)",
            }}
            onClick={toggleShowAllCards}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(184, 134, 11, 0.2)"
              e.currentTarget.style.borderColor = "rgba(184, 134, 11, 0.5)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(184, 134, 11, 0.1)"
              e.currentTarget.style.borderColor = "rgba(184, 134, 11, 0.3)"
            }}
          >
            <div className="flex items-center gap-2">
              {showAllCards ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  收起图鉴
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  查看完整图鉴 ({TAROT_CARDS.length} 张)
                </>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <CardDetailModal
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          card={selectedCard.card}
          cardStats={selectedCard.stats}
        />
      )}

      {/* Saved Reading Detail Modal */}
      <SavedReadingDetailModal
        isOpen={showReadingDetail}
        onClose={handleCloseReadingDetail}
        reading={selectedReading}
      />
    </div>
  )
}
