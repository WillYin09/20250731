# Google Analytics 4 (GA4) 配置说明

## 概述
本项目已集成 Google Analytics 4，用于追踪网站流量和用户行为，支持 Google Ads 广告投放优化。

## 配置步骤

### 1. 环境变量配置
在项目根目录创建 `.env.local` 文件（如果不存在），添加以下内容：
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-FPZG3ZXKNE
```

### 2. 已实现的事件追踪

#### 基础页面浏览
- **page_view**: 自动追踪所有页面访问和路由变化
- **首次访问**: 自动记录用户首次访问时间

#### 塔罗牌相关事件
- **start_reading**: 用户开始占卜
  - 参数: `spread_type` (牌阵类型)
  - 触发时机: 点击"立即抽卡"或选择牌阵

- **draw_card**: 用户抽牌
  - 参数: `card_name` (牌名), `position` (位置)
  - 触发时机: 从牌堆中选择卡牌

- **view_card_detail**: 查看牌义详情
  - 参数: `card_name` (牌名)
  - 触发时机: 点击已解锁的卡牌查看详情

- **complete_reading**: 完成一次解读
  - 参数: `spread_type` (牌阵类型), `card_count` (卡牌数量)
  - 触发时机: AI 解读生成完成
  - **重要**: 此事件在 GA4 中标记为转化目标

## Google Ads 互联配置

### 1. GA4 后台设置
1. 登录 [Google Analytics](https://analytics.google.com/)
2. 选择你的 GA4 属性
3. 进入"管理" → "数据流" → 选择网站数据流
4. 确认衡量 ID: `G-FPZG3ZXKNE`

### 2. 与 Google Ads 关联
1. 在 GA4 后台进入"管理" → "Google Ads 关联"
2. 点击"关联"按钮
3. 选择要关联的 Google Ads 账户
4. 启用以下选项:
   - 广告个性化
   - 转化导入
   - 受众导入

### 3. 转化目标设置
1. 在 GA4 后台进入"配置" → "事件"
2. 找到 `complete_reading` 事件
3. 点击"标记为转化"
4. 在 Google Ads 后台导入此转化目标

## 验证步骤

### 1. 本地测试
1. 启动开发服务器: `pnpm dev`
2. 访问测试页面: `http://localhost:3000/test/ga4-test`
3. 点击"开始测试所有事件"按钮
4. 打开浏览器开发者工具
5. 在 Network 标签页中查看是否有对 `google-analytics.com` 的请求
6. 在 Console 中查看是否有 GA4 相关的日志

### 2. 生产环境验证
1. 部署到生产环境
2. 在 GA4 后台查看"实时"报告
3. 访问网站并执行以下操作:
   - 访问首页
   - 开始一次占卜
   - 抽牌
   - 查看牌义
   - 完成解读
4. 确认事件在实时报告中正确显示

### 3. DebugView 验证
1. 在 GA4 后台启用 DebugView
2. 在本地或预发环境测试
3. 确认所有事件参数正确传递

### 4. 测试页面
项目包含一个专门的 GA4 测试页面，位于 `/test/ga4-test`，可以快速验证所有事件追踪功能是否正常工作。

## 注意事项

1. **隐私合规**: 当前配置不包含欧盟用户，无需启用 Consent Mode
2. **数据延迟**: GA4 数据通常有 24-48 小时的延迟
3. **事件参数**: 所有自定义事件都包含 `event_category: 'tarot_app'` 便于分析
4. **转化优化**: `complete_reading` 事件将用于 Google Ads 的智能出价和受众构建

## 故障排除

### 常见问题
1. **事件未显示**: 检查网络请求是否成功，确认衡量 ID 正确
2. **参数缺失**: 检查事件触发代码是否正确调用
3. **转化未标记**: 确认在 GA4 后台正确标记事件为转化

### 调试工具
- GA4 DebugView
- 浏览器开发者工具 Network 标签
- Google Tag Assistant (Chrome 扩展)

## 后续优化建议

1. **受众构建**: 基于用户行为创建再营销受众
2. **转化优化**: 使用转化数据优化 Google Ads 出价策略
3. **用户路径分析**: 分析用户从访问到完成解读的完整路径
4. **A/B 测试**: 测试不同牌阵和界面对转化率的影响
