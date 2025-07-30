"use client"

import { useState, useRef, useEffect } from "react"
import { X, Download, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareReading {
  spreadType: string
  cards: Array<{
    card: any
    position: string
    meaning: string
    reversed: boolean
  }>
  summary: string
  date: string
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  reading: ShareReading | null
}

export default function ShareModal({ isOpen, onClose, reading }: ShareModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen && reading) {
      generateShareImage()
    }
  }, [isOpen, reading])

  const generateShareImage = async () => {
    if (!reading || !canvasRef.current) return

    setIsGenerating(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 设置画布尺寸
    canvas.width = 800
    canvas.height = 1200

    // 背景渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#f5e9e0")
    gradient.addColorStop(1, "#e8d5c4")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 添加装饰性边框
    ctx.strokeStyle = "#7A5CAB"
    ctx.lineWidth = 3
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)

    // 标题
    ctx.fillStyle = "#333"
    ctx.font = "bold 36px serif"
    ctx.textAlign = "center"
    ctx.fillText("抽张塔罗吧", canvas.width / 2, 80)

    // 牌阵类型
    ctx.fillStyle = "#7A5CAB"
    ctx.font = "28px serif"
    ctx.fillText(reading.spreadType, canvas.width / 2, 120)

    // 日期
    ctx.fillStyle = "#888"
    ctx.font = "18px sans-serif"
    ctx.fillText(reading.date, canvas.width / 2, 150)

    // 绘制卡牌占位符
    const cardWidth = 100
    const cardHeight = 150
    const cardsPerRow = Math.min(reading.cards.length, 5)
    const startX = (canvas.width - cardsPerRow * (cardWidth + 20) + 20) / 2
    const startY = 200

    reading.cards.forEach((cardInfo, index) => {
      const row = Math.floor(index / cardsPerRow)
      const col = index % cardsPerRow
      const x = startX + col * (cardWidth + 20)
      const y = startY + row * (cardHeight + 40)

      // 卡牌背景
      ctx.fillStyle = "#fff"
      ctx.fillRect(x, y, cardWidth, cardHeight)
      ctx.strokeStyle = "#7A5CAB"
      ctx.lineWidth = 2
      ctx.strokeRect(x, y, cardWidth, cardHeight)

      // 卡牌名称
      ctx.fillStyle = "#333"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"

      // 分行显示卡牌名称
      const cardName = cardInfo.card.translation || cardInfo.card.name
      const maxWidth = cardWidth - 10
      const words = cardName.split("")
      let line = ""
      let lineY = y + cardHeight + 20

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i]
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, x + cardWidth / 2, lineY)
          line = words[i]
          lineY += 16
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, x + cardWidth / 2, lineY)

      // 位置标签
      ctx.fillStyle = "#7A5CAB"
      ctx.font = "10px sans-serif"
      ctx.fillText(cardInfo.position, x + cardWidth / 2, y + cardHeight + 50)

      // 逆位标记
      if (cardInfo.reversed) {
        ctx.fillStyle = "#ef4444"
        ctx.font = "10px sans-serif"
        ctx.fillText("逆位", x + cardWidth / 2, y + cardHeight + 65)
      }
    })

    // AI解读摘要
    const summaryY = startY + Math.ceil(reading.cards.length / cardsPerRow) * (cardHeight + 80) + 50

    // 摘要标题
    ctx.fillStyle = "#7A5CAB"
    ctx.font = "bold 24px serif"
    ctx.textAlign = "center"
    ctx.fillText("AI解读摘要", canvas.width / 2, summaryY)

    // 摘要内容背景
    const summaryBoxY = summaryY + 20
    const summaryBoxHeight = 200
    ctx.fillStyle = "rgba(248, 244, 255, 0.8)"
    ctx.fillRect(60, summaryBoxY, canvas.width - 120, summaryBoxHeight)
    ctx.strokeStyle = "#7A5CAB"
    ctx.lineWidth = 1
    ctx.strokeRect(60, summaryBoxY, canvas.width - 120, summaryBoxHeight)

    // 摘要文本
    ctx.fillStyle = "#333"
    ctx.font = "14px sans-serif"
    ctx.textAlign = "left"

    // 限制摘要长度并分行显示
    let summaryText = reading.summary
    if (summaryText.length > 300) {
      summaryText = summaryText.substring(0, 300) + "..."
    }

    const maxLineWidth = canvas.width - 160
    const lineHeight = 20
    const lines: string[] = []
    const words = summaryText.split("")
    let currentLine = ""

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + words[i]
      const metrics = ctx.measureText(testLine)

      if (metrics.width > maxLineWidth && currentLine.length > 0) {
        lines.push(currentLine)
        currentLine = words[i]
      } else {
        currentLine = testLine
      }

      // 限制行数
      if (lines.length >= 8) {
        if (currentLine.length > 0) {
          lines.push(currentLine + "...")
        }
        break
      }
    }

    if (currentLine.length > 0 && lines.length < 8) {
      lines.push(currentLine)
    }

    lines.forEach((line, index) => {
      ctx.fillText(line, 80, summaryY + 50 + index * lineHeight)
    })

    // 底部装饰
    const footerY = canvas.height - 100
    ctx.fillStyle = "#7A5CAB"
    ctx.font = "16px serif"
    ctx.textAlign = "center"

    // 添加星星装饰
    const stars = ["✨", "⭐", "🌟", "✨", "⭐"]
    stars.forEach((star, index) => {
      const x = (canvas.width / (stars.length + 1)) * (index + 1)
      ctx.fillText(star, x, footerY - 20)
    })

    ctx.fillText("— 抽张塔罗吧·探索内心的智慧 —", canvas.width / 2, footerY)

    // 生成图片URL
    const dataUrl = canvas.toDataURL("image/png")
    setImageUrl(dataUrl)
    setIsGenerating(false)
  }

  const handleDownload = () => {
    if (!imageUrl) return

    const link = document.createElement("a")
    link.download = `抽张塔罗吧-${reading?.spreadType}-${reading?.date}.png`
    link.href = imageUrl
    link.click()
  }

  const handleCopyImage = async () => {
    if (!imageUrl) return

    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({
          "image/png": blob,
        }),
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy image:", error)
    }
  }

  const handleShare = async () => {
    if (!imageUrl || !reading) return

    if (navigator.share) {
      try {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], `抽张塔罗吧-${reading.spreadType}.png`, {
          type: "image/png",
        })

        await navigator.share({
          title: `抽张塔罗吧 - ${reading.spreadType}`,
text: `我刚完成了一次${reading.spreadType}卡牌指引，获得了很有启发的解读！`,
          files: [file],
        })
      } catch (error) {
        console.error("Failed to share:", error)
        handleDownload()
      }
    } else {
      handleDownload()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">分享指引结果</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {isGenerating ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <span className="ml-2 text-text-secondary">正在生成分享图片...</span>
            </div>
          ) : (
            <>
              <canvas ref={canvasRef} className="w-full border rounded-lg" style={{ maxHeight: "400px" }} />

              <div className="flex gap-2">
                <Button onClick={handleDownload} className="flex-1 bg-transparent" variant="outline">
                  <Download size={16} className="mr-2" />
                  下载图片
                </Button>
                <Button onClick={handleCopyImage} className="flex-1 bg-transparent" variant="outline">
                  {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                  {copied ? "已复制" : "复制图片"}
                </Button>
                <Button onClick={handleShare} className="flex-1">
                  <Share2 size={16} className="mr-2" />
                  分享
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
