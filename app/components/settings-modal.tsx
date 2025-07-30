"use client"

import { useState } from "react"
import { X, Settings, Bell, Volume2, Moon, Smartphone, Globe, Shield, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEffects: true,
    backgroundMusic: false,
    darkMode: true,
    vibration: true,
    autoSave: true,
    dataSync: true,
    analytics: false,
  })

  if (!isOpen) return null

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const settingsSections = [
    {
      title: "通知设置",
      icon: Bell,
      items: [
        {
          key: "notifications",
          label: "推送通知",
          description: "接收指引提醒和社区消息",
          value: settings.notifications,
        },
      ],
    },
    {
      title: "音效设置",
      icon: Volume2,
      items: [
        {
          key: "soundEffects",
          label: "音效",
          description: "卡牌翻转和选择音效",
          value: settings.soundEffects,
        },
        {
          key: "backgroundMusic",
          label: "背景音乐",
          description: "指引时播放背景音乐",
          value: settings.backgroundMusic,
        },
      ],
    },
    {
      title: "显示设置",
      icon: Moon,
      items: [
        {
          key: "darkMode",
          label: "深色模式",
          description: "使用深色主题界面",
          value: settings.darkMode,
        },
      ],
    },
    {
      title: "设备设置",
      icon: Smartphone,
      items: [
        {
          key: "vibration",
          label: "震动反馈",
          description: "触摸时提供震动反馈",
          value: settings.vibration,
        },
        {
          key: "autoSave",
          label: "自动保存",
          description: "自动保存指引记录",
          value: settings.autoSave,
        },
      ],
    },
    {
      title: "数据设置",
      icon: Globe,
      items: [
        {
          key: "dataSync",
          label: "数据同步",
          description: "在设备间同步指引数据",
          value: settings.dataSync,
        },
        {
          key: "analytics",
          label: "数据分析",
          description: "帮助改进应用体验",
          value: settings.analytics,
        },
      ],
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden border-0 shadow-xl"
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
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: "#F5F5DC" }}>
                设置
              </h3>
              <p className="text-sm" style={{ color: "#D4AF37" }}>
                个性化您的指引体验
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

        {/* Settings List */}
        <div className="overflow-y-auto max-h-96">
          <div className="p-4 space-y-6">
            {settingsSections.map((section) => (
              <div key={section.title}>
                <div className="flex items-center gap-2 mb-3">
                  <section.icon className="w-4 h-4" style={{ color: "#FFD700" }} />
                  <h4 className="font-semibold text-sm" style={{ color: "#F5F5DC" }}>
                    {section.title}
                  </h4>
                </div>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-3 rounded-lg border"
                      style={{
                        backgroundColor: "rgba(255, 215, 0, 0.05)",
                        borderColor: "rgba(255, 215, 0, 0.2)",
                      }}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-sm" style={{ color: "#F5F5DC" }}>
                          {item.label}
                        </div>
                        <div className="text-xs mt-1" style={{ color: "#D4AF37" }}>
                          {item.description}
                        </div>
                      </div>
                      <Switch
                        checked={item.value}
                        onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-400 data-[state=checked]:to-yellow-600"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div className="p-4 border-t" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-red-400" />
              <h4 className="font-semibold text-sm text-red-400">危险操作</h4>
            </div>
            <Button
              variant="outline"
              className="w-full text-red-400 border-red-400/30 hover:bg-red-400/10 bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              清除所有数据
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
