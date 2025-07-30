"use client"

import { useState } from "react"

export interface RecentReading {
  id: string
  type: string
  date: string
  result: string
  color: string
  cards: Array<{
    name: string
    translation: string
    position: string
    meaning: string
    reversed: boolean
  }>
  summary: string
  rating: number
}

export function useRecentReadings() {
  const [recentReadings, setRecentReadings] = useState<RecentReading[]>([
    {
      id: "1",
      type: "三牌阵",
      date: "今天",
      result: "积极",
      color: "bg-green-100 text-green-700",
      cards: [
        { name: "The Sun", translation: "太阳", position: "过去", meaning: "光明与希望", reversed: false },
        { name: "The Star", translation: "星星", position: "现在", meaning: "指引与灵感", reversed: false },
        { name: "The World", translation: "世界", position: "未来", meaning: "完成与成功", reversed: false },
      ],
      summary:
        "这是一个非常积极的牌阵，显示你正从过去的光明经历中获得力量，现在有清晰的方向指引，未来将迎来圆满的成功。",
      rating: 5,
    },
    {
      id: "2",
      type: "情感牌阵",
      date: "昨天",
      result: "中性",
      color: "bg-gray-100 text-gray-700",
      cards: [
        { name: "The Lovers", translation: "恋人", position: "你", meaning: "爱与选择", reversed: false },
        { name: "Two of Cups", translation: "圣杯二", position: "对方", meaning: "情感连接", reversed: false },
        { name: "The Hermit", translation: "隐士", position: "关系", meaning: "内省与等待", reversed: true },
      ],
      summary: "感情方面需要更多的沟通和理解，虽然双方都有爱意，但可能需要时间来深入了解彼此。",
      rating: 3,
    },
    {
      id: "3",
      type: "职场牌阵",
      date: "3天前",
      result: "积极",
      color: "bg-green-100 text-green-700",
      cards: [
        { name: "Ace of Pentacles", translation: "星币一", position: "现状", meaning: "新的机会", reversed: false },
        { name: "Three of Pentacles", translation: "星币三", position: "机会", meaning: "团队合作", reversed: false },
        { name: "Ten of Pentacles", translation: "星币十", position: "结果", meaning: "长期成功", reversed: false },
      ],
      summary: "职场方面有很好的发展机会，通过团队合作可以获得长期的成功和稳定。",
      rating: 4,
    },
  ])

  const getReadingHistory = (limit = 10) => {
    // 模拟更多历史记录
    const additionalReadings: RecentReading[] = [
      {
        id: "4",
        type: "财富牌阵",
        date: "1周前",
        result: "挑战",
        color: "bg-orange-100 text-orange-700",
        cards: [
          { name: "Five of Pentacles", translation: "星币五", position: "收入", meaning: "财务困难", reversed: false },
          { name: "The Devil", translation: "魔鬼", position: "支出", meaning: "物质束缚", reversed: false },
          { name: "The Fool", translation: "愚人", position: "建议", meaning: "新的开始", reversed: false },
        ],
        summary: "财务方面需要谨慎管理，避免不必要的支出，寻找新的收入来源。",
        rating: 2,
      },
      {
        id: "5",
        type: "三牌阵",
        date: "1周前",
        result: "深刻",
        color: "bg-purple-100 text-purple-700",
        cards: [
          { name: "Death", translation: "死神", position: "过去", meaning: "转变结束", reversed: false },
          { name: "The Tower", translation: "高塔", position: "现在", meaning: "突然变化", reversed: false },
          { name: "The Star", translation: "星星", position: "未来", meaning: "希望重生", reversed: false },
        ],
        summary: "经历了重大的人生转变，虽然过程艰难，但最终会迎来新的希望和机会。",
        rating: 4,
      },
    ]

    return [...recentReadings, ...additionalReadings].slice(0, limit)
  }

  const addReading = (reading: Omit<RecentReading, "id">) => {
    const newReading: RecentReading = {
      ...reading,
      id: Date.now().toString(),
    }

    setRecentReadings((prev) => [newReading, ...prev.slice(0, 2)]) // 只保留最近3条
  }

  return {
    recentReadings,
    getReadingHistory,
    addReading,
  }
}
