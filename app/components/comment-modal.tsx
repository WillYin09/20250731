"use client"

import type React from "react"

import { useState } from "react"
import { X, Send, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Comment {
  id: number
  user: {
    name: string
    avatar: string
    level: string
  }
  content: string
  time: string
  likes: number
  isLiked: boolean
}

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

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post | null
  onAddComment: (postId: number, comment: string) => void
}

export default function CommentModal({ isOpen, onClose, post, onAddComment }: CommentModalProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: { name: "卡牌学徒", avatar: "🌟", level: "进阶" },
      content: "感谢分享！愚者牌确实是一张很有启发性的牌，每次遇到都有不同的感悟。",
      time: "1小时前",
      likes: 5,
      isLiked: false,
    },
    {
      id: 2,
      user: { name: "神秘探索者", avatar: "🔮", level: "大师" },
      content: "愚者牌的关键在于那种纯真的勇气，即使前路未卜也要迈出第一步。你的解读很到位！",
      time: "45分钟前",
      likes: 8,
      isLiked: true,
    },
    {
      id: 3,
      user: { name: "新手小白", avatar: "🌙", level: "初学" },
      content: "我也经常抽到愚者牌，但总是不知道怎么解读，看了你的分享终于明白了，谢谢！",
      time: "30分钟前",
      likes: 3,
      isLiked: false,
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && post) {
      onAddComment(post.id, newComment)
      setNewComment("")

      // Add to local comments
      const comment: Comment = {
        id: comments.length + 1,
        user: { name: "我", avatar: "👤", level: "初学" },
        content: newComment,
        time: "刚刚",
        likes: 0,
        isLiked: false,
      }
      setComments([...comments, comment])
    }
  }

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
        }
        return comment
      }),
    )
  }

  if (!isOpen || !post) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 1000,
        padding: "0",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "rgba(54, 69, 79, 0.95)",
          borderRadius: "20px 20px 0 0",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(255, 215, 0, 0.2)",
          backdropFilter: "blur(20px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px",
            borderBottom: "1px solid rgba(255, 215, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageCircle size={20} style={{ color: "#FFD700" }} />
            <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#F5F5DC" }}>评论 ({comments.length})</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            style={{
              padding: "8px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "none",
              color: "#F5F5DC",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)"
            }}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Comments List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 215, 0, 0.1)",
              }}
            >
              <div style={{ fontSize: "20px", flexShrink: 0 }}>{comment.user.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#F5F5DC" }}>{comment.user.name}</span>
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "2px 6px",
                      borderRadius: "8px",
                      backgroundColor:
                        comment.user.level === "大师"
                          ? "rgba(255, 215, 0, 0.2)"
                          : comment.user.level === "进阶"
                            ? "rgba(147, 51, 234, 0.2)"
                            : "rgba(107, 114, 128, 0.2)",
                      color:
                        comment.user.level === "大师"
                          ? "#FFD700"
                          : comment.user.level === "进阶"
                            ? "#9333ea"
                            : "#6b7280",
                      border: `1px solid ${
                        comment.user.level === "大师"
                          ? "rgba(255, 215, 0, 0.3)"
                          : comment.user.level === "进阶"
                            ? "rgba(147, 51, 234, 0.3)"
                            : "rgba(107, 114, 128, 0.3)"
                      }`,
                    }}
                  >
                    {comment.user.level}
                  </span>
                  <span style={{ fontSize: "11px", color: "#D4AF37" }}>{comment.time}</span>
                </div>
                <p style={{ fontSize: "14px", color: "#F5F5DC", lineHeight: "1.4", marginBottom: "8px" }}>
                  {comment.content}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLikeComment(comment.id)}
                  style={{
                    padding: "4px 8px",
                    backgroundColor: "transparent",
                    border: "none",
                    color: comment.isLiked ? "#ef4444" : "#D4AF37",
                    fontSize: "12px",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!comment.isLiked) {
                      e.currentTarget.style.color = "#ef4444"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!comment.isLiked) {
                      e.currentTarget.style.color = "#D4AF37"
                    }
                  }}
                >
                  <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-current" : ""}`} />
                  {comment.likes}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div
          style={{
            padding: "16px 20px 20px",
            borderTop: "1px solid rgba(255, 215, 0, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="写下你的想法..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: "25px",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "#F5F5DC",
                fontSize: "14px",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.5)"
                e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255, 215, 0, 0.1)"
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 215, 0, 0.2)"
                e.currentTarget.style.boxShadow = "none"
              }}
            />
            <Button
              type="submit"
              disabled={!newComment.trim()}
              style={{
                padding: "12px",
                borderRadius: "50%",
                backgroundColor: newComment.trim() ? "#FFD700" : "rgba(255, 215, 0, 0.3)",
                border: "none",
                color: newComment.trim() ? "#000" : "#666",
                cursor: newComment.trim() ? "pointer" : "not-allowed",
                transition: "all 0.2s ease",
              }}
            >
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
