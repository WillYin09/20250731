"use client"

import { useState } from "react"
import { X, Calendar, Star, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RecentReading } from "../hooks/use-recent-readings"

interface ReadingHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  readings: RecentReading[]
}

export default function ReadingHistoryModal({ isOpen, onClose, readings }: ReadingHistoryModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("全部")
  const [selectedReading, setSelectedReading] = useState<RecentReading | null>(null)

  if (!isOpen) return null

  const filterTypes = ["全部", "三牌阵", "情感牌阵", "职场牌阵", "单牌指引"]

  const filteredReadings = readings.filter((reading) => {
    const matchesSearch =
      reading.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reading.result.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "全部" || reading.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden border-0 shadow-xl"
        style={{
          backgroundColor: "rgba(54, 69, 79, 0.95)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          backdropFilter: "blur(15px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-sm"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
              }}
            >
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: "#F5F5DC" }}>
                指引历史
              </h3>
              <p className="text-sm" style={{ color: "#D4AF37" }}>
                共 {readings.length} 条记录
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-white/10"
            style={{ color: "#D4AF37" }}
          >
            <X size={20} />
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 space-y-3 border-b" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
              style={{ color: "#D4AF37" }}
            />
            <Input
              placeholder="搜索指引记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 text-white placeholder:text-gray-400"
              style={{
                backgroundColor: "rgba(255, 215, 0, 0.1)",
                border: "1px solid rgba(255, 215, 0, 0.3)",
              }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {filterTypes.map((type) => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType(type)}
                className={
                  filterType === type
                    ? "text-white font-medium whitespace-nowrap"
                    : "text-white border-white/30 hover:bg-white/10 whitespace-nowrap bg-transparent"
                }
                style={
                  filterType === type
                    ? {
                        background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
                      }
                    : {}
                }
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Reading List */}
        <div className="overflow-y-auto max-h-96">
          {filteredReadings.length > 0 ? (
            <div className="p-4 space-y-3">
              {filteredReadings.map((reading, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg cursor-pointer transition-all duration-200 border hover:shadow-md"
                  style={{
                    backgroundColor: "rgba(255, 215, 0, 0.05)",
                    borderColor: "rgba(255, 215, 0, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.05)"
                  }}
                  onClick={() => setSelectedReading(reading)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                        style={{
                          background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm" style={{ color: "#F5F5DC" }}>
                          {reading.type}
                        </h4>
                        <p className="text-xs" style={{ color: "#D4AF37" }}>
                          {reading.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="text-xs px-2 py-1 rounded-full font-medium border"
                        style={{
                          backgroundColor: "rgba(255, 215, 0, 0.1)",
                          color: "#FFD700",
                          borderColor: "rgba(255, 215, 0, 0.3)",
                        }}
                      >
                        {reading.result}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < reading.rating ? "text-yellow-400 fill-current" : "text-gray-500"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#D4AF37" }}>
                    {reading.summary.length > 100 ? `${reading.summary.substring(0, 100)}...` : reading.summary}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-3" style={{ color: "#6b7280" }} />
              <p className="font-medium" style={{ color: "#F5F5DC" }}>
                没有找到匹配的记录
              </p>
              <p className="text-sm mt-1" style={{ color: "#D4AF37" }}>
                尝试调整搜索条件或筛选器
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
