"use client"

import { X, Heart, MessageCircle, Share2, Sparkles } from "lucide-react"
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
}

interface PostDetailModalProps {
  isOpen: boolean
  onClose: () => void
  post: Post | null
  onLike: (postId: number) => void
  onComment: (post: Post) => void
  onShare: (post: Post) => void
}

export default function PostDetailModal({ isOpen, onClose, post, onLike, onComment, onShare }: PostDetailModalProps) {
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
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "rgba(54, 69, 79, 0.95)",
          borderRadius: "16px",
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
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#F5F5DC" }}>帖子详情</h2>
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

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
          }}
        >
          {/* User Info */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ fontSize: "24px" }}>{post.user.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC" }}>{post.user.name}</span>
                {post.user.verified && (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "white", fontSize: "10px" }}>✓</span>
                  </div>
                )}
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    backgroundColor:
                      post.user.level === "大师"
                        ? "rgba(255, 215, 0, 0.2)"
                        : post.user.level === "进阶"
                          ? "rgba(147, 51, 234, 0.2)"
                          : "rgba(107, 114, 128, 0.2)",
                    color: post.user.level === "大师" ? "#FFD700" : post.user.level === "进阶" ? "#9333ea" : "#6b7280",
                    border: `1px solid ${
                      post.user.level === "大师"
                        ? "rgba(255, 215, 0, 0.3)"
                        : post.user.level === "进阶"
                          ? "rgba(147, 51, 234, 0.3)"
                          : "rgba(107, 114, 128, 0.3)"
                    }`,
                  }}
                >
                  {post.user.level}
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "#D4AF37" }}>{post.time}</span>
            </div>
          </div>

          {/* Post Content */}
          <div style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "16px", color: "#F5F5DC", lineHeight: "1.6", marginBottom: "16px" }}>
              {post.fullContent || post.content}
            </p>

            {/* Image placeholder */}
            {post.image && (
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(184, 134, 11, 0.1) 100%)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Sparkles className="w-8 h-8" style={{ color: "#FFD700" }} />
              </div>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  padding: "4px 12px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                  color: "#FFD700",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            padding: "16px 20px 20px",
            borderTop: "1px solid rgba(255, 215, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(post.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "12px",
              backgroundColor: "transparent",
              border: "none",
              color: post.isLiked ? "#ef4444" : "#D4AF37",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!post.isLiked) {
                e.currentTarget.style.color = "#ef4444"
              }
            }}
            onMouseLeave={(e) => {
              if (!post.isLiked) {
                e.currentTarget.style.color = "#D4AF37"
              }
            }}
          >
            <Heart className={`w-5 h-5 ${post.isLiked ? "fill-current" : ""}`} />
            <span style={{ fontSize: "12px" }}>{post.likes}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onComment(post)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "12px",
              backgroundColor: "transparent",
              border: "none",
              color: "#D4AF37",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3b82f6"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#D4AF37"
            }}
          >
            <MessageCircle className="w-5 h-5" />
            <span style={{ fontSize: "12px" }}>{post.comments}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(post)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
              padding: "12px",
              backgroundColor: "transparent",
              border: "none",
              color: "#D4AF37",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#10b981"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#D4AF37"
            }}
          >
            <Share2 className="w-5 h-5" />
            <span style={{ fontSize: "12px" }}>分享</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
