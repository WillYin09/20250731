"use client"

import { useState, useEffect } from "react"

export interface LunarPhase {
  phase:
    | "new"
    | "waxing-crescent"
    | "first-quarter"
    | "waxing-gibbous"
    | "full"
    | "waning-gibbous"
    | "last-quarter"
    | "waning-crescent"
  phaseName: string
  illumination: number // 0-100
  influence: string
  emoji: string
}

export function useLunarPhase() {
  const [lunarPhase, setLunarPhase] = useState<LunarPhase>({
    phase: "new",
    phaseName: "新月",
    illumination: 0,
    influence: "新的开始，适合许愿和设定意图",
    emoji: "🌑",
  })

  useEffect(() => {
    // 计算当前月相
    const calculateLunarPhase = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()

      // 简化的月相计算（基于农历周期约29.5天）
      const knownNewMoon = new Date(2024, 0, 11) // 2024年1月11日新月
      const lunarCycle = 29.53058867 // 月相周期天数

      const daysSinceKnownNewMoon = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24)
      const cyclePosition = (daysSinceKnownNewMoon % lunarCycle) / lunarCycle

      let phase: LunarPhase["phase"]
      let phaseName: string
      let influence: string
      let emoji: string
      let illumination: number

      if (cyclePosition < 0.0625) {
        phase = "new"
        phaseName = "新月"
        influence = "新的开始，适合许愿和设定意图"
        emoji = "🌑"
        illumination = 0
      } else if (cyclePosition < 0.1875) {
        phase = "waxing-crescent"
        phaseName = "娥眉月"
        influence = "成长期，适合学习新知识"
        emoji = "🌒"
        illumination = 25
      } else if (cyclePosition < 0.3125) {
        phase = "first-quarter"
        phaseName = "上弦月"
        influence = "行动力强，适合做重要决定"
        emoji = "🌓"
        illumination = 50
      } else if (cyclePosition < 0.4375) {
        phase = "waxing-gibbous"
        phaseName = "盈凸月"
        influence = "完善期，适合调整和优化"
        emoji = "🌔"
        illumination = 75
      } else if (cyclePosition < 0.5625) {
        phase = "full"
        phaseName = "满月"
        influence = "能量最强，直觉敏锐，适合指引"
        emoji = "🌕"
        illumination = 100
      } else if (cyclePosition < 0.6875) {
        phase = "waning-gibbous"
        phaseName = "亏凸月"
        influence = "释放期，适合放下和感恩"
        emoji = "🌖"
        illumination = 75
      } else if (cyclePosition < 0.8125) {
        phase = "last-quarter"
        phaseName = "下弦月"
        influence = "反思期，适合总结和清理"
        emoji = "🌗"
        illumination = 50
      } else {
        phase = "waning-crescent"
        phaseName = "残月"
        influence = "休息期，适合冥想和内省"
        emoji = "🌘"
        illumination = 25
      }

      setLunarPhase({
        phase,
        phaseName,
        illumination,
        influence,
        emoji,
      })
    }

    calculateLunarPhase()

    // 每小时更新一次
    const interval = setInterval(calculateLunarPhase, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  return lunarPhase
}
