"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Sparkles } from "lucide-react"

interface TarotCardImageProps {
  card?: {
    name: string
    translation?: string
    image?: string
    reversed?: boolean
  }
  isRevealed?: boolean
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  showPlaceholder?: boolean
  onClick?: () => void
}

export default function TarotCardImage({
  card,
  isRevealed = false,
  width = 80,
  height = 120,
  className = "",
  style = {},
  showPlaceholder = true,
  onClick,
}: TarotCardImageProps) {
  const [imageState, setImageState] = useState<"idle" | "loading" | "loaded" | "error">("idle")

  // 重置状态当卡牌变化时
  useEffect(() => {
    if (card?.image && isRevealed) {
      setImageState("loading")
    } else {
      setImageState("idle")
    }
  }, [card?.image, card?.name, isRevealed])

  const handleImageLoad = useCallback(() => {
    setImageState("loaded")
  }, [card?.name])

  const handleImageError = useCallback(() => {
    setImageState("error")
  }, [card?.name, card?.image])

  // 如果没有卡牌数据或未揭示，显示卡背
  if (!card || !isRevealed) {
    return (
      <div
        className={`relative ${className}`}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          ...style,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid #718096",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* 卡背装饰图案 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 2px, transparent 2px),
                         radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
              backgroundSize: "20px 20px",
            }}
          />
          <div
            style={{
              fontSize: `${Math.min(width, height) * 0.3}px`,
              color: "#a0aec0",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            🌟
          </div>
        </div>
      </div>
    )
  }

  // 渲染卡牌内容
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...style,
      }}
      onClick={onClick}
    >
      {/* 主要内容容器 */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {/* 图片加载成功时显示 */}
        {imageState === "loaded" && card.image && (
          <img
            src={card.image || "/placeholder.svg"}
            alt={card.translation || card.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.3s ease",
              opacity: 1,
            }}
            loading="eager"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}

        {/* 图片加载中或失败时显示占位符 */}
        {(imageState === "loading" || imageState === "error" || imageState === "idle") && showPlaceholder && (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              textAlign: "center",
              padding: "8px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 背景装饰 */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "15px 15px",
                opacity: 0.6,
              }}
            />

            {/* 图标 */}
            <Sparkles
              size={Math.min(width, height) * 0.25}
              style={{
                marginBottom: "4px",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                zIndex: 1,
              }}
            />

            {/* 卡牌名称 */}
            <div style={{ zIndex: 1 }}>
              <div
                style={{
                  fontSize: `${Math.min(width, height) * 0.08}px`,
                  fontWeight: "600",
                  marginBottom: "2px",
                  textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  lineHeight: 1.2,
                }}
              >
                {card.translation || card.name}
              </div>
              {card.translation && card.name !== card.translation && (
                <div
                  style={{
                    fontSize: `${Math.min(width, height) * 0.06}px`,
                    opacity: 0.9,
                    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    lineHeight: 1.1,
                  }}
                >
                  {card.name}
                </div>
              )}
            </div>

            {/* 加载状态提示 */}
            {imageState === "loading" && (
              <div
                style={{
                  position: "absolute",
                  bottom: "4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: `${Math.min(width, height) * 0.05}px`,
                  opacity: 0.8,
                  zIndex: 1,
                }}
              >
                加载中...
              </div>
            )}
          </div>
        )}

        {/* 实际图片元素（隐藏，用于预加载） */}
        {card.image && imageState === "loading" && (
          <img
            src={card.image || "/placeholder.svg"}
            alt={card.translation || card.name}
            style={{
              position: "absolute",
              opacity: 0,
              pointerEvents: "none",
            }}
            loading="eager"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>

      {/* 逆位标记 */}
      {card.reversed && (
        <div
          style={{
            position: "absolute",
            top: "4px",
            right: "4px",
            width: "8px",
            height: "8px",
            backgroundColor: "#ef4444",
            borderRadius: "50%",
            border: "1px solid white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
        />
      )}
    </div>
  )
}
