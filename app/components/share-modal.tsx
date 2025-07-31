"use client"

import { useState, useRef, useEffect } from "react"
import { X, Download, Share2, Copy, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import TarotCardImage from "./tarot-card-image"

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
  const shareContentRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen && reading) {
      generateShareImage()
    }
  }, [isOpen, reading])

  const generateShareImage = async () => {
    if (!reading || !shareContentRef.current) return

    setIsGenerating(true)
    
    try {
      // 使用浏览器原生的截图方法
      const element = shareContentRef.current
      
      // 创建一个canvas来绘制分享内容
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // 设置画布尺寸
      canvas.width = 800
      canvas.height = 1000
      
      // 背景
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 主容器背景
      const containerPadding = 40
      const containerWidth = canvas.width - containerPadding * 2
      const containerHeight = canvas.height - containerPadding * 2
      
      // 容器背景
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(containerPadding, containerPadding, containerWidth, containerHeight)
      
      // 卡牌展示区域
      const cardWidth = 140
      const cardHeight = 200
      const cardsPerRow = Math.min(reading.cards.length, 3)
      const startX = (canvas.width - cardsPerRow * (cardWidth + 30) + 30) / 2
      const startY = 120
      
      reading.cards.forEach((cardInfo, index) => {
        const col = index % cardsPerRow
        const x = startX + col * (cardWidth + 30)
        const y = startY
        
        // 卡牌背景
        ctx.fillStyle = "#f8fafc"
        ctx.fillRect(x, y, cardWidth, cardHeight)
        ctx.strokeStyle = "#e2e8f0"
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, cardWidth, cardHeight)
        
        // 卡牌名称（中文）
        ctx.fillStyle = "#1e293b"
        ctx.font = "bold 16px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(cardInfo.card.translation || cardInfo.card.name, x + cardWidth / 2, y + cardHeight + 30)
        
        // 卡牌名称（英文）
        if (cardInfo.card.translation && cardInfo.card.name !== cardInfo.card.translation) {
          ctx.fillStyle = "#64748b"
          ctx.font = "12px sans-serif"
          ctx.fillText(cardInfo.card.name, x + cardWidth / 2, y + cardHeight + 50)
        }
        
        // 位置标签
        ctx.fillStyle = "#7c3aed"
        ctx.font = "bold 12px sans-serif"
        ctx.fillText(cardInfo.position, x + cardWidth / 2, y + cardHeight + 70)
        
        // 逆位标记
        if (cardInfo.reversed) {
          ctx.fillStyle = "#dc2626"
          ctx.font = "bold 12px sans-serif"
          ctx.fillText("逆位", x + cardWidth / 2, y + cardHeight + 90)
        }
      })
      
      // AI解读摘要区域
      const summaryY = startY + cardHeight + 140
      
      // 摘要容器背景
      ctx.fillStyle = "#f8fafc"
      ctx.fillRect(containerPadding + 20, summaryY - 20, containerWidth - 40, 300)
      
      // 摘要标题
      ctx.fillStyle = "#7c3aed"
      ctx.font = "bold 20px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("AI解读摘要", canvas.width / 2, summaryY + 10)
      
      // 摘要内容
      ctx.fillStyle = "#334155"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "left"
      
      // 移除Markdown标记
      let summaryText = reading.summary.replace(/^###\s*/gm, '')
      
      // 限制摘要长度
      if (summaryText.length > 500) {
        summaryText = summaryText.substring(0, 500) + "..."
      }
      
      // 分行显示摘要
      const maxLineWidth = containerWidth - 80
      const lineHeight = 22
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
        if (lines.length >= 10) {
          if (currentLine.length > 0) {
            lines.push(currentLine + "...")
          }
          break
        }
      }
      
      if (currentLine.length > 0 && lines.length < 10) {
        lines.push(currentLine)
      }
      
      lines.forEach((line, index) => {
        ctx.fillText(line, containerPadding + 40, summaryY + 50 + index * lineHeight)
      })
      
      const dataUrl = canvas.toDataURL("image/png")
      setImageUrl(dataUrl)
    } catch (error) {
      console.error("Failed to generate image:", error)
    } finally {
      setIsGenerating(false)
    }
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
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white via-purple-50 to-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-purple-200">
        <div className="flex items-center justify-between p-6 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onClose} className="p-2 text-purple-700 hover:bg-purple-100">
              <ArrowLeft size={20} />
            </Button>
            <h2 className="text-xl font-bold text-slate-800">分享指引结果</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-purple-700 hover:bg-purple-100">
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* 卡牌阵展示区 */}
          {reading && (
            <div className="bg-gradient-to-br from-purple-100 via-white to-purple-50 rounded-xl p-4 shadow-lg border border-purple-200">
              <div className="flex flex-row gap-4 justify-center items-start overflow-x-auto pb-2">
                {reading.cards.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center min-w-[90px]">
                    <div className="mb-2">
                      <Card className="rounded-xl shadow-lg bg-white border-purple-200">
                        <div className="p-2 flex flex-col items-center">
                          <TarotCardImage card={item.card} isRevealed width={70} height={110} />
                        </div>
                      </Card>
                    </div>
                    <div className="text-sm font-semibold text-slate-800 leading-tight text-center">
                      {item.card.translation || item.card.name}
                    </div>
                    {item.card.translation && item.card.name !== item.card.translation && (
                      <div className="text-xs text-slate-500 italic">{item.card.name}</div>
                    )}
                    <div className="text-xs text-purple-600 mt-0.5 font-medium">{item.position}</div>
                    {item.reversed && <div className="text-xs text-red-500 mt-0.5 font-medium">逆位</div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI解读摘要区 */}
          {reading && (
            <div className="rounded-xl bg-gradient-to-br from-amber-50 via-white to-amber-50 p-4 shadow-lg border border-amber-200">
              <div className="font-bold text-amber-700 mb-2">AI解读摘要</div>
              <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {reading.summary.replace(/^###\s*/gm, '')}
              </div>
            </div>
          )}

          {/* 隐藏的分享内容容器 */}
          <div 
            ref={shareContentRef}
            className="fixed top-[-9999px] left-[-9999px] w-[800px] bg-white p-8 rounded-2xl shadow-lg"
            style={{ zIndex: -1 }}
          >
            {/* 卡牌展示区 */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 shadow-inner mb-6">
              <div className="flex flex-row gap-6 justify-center items-start">
                {reading?.cards.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="mb-3">
                      <Card className="rounded-xl shadow-md bg-white">
                        <div className="p-3 flex flex-col items-center">
                          <TarotCardImage card={item.card} isRevealed width={100} height={150} />
                        </div>
                      </Card>
                    </div>
                    <div className="text-base font-semibold text-gray-900 leading-tight text-center">
                      {item.card.translation || item.card.name}
                    </div>
                    {item.card.translation && item.card.name !== item.card.translation && (
                      <div className="text-sm text-gray-400 italic">{item.card.name}</div>
                    )}
                    <div className="text-sm text-purple-600 mt-1">{item.position}</div>
                    {item.reversed && <div className="text-sm text-red-500 mt-1">逆位</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* AI解读摘要区 */}
            <div className="rounded-xl bg-purple-50/80 p-6 shadow-sm">
              <div className="font-bold text-purple-700 mb-3 text-lg">AI解读摘要</div>
              <div className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                {reading?.summary.replace(/^###\s*/gm, '')}
              </div>
            </div>
          </div>

          {/* 操作按钮区 */}
          <div className="flex gap-3">
            <Button 
              onClick={handleDownload} 
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200" 
              variant="default"
            >
              <Download size={16} className="mr-2" />
              下载图片
            </Button>
            <Button 
              onClick={handleCopyImage} 
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200" 
              variant="default"
            >
              {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
              {copied ? "已复制" : "复制图片"}
            </Button>
            <Button 
              onClick={handleShare} 
              className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Share2 size={16} className="mr-2" />
              分享
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
