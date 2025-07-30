"use client"

import { useState } from "react"
import { X, Copy, Check, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Post {
  id: number
  user: {
    name: string
    avatar: string
    level: string
    verified: boolean
  }
  content: string
  fullContent?: string
  image: boolean
  likes: number
  comments: number
  time: string
  tags: string[]
  isLiked?: boolean
  shareCount?: number
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post | null
}

export default function ShareModal({ isOpen, onClose, post }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const [shareMessage, setShareMessage] = useState("")

  const handleCopyLink = async () => {
    if (!post) return

    const shareText = `来看看 ${post.user.name} 在抽张塔罗吧分享的内容：\n\n${post.content}\n\n#抽张塔罗吧 #${post.tags.join(" #")}`

    try {
      await navigator.clipboard.writeText(shareText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleNativeShare = async () => {
    if (!post || !navigator.share) return

    try {
      await navigator.share({
        title: `${post.user.name} 的塔罗分享`,
        text: post.content,
        url: window.location.href,
      })
    } catch (error) {
      console.error("Failed to share:", error)
    }
  }

  const shareOptions = [
    {
      name: "复制链接",
      icon: Copy,
      action: handleCopyLink,
      color: "bg-gray-500",
    },
    {
      name: "系统分享",
      icon: Share2,
      action: handleNativeShare,
      color: "bg-blue-500",
      available: !!navigator.share,
    },
  ]

  if (!isOpen || !post) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-text-primary">分享帖子</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Post Preview */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-lg">{post.user.avatar}</div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-text-primary text-sm">{post.user.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    post.user.level === "大师"
                      ? "bg-yellow-100 text-yellow-700"
                      : post.user.level === "进阶"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {post.user.level}
                </span>
              </div>
              <span className="text-xs text-text-secondary">{post.time}</span>
            </div>
          </div>
          <p className="text-sm text-text-primary line-clamp-3">{post.content}</p>
        </div>

        {/* Share Options */}
        <div className="p-4 space-y-3">
          {shareOptions
            .filter((option) => option.available !== false)
            .map((option) => (
              <Button
                key={option.name}
                variant="outline"
                className="w-full justify-start gap-3 h-12 bg-transparent"
                onClick={option.action}
              >
                <div className={`w-8 h-8 ${option.color} rounded-full flex items-center justify-center`}>
                  {option.name === "复制链接" && copied ? (
                    <Check size={16} className="text-white" />
                  ) : (
                    <option.icon size={16} className="text-white" />
                  )}
                </div>
                <span>{copied && option.name === "复制链接" ? "已复制" : option.name}</span>
              </Button>
            ))}
        </div>

        {/* Share Message */}
        <div className="p-4 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-2">添加分享消息（可选）</label>
          <textarea
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            placeholder="说点什么..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm resize-none"
            rows={3}
          />
        </div>

        {/* Share Stats */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <MessageCircle size={12} />
              {post.comments} 评论
            </span>
            <span className="flex items-center gap-1">
              <Share2 size={12} />
              {post.shareCount || 0} 分享
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
