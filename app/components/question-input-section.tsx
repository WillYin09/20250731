"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, Send, ChevronDown } from "lucide-react"

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
  const [showPresetQuestions, setShowPresetQuestions] = useState(false)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userQuestion.trim()) {
      onCustomQuestionSubmit()
    }
  }

  const handlePresetQuestionSelect = (question: string) => {
    onPresetQuestionClick(question)
    setShowPresetQuestions(false)
  }

  return (
    <div style={{ padding: "0 20px 12px", position: "relative", zIndex: 1 }}>
      <div
        style={{
          backgroundColor: "rgba(54, 69, 79, 0.8)",
          borderRadius: "12px",
          padding: "12px",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 215, 0, 0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
          <MessageCircle size={16} style={{ color: "#FFD700" }} />
          <h3 style={{ fontSize: "14px", fontWeight: "600", color: "#F5F5DC", margin: 0 }}>问题引导</h3>
        </div>

        {/* Combined Input and Dropdown */}
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {/* Dropdown Button - Now outside the input */}
          <button
            onClick={() => setShowPresetQuestions(!showPresetQuestions)}
            style={{
              background: "rgba(255, 215, 0, 0.1)",
              border: "1px solid rgba(255, 215, 0, 0.3)",
              color: "#FFD700",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "11px",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
            }}
          >
            推荐问题
            <ChevronDown 
              size={12} 
              style={{ 
                transform: showPresetQuestions ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease"
              }} 
            />
          </button>

          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              placeholder="输入您的专属问题..."
              value={userQuestion}
              onChange={(e) => onUserQuestionChange(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              style={{
                width: "100%",
                padding: "6px 10px",
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

            {/* Send Button (when user is typing) */}
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
                  zIndex: 1,
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

            {/* Preset Questions Dropdown */}
            {showPresetQuestions && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(54, 69, 79, 0.95)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 215, 0, 0.3)",
                  backdropFilter: "blur(15px)",
                  marginTop: "4px",
                  zIndex: 2,
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                {presetQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handlePresetQuestionSelect(question)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#F5F5DC",
                      fontSize: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      borderBottom: index < presetQuestions.length - 1 ? "1px solid rgba(255, 215, 0, 0.1)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Question Display */}
        {(selectedPresetQuestion || userQuestion) && (
          <div
            style={{
              marginTop: "6px",
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
