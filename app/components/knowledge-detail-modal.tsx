"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface KnowledgeArticle {
  id: number
  title: string
  author: string
  avatar: string
  level: string
  verified: boolean
  content: string
  fullContent: string
  category: string
  tags: string[]
  readTime: string
  difficulty: string
}

interface KnowledgeDetailModalProps {
  isOpen: boolean
  onClose: () => void
  article: KnowledgeArticle | null
}

export default function KnowledgeDetailModal({ isOpen, onClose, article }: KnowledgeDetailModalProps) {
  if (!isOpen || !article) return null

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
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: "#F5F5DC" }}>知识详情</h2>
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
          {/* Article Header */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "24px" }}>{article.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "16px", fontWeight: "600", color: "#F5F5DC" }}>
                    {article.author}
                  </span>
                  {article.verified && (
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "#3b82f6",
                        borderRadius: "50%",
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
                      backgroundColor: "rgba(255, 215, 0, 0.1)",
                      color: "#FFD700",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 215, 0, 0.3)",
                    }}
                  >
                    {article.difficulty}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#D4AF37" }}>{article.readTime}</span>
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>•</span>
                  <span style={{ fontSize: "12px", color: "#D4AF37" }}>{article.category}</span>
                </div>
              </div>
            </div>

            <h1 style={{ fontSize: "20px", fontWeight: "600", color: "#F5F5DC", marginBottom: "12px" }}>
              {article.title}
            </h1>
          </div>

          {/* Article Content */}
          <div
            style={{
              lineHeight: "1.8",
              color: "#D4AF37",
              fontSize: "14px",
              whiteSpace: "pre-wrap",
            }}
          >
            {article.fullContent}
          </div>

          {/* Tags */}
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid rgba(255, 215, 0, 0.1)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    color: "#FFD700",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 215, 0, 0.2)",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 