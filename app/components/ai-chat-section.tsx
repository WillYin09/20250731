"use client"

import type React from "react"

import { useState, useRef, useEffect, useMemo } from "react"
import { Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type TarotCardWithOrientation } from "../data/tarot-cards"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface AiChatSectionProps {
  cards: TarotCardWithOrientation[]
  question?: string
}

export default function AiChatSection({ cards, question = "寻求人生指导" }: AiChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // 动态生成建议问题
  const generateDynamicQuestions = (cards: TarotCardWithOrientation[], userQuestion: string): string[] => {
    const questions: string[] = []
    
    // 分析卡牌特征
    const reversedCards = cards.filter(card => card.isReversed)
    const majorArcana = cards.filter(card => 
      card.name.includes("The ") || 
      card.name.includes("Fool") || 
      card.name.includes("Magician") ||
      card.name.includes("Priestess") ||
      card.name.includes("Empress") ||
      card.name.includes("Emperor") ||
      card.name.includes("Hierophant") ||
      card.name.includes("Lovers") ||
      card.name.includes("Chariot") ||
      card.name.includes("Strength") ||
      card.name.includes("Hermit") ||
      card.name.includes("Wheel") ||
      card.name.includes("Justice") ||
      card.name.includes("Hanged") ||
      card.name.includes("Death") ||
      card.name.includes("Temperance") ||
      card.name.includes("Devil") ||
      card.name.includes("Tower") ||
      card.name.includes("Star") ||
      card.name.includes("Moon") ||
      card.name.includes("Sun") ||
      card.name.includes("Judgement") ||
      card.name.includes("World")
    )
    
    // 基于逆位卡牌生成问题
    if (reversedCards.length > 0) {
      const reversedCard = reversedCards[0]
      questions.push(`深入讲讲${reversedCard.translation}的逆位含义`)
    }
    
    // 基于大阿卡纳生成问题
    if (majorArcana.length > 0) {
      const majorCard = majorArcana[0]
      questions.push(`详细解释${majorCard.translation}的含义`)
    }
    
    // 基于用户问题关键词生成问题
    const questionKeywords = {
      '感情': '深入分析我的感情状况',
      '爱情': '深入分析我的感情状况',
      '事业': '详细解读我的事业发展',
      '工作': '详细解读我的事业发展',
      '学业': '深入分析我的学习情况',
      '学习': '深入分析我的学习情况',
      '健康': '详细解读我的身心健康',
      '身体': '详细解读我的身心健康',
      '财运': '深入分析我的财务状况',
      '金钱': '深入分析我的财务状况',
      '家庭': '详细解读我的家庭关系',
      '朋友': '深入分析我的人际关系',
      '未来': '详细解读我的未来趋势',
      '过去': '深入分析我的过去影响'
    }
    
    for (const [keyword, question] of Object.entries(questionKeywords)) {
      if (userQuestion && userQuestion.includes(keyword)) {
        questions.push(question)
        break
      }
    }
    
    // 基于卡牌数量生成通用问题
    if (cards.length === 3) {
      questions.push('深入解读过去、现在、未来的关联')
    }
    
    // 如果没有生成足够的问题，添加通用问题
    const fallbackQuestions = [
      '深入分析这个牌阵的含义',
      '详细解读我的具体情况',
      '深入探讨这个解读的启示'
    ]
    
    while (questions.length < 3) {
      const fallbackQuestion = fallbackQuestions[questions.length]
      if (fallbackQuestion && !questions.includes(fallbackQuestion)) {
        questions.push(fallbackQuestion)
      } else {
        break
      }
    }
    
    return questions.slice(0, 3)
  }

  const suggestedQuestions = useMemo(() => 
    generateDynamicQuestions(cards, question), 
    [cards, question]
  )

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          cards,
          question,
        }),
      })

      const data = await response.json()

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error("AI响应失败")
      }
    } catch (error) {
      console.error("发送消息失败:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "抱歉，暂时无法获取回应。请稍后再试，或者尝试重新表述您的问题。",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <div
      className="rounded-lg border shadow-lg h-96 flex flex-col"
      style={{
        backgroundColor: "rgba(54, 69, 79, 0.95)",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        backdropFilter: "blur(15px)",
      }}
    >
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" style={{ color: "#FFD700" }} />
          <h3 className="font-semibold" style={{ color: "#FFD700" }}>
            智慧解读
          </h3>
          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              color: "#22c55e",
              border: "1px solid rgba(34, 197, 94, 0.3)",
            }}
          >
            智能活动
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 mx-auto mb-4" style={{ color: "#FFD700" }} />
            <p className="font-medium mb-2" style={{ color: "#F5F5DC" }}>
              你可能想了解
            </p>
            <div className="space-y-3">
              {suggestedQuestions.map((q, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(q)}
                  className="block w-full text-left text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                    color: "#F5F5DC",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 2px 8px rgba(255, 215, 0, 0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
                    e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.5)"
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 215, 0, 0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
                    e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.3)"
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(255, 215, 0, 0.1)"
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs opacity-60">💡</span>
                    {q}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${message.isUser ? "rounded-br-none" : "rounded-bl-none"}`}
              style={{
                backgroundColor: message.isUser ? "rgba(255, 215, 0, 0.2)" : "rgba(54, 69, 79, 0.8)",
                border: message.isUser ? "1px solid rgba(255, 215, 0, 0.4)" : "1px solid rgba(255, 215, 0, 0.2)",
                color: "#F5F5DC",
              }}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div
              className="p-3 rounded-lg rounded-bl-none"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.8)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#FFD700" }}></div>
                  <div
                    className="w-2 h-2 rounded-full animate-pulse delay-75"
                    style={{ backgroundColor: "#FFD700" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full animate-pulse delay-150"
                    style={{ backgroundColor: "#FFD700" }}
                  ></div>
                </div>
                <span className="text-xs" style={{ color: "#D4AF37" }}>
                  AI正在思考...
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: "rgba(255, 215, 0, 0.2)" }}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="请输入你想了解的问题..."
            disabled={isLoading}
            className="flex-1 px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 text-sm"
            style={{
              backgroundColor: "rgba(54, 69, 79, 0.8)",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              color: "#F5F5DC",
            }}
          />
          <Button
            type="submit"
            size="sm"
            disabled={!inputValue.trim() || isLoading}
            className="px-3"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
              color: "white",
            }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
