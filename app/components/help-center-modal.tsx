"use client"

import { useState } from "react"
import { X, HelpCircle, Book, MessageCircle, Phone, Mail, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HelpCenterModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function HelpCenterModal({ isOpen, onClose }: HelpCenterModalProps) {
  const [activeTab, setActiveTab] = useState("faq")
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  if (!isOpen) return null

  const tabs = [
    { id: "faq", label: "常见问题", icon: HelpCircle },
    { id: "guide", label: "使用指南", icon: Book },
    { id: "contact", label: "联系支持", icon: MessageCircle },
  ]

  const faqs = [
    {
      id: "what-is-tarot",
      question: "什么是卡牌指引？",
      answer:
        "卡牌指引是一种古老的心灵探索方式，通过78张卡牌来获得对生活问题的洞察和指导。每张牌都有其独特的象征意义，通过不同的牌阵组合可以解读出关于过去、现在和未来的信息。",
    },
    {
      id: "how-accurate",
      question: "指引结果准确吗？",
      answer:
        "卡牌指引的准确性因人而异，它更多的是提供一种思考角度和内在指导。我们的AI系统结合了传统卡牌解读方法和现代心理学理论，旨在为您提供有意义的洞察，但请将结果作为参考而非绝对指引。",
    },
    {
      id: "how-to-ask",
      question: "如何提出好的指引问题？",
      answer:
        "好的指引问题应该是开放性的，关注您的内在状态和可能的行动方向。避免简单的是非题，而是问'我应该如何...'或'什么因素影响了...'这样的问题。具体而有针对性的问题通常能得到更有价值的指导。",
    },
    {
      id: "card-meanings",
      question: "如何理解牌面含义？",
      answer:
        "每张卡牌都有正位和逆位两种含义。正位通常代表积极、顺畅的能量，逆位则可能表示阻碍、内在冲突或需要注意的方面。重要的是要结合您的具体情况和直觉来理解牌面信息。",
    },
    {
      id: "frequency",
      question: "多久指引一次比较好？",
      answer:
        "建议不要过于频繁地进行指引，特别是针对同一个问题。一般来说，对于重要问题可以每周或每月指引一次，日常指导可以每天进行。给自己时间去消化和实践指引的建议是很重要的。",
    },
  ]

  const guides = [
    {
      title: "新手入门",
      steps: [
        "选择您感兴趣的牌阵类型",
        "静心思考您想要询问的问题",
        "点击开始指引，专注于您的问题",
        "选择直觉引导您的牌",
        "仔细阅读解读结果并思考其含义",
      ],
    },
    {
      title: "提升准确性",
      steps: [
        "在安静的环境中进行指引",
        "保持开放和接受的心态",
        "提出具体而有意义的问题",
        "相信您的第一直觉选择",
        "定期回顾和反思指引结果",
      ],
    },
    {
      title: "解读技巧",
      steps: [
        "先观察牌面的整体感觉和色彩",
        "注意牌中人物的表情和动作",
        "考虑牌面符号的象征意义",
        "结合您的生活情况理解牌意",
        "相信您内心的直觉解读",
      ],
    },
  ]

  const contactOptions = [
    {
      type: "微信客服",
      icon: MessageCircle,
      description: "工作日 9:00-18:00 在线支持",
      action: "开始对话",
      color: "#10b981",
      handler: () => {
        // 检测是否为微信小程序环境
        const isWeChatMiniProgram = typeof wx !== 'undefined' && wx.openCustomerServiceChat
        if (isWeChatMiniProgram) {
          // 微信小程序客服消息
          wx.openCustomerServiceChat({
            extInfo: { url: 'https://work.weixin.qq.com/kfid/kf_xxx' }, // 需要替换为实际的客服链接
            corpId: 'your_corp_id', // 需要替换为实际的企业ID
            success: () => {
              // 客服对话已打开
            },
            fail: (err) => {
              console.error('打开客服失败:', err)
              // 降级处理：复制微信号
              if (navigator.clipboard) {
                navigator.clipboard.writeText('support_wechat_id')
                alert('微信号已复制到剪贴板，请添加好友咨询')
              }
            }
          })
        } else {
          // Web环境降级处理
          if (navigator.clipboard) {
            navigator.clipboard.writeText('support_wechat_id')
            alert('微信号已复制到剪贴板，请添加好友咨询')
          } else {
            alert('请添加微信号：support_wechat_id 进行咨询')
          }
        }
      }
    },
    {
      type: "邮件支持",
      icon: Mail,
      description: "support@emotion-guide.com",
      action: "发送邮件",
      color: "#f59e0b",
      handler: () => {
        const email = 'support@emotion-guide.com'
        const subject = '抽张塔罗吧 - 用户反馈'
        const body = '请详细描述您的问题或建议：\n\n'
        
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        
        // 检测是否为微信小程序环境
        const isWeChatMiniProgram = typeof wx !== 'undefined' && wx.setClipboardData
        if (isWeChatMiniProgram) {
          // 微信小程序复制邮箱
          wx.setClipboardData({
            data: email,
            success: () => {
              wx.showToast({
                title: '邮箱已复制',
                icon: 'success'
              })
            }
          })
        } else {
          // Web环境打开邮件客户端
          window.open(mailtoLink, '_blank')
        }
      }
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
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg" style={{ color: "#F5F5DC" }}>
                帮助中心
              </h3>
              <p className="text-sm" style={{ color: "#D4AF37" }}>
                获取使用帮助和支持
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

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`flex-1 rounded-none border-b-2 transition-all duration-200 ${
                activeTab === tab.id
                  ? "border-yellow-400 text-white bg-white/5"
                  : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {activeTab === "faq" && (
            <div className="p-4 space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border rounded-lg overflow-hidden"
                  style={{
                    backgroundColor: "rgba(255, 215, 0, 0.05)",
                    borderColor: "rgba(255, 215, 0, 0.2)",
                  }}
                >
                  <Button
                    variant="ghost"
                    className="w-full p-4 justify-between text-left hover:bg-white/5"
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  >
                    <span className="font-medium" style={{ color: "#F5F5DC" }}>
                      {faq.question}
                    </span>
                    {expandedFaq === faq.id ? (
                      <ChevronDown className="w-4 h-4" style={{ color: "#D4AF37" }} />
                    ) : (
                      <ChevronRight className="w-4 h-4" style={{ color: "#D4AF37" }} />
                    )}
                  </Button>
                  {expandedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-sm leading-relaxed" style={{ color: "#D4AF37" }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "guide" && (
            <div className="p-4 space-y-6">
              {guides.map((guide, index) => (
                <div key={index}>
                  <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ color: "#F5F5DC" }}>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: "#FFD700" }}
                    >
                      {index + 1}
                    </div>
                    {guide.title}
                  </h4>
                  <div
                    className="p-4 rounded-lg border"
                    style={{
                      backgroundColor: "rgba(255, 215, 0, 0.05)",
                      borderColor: "rgba(255, 215, 0, 0.2)",
                    }}
                  >
                    <ol className="space-y-2">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium text-white mt-0.5 flex-shrink-0"
                            style={{ backgroundColor: "#B8860B" }}
                          >
                            {stepIndex + 1}
                          </div>
                          <span className="text-sm leading-relaxed" style={{ color: "#D4AF37" }}>
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="p-4 space-y-4">
              <div className="text-center mb-6">
                <h4 className="font-semibold mb-2" style={{ color: "#F5F5DC" }}>
                  需要更多帮助？
                </h4>
                <p className="text-sm" style={{ color: "#D4AF37" }}>
                  我们的支持团队随时为您提供帮助
                </p>
              </div>
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md"
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
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: option.color }}
                    >
                      <option.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold" style={{ color: "#F5F5DC" }}>
                        {option.type}
                      </h5>
                      <p className="text-sm" style={{ color: "#D4AF37" }}>
                        {option.description}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="text-white font-medium"
                      style={{
                        background: `linear-gradient(135deg, ${option.color} 0%, ${option.color}CC 100%)`,
                      }}
                      onClick={option.handler}
                    >
                      {option.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
