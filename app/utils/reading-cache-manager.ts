import type { TarotCardWithOrientation } from "../data/tarot-cards"

export interface CachedReadingState {
  spreadType: string
  revealedCards: TarotCardWithOrientation[]
  comprehensiveSummary: string
  userQuestion?: string
  selectedPresetQuestion?: string
  timestamp: number
  phase: string
  activeCardTab: number
  userRating: number
  favoriteState: string
  // 新增：当前页面信息
  currentPage: "home" | "reading"
}

const CACHE_KEY = "tarot_reading_cache"
const CACHE_EXPIRY_HOURS = 24 // 24小时后过期

class ReadingCacheManager {
  private isClient = typeof window !== "undefined"

  /**
   * 保存解读状态到sessionStorage
   */
  saveReadingState(state: CachedReadingState): void {
    if (!this.isClient) return

    try {
      const cacheData = {
        ...state,
        timestamp: Date.now(),
      }
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (error) {
      console.warn("Failed to save reading state to cache:", error)
      // 缓存失败不影响正常功能
    }
  }

  /**
   * 从sessionStorage恢复解读状态
   */
  restoreReadingState(): CachedReadingState | null {
    if (!this.isClient) return null

    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const state: CachedReadingState = JSON.parse(cached)
      
      // 检查是否过期
      const now = Date.now()
      const expiryTime = state.timestamp + (CACHE_EXPIRY_HOURS * 60 * 60 * 1000)
      
      if (now > expiryTime) {
        this.clearCache()
        return null
      }

      return state
    } catch (error) {
      console.warn("Failed to restore reading state from cache:", error)
      this.clearCache()
      return null
    }
  }

  /**
   * 检查用户是否应该被重定向到解读页面
   */
  shouldRedirectToReading(): { shouldRedirect: boolean; spreadType?: string } {
    const cached = this.restoreReadingState()
    if (!cached) {
      return { shouldRedirect: false }
    }

    // 如果缓存显示用户之前在解读页面，且状态是reading，则应该重定向
    if (cached.currentPage === "reading" && cached.phase === "reading") {
      return { shouldRedirect: true, spreadType: cached.spreadType }
    }

    return { shouldRedirect: false }
  }

  /**
   * 清除缓存
   */
  clearCache(): void {
    if (!this.isClient) return

    try {
      sessionStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.warn("Failed to clear reading cache:", error)
    }
  }

  /**
   * 检查是否有有效的缓存
   */
  hasValidCache(): boolean {
    return this.restoreReadingState() !== null
  }
}

// 导出单例实例
export const readingCacheManager = new ReadingCacheManager() 