"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, Search, Filter, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import TarotCardImage from "./tarot-card-image"
import CardDetailModal from "./card-detail-modal"
import { TAROT_CARDS } from "../data/tarot-cards"
import { useCardCollection } from "../hooks/use-card-collection"

interface CardMeaningPageProps {
  onBack: () => void
}

export default function CardMeaningPage({ onBack }: CardMeaningPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCard, setSelectedCard] = useState<{ card: any; stats: any } | null>(null)
  const { isCardUnlocked, getCardStats } = useCardCollection()

  const categories = [
    { id: "all", name: "全部", count: TAROT_CARDS.length },
    { id: "major", name: "大阿卡纳", count: 22 },
    { id: "wands", name: "权杖", count: 14 },
    { id: "cups", name: "圣杯", count: 14 },
    { id: "swords", name: "宝剑", count: 14 },
    { id: "pentacles", name: "星币", count: 14 },
  ]

  const filteredCards = useMemo(() => {
    let cards = TAROT_CARDS

    // 分类筛选
    if (selectedCategory !== "all") {
      if (selectedCategory === "major") {
        cards = cards.filter(
          (card) =>
            !card.name.includes("of") &&
            !card.name.includes("Page") &&
            !card.name.includes("Knight") &&
            !card.name.includes("Queen") &&
            !card.name.includes("King"),
        )
      } else if (selectedCategory === "wands") {
        cards = cards.filter((card) => card.name.includes("Wands"))
      } else if (selectedCategory === "cups") {
        cards = cards.filter((card) => card.name.includes("Cups"))
      } else if (selectedCategory === "swords") {
        cards = cards.filter((card) => card.name.includes("Swords"))
      } else if (selectedCategory === "pentacles") {
        cards = cards.filter((card) => card.name.includes("Pentacles"))
      }
    }

    // 搜索筛选
    if (searchTerm) {
      cards = cards.filter(
        (card) =>
          card.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.normal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.reversed.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return cards
  }, [selectedCategory, searchTerm])

  const handleCardClick = (card: any) => {
    if (isCardUnlocked(card.name)) {
      const stats = getCardStats(card.name)
      setSelectedCard({ card, stats })
    }
  }

  return (
    <div className="starry-background min-h-screen">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          paddingTop: "50px",
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
            padding: "8px",
            borderRadius: "6px",
            zIndex: 20,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-3px)"
            e.currentTarget.style.color = "#FFD700"
            e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)"
            e.currentTarget.style.color = "#F5F5DC"
            e.currentTarget.style.backgroundColor = "transparent"
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          <ArrowLeft size={18} />
          返回
        </button>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", padding: "15px 0 25px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#FFD700", marginBottom: "6px" }}>牌意解读</h1>
        <p style={{ color: "#D4AF37", fontSize: "14px" }}>探索每张卡牌的深层含义</p>
      </div>

      {/* Search Bar */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ position: "relative" }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: "#D4AF37" }} />
          <input
            type="text"
            placeholder="搜索卡牌名称或关键词..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              paddingLeft: "40px",
              paddingRight: "16px",
              paddingTop: "12px",
              paddingBottom: "12px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              backgroundColor: "rgba(54, 69, 79, 0.9)",
              backdropFilter: "blur(15px)",
              color: "#F5F5DC",
              fontSize: "14px",
              outline: "none",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.5)"
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255, 215, 0, 0.1)"
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.2)"
              e.currentTarget.style.boxShadow = "none"
            }}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Filter className="w-4 h-4" style={{ color: "#FFD700" }} />
          <span style={{ fontSize: "14px", fontWeight: "500", color: "#F5F5DC" }}>分类筛选</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                backgroundColor: selectedCategory === category.id ? "#FFD700" : "rgba(54, 69, 79, 0.7)",
                color: selectedCategory === category.id ? "#000" : "#F5F5DC",
                fontSize: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                fontWeight: selectedCategory === category.id ? "600" : "400",
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = "rgba(54, 69, 79, 0.7)"
                }
              }}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div style={{ padding: "0 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {filteredCards.map((card) => {
            const isUnlocked = isCardUnlocked(card.name)
            const stats = getCardStats(card.name)

            return (
              <Card
                key={card.name}
                className={`border-0 shadow-md transition-all duration-300 ${
                  isUnlocked ? "cursor-pointer hover:shadow-lg" : "opacity-60"
                }`}
                style={{
                  backgroundColor: "rgba(54, 69, 79, 0.9)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  backdropFilter: "blur(15px)",
                }}
                onClick={() => handleCardClick(card)}
              >
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      {isUnlocked ? (
                        <TarotCardImage card={card} isRevealed={true} width={60} height={90} className="shadow-sm" />
                      ) : (
                        <div
                          style={{
                            width: "60px",
                            height: "90px",
                            backgroundColor: "#6b7280",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          <Sparkles className="w-6 h-6 text-gray-400" />
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              borderRadius: "6px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span style={{ color: "white", fontSize: "10px" }}>未解锁</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#F5F5DC", marginBottom: "4px" }}>
                        {isUnlocked ? card.translation : "???"}
                      </h3>
                      <p style={{ fontSize: "12px", color: "#D4AF37", marginBottom: "8px" }}>
                        {isUnlocked ? card.name : "完成指引解锁"}
                      </p>
                      {isUnlocked && stats && (
                        <div style={{ fontSize: "10px", fontWeight: "500", color: "#FFD700" }}>
                          抽取 {stats.totalDraws} 次
                        </div>
                      )}
                    </div>
                  </div>

                  {isUnlocked && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div>
                        <span style={{ fontSize: "10px", fontWeight: "500", color: "#10b981" }}>正位：</span>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#F5F5DC",
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {card.normal}
                        </p>
                      </div>
                      <div>
                        <span style={{ fontSize: "10px", fontWeight: "500", color: "#ef4444" }}>逆位：</span>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "#F5F5DC",
                            lineHeight: "1.4",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {card.reversed}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredCards.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                margin: "0 auto 16px",
                borderRadius: "50%",
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search className="w-8 h-8" style={{ color: "#D4AF37" }} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#F5F5DC", marginBottom: "8px" }}>
              未找到相关卡牌
            </h3>
            <p style={{ fontSize: "14px", color: "#D4AF37" }}>尝试调整搜索关键词或筛选条件</p>
          </div>
        )}
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
    </div>
  )
}
