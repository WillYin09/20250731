"use client"

import React from "react"
import TarotCardImage from "../tarot-card-image"
import type { SpreadLayout } from "../../data/spread-layouts"

interface SpreadCanvasProps {
  spreadLayout: SpreadLayout
  spreadType: string
  state: any
  getCardSize: (size?: "small" | "normal" | "large") => { width: number; height: number }
  handleRedrawCard: (position: number) => void
}

export default function SpreadCanvas({
  spreadLayout,
  spreadType,
  state,
  getCardSize,
  handleRedrawCard,
}: SpreadCanvasProps) {
  return (
    <div style={{ padding: "0 20px 0", position: "relative", zIndex: 15 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: spreadType === "凯尔特十字" ? "30vh" : "33vh",
          maxWidth: spreadType === "凯尔特十字" ? "450px" : "550px",
          margin: "0 auto",
          marginBottom: "8px",
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
                  marginBottom: "4px",
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
                      fontSize: position.size === "large" ? "22px" : position.size === "small" ? "14px" : "18px",
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
                  backgroundColor: "rgba(26, 35, 126, 0.7)",
                  borderRadius: "6px",
                  padding: "2px 6px",
                  marginTop: "2px",
                  border: "1px solid rgba(255, 215, 0, 0.28)",
                  minHeight: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "#F5F5DC",
                    fontSize: spreadType === "凯尔特十字" ? "9px" : "10px",
                    fontWeight: "500",
                    marginBottom: "1px",
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
    </div>
  )
} 