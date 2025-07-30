# 数据存储迁移说明

## 概述

本项目已更新为支持多环境数据存储，包括Web浏览器和微信小程序环境。通过统一的存储适配器，应用可以自动检测运行环境并使用相应的存储API。

## 主要改动

### 1. 新增文件

- `app/utils/storage-adapter.ts` - 统一存储适配器
- `app/utils/data-migration.ts` - 数据迁移工具
- `app/components/data-migration-modal.tsx` - 数据迁移界面
- `app/components/auto-migration-detector.tsx` - 自动迁移检测

### 2. 修改文件

- `app/hooks/use-favorites.ts` - 使用新的存储适配器
- `app/hooks/use-card-collection.ts` - 使用新的存储适配器
- `app/hooks/use-user-stats.ts` - 使用新的存储适配器
- `app/components/settings-modal.tsx` - 添加数据管理功能
- `app/page.tsx` - 添加自动迁移检测

## 存储适配器功能

### 自动环境检测

存储适配器会自动检测运行环境：

```typescript
// Web环境 - 使用 localStorage
if (typeof window !== 'undefined' && window.localStorage) {
  return new WebStorageAdapter()
}

// 微信小程序环境 - 使用 wx.getStorageSync/setStorageSync
if (typeof wx !== 'undefined' && wx.getStorageSync) {
  return new WeChatStorageAdapter()
}
```

### 统一API

所有存储操作都通过统一的API进行：

```typescript
import { storageUtils, STORAGE_KEYS } from '../utils/storage-adapter'

// 获取数据
const favorites = storageUtils.getJSON(STORAGE_KEYS.FAVORITES, [])

// 保存数据
storageUtils.setJSON(STORAGE_KEYS.FAVORITES, newFavorites)

// 删除数据
storageUtils.remove(STORAGE_KEYS.FAVORITES)
```

## 数据迁移功能

### 自动迁移检测

应用启动时会自动检测是否需要迁移数据：

1. 检查是否已经迁移过（`data_migrated` 标记）
2. 如果未迁移且检测到Web环境数据，自动弹出迁移提示
3. 用户可以选择迁移、跳过或稍后处理

### 手动数据管理

在设置页面中提供完整的数据管理功能：

- **数据统计** - 显示当前数据状态
- **数据迁移** - 从Web环境迁移数据
- **数据备份** - 导出JSON格式的数据文件
- **数据恢复** - 从JSON文件导入数据
- **数据清空** - 清空所有本地数据

## 微信小程序部署

### 数据存储

微信小程序使用以下API进行数据存储：

```typescript
// 保存数据
wx.setStorageSync(key, value)

// 获取数据
const value = wx.getStorageSync(key)

// 删除数据
wx.removeStorageSync(key)

// 清空所有数据
wx.clearStorageSync()
```

### 存储限制

- 单个 key 允许存储的最大数据长度为 1MB
- 所有数据存储上限为 10MB
- 建议定期清理不必要的数据

### 数据备份

由于微信小程序的存储限制，建议用户定期导出数据备份：

1. 在设置页面点击"数据管理"
2. 点击"导出数据备份"
3. 保存JSON文件到安全位置

## 使用说明

### 开发者

1. **添加新的存储键**：
   ```typescript
   // 在 storage-adapter.ts 中添加
   export const STORAGE_KEYS = {
     // ... 现有键
     NEW_DATA: 'new-data-key'
   } as const
   ```

2. **使用存储**：
   ```typescript
   import { storageUtils, STORAGE_KEYS } from '../utils/storage-adapter'
   
   // 保存数据
   storageUtils.setJSON(STORAGE_KEYS.NEW_DATA, data)
   
   // 获取数据
   const data = storageUtils.getJSON(STORAGE_KEYS.NEW_DATA, defaultValue)
   ```

### 用户

1. **首次使用微信小程序**：
   - 应用会自动检测并提示迁移Web环境数据
   - 点击"迁移数据"完成迁移
   - 或点击"稍后处理"跳过迁移

2. **数据备份**：
   - 进入设置页面
   - 点击"数据管理"
   - 选择"导出数据备份"
   - 保存文件到安全位置

3. **数据恢复**：
   - 进入设置页面
   - 点击"数据管理"
   - 选择"导入数据备份"
   - 选择之前导出的JSON文件

## 注意事项

1. **数据安全**：导出的数据文件包含用户的所有信息，请妥善保管
2. **存储空间**：定期清理不需要的数据，避免达到存储上限
3. **跨设备同步**：当前版本仅支持本地存储，如需跨设备同步请使用数据备份功能
4. **版本兼容**：数据格式包含版本信息，确保导入的数据格式正确

## 故障排除

### 常见问题

1. **迁移失败**：
   - 检查Web环境是否有数据
   - 确认存储权限正常
   - 尝试手动导出后重新导入

2. **存储空间不足**：
   - 清理不必要的数据
   - 删除旧的收藏记录
   - 考虑使用云存储方案

3. **数据丢失**：
   - 检查是否有数据备份
   - 尝试从备份文件恢复
   - 联系技术支持

### 调试信息

在控制台中可以查看详细的存储操作日志：

```javascript
// 查看存储适配器类型
console.log('Storage adapter:', storage.constructor.name)

// 查看数据统计
console.log('Data stats:', dataMigration.getDataStats())
``` 