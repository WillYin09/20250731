"use client"

import { useState } from "react"
import { X, Calendar, BarChart3, Eye, Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import TarotCardImage from "./tarot-card-image"
import type { TarotCardData } from "../data/tarot-cards"
import type { CollectedCard } from "../hooks/use-card-collection"

interface CardDetailModalProps {
  isOpen: boolean
  onClose: () => void
  card: TarotCardData
  cardStats: CollectedCard | null
  isDailyGuidance?: boolean
}

export default function CardDetailModal({ isOpen, onClose, card, cardStats, isDailyGuidance = false }: CardDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "stats" | "history">("info")

  if (!isOpen) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
        backdropFilter: "blur(10px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          maxWidth: "400px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          animation: "modalSlideIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            position: "relative",
            padding: "20px",
            background: "linear-gradient(135deg, #7A5CAB 0%, #A0C3B2 100%)",
            borderRadius: "20px 20px 0 0",
            color: "white",
            textAlign: "center",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(10px)",
            }}
          >
            <X size={18} color="white" />
          </button>

          <div style={{ marginBottom: "16px" }}>
            <TarotCardImage
              card={card}
              isRevealed={true}
              width={120}
              height={180}
              className="shadow-lg"
              style={{ margin: "0 auto" }}
            />
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>{card.translation}</h2>
          <p style={{ fontSize: "14px", opacity: 0.9, marginBottom: "0" }}>{card.name}</p>
        </div>

        {/* Tabs - 只在非今日指引时显示 */}
        {!isDailyGuidance && (
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #e5e5e5",
              backgroundColor: "#f8f9fa",
            }}
          >
            {[
              { id: "info", label: "牌意", icon: Sparkles },
              { id: "stats", label: "统计", icon: BarChart3 },
              { id: "history", label: "记录", icon: Eye },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: "12px 8px",
                  border: "none",
                  backgroundColor: "transparent",
                  color: activeTab === tab.id ? "#7A5CAB" : "#777",
                  fontSize: "14px",
                  fontWeight: activeTab === tab.id ? "600" : "400",
                  cursor: "pointer",
                  borderBottom: activeTab === tab.id ? "2px solid #7A5CAB" : "2px solid transparent",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: "20px" }}>
          {/* 今日指引模式 - 只显示牌意 */}
          {isDailyGuidance && (
            <div style={{ space: "16px" }}>
              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>正位含义</h3>
                <p style={{ color: "#555", lineHeight: "1.6", fontSize: "14px" }}>{card.normal}</p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>逆位含义</h3>
                <p style={{ color: "#555", lineHeight: "1.6", fontSize: "14px" }}>{card.reversed}</p>
              </div>

              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>详细描述</h3>
                <p style={{ color: "#555", lineHeight: "1.6", fontSize: "14px" }}>{card.description}</p>
              </div>
            </div>
          )}

          {/* 正常模式 - 显示所有tab内容 */}
          {!isDailyGuidance && (
            <>
              {activeTab === "info" && (
                <div style={{ space: "16px" }}>
                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>正位含义</h3>
                    <p style={{ color: "#555", lineHeight: "1.6", fontSize: "14px" }}>{card.normal}</p>
                  </div>

                  <div style={{ marginBottom: "20px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>逆位含义</h3>
                    <p style={{ color: "#555", lineHeight: "1.6", fontSize: "14px" }}>{card.reversed}</p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>详细描述</h3>
                    <p style={{ color: "#555", lineHeight: "1.6", fontSize: "14px" }}>{card.description}</p>
                  </div>
                </div>
              )}

              {activeTab === "stats" && (
                <div>
                  {cardStats ? (
                    <div style={{ space: "16px" }}>
                      <div
                        style={{
                          backgroundColor: "#f8f4ff",
                          padding: "16px",
                          borderRadius: "12px",
                          marginBottom: "16px",
                          border: "1px solid #e0d4ff",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                          <Calendar size={16} style={{ color: "#7A5CAB" }} />
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#7A5CAB" }}>初次相遇</span>
                        </div>
                        <p style={{ fontSize: "16px", color: "#333", margin: 0 }}>
                          你与【{card.translation}】的初次相遇是在 {formatDate(cardStats.firstEncounter)}
                        </p>
                      </div>

                      <div
                        style={{
                          backgroundColor: "#f0f8f4",
                          padding: "16px",
                          borderRadius: "12px",
                          marginBottom: "16px",
                          border: "1px solid #d4e6da",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                          <TrendingUp size={16} style={{ color: "#A0C3B2" }} />
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#A0C3B2" }}>抽取统计</span>
                        </div>
                        <div style={{ space: "8px" }}>
                          <p style={{ fontSize: "14px", color: "#333", margin: "0 0 4px 0" }}>
                            这张牌你一共抽到了 <strong>{cardStats.totalDraws}</strong> 次
                          </p>
                          <p style={{ fontSize: "14px", color: "#333", margin: "0 0 4px 0" }}>
                            其中 <strong>{cardStats.normalDraws}</strong> 次为正位，
                            <strong>{cardStats.reversedDraws}</strong> 次为逆位
                          </p>
                          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                            <div
                              style={{
                                flex: cardStats.normalDraws,
                                height: "6px",
                                backgroundColor: "#10b981",
                                borderRadius: "3px",
                              }}
                            />
                            <div
                              style={{
                                flex: cardStats.reversedDraws,
                                height: "6px",
                                backgroundColor: "#ef4444",
                                borderRadius: "3px",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        style={{
                          width: "100%",
                          borderColor: "#7A5CAB",
                          color: "#7A5CAB",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => setActiveTab("history")}
                      >
                        查看所有包含这张牌的牌阵记录
                      </Button>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "40px 20px" }}>
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          backgroundColor: "#f3f4f6",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px",
                        }}
                      >
                        <BarChart3 size={32} style={{ color: "#9ca3af" }} />
                      </div>
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>
                        暂无统计数据
                      </h3>
                      <p style={{ fontSize: "14px", color: "#777" }}>完成指引后，这里将显示你与这张牌的相遇记录</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div>
                  {cardStats && cardStats.encounters.length > 0 ? (
                    <div style={{ space: "12px" }}>
                      {cardStats.encounters.slice(0, 10).map((encounter, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "12px",
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                            marginBottom: "8px",
                            border: "1px solid #e9ecef",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "4px",
                            }}
                          >
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#333" }}>
                              {encounter.spreadType}
                            </span>
                            <span style={{ fontSize: "12px", color: "#777" }}>{encounter.date}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "12px", color: "#555" }}>{encounter.position}位置</span>
                            <span
                              style={{
                                fontSize: "10px",
                                padding: "2px 6px",
                                backgroundColor: encounter.reversed ? "#fef2f2" : "#f0f9ff",
                                color: encounter.reversed ? "#dc2626" : "#2563eb",
                                borderRadius: "4px",
                              }}
                            >
                              {encounter.reversed ? "逆位" : "正位"}
                            </span>
                          </div>
                        </div>
                      ))}
                      {cardStats.encounters.length > 10 && (
                        <p style={{ textAlign: "center", fontSize: "12px", color: "#777", marginTop: "12px" }}>
                          还有 {cardStats.encounters.length - 10} 条记录...
                        </p>
                      )}
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "40px 20px" }}>
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          backgroundColor: "#f3f4f6",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px",
                        }}
                      >
                        <Eye size={32} style={{ color: "#9ca3af" }} />
                      </div>
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#333", marginBottom: "8px" }}>
                        暂无历史记录
                      </h3>
                      <p style={{ fontSize: "14px", color: "#777" }}>完成指引后，这里将显示包含这张牌的所有牌阵记录</p>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
