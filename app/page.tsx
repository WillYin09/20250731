"use client"

import { useState } from "react"
import { Calendar, Star, Heart, Lightbulb, BookOpen, ArrowRight } from "lucide-react"

export default function ComplianceHomePage() {
  const [currentDate] = useState(() => {
    const now = new Date()
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    return {
      weekday: weekdays[now.getDay()],
      date: `${now.getFullYear()}/${months[now.getMonth()]}/${String(now.getDate()).padStart(2, '0')}`
    }
  })

  const features = [
    {
      id: "emotion",
      icon: Heart,
      title: "情绪记录",
      tag: "基础",
      description: "记录每一天的情绪波动与内心感受",
      details: "简单记录 • 约3分钟",
      color: "#10b981"
    },
    {
      id: "inspiration", 
      icon: Lightbulb,
      title: "灵感收集",
      tag: "进阶",
      description: "收集生活中的创意想法与灵感火花",
      details: "创意整理 • 约5分钟",
      color: "#3b82f6"
    },
    {
      id: "reflection",
      icon: BookOpen,
      title: "心理笔记",
      tag: "进阶", 
      description: "深入思考，记录内心的成长轨迹",
      details: "深度思考 • 约8分钟",
      color: "#8b5cf6"
    }
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
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#FFD700" }}>抽张卡日记</div>
        <div style={{ width: "24px" }}></div>
      </div>

      {/* Main Title */}
      <div style={{ textAlign: "center", padding: "20px 0 15px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#FFD700", marginBottom: "8px" }}>
          抽张卡日记
        </h1>
        <p style={{ color: "#F5F5DC", fontSize: "14px", lineHeight: "1.5" }}>
          记录你的日常灵感与情绪波动
        </p>
      </div>

      {/* Date and Phase */}
      <div style={{ padding: "0 20px 20px" }}>
        <div
          style={{
            backgroundColor: "rgba(54, 69, 79, 0.7)",
            borderRadius: "12px",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "1px solid rgba(255, 215, 0, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={16} style={{ color: "#D4AF37" }} />
            <span style={{ color: "#F5F5DC", fontSize: "14px" }}>
              {currentDate.weekday} {currentDate.date}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: "#FFD700",
              }}
            />
            <span style={{ color: "#F5F5DC", fontSize: "12px" }}>今日</span>
          </div>
        </div>
      </div>

      {/* Today's Inspiration */}
      <div style={{ padding: "0 20px 25px" }}>
        <div
          style={{
            backgroundColor: "rgba(54, 69, 79, 0.7)",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid rgba(255, 215, 0, 0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Star size={18} style={{ color: "#FFD700" }} />
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC" }}>今日灵感</h2>
          </div>
          
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "60px",
                height: "90px",
                backgroundColor: "rgba(255, 215, 0, 0.1)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255, 215, 0, 0.3)",
                flexShrink: 0,
              }}
            >
              <BookOpen size={24} style={{ color: "#FFD700" }} />
            </div>
            
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#FFD700", marginBottom: "8px" }}>
                记录美好
              </h3>
              <p style={{ fontSize: "13px", color: "#F5F5DC", lineHeight: "1.5", marginBottom: "16px" }}>
                今天是一个值得记录的日子。无论是小小的快乐，还是深刻的感悟，都值得被珍藏。写下你的想法，让内心的声音被听见。
              </p>
              <button
                style={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  border: "none",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.3)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                }}
              >
                <Star size={14} />
                开始记录
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "0 20px 40px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#FFD700", marginBottom: "16px" }}>
          功能模块
        </h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {features.map((feature) => (
            <div
              key={feature.id}
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.7)",
                borderRadius: "12px",
                padding: "16px",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(54, 69, 79, 0.9)"
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(54, 69, 79, 0.7)"
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.2)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: `${feature.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <feature.icon size={20} style={{ color: feature.color }} />
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h4 style={{ fontSize: "15px", fontWeight: "600", color: "#F5F5DC" }}>
                      {feature.title}
                    </h4>
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 6px",
                        borderRadius: "10px",
                        backgroundColor: `${feature.color}30`,
                        color: feature.color,
                        fontWeight: "500",
                      }}
                    >
                      {feature.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#D4AF37", marginBottom: "4px" }}>
                    {feature.description}
                  </p>
                  <p style={{ fontSize: "10px", color: "#9ca3af" }}>
                    {feature.details}
                  </p>
                </div>
                
                <ArrowRight size={16} style={{ color: "#D4AF37" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
