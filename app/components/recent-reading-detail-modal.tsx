"use client"

import { X, Calendar, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface RecentReadingDetailModalProps {
  isOpen: boolean
  onClose: () => void
  reading: any
}

export default function RecentReadingDetailModal({ isOpen, onClose, reading }: RecentReadingDetailModalProps) {
  if (!isOpen || !reading) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto border-0 shadow-lg"
        style={{
          backgroundColor: "rgba(54, 69, 79, 0.95)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          backdropFilter: "blur(15px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
              }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold" style={{ color: "#F5F5DC" }}>
                {reading.type}
              </h2>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#D4AF37" }}>
                <Calendar className="w-3 h-3" />
                {reading.date}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-white/10"
            style={{ color: "#F5F5DC" }}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Question */}
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#F5F5DC" }}>
              指引问题
            </h3>
            <p className="text-sm" style={{ color: "#D4AF37" }}>
              {reading.question || "关于未来发展的指引"}
            </p>
          </div>

          {/* Cards */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: "#F5F5DC" }}>
              抽取卡牌
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {reading.cards?.map((card: any, index: number) => (
                <Card
                  key={index}
                  className="border-0 shadow-sm"
                  style={{
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    border: "1px solid rgba(255, 215, 0, 0.2)",
                  }}
                >
                  <div className="p-3 text-center">
                    <div
                      className="w-12 h-16 mx-auto mb-2 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: "rgba(255, 215, 0, 0.2)" }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: "#FFD700" }} />
                    </div>
                    <p className="text-xs font-medium" style={{ color: "#F5F5DC" }}>
                      {card.name || `卡牌 ${index + 1}`}
                    </p>
                  </div>
                </Card>
              )) ||
                // Fallback for readings without detailed card info
                Array.from({ length: 3 }, (_, index) => (
                  <Card
                    key={index}
                    className="border-0 shadow-sm"
                    style={{
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                      border: "1px solid rgba(255, 215, 0, 0.2)",
                    }}
                  >
                    <div className="p-3 text-center">
                      <div
                        className="w-12 h-16 mx-auto mb-2 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255, 215, 0, 0.2)" }}
                      >
                        <Sparkles className="w-4 h-4" style={{ color: "#FFD700" }} />
                      </div>
                      <p className="text-xs font-medium" style={{ color: "#F5F5DC" }}>
                        卡牌 {index + 1}
                      </p>
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Reading Result */}
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#F5F5DC" }}>
              解读结果
            </h3>
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: "rgba(255, 215, 0, 0.05)",
                border: "1px solid rgba(255, 215, 0, 0.1)",
              }}
            >
              <p className="text-sm leading-relaxed" style={{ color: "#F5F5DC" }}>
                {reading.interpretation || "这次指引显示了积极的能量流动，建议保持开放的心态面对即将到来的变化。"}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold mb-2" style={{ color: "#F5F5DC" }}>
              准确度评分
            </h3>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${index < (reading.rating || 4) ? "fill-current" : ""}`}
                  style={{ color: "#FFD700" }}
                />
              ))}
              <span className="text-sm ml-2" style={{ color: "#D4AF37" }}>
                {reading.rating || 4}/5 分
              </span>
            </div>
          </div>

          {/* Tags */}
          {reading.tags && reading.tags.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2" style={{ color: "#F5F5DC" }}>
                相关标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {reading.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full border"
                    style={{
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                      color: "#FFD700",
                      borderColor: "rgba(255, 215, 0, 0.3)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <Button
            onClick={onClose}
            className="w-full text-white hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
            }}
          >
            关闭
          </Button>
        </div>
      </div>
    </div>
  )
}
