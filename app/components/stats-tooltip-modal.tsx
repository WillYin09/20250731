"use client"

import { X, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StatsTooltipModalProps {
  isOpen: boolean
  onClose: () => void
  statType: string | null
  tooltip: string
}

export default function StatsTooltipModal({ isOpen, onClose, statType, tooltip }: StatsTooltipModalProps) {
  if (!isOpen || !statType) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="rounded-lg max-w-sm w-full p-6 border-0 shadow-lg"
        style={{
          backgroundColor: "rgba(54, 69, 79, 0.95)",
          border: "1px solid rgba(255, 215, 0, 0.3)",
          backdropFilter: "blur(15px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5" style={{ color: "#FFD700" }} />
            <h3 className="font-semibold" style={{ color: "#F5F5DC" }}>
              {statType}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-white/10"
            style={{ color: "#F5F5DC" }}
          >
            <X size={20} />
          </Button>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: "#D4AF37" }}>
          {tooltip}
        </p>

        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="text-white hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
            }}
          >
            知道了
          </Button>
        </div>
      </div>
    </div>
  )
}
