"use client"

import React from "react"
import { ArrowLeft, MoreHorizontal, Target, RotateCcw, Share2 } from "lucide-react"

interface ReadingHeaderProps {
  onBack: () => void
  onShare: () => void
  onReset: () => void
  canShare: boolean
  spreadType: string
  spreadLayout: any
  selectedPresetQuestion: string
  userQuestion: string
}

export default function ReadingHeader({
  onBack,
  onShare,
  onReset,
  canShare,
  spreadType,
  spreadLayout,
  selectedPresetQuestion,
  userQuestion,
}: ReadingHeaderProps) {
  return (
    <>
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
            onClick={onShare}
            disabled={!canShare}
            style={{
              background: "none",
              border: "none",
              color: canShare ? "#F5F5DC" : "#888888",
              cursor: canShare ? "pointer" : "not-allowed",
              padding: "6px",
              borderRadius: "50%",
              transition: "all 0.3s ease",
              position: "relative"
            }}
            title={canShare ? "分享指引结果" : "请先完成AI解读后再分享"}
            onMouseEnter={(e) => {
              if (canShare) {
                e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                e.currentTarget.style.color = "#FFD700"
              }
            }}
            onMouseLeave={(e) => {
              if (canShare) {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#F5F5DC"
              }
            }}
          >
            <Share2 size={18} />
          </button>
          <button
            onClick={onReset}
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
        {(selectedPresetQuestion || userQuestion) && (
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
              问题：{selectedPresetQuestion || userQuestion}
            </p>
          </div>
        )}
      </div>
    </>
  )
} 