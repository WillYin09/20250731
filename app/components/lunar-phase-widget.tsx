"use client"

import { useLunarPhase } from "../hooks/use-lunar-phase"

export default function LunarPhaseWidget() {
  const lunarPhase = useLunarPhase()

  const getMoonPhaseIcon = () => {
    const phases = {
      new: "🌑",
      "waxing-crescent": "🌒",
      "first-quarter": "🌓",
      "waxing-gibbous": "🌔",
      full: "🌕",
      "waning-gibbous": "🌖",
      "last-quarter": "🌗",
      "waning-crescent": "🌘",
    }
    return phases[lunarPhase.phase]
  }

  const getPhaseColor = () => {
    if (lunarPhase.phase === "full") return "#fbbf24"
    if (lunarPhase.phase === "new") return "#374151"
    return "#94a3b8"
  }

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "18px" }}>🌙</span>
        月相周期
      </h3>

      {/* 月相显示 - 调整大小 */}
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
          margin: "0 auto 16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* 星空背景 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 1px, transparent 1px),
                       radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 1px, transparent 1px),
                       radial-gradient(circle at 60% 80%, rgba(255,255,255,0.1) 1px, transparent 1px),
                       radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* 月亮 */}
        <div
          style={{
            fontSize: "40px",
            filter: lunarPhase.phase === "full" ? "drop-shadow(0 0 20px rgba(251, 191, 36, 0.6))" : "none",
            animation: lunarPhase.phase === "full" ? "moonGlow 3s ease-in-out infinite alternate" : "none",
          }}
        >
          {getMoonPhaseIcon()}
        </div>

        {/* 光晕效果 */}
        {lunarPhase.illumination > 50 && (
          <div
            style={{
              position: "absolute",
              inset: "-10px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${getPhaseColor()}20 0%, transparent 70%)`,
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* 月相信息 */}
      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: "#333",
            marginBottom: "4px",
          }}
        >
          {lunarPhase.phaseName}
        </div>
        <div
          style={{
            fontSize: "12px",
            color: "#777",
            marginBottom: "8px",
          }}
        >
          光照度 {lunarPhase.illumination}%
        </div>
      </div>

      {/* 影响描述 */}
      <div
        style={{
          padding: "12px",
          backgroundColor: "#f8f4ff",
          borderRadius: "8px",
          border: "1px solid #e0d4ff",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "#7A5CAB",
            fontWeight: "500",
            marginBottom: "4px",
          }}
        >
          指引影响
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#555",
            lineHeight: "1.4",
          }}
        >
          {lunarPhase.influence}
        </div>
      </div>

      <style jsx>{`
        @keyframes moonGlow {
          0% { filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.6)); }
          100% { filter: drop-shadow(0 0 30px rgba(251, 191, 36, 0.8)); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
