"use client"

import type React from "react"

import { X, Award, Star, Calendar, Target, BookOpen, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  color: string
  progress: number
  maxProgress: number
  unlocked: boolean
  unlockedDate?: string
  category: "指引" | "学习" | "社交" | "特殊"
}

interface AchievementBadgesModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AchievementBadgesModal({ isOpen, onClose }: AchievementBadgesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("全部")

  const achievements: Achievement[] = [
    {
      id: "first_reading",
          name: "初次指引",
    description: "完成第一次卡牌指引",
      icon: Star,
      color: "#FFD700",
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedDate: "2024-01-15",
      category: "指引",
    },
    {
      id: "reading_streak_7",
      name: "七日连指",
      description: "连续7天进行指引",
      icon: Calendar,
      color: "#10b981",
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      unlockedDate: "2024-01-22",
      category: "指引",
    },
    {
      id: "accurate_reader",
      name: "准确指引师",
      description: "获得10次5星评价",
      icon: Target,
      color: "#8b5cf6",
      progress: 8,
      maxProgress: 10,
      unlocked: false,
      category: "指引",
    },
    {
      id: "card_collector",
      name: "卡牌收集家",
      description: "解锁所有78张卡牌",
      icon: BookOpen,
      color: "#f59e0b",
      progress: 45,
      maxProgress: 78,
      unlocked: false,
      category: "学习",
    },
    {
      id: "community_helper",
      name: "社区助手",
      description: "帮助50位新手解答问题",
      icon: Users,
      color: "#06b6d4",
      progress: 23,
      maxProgress: 50,
      unlocked: false,
      category: "社交",
    },
    {
      id: "master_reader",
      name: "指引大师",
      description: "完成1000次指引",
      icon: Trophy,
      color: "#dc2626",
      progress: 234,
      maxProgress: 1000,
      unlocked: false,
      category: "特殊",
    },
  ]

  const categories = ["全部", "指引", "学习", "社交", "特殊"]

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "全部" || achievement.category === selectedCategory,
  )

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length

  if (!isOpen) return null

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
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: "#F5F5DC" }}>
                成就徽章
              </h3>
              <p className="text-sm" style={{ color: "#D4AF37" }}>
                已解锁 {unlockedCount}/{totalCount} 个成就
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

        {/* Progress Bar */}
        <div className="p-4 border-b" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: "#F5F5DC" }}>
              总体进度
            </span>
            <span className="text-sm" style={{ color: "#D4AF37" }}>
              {Math.round((unlockedCount / totalCount) * 100)}%
            </span>
          </div>
          <div
            className="w-full h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: "rgba(255, 215, 0, 0.2)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${(unlockedCount / totalCount) * 100}%`,
                background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
              }}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="p-4 border-b" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "text-white font-medium whitespace-nowrap"
                    : "text-white border-white/30 hover:bg-white/10 whitespace-nowrap bg-transparent"
                }
                style={
                  selectedCategory === category
                    ? {
                        background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
                      }
                    : {}
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Achievements List */}
        <div className="overflow-y-auto max-h-96">
          <div className="p-4 space-y-3">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  achievement.unlocked ? "shadow-md" : "opacity-60"
                }`}
                style={{
                  backgroundColor: achievement.unlocked ? "rgba(255, 215, 0, 0.1)" : "rgba(255, 215, 0, 0.05)",
                  borderColor: achievement.unlocked ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 215, 0, 0.2)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${
                      achievement.unlocked ? "" : "grayscale"
                    }`}
                    style={{
                      backgroundColor: achievement.unlocked ? achievement.color : "#6b7280",
                    }}
                  >
                    <achievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold" style={{ color: "#F5F5DC" }}>
                        {achievement.name}
                      </h4>
                      {achievement.unlocked && (
                        <div
                          className="text-xs px-2 py-1 rounded-full font-medium border"
                          style={{
                            backgroundColor: "rgba(16, 185, 129, 0.1)",
                            color: "#10b981",
                            borderColor: "rgba(16, 185, 129, 0.3)",
                          }}
                        >
                          已解锁
                        </div>
                      )}
                    </div>
                    <p className="text-sm mb-2" style={{ color: "#D4AF37" }}>
                      {achievement.description}
                    </p>
                    {achievement.unlockedDate && (
                      <p className="text-xs" style={{ color: "#6b7280" }}>
                        解锁时间：{achievement.unlockedDate}
                      </p>
                    )}
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs" style={{ color: "#D4AF37" }}>
                            进度：{achievement.progress}/{achievement.maxProgress}
                          </span>
                          <span className="text-xs" style={{ color: "#D4AF37" }}>
                            {Math.round((achievement.progress / achievement.maxProgress) * 100)}%
                          </span>
                        </div>
                        <div
                          className="w-full h-1.5 rounded-full overflow-hidden"
                          style={{ backgroundColor: "rgba(255, 215, 0, 0.2)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                              backgroundColor: achievement.color,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
