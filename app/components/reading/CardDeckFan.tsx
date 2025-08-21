"use client"

import React from "react"
import TarotCardImage from "../tarot-card-image"

interface CardDeckFanProps {
  deckCards: number[]
  selectedCards: number[]
  hoveredCard: number | null
  phase: string
  baseAngle: number
  angleStep: number
  onCardClick: (cardIndex: number) => void
  onCardHover: (cardIndex: number | null) => void
}

export default function CardDeckFan({
  deckCards,
  selectedCards,
  hoveredCard,
  phase,
  baseAngle,
  angleStep,
  onCardClick,
  onCardHover,
}: CardDeckFanProps) {
  return (
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
        {deckCards.map((cardIndex, index) => {
          const totalCards = deckCards.length
          const angle = baseAngle + index * angleStep
          const radius = Math.min(window.innerWidth * 0.32, 160)
          const x = Math.sin((angle * Math.PI) / 180) * radius
          const y = Math.cos((angle * Math.PI) / 180) * 35

          const isSelected = selectedCards.includes(cardIndex)
          const isHovered = hoveredCard === cardIndex

          return (
            <div
              key={cardIndex}
              data-card-index={cardIndex}
              onClick={() => onCardClick(cardIndex)}
              onMouseEnter={() => onCardHover(cardIndex)}
              onMouseLeave={() => onCardHover(null)}
              style={{
                position: "absolute",
                cursor: phase === "selecting" ? "pointer" : "default",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                left: `calc(50% + ${x}px - 35px)`,
                bottom: `${25 + y}px`,
                transform: `rotate(${angle}deg) ${isHovered ? "scale(1.08) translateY(-8px)" : ""}`,
                zIndex: isHovered ? 30 : 20,
                opacity: isSelected ? 0.3 : 0.9,
                pointerEvents: phase === "selecting" && !isSelected ? "auto" : "none",
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
  )
} 