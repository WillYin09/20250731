'use client'

import { useGoogleAnalytics } from '../../hooks/use-google-analytics'

export default function GA4TestPage() {
  const { 
    trackStartReading, 
    trackDrawCard, 
    trackViewCardDetail, 
    trackCompleteReading, 
    trackSaveReading,
    isClient
  } = useGoogleAnalytics()

  const testEvents = () => {
    if (!isClient) {
      console.log('⚠️ 等待客户端加载完成...')
      return
    }

    console.log('开始测试 GA4 事件...')
    
    // 测试开始占卜
    trackStartReading('三牌阵')
    console.log('✅ 已触发 start_reading 事件')
    
    // 测试抽牌
    trackDrawCard('愚者', '过去')
    console.log('✅ 已触发 draw_card 事件')
    
    // 测试查看牌义
    trackViewCardDetail('愚者')
    console.log('✅ 已触发 view_card_detail 事件')
    
    // 测试完成解读
    trackCompleteReading('三牌阵', 3)
    console.log('✅ 已触发 complete_reading 事件')
    
    // 测试收藏解读
    trackSaveReading('三牌阵', 5, '积极')
    console.log('✅ 已触发 save_reading 事件')
    
    console.log('🎉 所有事件测试完成！请检查 GA4 后台的实时报告。')
  }

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '30px' }}>
        GA4 事件追踪测试页面
      </h1>
      
      {!isClient && (
        <div style={{ 
          backgroundColor: 'rgba(255, 193, 7, 0.2)', 
          padding: '15px', 
          borderRadius: '8px',
          border: '1px solid #FFC107',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#FFC107', margin: 0 }}>
            ⏳ 正在加载客户端组件...
          </p>
        </div>
      )}
      
      <div style={{ 
        backgroundColor: 'rgba(54, 69, 79, 0.9)', 
        padding: '20px', 
        borderRadius: '12px',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#F5F5DC', marginBottom: '15px' }}>测试说明</h2>
        <p style={{ color: '#D4AF37', lineHeight: '1.6', marginBottom: '15px' }}>
          此页面用于测试 Google Analytics 4 的事件追踪功能。点击下方按钮将触发所有预定义的事件。
        </p>
        <p style={{ color: '#D4AF37', lineHeight: '1.6' }}>
          <strong>注意：</strong>请确保已正确配置 GA4 衡量 ID，并在浏览器开发者工具中查看网络请求和控制台日志。
        </p>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(54, 69, 79, 0.9)', 
        padding: '20px', 
        borderRadius: '12px',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        marginBottom: '20px'
      }}>
        <h3 style={{ color: '#F5F5DC', marginBottom: '15px' }}>测试事件列表</h3>
        <ul style={{ color: '#D4AF37', lineHeight: '1.8' }}>
          <li><strong>start_reading</strong> - 开始占卜（三牌阵）</li>
          <li><strong>draw_card</strong> - 抽牌（愚者，过去位置）</li>
          <li><strong>view_card_detail</strong> - 查看牌义（愚者）</li>
          <li><strong>complete_reading</strong> - 完成解读（三牌阵，3张牌）</li>
          <li><strong>save_reading</strong> - 收藏解读（三牌阵，5星，积极）</li>
        </ul>
      </div>

      <button
        onClick={testEvents}
        disabled={!isClient}
        style={{
          width: '100%',
          padding: '15px 20px',
          backgroundColor: isClient ? '#FFD700' : '#6b7280',
          color: '#333',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: isClient ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          opacity: isClient ? 1 : 0.6,
        }}
        onMouseEnter={(e) => {
          if (isClient) {
            e.currentTarget.style.backgroundColor = '#FFEA70'
            e.currentTarget.style.transform = 'scale(1.02)'
          }
        }}
        onMouseLeave={(e) => {
          if (isClient) {
            e.currentTarget.style.backgroundColor = '#FFD700'
            e.currentTarget.style.transform = 'scale(1)'
          }
        }}
      >
        {isClient ? '🚀 开始测试所有事件' : '⏳ 等待加载完成...'}
      </button>

      <div style={{ 
        backgroundColor: 'rgba(54, 69, 79, 0.9)', 
        padding: '20px', 
        borderRadius: '12px',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        marginTop: '20px'
      }}>
        <h3 style={{ color: '#F5F5DC', marginBottom: '15px' }}>验证步骤</h3>
        <ol style={{ color: '#D4AF37', lineHeight: '1.8' }}>
          <li>等待页面加载完成（按钮变为可用状态）</li>
          <li>点击上方测试按钮</li>
          <li>打开浏览器开发者工具（F12）</li>
          <li>查看 Console 标签页的日志输出</li>
          <li>查看 Network 标签页是否有对 google-analytics.com 的请求</li>
          <li>在 GA4 后台查看"实时"报告</li>
        </ol>
      </div>
    </div>
  )
}
