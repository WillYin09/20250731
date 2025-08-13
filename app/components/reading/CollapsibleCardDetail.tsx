"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import TarotCardImage from "../tarot-card-image"
import type { TarotCardWithOrientation, TarotCardData } from "../../data/tarot-cards"
import { getCardMeaning } from "../../data/tarot-cards"

interface CollapsibleCardDetailProps {
  card: TarotCardWithOrientation
  positionLabel: string
  positionDescription: string
  isReversed: boolean
  adaptCardForImage: (card: TarotCardWithOrientation) => any
}

export default function CollapsibleCardDetail({
  card,
  positionLabel,
  positionDescription,
  isReversed,
  adaptCardForImage,
}: CollapsibleCardDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const cardData = {
    ...card,
    image: card.image || "",
    translation: card.translation || card.name,
  }

  return (
    <div style={{ 
      backgroundColor: "rgba(54, 69, 79, 0.9)",
      borderRadius: "10px",
      border: "1px solid rgba(255, 215, 0, 0.2)",
      overflow: "hidden",
      transition: "all 0.3s ease"
    }}>
      {/* 可点击的头部区域 */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "12px 20px",
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          backgroundColor: isExpanded ? "rgba(255, 215, 0, 0.1)" : "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.15)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isExpanded ? "rgba(255, 215, 0, 0.1)" : "transparent"
        }}
      >
        {/* 卡牌图像 */}
        <TarotCardImage 
          card={adaptCardForImage(cardData)} 
          isRevealed={true} 
          width={50} 
          height={75} 
          className="shadow-md" 
        />
        
        {/* 基本信息 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "nowrap" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC", margin: 0, flexShrink: 0 }}>
              {cardData.translation} ({cardData.name})
            </h3>
            <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 5px",
                  backgroundColor: "rgba(255, 215, 0, 0.18)",
                  color: "#FFD700",
                  borderRadius: "9px",
                  border: "1px solid rgba(255, 215, 0, 0.28)",
                  whiteSpace: "nowrap",
                }}
              >
                {positionLabel}
              </span>
              {isReversed && (
                <span
                  style={{
                    fontSize: "10px",
                    padding: "2px 5px",
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    color: "#ef4444",
                    borderRadius: "9px",
                    border: "1px solid rgba(239, 68, 68, 0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  逆位
                </span>
              )}
            </div>
          </div>
          
          {/* 简化的关键词显示 */}
          <p style={{ 
            color: "#FFD700", 
            fontWeight: "500", 
            fontSize: "13px", 
            margin: "0 0 6px 0",
            wordBreak: "break-word",
            lineHeight: "1.3"
          }}>
            {getCardMeaning(cardData as TarotCardData, isReversed)}
          </p>
        </div>

        {/* 展开/折叠图标 */}
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          width: "24px",
          height: "24px",
          color: "#FFD700",
          transition: "transform 0.3s ease"
        }}>
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {/* 可折叠的详细内容 */}
      <div
        style={{
          maxHeight: isExpanded ? "500px" : "0",
          opacity: isExpanded ? 1 : 0,
          overflow: "hidden",
          transition: "all 0.3s ease",
          // 不在整卡范围画分隔线，避免越过图片列
        }}
      >
        <div style={{ padding: "10px 20px 16px 78px", borderTop: "1px solid rgba(255, 215, 0, 0.12)" }}>
          {/* 分组标题（弱化） */}
          <p style={{ color: "rgba(212, 175, 55, 0.85)", fontSize: "11px", margin: "0 0 8px 0", fontWeight: 500 }}>
            {positionDescription}
          </p>
          
          {/* 卡牌详细描述 */}
          <p style={{ color: "#F5F5DC", lineHeight: "1.5", margin: 0, fontSize: "14px" }}>
            {card.description}
          </p>
        </div>
      </div>
    </div>
  )
} 