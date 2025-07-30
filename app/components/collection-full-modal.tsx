"use client"

import { AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollectionFullModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CollectionFullModal({ isOpen, onClose }: CollectionFullModalProps) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "24px",
          maxWidth: "320px",
          width: "100%",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          animation: "modalSlideIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#fef3c7",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AlertTriangle size={18} style={{ color: "#f59e0b" }} />
            </div>
            <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#333", margin: 0 }}>收藏夹已满</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "4px",
              color: "#777",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#666", lineHeight: "1.5", margin: 0 }}>
            您的收藏夹最多只能保存 <strong>10 条</strong> 指引记录。
          </p>
          <p style={{ color: "#666", lineHeight: "1.5", margin: "8px 0 0 0" }}>
            请先删除一些旧的收藏记录，然后再收藏新的指引结果。
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px" }}>
          <Button
            variant="outline"
            onClick={onClose}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              borderColor: "#d1d5db",
              color: "#6b7280",
            }}
          >
            取消
          </Button>
          <Button
            onClick={onClose}
            style={{
              flex: 1,
              backgroundColor: "#7A5CAB",
              color: "white",
              border: "none",
            }}
          >
            去管理
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
