"use client"

import React from "react"
import { Zap } from "lucide-react"

interface ReadingProgressProps {
  selectedCards: number[]
  totalCards: number
  phase: string
  isLoadingReading: boolean
  onStartAIReading: () => void
}

export default function ReadingProgress({
  selectedCards,
  totalCards,
  phase,
  isLoadingReading,
  onStartAIReading,
}: ReadingProgressProps) {
  return (
    <div style={{ padding: "0 20px" }}>
      {/* Selection Progress */}
      <div style={{ textAlign: "center", marginBottom: "4px", position: "relative", zIndex: 20 }}>
        <p style={{ color: "#FFD700", fontSize: "14px", fontWeight: "500", marginBottom: "8px" }}>
          已选择 {selectedCards.length}/{totalCards} 张牌
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
          {Array.from({ length: totalCards }, (_, index) => (
            <div
              key={index}
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: selectedCards.length > index ? "#FFD700" : "rgba(212, 175, 55, 0.3)",
                transition: "all 0.3s ease",
                animation: selectedCards.length > index ? "pulse 1s ease-in-out infinite" : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* AI Reading Button */}
      <div style={{ textAlign: "center", marginBottom: "4px", position: "relative", zIndex: 20 }}>
        {selectedCards.length === totalCards ? (
          <button
            onClick={onStartAIReading}
            disabled={isLoadingReading}
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
          {selectedCards.length === totalCards
            ? ""
            : phase === "selecting"
              ? "左右滑动并根据你的直觉选择，单击即可选中"
              : "正在为您揭示命运的奥秘..."}
        </p>
      </div>
    </div>
  )
} 