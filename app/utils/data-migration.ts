// 数据迁移工具 - 用于从Web环境迁移数据到微信小程序
import { storageUtils, STORAGE_KEYS } from './storage-adapter'

export interface MigrationResult {
  success: boolean
  message: string
  migratedData?: {
    favorites: number
    collection: number
    stats: boolean
  }
}

export const dataMigration = {
  // 检查是否需要迁移数据
  needsMigration: (): boolean => {
    // 检查是否已经迁移过
    const migrated = storageUtils.getJSON<boolean>(STORAGE_KEYS.DATA_MIGRATED, false)
    return !migrated
  },

  // 从localStorage迁移数据到当前存储
  migrateFromLocalStorage: (): MigrationResult => {
    try {
      // 检查是否已经迁移过
      if (!dataMigration.needsMigration()) {
        return {
          success: true,
          message: '数据已经迁移过了'
        }
      }

      let migratedData = {
        favorites: 0,
        collection: 0,
        stats: false
      }

      // 尝试从localStorage获取数据（仅在Web环境）
      if (typeof window !== 'undefined' && window.localStorage) {
        // 迁移收藏数据
        const favoritesData = localStorage.getItem('tarot-favorites')
        if (favoritesData) {
          try {
            const favorites = JSON.parse(favoritesData)
            storageUtils.setJSON(STORAGE_KEYS.FAVORITES, favorites)
            migratedData.favorites = favorites.length
            console.log(`迁移收藏数据: ${favorites.length} 条记录`)
          } catch (error) {
            console.error('迁移收藏数据失败:', error)
          }
        }

        // 迁移卡牌收集数据
        const collectionData = localStorage.getItem('tarot-card-collection')
        if (collectionData) {
          try {
            const collection = JSON.parse(collectionData)
            storageUtils.setJSON(STORAGE_KEYS.CARD_COLLECTION, collection)
            migratedData.collection = Object.keys(collection).length
            console.log(`迁移卡牌收集数据: ${Object.keys(collection).length} 张卡牌`)
          } catch (error) {
            console.error('迁移卡牌收集数据失败:', error)
          }
        }

        // 迁移用户统计
        const statsData = localStorage.getItem('tarot-user-stats')
        if (statsData) {
          try {
            const stats = JSON.parse(statsData)
            storageUtils.setJSON(STORAGE_KEYS.USER_STATS, stats)
            migratedData.stats = true
            console.log('迁移用户统计数据成功')
          } catch (error) {
            console.error('迁移用户统计数据失败:', error)
          }
        }
      }

      // 标记已迁移
      storageUtils.setJSON(STORAGE_KEYS.DATA_MIGRATED, true)

      return {
        success: true,
        message: '数据迁移完成',
        migratedData
      }
    } catch (error) {
      console.error('数据迁移失败:', error)
      return {
        success: false,
        message: '数据迁移失败: ' + (error as Error).message
      }
    }
  },

  // 导出用户数据
  exportUserData: (): string => {
    const data = {
      favorites: storageUtils.getJSON(STORAGE_KEYS.FAVORITES, []),
      collection: storageUtils.getJSON(STORAGE_KEYS.CARD_COLLECTION, {}),
      stats: storageUtils.getJSON(STORAGE_KEYS.USER_STATS, {}),
      exportTime: new Date().toISOString(),
      version: '1.0'
    }
    
    return JSON.stringify(data, null, 2)
  },

  // 导入用户数据
  importUserData: (jsonData: string): MigrationResult => {
    try {
      const data = JSON.parse(jsonData)
      
      let importedData = {
        favorites: 0,
        collection: 0,
        stats: false
      }

      // 验证数据格式
      if (!data.version) {
        return {
          success: false,
          message: '数据格式错误：缺少版本信息'
        }
      }

      // 导入收藏数据
      if (data.favorites && Array.isArray(data.favorites)) {
        storageUtils.setJSON(STORAGE_KEYS.FAVORITES, data.favorites)
        importedData.favorites = data.favorites.length
      }

      // 导入卡牌收集数据
      if (data.collection && typeof data.collection === 'object') {
        storageUtils.setJSON(STORAGE_KEYS.CARD_COLLECTION, data.collection)
        importedData.collection = Object.keys(data.collection).length
      }

      // 导入用户统计
      if (data.stats && typeof data.stats === 'object') {
        storageUtils.setJSON(STORAGE_KEYS.USER_STATS, data.stats)
        importedData.stats = true
      }

      return {
        success: true,
        message: '数据导入成功',
        migratedData: importedData
      }
    } catch (error) {
      return {
        success: false,
        message: '数据格式错误：' + (error as Error).message
      }
    }
  },

  // 清空所有数据
  clearAllData: (): void => {
    storageUtils.remove(STORAGE_KEYS.FAVORITES)
    storageUtils.remove(STORAGE_KEYS.CARD_COLLECTION)
    storageUtils.remove(STORAGE_KEYS.USER_STATS)
    storageUtils.remove(STORAGE_KEYS.DATA_MIGRATED)
    console.log('所有数据已清空')
  },

  // 获取数据统计信息
  getDataStats: () => {
    const favorites = storageUtils.getJSON(STORAGE_KEYS.FAVORITES, [])
    const collection = storageUtils.getJSON(STORAGE_KEYS.CARD_COLLECTION, {})
    const stats = storageUtils.getJSON(STORAGE_KEYS.USER_STATS, {})
    const migrated = storageUtils.getJSON(STORAGE_KEYS.DATA_MIGRATED, false)

    return {
      favoritesCount: favorites.length,
      collectionCount: Object.keys(collection).length,
      hasStats: Object.keys(stats).length > 0,
      isMigrated: migrated,
      totalStorageSize: JSON.stringify({ favorites, collection, stats }).length
    }
  }
} 