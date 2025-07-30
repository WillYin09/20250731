"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export default function ElementalBalance() {
  const [showTooltip, setShowTooltip] = useState(false)

  const elements = [
    { name: "火", value: 33, color: "#ef4444" },
    { name: "水", value: 14, color: "#3b82f6" },
    { name: "土", value: 33, color: "#eab308" },
    { name: "风", value: 19, color: "#8b5cf6" },
  ]

  const total = elements.reduce((sum, element) => sum + element.value, 0)
  let currentAngle = 0

  const createPath = (element: any, index: number) => {
    const startAngle = currentAngle
    const endAngle = currentAngle + (element.value / total) * 360
    currentAngle = endAngle

    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    const x1 = 50 + 40 * Math.cos(startAngleRad)
    const y1 = 50 + 40 * Math.sin(startAngleRad)
    const x2 = 50 + 40 * Math.cos(endAngleRad)
    const y2 = 50 + 40 * Math.sin(endAngleRad)

    return `M 50,50 L ${x1},${y1} A 40,40 0 ${largeArcFlag},1 ${x2},${y2} z`
  }

  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "rgba(54, 69, 79, 0.8)",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#F5F5DC", margin: 0 }}>灵魂元素平衡</h3>
        <button
          onClick={() => setShowTooltip(!showTooltip)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Info size={14} style={{ color: "#FFD700" }} />
        </button>
      </div>

      {showTooltip && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            backgroundColor: "rgba(26, 35, 126, 0.95)",
            color: "#F5F5DC",
            padding: "8px",
            borderRadius: "6px",
            fontSize: "11px",
            zIndex: 10,
            marginTop: "4px",
            border: "1px solid rgba(255, 215, 0, 0.3)",
          }}
        >
          根据您的卡牌历史分析四大元素的平衡状态
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
        <div style={{ position: "relative" }}>
          <svg width="80" height="80" viewBox="0 0 100 100">
            {elements.map((element, index) => (
              <path
                key={element.name}
                d={createPath(element, index)}
                fill={element.color}
                stroke="rgba(255, 215, 0, 0.3)"
                strokeWidth="1"
              />
            ))}
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="rgba(54, 69, 79, 0.9)"
              stroke="rgba(255, 215, 0, 0.5)"
              strokeWidth="1"
            />
            <text x="50" y="54" textAnchor="middle" fontSize="10" fill="#FFD700" fontWeight="500">
              平衡
            </text>
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {elements.map((element) => (
            <div key={element.name} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: element.color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "12px", color: "#F5F5DC", minWidth: "12px" }}>{element.name}</span>
              <span style={{ fontSize: "12px", color: "#D4AF37", marginLeft: "auto" }}>{element.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
