"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, Send } from "lucide-react"

interface QuestionInputSectionProps {
  presetQuestions: string[]
  selectedPresetQuestion: string
  userQuestion: string
  onPresetQuestionClick: (question: string) => void
  onUserQuestionChange: (question: string) => void
  onCustomQuestionSubmit: () => void
}

export default function QuestionInputSection({
  presetQuestions,
  selectedPresetQuestion,
  userQuestion,
  onPresetQuestionClick,
  onUserQuestionChange,
  onCustomQuestionSubmit,
}: QuestionInputSectionProps) {
  const [isInputFocused, setIsInputFocused] = useState(false)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userQuestion.trim()) {
      onCustomQuestionSubmit()
    }
  }

  return (
    <div style={{ padding: "0 20px 20px", position: "relative", zIndex: 10 }}>
      <div
        style={{
          backgroundColor: "rgba(54, 69, 79, 0.8)",
          borderRadius: "12px",
          padding: "16px",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 215, 0, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
          <MessageCircle size={16} style={{ color: "#FFD700" }} />
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#F5F5DC", margin: 0 }}>问题引导</h3>
        </div>

        {/* Preset Questions */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {presetQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onPresetQuestionClick(question)}
                style={{
                  padding: "6px 10px",
                  backgroundColor:
                    selectedPresetQuestion === question ? "rgba(255, 215, 0, 0.8)" : "rgba(54, 69, 79, 0.6)",
                  color: selectedPresetQuestion === question ? "#1A237E" : "#F5F5DC",
                  border: `1px solid ${selectedPresetQuestion === question ? "#FFD700" : "rgba(255, 215, 0, 0.3)"}`,
                  borderRadius: "16px",
                  fontSize: "11px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(5px)",
                }}
                onMouseEnter={(e) => {
                  if (selectedPresetQuestion !== question) {
                    e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
                    e.currentTarget.style.transform = "translateY(-1px)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPresetQuestion !== question) {
                    e.currentTarget.style.backgroundColor = "rgba(54, 69, 79, 0.6)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question Input */}
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="或输入您的专属问题..."
            value={userQuestion}
            onChange={(e) => onUserQuestionChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            style={{
              width: "100%",
              padding: "8px 40px 8px 12px",
              backgroundColor: "rgba(26, 35, 126, 0.3)",
              border: `1px solid ${isInputFocused ? "#FFD700" : "rgba(255, 215, 0, 0.3)"}`,
              borderRadius: "8px",
              color: "#F5F5DC",
              fontSize: "12px",
              outline: "none",
              transition: "all 0.3s ease",
              backdropFilter: "blur(5px)",
            }}
          />
          {userQuestion.trim() && (
            <button
              onClick={onCustomQuestionSubmit}
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "4px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.3)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
              }}
            >
              <Send size={14} style={{ color: "#FFD700" }} />
            </button>
          )}
        </div>

        {/* Selected Question Display */}
        {(selectedPresetQuestion || userQuestion) && (
          <div
            style={{
              marginTop: "8px",
              padding: "6px 10px",
              backgroundColor: "rgba(255, 215, 0, 0.2)",
              borderRadius: "6px",
              border: "1px solid rgba(255, 215, 0, 0.4)",
            }}
          >
            <p style={{ color: "#FFD700", fontSize: "11px", margin: 0, fontWeight: "500" }}>
              当前问题：{selectedPresetQuestion || userQuestion}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
