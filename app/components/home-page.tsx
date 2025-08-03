"use client"

import { useState } from "react"
import { Sparkles, Heart, Briefcase, DollarSign, Star, ArrowRight, Crown, Calendar } from "lucide-react"
import CardReadingPage from "./card-reading-page"
import TarotCardImage from "./tarot-card-image"
import { getTarotCard } from "../data/tarot-cards"
import { MAJOR_ARCANA_BRIEF } from "../data/major-arcana-brief"
import { useLunarPhase } from "../hooks/use-lunar-phase"
import CardDetailModal from "./card-detail-modal"
import dailyQuotes from "../data/daily_quotes.json"

export default function HomePage() {
  const [selectedSpread, setSelectedSpread] = useState<number | null>(null)
  const [showReading, setShowReading] = useState(false)
  const [currentSpread, setCurrentSpread] = useState<string>("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const lunarPhase = useLunarPhase()

  const dailyCard = (() => {
    const today = new Date()
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24),
    )
    const card = getTarotCard(dayOfYear % 22) // 只使用大阿卡纳牌作为每日指引
    return {
      ...card,
      meaning: card.normal.split("，")[0], // 取第一个关键词作为简短含义
      description: card.description, // 显示完整描述
    }
  })()

  // 获取今日指引的描述文本，优先使用精简版
  const getDailyCardDescription = () => {
    // 优先查找精简版描述
    const briefDescription = MAJOR_ARCANA_BRIEF[dailyCard.translation]
    if (briefDescription) {
      return briefDescription
    }
    // 如果没有精简版，则使用原始描述
    return dailyCard.description
  }

  // 获取今日名言（每天固定，按日期hash）
  function getTodayQuote() {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    const startIndex = dayOfYear % dailyQuotes.length

    const MAX_COMBINED_LENGTH = 35; // 名言 + "———" + 作者 的最大字符数

    // 尝试从 startIndex 开始，寻找符合长度要求的名言
    for (let i = 0; i < dailyQuotes.length; i++) {
      const quoteIndex = (startIndex + i) % dailyQuotes.length;
      const currentQuote = dailyQuotes[quoteIndex];
      const combinedText = `${currentQuote.quote}——${currentQuote.author}`;
      if (combinedText.length <= MAX_COMBINED_LENGTH) {
        return currentQuote;
      }
    }

    // 如果所有名言都过长，则回退到原始的每日名言
    return dailyQuotes[startIndex];
  }
  const todayQuote = getTodayQuote()

  const allCardSpreads = [
    {
      id: 1,
      name: "三牌阵",
      description: "探索过去、现在与未来的连接",
      icon: Sparkles,
      color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
      cards: 3,
      difficulty: "入门",
      isRecommended: true,
    },
    {
      id: 2,
      name: "情感牌阵",
      description: "洞察感情世界的奥秘",
      icon: Heart,
      color: "bg-gradient-to-r from-pink-400 to-rose-500",
      cards: 5,
      difficulty: "进阶",
      isRecommended: true,
    },
    {
      id: 3,
      name: "职场牌阵",
      description: "指引职场发展方向",
      icon: Briefcase,
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      cards: 4,
      difficulty: "进阶",
      isRecommended: true,
    },
    {
      id: 4,
      name: "财富牌阵",
      description: "预见财富运势走向",
      icon: DollarSign,
      color: "bg-gradient-to-r from-green-400 to-emerald-500",
      cards: 3,
      difficulty: "入门",
      isRecommended: true,
    },
    {
      id: 5,
      name: "凯尔特十字",
      description: "最全面的人生指导牌阵",
      icon: Crown,
      color: "bg-gradient-to-r from-yellow-500 to-orange-500",
      cards: 10,
      difficulty: "专家",
      isRecommended: false,
    },
  ]

  const handleSpreadClick = (spreadId: number) => {
    const spread = allCardSpreads.find((s) => s.id === spreadId)
    if (spread) {
      setCurrentSpread(spread.name)
      setShowReading(true)
    }
  }

  const handleBackToHome = () => {
    setShowReading(false)
    setSelectedSpread(null)
    setCurrentSpread("")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "入门":
        return "bg-green-900 text-green-300 border-green-700"
      case "进阶":
        return "bg-blue-900 text-blue-300 border-blue-700"
      case "专家":
        return "bg-purple-900 text-purple-300 border-purple-700"
      default:
        return "bg-gray-800 text-gray-300 border-gray-600"
    }
  }

  // 获取当前日期和星期
  const getCurrentDateInfo = () => {
    const today = new Date()
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    const weekday = weekdays[today.getDay()]
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")

    return {
      weekday,
      dateString: `${year}/${month}/${day}`,
    }
  }

  const dateInfo = getCurrentDateInfo()

  if (showReading) {
    return <CardReadingPage spreadType={currentSpread} onBack={handleBackToHome} />
  }

  return (
    <div style={{ paddingBottom: "120px", minHeight: "100vh", overflowY: "auto" }}>
      {/* Welcome Section - 移动端优化 */}
      <div style={{ textAlign: "center", padding: "16px 0 0 0" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#FFD700", marginBottom: "8px" }}>抽张塔罗吧</h1>
        <div style={{ fontStyle: "italic", color: "#D4AF37", fontSize: "13px", lineHeight: 1.4, maxWidth: 360, margin: "0 auto 8px auto", textAlign: "center", padding: "0 12px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {todayQuote.quote}
        </div>
      </div>
      
      {/* 日期和月相信息 - 移动端优化 */}
      <div
        style={{
          margin: "0 16px 12px",
          padding: "10px 12px",
          backgroundColor: "rgba(54, 69, 79, 0.8)",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Calendar size={16} style={{ color: "#FFD700" }} />
          <div>
            <span style={{ fontWeight: "600", color: "#F5F5DC", marginRight: "6px", fontSize: "14px" }}>
              {dateInfo.weekday}
            </span>
            <span style={{ color: "#D4AF37", fontSize: "13px" }}>{dateInfo.dateString}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "18px" }}>{lunarPhase.emoji}</span>
          <span style={{ fontWeight: "500", color: "#D4AF37", fontSize: "13px" }}>{lunarPhase.phaseName}</span>
        </div>
      </div>

      {/* 主内容区域 - 移动端垂直布局 */}
      <div style={{ margin: "0 16px" }}>
        {/* 今日指引 - 移动端全宽 */}
        <div
          style={{
            padding: "20px",
            backgroundColor: "rgba(54, 69, 79, 0.9)",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            position: "relative",
            overflow: "hidden",
            marginBottom: "16px",
            border: "1px solid rgba(255, 215, 0, 0.3)",
            backdropFilter: "blur(15px)",
          }}
        >
          {/* Background glow effect */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)",
              animation: "rotate 20s linear infinite",
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: "#FFD700",
              marginBottom: "16px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <Star size={18} />
            <span style={{ fontWeight: "600", fontSize: "16px" }}>今日指引</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              gap: "16px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* 左侧：卡牌图片和名称 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              {/* 卡牌图片 */}
              <div style={{ position: "relative", marginBottom: "8px" }}>
                {/* Card glow effect */}
                <div
                  style={{
                    position: "absolute",
                    inset: "-6px",
                    background: "linear-gradient(45deg, #FFD70040, #B8860B40, #FFA50040, #FFD70040)",
                    borderRadius: "14px",
                    filter: "blur(6px)",
                    animation: "cardGlow 3s ease-in-out infinite alternate",
                  }}
                />
                <TarotCardImage
                  card={dailyCard}
                  isRevealed={true}
                  width={80}
                  height={120}
                  className="shadow-xl"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 4px 20px rgba(255, 215, 0, 0.3))",
                    cursor: "pointer"
                  }}
                  onClick={() => setShowDetailModal(true)}
                />
                {/* Sparkle effects */}
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    fontSize: "12px",
                    animation: "sparkle 2s ease-in-out infinite",
                  }}
                >
                  ✨
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6px",
                    left: "-6px",
                    fontSize: "8px",
                    animation: "sparkle 2s ease-in-out infinite 1s",
                  }}
                >
                  ⭐
                </div>
              </div>
              
              {/* 卡牌名称 - 直接放在卡牌下方 */}
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC", margin: 0, textAlign: "center" }}>
                {dailyCard.translation}
              </h3>
            </div>

            {/* 右侧：文字内容 */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <p
                style={{
                  color: "#D4AF37",
                  lineHeight: "1.6",
                  fontSize: "13px",
                  textAlign: "left",
                  marginTop: "0",
                }}
              >
                {getDailyCardDescription()}
              </p>
            </div>
          </div>
          {/* 新增主操作按钮：立即抽卡 */}
          <div style={{ display: "flex", justifyContent: "center", margin: "16px 0 0 0", position: "relative" }}>
            {/* 呼吸灯光晕 */}
            <div style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "220px",
              height: "60px",
              borderRadius: "30px",
              background: "radial-gradient(circle, #FFD70080 0%, #FFEA7080 60%, transparent 100%)",
              filter: "blur(8px)",
              zIndex: 1,
              pointerEvents: "none",
              animation: "breath-glow 2.8s ease-in-out infinite"
            }} />
            <button
              onClick={() => handleSpreadClick(1)}
              style={{
                padding: "0 36px",
                height: "48px",
                fontSize: "18px",
                fontWeight: 700,
                color: "#333",
                background: "linear-gradient(90deg, #FFD700 0%, #FFEA70 100%)",
                border: "none",
                borderRadius: "24px",
                boxShadow: "0 4px 16px rgba(255,215,0,0.18)",
                cursor: "pointer",
                transition: "box-shadow 0.2s, transform 0.2s",
                outline: "none",
                position: "relative",
                zIndex: 2,
                letterSpacing: "2px",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 0 24px 6px #FFD70080"
                e.currentTarget.style.transform = "scale(1.04)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(255,215,0,0.18)"
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              ✦ 立即抽卡
            </button>
          </div>
        </div>
      </div>

      {/* Card Spreads - 移动端优化 */}
      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#FFD700", margin: 0 }}>
            推荐牌阵
          </h2>
        </div>

        {allCardSpreads.map((spread) => (
          <div
            key={spread.id}
            onClick={() => handleSpreadClick(spread.id)}
            style={{
              marginBottom: "16px",
              padding: "16px",
              backgroundColor: "rgba(54, 69, 79, 0.8)",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              cursor: "pointer",
              border: selectedSpread === spread.id ? "2px solid #FFD700" : "2px solid rgba(255, 215, 0, 0.2)",
              transition: "all 0.2s ease",
              backdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(255, 215, 0, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  flexShrink: 0,
                }}
                className={spread.color}
              >
                <spread.icon size={24} color="white" />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC", margin: 0 }}>{spread.name}</h3>
                  <span
                    className={getDifficultyColor(spread.difficulty)}
                    style={{
                      fontSize: "11px",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      fontWeight: "500",
                      border: "1px solid",
                    }}
                  >
                    {spread.difficulty}
                  </span>
                </div>
                <p style={{ color: "#D4AF37", marginBottom: "4px", fontSize: "13px", lineHeight: "1.4" }}>
                  {spread.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#FFD700" }}>
                  <span>{spread.cards} 张牌</span>
                  <span>•</span>
                  <span>约 {spread.cards <= 3 ? "5" : spread.cards <= 5 ? "8" : "15"} 分钟</span>
                </div>
              </div>

              <ArrowRight size={20} color="#D4AF37" style={{ flexShrink: 0 }} />
            </div>
          </div>
        ))}
      </div>

      {/* 卡牌详情弹窗 */}
      <CardDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        card={dailyCard}
        cardStats={null}
        isDailyGuidance={true}
      />

      {/* 页面底部唯一 <style jsx>，合并 breath-glow 动画 */}
      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cardGlow {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        @keyframes breath-glow {
          0% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
          100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
        }
        /* 移动端媒体查询 */
        @media (max-width: 768px) {
          .touch-target {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </div>
  )
}
