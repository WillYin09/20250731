"use client"

import { useState } from "react"
import { Info } from "lucide-react"

export default function CompactElementalBalance() {
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

    const x1 = 50 + 30 * Math.cos(startAngleRad)
    const y1 = 50 + 30 * Math.sin(startAngleRad)
    const x2 = 50 + 30 * Math.cos(endAngleRad)
    const y2 = 50 + 30 * Math.sin(endAngleRad)

    return `M 50,50 L ${x1},${y1} A 30,30 0 ${largeArcFlag},1 ${x2},${y2} z`
  }

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "rgba(54, 69, 79, 0.8)",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        backdropFilter: "blur(10px)",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <h3 style={{ fontSize: "12px", fontWeight: "600", color: "#F5F5DC", margin: 0 }}>元素平衡</h3>
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
          <Info size={12} style={{ color: "#FFD700" }} />
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
            padding: "6px",
            borderRadius: "4px",
            fontSize: "9px",
            zIndex: 10,
            marginTop: "2px",
            border: "1px solid rgba(255, 215, 0, 0.3)",
          }}
        >
          根据您的卡牌历史分析四大元素的平衡状态
        </div>
      )}

             <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, overflow: "hidden" }}>
         <div style={{ position: "relative", flexShrink: 0 }}>
           <svg width="40" height="40" viewBox="0 0 100 100">
             {elements.map((element, index) => (
               <path
                 key={element.name}
                 d={createPath(element, index)}
                 fill={element.color}
                 stroke="rgba(255, 215, 0, 0.3)"
                 strokeWidth="1"
               />
             ))}
             <text
               x="50"
               y="55"
               textAnchor="middle"
               style={{
                 fontSize: "9px",
                 fontWeight: "600",
                 fill: "#F5F5DC",
               }}
             >
               平衡
             </text>
           </svg>
         </div>

         <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, overflow: "hidden" }}>
           {elements.map((element) => (
             <div key={element.name} style={{ display: "flex", alignItems: "center", gap: "4px", minHeight: "0" }}>
               <div
                 style={{
                   width: "8px",
                   height: "8px",
                   borderRadius: "50%",
                   backgroundColor: element.color,
                   flexShrink: 0,
                 }}
               />
               <span style={{ fontSize: "9px", color: "#D4AF37", fontWeight: "500", flexShrink: 0 }}>{element.name}</span>
               <span style={{ fontSize: "9px", color: "#FFD700", fontWeight: "600", flexShrink: 0 }}>{element.value}%</span>
             </div>
           ))}
         </div>
       </div>
    </div>
  )
} 