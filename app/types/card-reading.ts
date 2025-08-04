export interface CardReadingState {
  phase: "selecting" | "revealing" | "reading"
  selectedCards: number[]
  revealedCards: any[]
  currentRevealIndex: number
  deckCards: number[]
  hoveredCard: number | null
  flyingCards: FlyingCard[]
  placedCards: Map<number, number>
  comprehensiveSummary: string
  isLoadingReading: boolean
  userQuestion: string
  selectedPresetQuestion: string
  userRating: number
  favoriteState: "idle" | "saving" | "saved" | "error"
  readingId: string
}

export interface FlyingCard {
  id: number
  startX: number
  startY: number
  targetX: number
  targetY: number
  targetPosition: number
  cardIndex: number
}

export interface CardReadingPageProps {
  spreadType: string
  onBack: () => void
}

export interface TarotCardData {
  id: number
  name: string
  translation: string
  suit?: string
  number?: number
  type: "major" | "minor"
  image: string
  meaning: string
  description: string
  normal: string
  reversed: string
  keywords: string[]
  element?: string
  planet?: string
  zodiac?: string
}

// 表示带有正逆位状态的卡牌
export interface TarotCardWithOrientation extends TarotCardData {
  isReversed: boolean  // 使用 isReversed 表示是否逆位
}

export interface SpreadPosition {
  id: number
  label: string
  description: string
  x: number
  y: number
  size?: "small" | "normal" | "large"
}

export interface SpreadLayout {
  name: string
  description: string
  positions: SpreadPosition[]
  containerAspectRatio: number
}
