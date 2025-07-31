"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Settings,
  History,
  Award,
  BookOpen,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Star,
  Calendar,
  TrendingUp,
  Sparkles,
  Info,
} from "lucide-react"
import { useUserStats } from "../hooks/use-user-stats"
import { useRecentReadings } from "../hooks/use-recent-readings"
import StatsTooltipModal from "./stats-tooltip-modal"
import RecentReadingDetailModal from "./recent-reading-detail-modal"
import ReadingHistoryModal from "./reading-history-modal"
import AchievementBadgesModal from "./achievement-badges-modal"
import SettingsModal from "./settings-modal"
import PrivacyPolicyModal from "./privacy-policy-modal"
import HelpCenterModal from "./help-center-modal"
import DivinationSkillsPage from "./divination-skills-page"

interface ProfilePageProps {
  onNavigateToSkills?: () => void
}

export default function ProfilePage({ onNavigateToSkills }: ProfilePageProps) {
  const { stats } = useUserStats()
  const { recentReadings, getReadingHistory } = useRecentReadings()
  const [showStatsTooltip, setShowStatsTooltip] = useState<string | null>(null)
  const [showRecentDetail, setShowRecentDetail] = useState(false)
  const [showReadingHistory, setShowReadingHistory] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [showHelpCenter, setShowHelpCenter] = useState(false)
  const [showSkillsPage, setShowSkillsPage] = useState(false)
  const [selectedReading, setSelectedReading] = useState<any>(null)

  const userStatsData = [
    {
      label: "指引次数",
      value: stats.totalDraws.toString(),
      icon: Calendar,
      color: "#FFD700",
      tooltip: "您在抽张塔罗吧进行指引的总次数，包括所有类型的牌阵指引",
    },
    {
      label: "满意度",
      value: `${stats.satisfaction}%`,
      icon: TrendingUp,
      color: "#10b981",
      tooltip: "基于您对指引结果的评分计算的满意度，反映指引结果与您期望的符合程度",
    },
    {
      label: "收藏数",
      value: stats.unlockedCards.toString(),
      icon: Star,
      color: "#FFD700",
      tooltip: "您已解锁的塔罗牌数量，每张牌都代表一次独特的指引体验",
    },
    {
      label: "等级",
      value: stats.level,
      icon: Award,
      color: "#B8860B",
      tooltip: "根据您的指引次数、连续登录天数和解锁卡牌数综合评定的等级",
    },
  ]

  const menuItems = [
    {
      icon: History,
      label: "指引历史",
      badge: null,
      color: "#FFD700",
      onClick: () => setShowReadingHistory(true),
    },
    {
      icon: Award,
      label: "成就徽章",
      badge: "3",
      color: "#FFD700",
      onClick: () => setShowAchievements(true),
    },
    {
      icon: BookOpen,
      label: "学习中心",
      badge: null,
      color: "#B8860B",
      onClick: () => setShowSkillsPage(true),
    },
    {
      icon: Bell,
      label: "消息通知",
      badge: "2",
      color: "#3b82f6",
      onClick: () => {},
    },
    {
      icon: Settings,
      label: "设置",
      badge: null,
      color: "#6b7280",
      onClick: () => setShowSettings(true),
    },
    {
      icon: Shield,
      label: "隐私政策",
      badge: null,
      color: "#6b7280",
      onClick: () => setShowPrivacyPolicy(true),
    },
    {
      icon: HelpCircle,
      label: "帮助中心",
      badge: null,
      color: "#6b7280",
      onClick: () => setShowHelpCenter(true),
    },
  ]

  const handleRecentReadingClick = (reading: any) => {
    setSelectedReading(reading)
    setShowRecentDetail(true)
  }

  const handleBackFromSkills = () => {
    setShowSkillsPage(false)
  }

  if (showSkillsPage) {
    return <DivinationSkillsPage onBack={handleBackFromSkills} />
  }

  return (
    <>
      <div className="space-y-6 pb-8 starry-background min-h-screen">
        {/* Profile Header - 移动端优化 */}
        <div className="text-center space-y-3 pt-4 px-4">
          <div className="relative inline-block">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
              }}
            >
              🔮
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-md"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
              }}
            >
              <Star className="w-2 h-2 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="serif-font text-lg font-bold" style={{ color: "#FFD700" }}>
              神秘指引师
            </h1>
            <p className="text-sm" style={{ color: "#D4AF37" }}>
              进阶卡牌师 • 已加入 180 天
            </p>
          </div>
        </div>

        {/* Stats - 移动端优化 */}
        <div className="grid grid-cols-4 gap-2 px-4">
          {userStatsData.map((stat) => (
            <Card
              key={stat.label}
              className="border-0 shadow-md"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
            >
              <div className="p-3 text-center space-y-2">
                <div className="flex items-center justify-center gap-1">
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto min-w-0 w-3 h-3"
                    onClick={() => setShowStatsTooltip(stat.label)}
                  >
                    <Info className="w-2 h-2" style={{ color: "#6b7280" }} />
                  </Button>
                </div>
                <div className="text-base font-bold" style={{ color: "#F5F5DC" }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "#D4AF37" }}>
                  {stat.label}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Recent Readings - 移动端优化 */}
        <div className="space-y-3 px-4">
          <h2 className="serif-font text-base font-semibold" style={{ color: "#F5F5DC" }}>
            最近指引
          </h2>
          <Card
            className="border-0 shadow-md"
            style={{
              backgroundColor: "rgba(54, 69, 79, 0.9)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div className="p-4 space-y-3">
              {recentReadings.slice(0, 3).map((reading, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                  }}
                  onClick={() => handleRecentReadingClick(reading)}
                >
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
                      <div className="font-semibold text-sm" style={{ color: "#F5F5DC" }}>
                        {reading.type}
                      </div>
                      <div className="text-xs" style={{ color: "#D4AF37" }}>
                        {reading.date}
                      </div>
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
                    <ChevronRight className="w-3 h-3" style={{ color: "#D4AF37" }} />
                  </div>
                </div>
              ))}
              {recentReadings.length === 0 && (
                <div className="text-center py-6">
                  <Sparkles className="w-6 h-6 mx-auto mb-2" style={{ color: "#6b7280" }} />
                  <p className="text-sm" style={{ color: "#F5F5DC" }}>
                    还没有指引记录
                  </p>
                  <p className="text-xs" style={{ color: "#D4AF37" }}>
                    完成第一次指引后，记录会显示在这里
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Menu Items - 移动端优化 */}
        <div className="space-y-2 px-4">
          {menuItems.map((item) => (
            <Card
              key={item.label}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
            >
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto hover:bg-transparent"
                style={{ color: "#F5F5DC" }}
                onClick={item.onClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                }}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: "#ef4444",
                        color: "white",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-3 h-3" style={{ color: "#D4AF37" }} />
                </div>
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <StatsTooltipModal
        isOpen={!!showStatsTooltip}
        onClose={() => setShowStatsTooltip(null)}
        statType={showStatsTooltip}
        tooltip={userStatsData.find((s) => s.label === showStatsTooltip)?.tooltip || ""}
      />

      <RecentReadingDetailModal
        isOpen={showRecentDetail}
        onClose={() => setShowRecentDetail(false)}
        reading={selectedReading}
      />

      <ReadingHistoryModal
        isOpen={showReadingHistory}
        onClose={() => setShowReadingHistory(false)}
        readings={getReadingHistory(10)}
      />

      <AchievementBadgesModal isOpen={showAchievements} onClose={() => setShowAchievements(false)} />

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <PrivacyPolicyModal isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />

      <HelpCenterModal isOpen={showHelpCenter} onClose={() => setShowHelpCenter(false)} />
    </>
  )
}
