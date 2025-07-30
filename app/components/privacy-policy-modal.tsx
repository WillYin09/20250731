"use client"

import { X, Shield, Eye, Database, Lock, UserCheck, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null

  const sections = [
    {
      title: "信息收集",
      icon: Database,
      color: "#3b82f6",
      content: [
        "我们收集您主动提供的信息，如指引问题和反馈",
"自动收集的使用数据，如指引频率和偏好设置",
        "设备信息，用于优化应用性能和兼容性",
        "不会收集您的个人身份信息或敏感数据",
      ],
    },
    {
      title: "信息使用",
      icon: Eye,
      color: "#10b981",
      content: [
        "提供个性化的指引体验和建议",
        "改进应用功能和用户体验",
        "生成匿名的使用统计和分析报告",
        "发送重要的应用更新和安全通知",
      ],
    },
    {
      title: "数据安全",
      icon: Lock,
      color: "#f59e0b",
      content: [
        "使用行业标准的加密技术保护您的数据",
        "定期进行安全审计和漏洞检测",
        "限制员工对用户数据的访问权限",
        "不会将您的数据出售给第三方",
      ],
    },
    {
      title: "用户权利",
      icon: UserCheck,
      color: "#8b5cf6",
      content: [
        "您有权查看我们收集的关于您的信息",
        "可以要求更正或删除您的个人数据",
        "可以随时撤回对数据处理的同意",
        "可以导出您的指引历史和设置数据",
      ],
    },
  ]

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
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: "#F5F5DC" }}>
                隐私政策
              </h3>
              <p className="text-sm" style={{ color: "#D4AF37" }}>
                保护您的隐私是我们的承诺
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

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          <div className="p-4 space-y-6">
            {/* Introduction */}
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: "rgba(255, 215, 0, 0.1)",
                borderColor: "rgba(255, 215, 0, 0.3)",
              }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 mt-0.5" style={{ color: "#FFD700" }} />
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: "#F5F5DC" }}>
                    重要说明
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#D4AF37" }}>
                    本隐私政策说明了抽张塔罗吧应用如何收集、使用和保护您的个人信息。
                    使用我们的服务即表示您同意本政策的条款。我们承诺以透明和负责任的方式处理您的数据。
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Sections */}
            {sections.map((section, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: section.color }}
                  >
                    <section.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="font-semibold" style={{ color: "#F5F5DC" }}>
                    {section.title}
                  </h4>
                </div>
                <div
                  className="p-4 rounded-lg border ml-11"
                  style={{
                    backgroundColor: "rgba(255, 215, 0, 0.05)",
                    borderColor: "rgba(255, 215, 0, 0.2)",
                  }}
                >
                  <ul className="space-y-2">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: section.color }}
                        />
                        <span className="text-sm leading-relaxed" style={{ color: "#D4AF37" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Contact Information */}
            <div
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: "rgba(255, 215, 0, 0.05)",
                borderColor: "rgba(255, 215, 0, 0.2)",
              }}
            >
              <h4 className="font-semibold mb-2" style={{ color: "#F5F5DC" }}>
                联系我们
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "#D4AF37" }}>
                如果您对本隐私政策有任何疑问或需要行使您的权利，请通过以下方式联系我们：
              </p>
              <div className="mt-3 space-y-1 text-sm" style={{ color: "#D4AF37" }}>
                <p>邮箱：support@emotion-guide.com</p>
                <p>电话：400-888-9999</p>
                <p>地址：北京市朝阳区科技园区创新大厦A座</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center pt-4 border-t" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
              <p className="text-xs" style={{ color: "#6b7280" }}>
                最后更新时间：2024年1月15日
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
