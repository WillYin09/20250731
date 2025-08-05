"use client"

import { ArrowLeft, Sparkles, Heart, Users, Target, BookOpen, Zap, Star, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface BeginnerGuidePageProps {
  onBack: () => void
}

export default function BeginnerGuidePage({ onBack }: BeginnerGuidePageProps) {
  const features = [
    {
      icon: Target,
      title: "多种牌阵指引",
description: "提供三牌阵、情感牌阵、职场牌阵等多种专业牌阵，满足不同需求",
      color: "#FFD700",
      steps: ["选择适合的牌阵", "根据直觉选择卡牌", "获得AI深度解读"],
    },
    {
      icon: Heart,
      title: "收藏指引记录",
description: "保存重要的指引结果，随时回顾人生的重要时刻和指引",
      color: "#ec4899",
      steps: ["完成指引后评分", "收藏有意义的解读", "在收藏页面管理记录"],
    },
    {
      icon: BookOpen,
      title: "卡牌图鉴",
description: "通过指引逐步解锁78张卡牌，学习每张牌的深层含义",
      color: "#B8860B",
      steps: ["指引中抽到新牌", "自动解锁牌意信息", "查看详细解读和统计"],
    },
    {
      icon: Users,
      title: "社区交流",
      description: "与其他卡牌爱好者分享心得，学习指引技巧和牌意解读",
      color: "#ef4444",
      steps: ["浏览热门话题", "学习指引技巧", "参与社区讨论"],
    },
  ]

  const quickStart = [
    {
      step: 1,
      title: "选择牌阵",
      description: "在主页选择适合你问题的牌阵类型",
      icon: "🎯",
    },
    {
      step: 2,
      title: "选择卡牌",
      description: "根据直觉从牌堆中选择相应数量的卡牌",
      icon: "🃏",
    },
    {
      step: 3,
      title: "获得解读",
      description: "AI将为你提供专业的牌意解读和人生指引",
      icon: "✨",
    },
    {
      step: 4,
      title: "收藏记录",
      description: "为解读评分并收藏，方便日后回顾",
      icon: "💝",
    },
  ]

  const tips = [
    {
      icon: "🧘",
      title: "保持开放心态",
      content: "卡牌指引需要开放的心态，相信你的直觉选择",
    },
    {
      icon: "🤔",
      title: "明确问题",
      content: "在指引前明确你想要探索的问题，避免过于模糊",
    },
    {
      icon: "📝",
      title: "记录感悟",
      content: "记录每次指引的感悟，有助于提升解读能力",
    },
    {
      icon: "🌙",
      title: "选择合适时机",
      content: "在心情平静时进行指引，效果会更好",
    },
  ]

  return (
    <div className="starry-background min-h-screen">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          paddingTop: "50px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            color: "#F5F5DC",
            fontSize: "15px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            padding: "8px",
            borderRadius: "6px",
            zIndex: 20,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-3px)"
            e.currentTarget.style.color = "#FFD700"
            e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)"
            e.currentTarget.style.color = "#F5F5DC"
            e.currentTarget.style.backgroundColor = "transparent"
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          <ArrowLeft size={18} />
          返回
        </button>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", padding: "15px 0 25px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#FFD700", marginBottom: "6px" }}>从0~1入门指南</h1>
        <p style={{ color: "#D4AF37", fontSize: "14px" }}>快速学会塔罗技巧</p>
      </div>

      {/* Welcome Section */}
      <div style={{ padding: "0 20px 25px" }}>
        <Card
          className="border-0 shadow-md"
          style={{
            background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(184, 134, 11, 0.1) 100%)",
            border: "1px solid rgba(255, 215, 0, 0.2)",
            backdropFilter: "blur(15px)",
          }}
        >
          <div style={{ padding: "24px", textAlign: "center" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>🔮</div>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#F5F5DC", marginBottom: "12px" }}>
              欢迎来到情绪指引
            </h2>
            <p style={{ lineHeight: "1.6", color: "#F5F5DC", fontSize: "14px" }}>
              这里是一个现代化的情绪指引平台，结合传统智慧与AI技术，为你提供深度的人生指引。
无论你是卡牌新手还是资深爱好者，都能在这里找到属于自己的答案。
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Start */}
      <div style={{ padding: "0 20px 25px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Zap className="w-5 h-5" style={{ color: "#FFD700" }} />
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC" }}>快速开始</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {quickStart.map((item, index) => (
            <Card
              key={index}
              className="border-0 shadow-md"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
            >
              <div style={{ padding: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ fontSize: "24px" }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#FFD700",
                        color: "black",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {item.step}
                    </span>
                    <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#F5F5DC" }}>{item.title}</h3>
                  </div>
                  <p style={{ fontSize: "12px", color: "#D4AF37" }}>{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Features */}
      <div style={{ padding: "0 20px 25px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Star className="w-5 h-5" style={{ color: "#FFD700" }} />
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC" }}>主要功能</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-md"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
            >
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: feature.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC", marginBottom: "4px" }}>
                      {feature.title}
                    </h3>
                    <p style={{ fontSize: "12px", color: "#D4AF37" }}>{feature.description}</p>
                  </div>
                </div>
                <div style={{ paddingLeft: "52px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {feature.steps.map((step, stepIndex) => (
                      <div key={stepIndex} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: "#D4AF37",
                          }}
                        ></div>
                        <span style={{ fontSize: "11px", color: "#F5F5DC" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div style={{ padding: "0 20px 25px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <Gift className="w-5 h-5" style={{ color: "#FFD700" }} />
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC" }}>指引小贴士</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
          {tips.map((tip, index) => (
            <Card
              key={index}
              className="border-0 shadow-md"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
            >
              <div style={{ padding: "16px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <div style={{ fontSize: "20px" }}>{tip.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#F5F5DC", marginBottom: "4px" }}>
                    {tip.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#D4AF37" }}>{tip.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ padding: "0 20px 40px" }}>
        <Card
          className="border-0 shadow-md"
          style={{
            background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
          }}
        >
          <div style={{ padding: "24px", textAlign: "center", color: "white" }}>
            <Sparkles className="w-8 h-8" style={{ margin: "0 auto 16px" }} />
            <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>准备好开始你的指引之旅了吗？</h2>
            <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "16px" }}>
              点击下方按钮，返回主页开始你的第一次指引体验
            </p>
            <Button
              onClick={onBack}
              style={{
                backgroundColor: "white",
                color: "#FFD700",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white"
              }}
            >
              开始指引
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
