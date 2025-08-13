"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, Star, Sparkles, MessageCircle, Heart } from "lucide-react"
import TarotCardImage from "./tarot-card-image"
import AIChatSection from "./ai-chat-section"
import type { SavedReading } from "../hooks/use-favorites"
import { TAROT_CARDS } from "../data/tarot-cards"

interface SavedReadingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  reading: SavedReading | null
}

export default function SavedReadingDetailModal({ isOpen, onClose, reading }: SavedReadingDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "cards" | "chat">("summary")

  if (!isOpen || !reading) return null

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "积极":
        return { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" }
      case "温暖":
        return { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" }
      case "深刻":
        return { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" }
      case "挑战":
        return { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" }
    }
  }

  const moodColors = getMoodColor(reading.mood)

  // 获取卡牌完整信息
  const getCardDetails = (cardName: string) => {
    return TAROT_CARDS.find((card) => card.name === cardName || card.translation === cardName)
  }

  // 格式化AI解读内容
  const formatSummary = (text: string) => {
    if (!text) return []

    // 如果文本已经被清理过（没有markdown标记），直接按段落分割
    const hasMarkdown = text.includes("###") || text.includes("**") || text.includes("##")

    if (!hasMarkdown) {
      // 对于已清理的文本，简单按段落分割
      const paragraphs = text.split("\n\n").filter((p) => p.trim().length > 0)
      return paragraphs.map((paragraph, index) => (
        <p
          key={index}
          style={{
            color: "#333",
            lineHeight: "1.6",
            marginBottom: "12px",
            fontSize: "14px",
          }}
        >
          {paragraph.trim()}
        </p>
      ))
    }

    // 原有的markdown处理逻辑保持不变
    const lines = text.split("\n").filter((line) => line.trim())
    const elements: React.ReactNode[] = []

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      // 处理主要部分标题
      if (trimmedLine.match(/^##?\s*【第[一二三四]部分[：:].+】/)) {
        const title = trimmedLine.replace(/^##?\s*【第[一二三四]部分[：:]/, "").replace(/】$/, "")
        elements.push(
          <h3
            key={index}
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#7A5CAB",
              marginTop: index > 0 ? "20px" : "0",
              marginBottom: "12px",
              paddingBottom: "8px",
              borderBottom: "2px solid #7A5CAB20",
            }}
          >
            {title}
          </h3>,
        )
      }
      // 处理卡牌标题
      else if (trimmedLine.match(/^\*\*.+·.+｜.+｜.+\*\*$/)) {
        const cardTitle = trimmedLine.slice(2, -2)
        elements.push(
          <div
            key={index}
            style={{
              backgroundColor: "#f8f4ff",
              padding: "8px 12px",
              borderRadius: "8px",
              marginBottom: "8px",
              marginTop: "12px",
              borderLeft: "3px solid #7A5CAB",
            }}
          >
            <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#7A5CAB", margin: 0 }}>{cardTitle}</h4>
          </div>,
        )
      }
      // 处理普通段落
      else if (trimmedLine.length > 0 && !trimmedLine.startsWith("---")) {
        elements.push(
          <p
            key={index}
            style={{
              color: "#333",
              lineHeight: "1.6",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            {trimmedLine}
          </p>,
        )
      }
    })

    return elements
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          maxWidth: "500px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          animation: "modalSlideIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            position: "relative",
            padding: "24px",
            background: "linear-gradient(135deg, #7A5CAB 0%, #A0C3B2 100%)",
            borderRadius: "20px 20px 0 0",
            color: "white",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            <X size={18} color="white" />
          </button>

          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>{reading.spreadType}</h2>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Calendar size={16} />
                <span style={{ fontSize: "14px" }}>{reading.date}</span>
              </div>
              <div
                style={{
                  padding: "4px 8px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {reading.mood}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    style={{
                      color: i < reading.rating ? "#fbbf24" : "rgba(255,255,255,0.3)",
                      fill: i < reading.rating ? "#fbbf24" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #e5e5e5",
            backgroundColor: "#f8f9fa",
          }}
        >
          {[
            { id: "summary", label: "解读", icon: Sparkles },
            { id: "cards", label: "卡牌", icon: Heart },
            { id: "chat", label: "问答", icon: MessageCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                flex: 1,
                padding: "12px 8px",
                border: "none",
                backgroundColor: "transparent",
                color: activeTab === tab.id ? "#7A5CAB" : "#777",
                fontSize: "14px",
                fontWeight: activeTab === tab.id ? "600" : "400",
                cursor: "pointer",
                borderBottom: activeTab === tab.id ? "2px solid #7A5CAB" : "2px solid transparent",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>
          {activeTab === "summary" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "12px" }}>
                  AI 解读摘要
                </h3>
                <div
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    padding: "16px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "12px",
                    border: "1px solid #e9ecef",
                  }}
                >
                  {formatSummary(reading.summary)}
                </div>
              </div>
            </div>
          )}

          {activeTab === "cards" && (
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "16px" }}>
                牌阵详情 ({reading.cards.length} 张牌)
              </h3>
              <div style={{ gap: "16px" }}>
                {reading.cards.map((card, index) => {
                  const cardDetails = getCardDetails(card.name)
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "16px",
                        padding: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        marginBottom: "12px",
                        border: "1px solid #e9ecef",
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        {cardDetails && <TarotCardImage card={cardDetails} isRevealed={true} width={60} height={90} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#333", margin: 0 }}>
                            {cardDetails?.translation || card.name}
                          </h4>
                          <span
                            style={{
                              fontSize: "12px",
                              padding: "2px 8px",
                              backgroundColor: "#7A5CAB20",
                              color: "#7A5CAB",
                              borderRadius: "12px",
                            }}
                          >
                            {card.position}
                          </span>
                        </div>
                        <p style={{ color: "#7A5CAB", fontWeight: "500", fontSize: "14px", marginBottom: "8px" }}>
                          {card.meaning}
                        </p>
                        {cardDetails && (
                          <p style={{ color: "#666", fontSize: "13px", lineHeight: "1.5" }}>
                            {cardDetails.description.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "16px" }}>继续探讨</h3>
              <div style={{ backgroundColor: "#f8f9fa", borderRadius: "12px", padding: "16px" }}>
                <AIChatSection
                  cards={reading.cards.map((card) => {
                    const cardDetails = getCardDetails(card.name)
                    return {
                      name: card.name,
                      meaning: card.meaning,
                      isReversed: false, // 从收藏记录中无法获取逆位信息，默认为正位
                      translation: cardDetails?.translation || card.name,
                      description: cardDetails?.description || "",
                      normal: cardDetails?.normal || "",
                      reversed: cardDetails?.reversed || "",
                      detail: cardDetails?.detail || "",
                      image: cardDetails?.image || "",
                    }
                  })}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{``}</style>
    </div>
  )
}
