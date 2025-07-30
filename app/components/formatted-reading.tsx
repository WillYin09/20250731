"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Sparkles, Eye, Target, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface FormattedReadingProps {
  content: string
  cards: any[]
}

export default function FormattedReading({ content, cards }: FormattedReadingProps) {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    deepAnalysis: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // 清理和处理AI内容
  const processAIContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1") // 移除粗体标记
      .replace(/###\s*(.*?)(?:\n|$)/g, "$1\n") // 移除标题标记
      .replace(/\*\s*/g, "") // 移除列表标记
      .trim()
  }

  // 解析内容为不同部分
  const parseContent = (content: string) => {
    const cleanContent = processAIContent(content)
    const sections = cleanContent.split(/(?=整体解读|深度分析|行动建议|祝福与展望)/i)

    const result = {
      overall: "",
      deepAnalysis: "",
      actionAdvice: "",
      blessing: "",
    }

    sections.forEach((section) => {
      const trimmedSection = section.trim()
      if (trimmedSection.match(/^整体解读/i)) {
        result.overall = trimmedSection.replace(/^整体解读[：:]\s*/i, "").trim()
      } else if (trimmedSection.match(/^深度分析/i)) {
        result.deepAnalysis = trimmedSection.replace(/^深度分析[：:]\s*/i, "").trim()
      } else if (trimmedSection.match(/^行动建议/i)) {
        result.actionAdvice = trimmedSection.replace(/^行动建议[：:]\s*/i, "").trim()
      } else if (trimmedSection.match(/^祝福与展望/i)) {
        result.blessing = trimmedSection.replace(/^祝福与展望[：:]\s*/i, "").trim()
      } else if (!result.overall && trimmedSection.length > 50) {
        result.overall = trimmedSection
      }
    })

    // 如果深度分析为空，生成基于卡牌的分析
    if (!result.deepAnalysis && cards && cards.length > 0) {
      const analysisContent = cards
        .map((card, index) => {
          const position = index === 0 ? "过去/根源" : index === 1 ? "现在/核心" : "未来/结果"
          const meaning = card.isReversed ? card.reversed : card.normal
          return `位置${index + 1} (${position})：${card.translation}\n含义与关联：${meaning.substring(0, 100)}...`
        })
        .join("\n\n")

      result.deepAnalysis = analysisContent
    }

    // 确保每个部分都有内容
    if (!result.overall) {
      result.overall =
        "感谢你寻求卡牌的指引。从你选择的卡牌中，我感受到了宇宙为你准备的重要信息。这次指引将为你揭示当前生活中的关键洞察，帮助你更好地理解自己的处境和未来的可能性。"
    }

    if (!result.actionAdvice) {
      result.actionAdvice =
        "基于这次指引的启示，建议你保持开放的心态，相信自己的直觉。每一个挑战都是成长的机会，每一次选择都在塑造你的未来。记住，你拥有改变现状的力量。"
    }

    if (!result.blessing) {
      result.blessing =
        "愿星辰的光芒照亮你前行的道路，愿卡牌的智慧成为你人生旅程中的明灯。相信自己，相信未来，你正走在属于自己的正确道路上。"
    }

    return result
  }

  const sections = parseContent(content)

  const truncateText = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="space-y-4">
      {/* 整体解读 */}
      <Card
        className="border-0 shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(184, 134, 11, 0.15) 100%)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: "#FFD700" }} />
            <h3 className="font-semibold text-lg" style={{ color: "#FFD700" }}>
              整体解读
            </h3>
          </div>
          <p className="leading-relaxed" style={{ color: "#F5F5DC" }}>
            {sections.overall}
          </p>
        </div>
      </Card>

      {/* 深度分析 */}
      <Card
        className="border-0 shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(126, 34, 206, 0.15) 100%)",
          border: "1px solid rgba(147, 51, 234, 0.3)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" style={{ color: "#a855f7" }} />
              <h3 className="font-semibold text-lg" style={{ color: "#a855f7" }}>
                深度分析
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSection("deepAnalysis")}
              className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/20"
            >
              {expandedSections.deepAnalysis ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  收起
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  展开详情
                </>
              )}
            </Button>
          </div>
          <div className="space-y-3" style={{ color: "#F5F5DC" }}>
            {expandedSections.deepAnalysis ? (
              <div className="whitespace-pre-line leading-relaxed">{sections.deepAnalysis}</div>
            ) : (
              <p className="leading-relaxed">{truncateText(sections.deepAnalysis)}</p>
            )}
          </div>
        </div>
      </Card>

      {/* 行动建议 */}
      <Card
        className="border-0 shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.15) 100%)",
          border: "1px solid rgba(59, 130, 246, 0.3)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5" style={{ color: "#3b82f6" }} />
            <h3 className="font-semibold text-lg" style={{ color: "#3b82f6" }}>
              行动建议
            </h3>
          </div>
          <p className="leading-relaxed" style={{ color: "#F5F5DC" }}>
            {sections.actionAdvice}
          </p>
        </div>
      </Card>

      {/* 祝福与展望 */}
      <Card
        className="border-0 shadow-lg"
        style={{
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(219, 39, 119, 0.15) 100%)",
          border: "1px solid rgba(236, 72, 153, 0.3)",
          backdropFilter: "blur(15px)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5" style={{ color: "#ec4899" }} />
            <h3 className="font-semibold text-lg" style={{ color: "#ec4899" }}>
              祝福与展望
            </h3>
          </div>
          <p className="leading-relaxed" style={{ color: "#F5F5DC" }}>
            {sections.blessing}
          </p>
        </div>
      </Card>
    </div>
  )
}
