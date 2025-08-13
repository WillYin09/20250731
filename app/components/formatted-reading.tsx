"use client"

import { useState, useEffect, useMemo } from "react"
import { Sparkles } from "lucide-react"

interface FormattedReadingProps {
  content: string
  cards: any[]
}

export default function FormattedReading({ content, cards }: FormattedReadingProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const processAIContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/###\s*(.*?)(?:\n|$)/g, "$1\n")
      .replace(/\*\s*/g, "")
      .trim()
  }

  const parseContent = (content: string) => {
    const cleanContent = processAIContent(content)
    const sections = cleanContent.split(/(?=整体解读|深度分析)/i)

    const result = {
      overall: "",
      deepAnalysis: "",
    }

    sections.forEach((section) => {
      const trimmedSection = section.trim()
      if (trimmedSection.match(/^整体解读/i)) {
        result.overall = trimmedSection.replace(/^整体解读[：:]\s*/i, "").trim()
      } else if (trimmedSection.match(/^深度分析/i)) {
        result.deepAnalysis = trimmedSection.replace(/^深度分析[：:]\s*/i, "").trim()
      } else if (!result.overall && trimmedSection.length > 50) {
        result.overall = trimmedSection
      }
    })

    if (!result.deepAnalysis && cards && cards.length > 0) {
      const analysisContent = cards
        .map((card, index) => {
          const position = index === 0 ? "过去/根源" : index === 1 ? "现在/核心" : "未来/结果"
          const meaning = card.isReversed ? card.reversed : card.normal
          return `位置${index + 1} (${position})：${card.translation}\n含义与关联：${(meaning || "").substring(0, 100)}...`
        })
        .join("\n\n")

      result.deepAnalysis = analysisContent
    }

    if (!result.overall) {
      result.overall =
        "感谢你寻求卡牌的指引。从你选择的卡牌中，我感受到了宇宙为你准备的重要信息。这次指引将为你揭示当前生活中的关键洞察，帮助你更好地理解自己的处境和未来的可能性。"
    }

    return result
  }

  const sections = useMemo(() => parseContent(content), [content, cards])

  const standardizePunctuation = (text: string) => {
    return text
      .replace(/\./g, '。')
      .replace(/\?/g, '？')
      .replace(/\!/g, '！')
      .replace(/\r\n|\r/g, '\n')
      .replace(/——{2,}/g, '，')
      .replace(/^-{2,}/g, '')
      .replace(/-{2,}/g, '，')
      .replace(/\s*-\s*/g, '，')
      .replace(/^\s*[-|]\s*$/gm, '')
      .replace(/^\s*[-|]\s+/gm, '')
      .replace(/\|\s*[-|]\s*\|/g, '')
      .replace(/^\s*\|.*\|\s*$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/^\s*。\s*$/gm, '')
      .replace(/。{2,}/g, '...')
      .replace(/。\s*。\s*。/g, '...')
      .trim()
  }

  const smartSplitParagraphs = (text: string) => {
    if (!text) return []
    let t = standardizePunctuation(text)
    t = t.replace(/(> |• |\-|——|---|\d+\.|[一二三四五六七八九十]、)/g, '\n$1')
    const rawParas = t.split(/(?<=[。？！])\s*\n+|\n{2,}/)
    const paras: string[] = []
    rawParas.forEach(p => {
      const pp = p.trim()
      if (!pp) return
      if (pp.length > 80) {
        paras.push(...pp.split(/(?<=[。？！])\s*/).filter(Boolean))
      } else {
        paras.push(pp)
      }
    })
    return paras
  }

  // 合并为单容器内容：整体解读摘要 + 深度分析要点
  const mergedParagraphs = useMemo(() => {
    const head = sections.overall ? smartSplitParagraphs(sections.overall) : []
    const tail = sections.deepAnalysis ? smartSplitParagraphs(sections.deepAnalysis) : []
    return [...head, ...tail]
  }, [sections])

  // 紧凑模式：当段落过多或文本过长时，缩小字号与段距
  const compact = mergedParagraphs.length > 18 || (content && content.length > 1200)
  const fontSize = compact ? 13 : 14
  const lineHeight = 1.5
  const paragraphGap = compact ? 6 : 8

  return (
    <div className="space-y-3">
      <div
        style={{
          background: "#21263a",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: "12px",
          padding: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4" style={{ color: "#FFD700" }} />
          <h3 className="font-semibold text-base" style={{ color: "#FFD700" }}>解读</h3>
        </div>
        <div
          className="leading-relaxed whitespace-pre-wrap break-words"
          style={{ color: "#ECEEF1", fontSize: `${fontSize}px`, lineHeight }}
        >
          {mergedParagraphs.map((para, idx) => (
            <div key={idx} style={{ marginBottom: `${idx === mergedParagraphs.length - 1 ? 0 : paragraphGap}px` }}>
              {para}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
