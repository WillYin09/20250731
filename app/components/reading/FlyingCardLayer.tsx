"use client"

import React from "react"
import TarotCardImage from "../tarot-card-image"
import type { FlyingCard } from "../../hooks/use-card-reading"

interface FlyingCardLayerProps {
  flyingCards: FlyingCard[]
}

export default function FlyingCardLayer({ flyingCards }: FlyingCardLayerProps) {
  return (
    <>
      {/* Flying Cards Animation */}
      {flyingCards.map((flyingCard) => (
        <div
          key={flyingCard.id}
          style={{
            position: "fixed",
            zIndex: 1000,
            pointerEvents: "none",
            animation: `flyToTarget 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
            "--start-x": `${flyingCard.startX - 35}px`,
            "--start-y": `${flyingCard.startY - 52}px`,
            "--target-x": `${flyingCard.targetX - 35}px`,
            "--target-y": `${flyingCard.targetY - 52}px`,
          } as React.CSSProperties}
        >
          <TarotCardImage 
            width={70} 
            height={105} 
            className="shadow-lg glow-effect" 
          />
        </div>
      ))}

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes flyToTarget {
          0% {
            transform: scale(1.1) rotate(0deg);
            left: var(--start-x);
            top: var(--start-y);
          }
          50% {
            transform: scale(1.2) rotate(180deg) translateY(-40px);
          }
          100% {
            transform: scale(1) rotate(360deg);
            left: var(--target-x);
            top: var(--target-y);
          }
        }
      `}</style>
    </>
  )
} 