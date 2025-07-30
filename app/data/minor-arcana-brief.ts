import { TAROT_CARDS } from "./tarot-cards"

// 只包含小阿卡纳（权杖、圣杯、宝剑、星币）
export const MINOR_ARCANA_BRIEF: Record<string, string> = (() => {
  const result: Record<string, string> = {}
  TAROT_CARDS.forEach(card => {
    // 只处理小阿卡纳
    if (["权杖", "圣杯", "宝剑", "星币"].some(suit => card.translation.startsWith(suit))) {
      // normal 字段首句或前30字
      const normal = card.normal || ""
      let brief = normal.split("，")[0] || normal.split(",")[0] || normal
      if (brief.length > 30) brief = brief.slice(0, 30) + "..."
      result[card.translation] = brief
    }
  })
  return result
})()