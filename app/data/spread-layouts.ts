export interface SpreadPosition {
  id: number
  label: string
  description: string
  x: number // 相对位置 (0-100)
  y: number // 相对位置 (0-100)
  size?: "small" | "normal" | "large"
}

export interface SpreadLayout {
  name: string
  positions: SpreadPosition[]
  containerAspectRatio: number // 宽高比
  description: string
}

export const SPREAD_LAYOUTS: Record<string, SpreadLayout> = {
  三牌阵: {
    name: "三牌阵",
    description: "探索过往、当下与未来的连接",
    containerAspectRatio: 3.5, // 宽度是高度的3.5倍
    positions: [
      { id: 1, label: "过去", description: "影响当前状况的过往经历", x: 15, y: 50 },
      { id: 2, label: "现在", description: "当前的状态和挑战", x: 50, y: 50 },
      { id: 3, label: "未来", description: "可能的发展方向", x: 85, y: 50 },
    ],
  },

  情感牌阵: {
    name: "情感牌阵",
    description: "洞察情感世界的奥秘",
    containerAspectRatio: 1.0, // 正方形布局
    positions: [
      { id: 1, label: "你", description: "你在这段关系中的状态", x: 20, y: 70, size: "small" },
      { id: 2, label: "对方", description: "对方在这段关系中的状态", x: 50, y: 15, size: "small" },
      { id: 3, label: "关系", description: "你们之间的关系现状", x: 50, y: 50 },
      { id: 4, label: "挑战", description: "关系中需要面对的挑战", x: 80, y: 70, size: "small" },
      { id: 5, label: "结果", description: "关系的发展趋势", x: 50, y: 85, size: "small" },
    ],
  },

  职场牌阵: {
    name: "职场牌阵",
    description: "指引职场发展方向",
    containerAspectRatio: 1.3,
    positions: [
      { id: 1, label: "现状", description: "当前的职场状况", x: 25, y: 25 },
      { id: 2, label: "机会", description: "即将到来的机会", x: 75, y: 25 },
      { id: 3, label: "挑战", description: "需要克服的困难", x: 25, y: 75 },
      { id: 4, label: "建议", description: "行动指导和建议", x: 75, y: 75 },
    ],
  },

  财富牌阵: {
    name: "财富牌阵",
    description: "探索财富管理方向",
    containerAspectRatio: 1.3,
    positions: [
      { id: 1, label: "收入", description: "财富来源和收入状况", x: 50, y: 25 },
      { id: 2, label: "支出", description: "花费和投资方向", x: 25, y: 75 },
      { id: 3, label: "建议", description: "理财和投资建议", x: 75, y: 75 },
    ],
  },

  凯尔特十字: {
    name: "凯尔特十字",
    description: "最全面的人生指引牌阵",
    containerAspectRatio: 0.6, // 更高的布局
    positions: [
      // 中央十字部分
      { id: 1, label: "现状", description: "当前的核心状况", x: 35, y: 45 },
      { id: 2, label: "挑战", description: "面临的主要挑战", x: 35, y: 45, size: "small" }, // 与现状重叠但偏移
      { id: 3, label: "远因", description: "深层的根本原因", x: 35, y: 65, size: "small" },
      { id: 4, label: "近因", description: "最近的影响因素", x: 35, y: 25, size: "small" },
      { id: 5, label: "可能", description: "可能的发展方向", x: 15, y: 45, size: "small" },
      { id: 6, label: "近况", description: "即将发生的事情", x: 55, y: 45, size: "small" },

      // 右侧竖列
      { id: 7, label: "态度", description: "你的内心态度", x: 80, y: 75, size: "small" },
      { id: 8, label: "外界", description: "外界环境影响", x: 80, y: 60, size: "small" },
      { id: 9, label: "指导", description: "内心的指引", x: 80, y: 45, size: "small" },
      { id: 10, label: "结果", description: "最终的结果", x: 80, y: 30, size: "small" },
    ],
  },
}

export const getSpreadLayout = (spreadName: string): SpreadLayout => {
  return SPREAD_LAYOUTS[spreadName] || SPREAD_LAYOUTS["三牌阵"]
}
