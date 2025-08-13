"use client"

import React from "react"
import { Star, Heart, Loader2 } from "lucide-react"

interface ReadingActionsProps {
  userRating: number
  favoriteState: "idle" | "saving" | "saved" | "error"
  onRatingChange: (rating: number) => void
  onSaveReading: () => void
}

export default function ReadingActions({
  userRating,
  favoriteState,
  onRatingChange,
  onSaveReading,
}: ReadingActionsProps) {
  const getFavoriteButtonProps = () => {
    switch (favoriteState) {
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
          backgroundColor: userRating > 0 ? "#FFD700" : "#6b7280",
          text: "收藏这次指引",
          icon: <Heart size={18} />,
          disabled: userRating === 0,
        }
    }
  }

  const buttonProps = getFavoriteButtonProps()

  return (
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
              onClick={() => onRatingChange(star)}
              disabled={favoriteState === "saved"}
              style={{
                background: "none",
                border: "none",
                cursor: favoriteState === "saved" ? "not-allowed" : "pointer",
                padding: "3px",
                opacity: favoriteState === "saved" ? 0.6 : 1,
              }}
            >
              <Star
                size={22}
                style={{
                  color: star <= userRating ? "#FFD700" : "#6b7280",
                  fill: star <= userRating ? "#FFD700" : "none",
                }}
              />
            </button>
          ))}
          <span style={{ marginLeft: "6px", color: "#D4AF37", fontSize: "13px" }}>
            {userRating > 0 ? `${userRating} 星` : "点击评分"}
          </span>
        </div>

        {/* Save Button */}
        <button
          onClick={onSaveReading}
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
  )
} 