/**
 * 文本处理工具函数
 */

import { MAJOR_ARCANA_BRIEF } from "../data/major-arcana-brief"
import { MINOR_ARCANA_BRIEF } from "../data/minor-arcana-brief"

// 处理文本内容，清理格式
export function processTextContent(text: string): string {
  if (!text) return ""

  // 移除多余的换行符和空格
  let processed = text.replace(/\n\s*\n/g, "\n").trim()

  // 清理markdown格式
  processed = cleanMarkdownFormatting(processed)

  return processed
}

// 清理Markdown格式标记
export function cleanMarkdownFormatting(text: string): string {
  if (!text) return ""

  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // 移除粗体标记
    .replace(/\*(.*?)\*/g, "$1") // 移除斜体标记
    .replace(/#{1,6}\s*/g, "") // 移除标题标记
    .replace(/`(.*?)`/g, "$1") // 移除代码标记
    .replace(/\[(.*?)\]$$.*?$$/g, "$1") // 移除链接，保留文本
    .replace(/^\s*[-*+]\s+/gm, "") // 移除列表标记
    .replace(/^\s*\d+\.\s+/gm, "") // 移除数字列表标记
    .replace(/>\s*/gm, "") // 移除引用标记
    .replace(/---+/g, "") // 移除分隔线
    .replace(/\n\s*\n/g, "\n") // 合并多个换行
    .trim()
}

// 生成精炼摘要（优化：优先整体解读，按句截断，最大350字）
export function generateConciseSummary(fullText: string, maxLength = 350): string {
  if (!fullText) return ""
  const cleaned = cleanMarkdownFormatting(fullText)
  // 优先提取“整体解读”部分
  let main = ""
  const overallMatch = cleaned.match(/整体解读([\s\S]*?)(深度分析|行动建议|祝福与展望|$)/)
  if (overallMatch) {
    main = overallMatch[1].trim()
  } else {
    // 兜底：取前2段
    main = cleaned.split("\n").filter(Boolean).slice(0, 2).join(" ")
  }
  // 按句截断
  let summary = ""
  let total = 0
  main.split(/[。！？]/).forEach(sentence => {
    if (sentence.trim() && total < maxLength) {
      const s = sentence.trim() + "。"
      if (total + s.length <= maxLength) {
        summary += s
        total += s.length
      }
    }
  })
  if (!summary) summary = main.slice(0, maxLength)
  if (summary.length > maxLength) summary = summary.slice(0, maxLength) + "..."
  return summary
}

// 提取卡牌核心含义
export function extractCardCoreMeaning(cardText: string): string {
  if (!cardText) return ""

  // 清理Markdown格式
  const cleaned = cleanMarkdownFormatting(cardText)

  // 提取第一句话作为核心含义
  const sentences = cleaned.split(/[。！？]/)
  return sentences[0]?.trim() || cleaned.substring(0, 50)
}

// 获取预设问题（每个牌阵3个特定问题）
export function getPresetQuestions(spreadType: string): string[] {
  const questionMap: Record<string, string[]> = {
    三牌阵: ["过去的经历如何影响我的现在？", "我现在最需要关注什么？", "未来的发展趋势如何把握？"],
    情感牌阵: ["我的情感状况如何？", "这段关系的发展方向？", "如何改善我们之间的沟通？"],
    职场牌阵: ["我的职场发展方向？", "如何抓住即将到来的机会？", "面对工作挑战我该如何准备？"],
    财富牌阵: ["我的财务状况如何？", "投资理财方面有什么建议？", "如何提升我的财富管理能力？"],
    凯尔特十字: ["我人生的核心课题是什么？", "如何平衡内心的冲突？", "我的灵性成长方向在哪里？"],
  }

  return questionMap[spreadType] || ["我需要注意什么？", "如何做出这个决定？", "未来会如何发展？"]
}

// 格式化中文日期
export function formatChineseDate(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

// 验证文本长度
export function validateTextLength(text: string, minLength = 1, maxLength = 1000): boolean {
  if (!text) return false
  const length = text.trim().length
  return length >= minLength && length <= maxLength
}

// 提取关键词
export function extractKeywords(text: string, count = 5): string[] {
  if (!text) return []

  // 清理Markdown格式
  const cleaned = cleanMarkdownFormatting(text)

  // 简单的关键词提取（基于词频）
  const words = cleaned.match(/[\u4e00-\u9fa5]{2,}/g) || []
  const wordCount: Record<string, number> = {}

  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })

  return Object.entries(wordCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([word]) => word)
}

// 截断文本
export function truncateText(text: string, maxLength: number, suffix = "..."): string {
  if (!text || text.length <= maxLength) return text

  // 清理Markdown格式
  const cleaned = cleanMarkdownFormatting(text)

  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength - suffix.length) + suffix
}

// 检查空文本
export function isEmptyText(text: string): boolean {
  return !text || text.trim().length === 0
}

// 移除HTML标签
export function stripHtmlTags(html: string): string {
  if (!html) return ""
  return html.replace(/<[^>]*>/g, "")
}

// 格式化数字为中文
export function formatNumberToChinese(num: number): string {
  const chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
  if (num < 10) return chineseNumbers[num]
  return num.toString()
}

// 专门用于处理AI返回的指引内容
export function processAIReadingContent(content: string): string {
  if (!content) return ""

  // 首先清理Markdown格式
  let processed = cleanMarkdownFormatting(content)

  // 处理特殊的指引术语格式
  processed = processed
    .replace(/位置\s*\d+\s*[:：]\s*/g, (match) => match.replace(/[:：]\s*/, "：")) // 统一冒号格式
    .replace(/\s*含义与关联\s*[:：]\s*/g, "含义与关联：") // 统一含义格式
    .replace(/\s*指导建议\s*[:：]\s*/g, "指导建议：") // 统一建议格式

  return processed.trim()
}

// 获取卡牌简明解释（优先大阿卡纳/小阿卡纳简明库，否则normal首句）
export function getBriefCardMeaning(card: { translation: string, normal?: string }): string {
  if (MAJOR_ARCANA_BRIEF[card.translation]) return MAJOR_ARCANA_BRIEF[card.translation]
  if (MINOR_ARCANA_BRIEF[card.translation]) return MINOR_ARCANA_BRIEF[card.translation]
  const normal = card.normal || ""
  let brief = normal.split("，")[0] || normal.split(",")[0] || normal
  if (brief.length > 30) brief = brief.slice(0, 30) + "..."
  return brief
}
