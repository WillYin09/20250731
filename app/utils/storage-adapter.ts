// 存储适配器 - 统一管理Web和微信小程序的数据存储
export interface StorageAdapter {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
  clear(): void
}

// Web环境存储适配器
class WebStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key)
    }
    return null
  }

  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value)
    }
  }

  removeItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key)
    }
  }

  clear(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear()
    }
  }
}

// 微信小程序环境存储适配器
class WeChatStorageAdapter implements StorageAdapter {
  getItem(key: string): string | null {
    // @ts-ignore - 微信小程序环境
    if (typeof wx !== 'undefined' && wx.getStorageSync) {
      try {
        // @ts-ignore
        return wx.getStorageSync(key)
      } catch (error) {
        console.error('微信存储获取失败:', error)
        return null
      }
    }
    return null
  }

  setItem(key: string, value: string): void {
    // @ts-ignore - 微信小程序环境
    if (typeof wx !== 'undefined' && wx.setStorageSync) {
      try {
        // @ts-ignore
        wx.setStorageSync(key, value)
      } catch (error) {
        console.error('微信存储设置失败:', error)
      }
    }
  }

  removeItem(key: string): void {
    // @ts-ignore - 微信小程序环境
    if (typeof wx !== 'undefined' && wx.removeStorageSync) {
      try {
        // @ts-ignore
        wx.removeStorageSync(key)
      } catch (error) {
        console.error('微信存储删除失败:', error)
      }
    }
  }

  clear(): void {
    // @ts-ignore - 微信小程序环境
    if (typeof wx !== 'undefined' && wx.clearStorageSync) {
      try {
        // @ts-ignore
        wx.clearStorageSync()
      } catch (error) {
        console.error('微信存储清空失败:', error)
      }
    }
  }
}

// 自动检测环境并选择合适的存储适配器
function createStorageAdapter(): StorageAdapter {
  // 检测是否为微信小程序环境
  // @ts-ignore
  if (typeof wx !== 'undefined' && wx.getStorageSync) {
    console.log('使用微信小程序存储适配器')
    return new WeChatStorageAdapter()
  }
  
  // 检测是否为Web环境
  if (typeof window !== 'undefined' && window.localStorage) {
    console.log('使用Web存储适配器')
    return new WebStorageAdapter()
  }
  
  // 默认使用Web存储适配器
  console.log('使用默认Web存储适配器')
  return new WebStorageAdapter()
}

// 创建全局存储实例
export const storage = createStorageAdapter()

// 便捷方法
export const storageUtils = {
  // 获取JSON数据
  getJSON: <T>(key: string, defaultValue: T): T => {
    try {
      const data = storage.getItem(key)
      return data ? JSON.parse(data) : defaultValue
    } catch (error) {
      console.error(`获取存储数据失败 [${key}]:`, error)
      return defaultValue
    }
  },

  // 设置JSON数据
  setJSON: <T>(key: string, value: T): void => {
    try {
      storage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`设置存储数据失败 [${key}]:`, error)
    }
  },

  // 删除数据
  remove: (key: string): void => {
    storage.removeItem(key)
  },

  // 清空所有数据
  clear: (): void => {
    storage.clear()
  }
}

// 存储键名常量
export const STORAGE_KEYS = {
  FAVORITES: 'tarot-favorites',
  CARD_COLLECTION: 'tarot-card-collection',
  USER_STATS: 'tarot-user-stats',
  DATA_MIGRATED: 'data_migrated'
} as const 