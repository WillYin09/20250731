"use client"

import { useState } from "react"
import { ArrowLeft, BookOpen, Star, Lightbulb, Target, Users, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface DivinationSkillsPageProps {
  onBack: () => void
}

export default function DivinationSkillsPage({ onBack }: DivinationSkillsPageProps) {
  const skills = [
    {
      id: 1,
      title: "三牌阵解读技巧",
      description: "掌握过去-现在-未来的连接方式",
      difficulty: "初级",
      readTime: "5分钟",
      content: `
三牌阵解读技巧

三牌阵是最基础也是最实用的卡牌牌阵之一。很多新手容易犯的错误是单独解读每张牌，而忽略了牌与牌之间的连接。

基本结构
- 第一张牌：过去 - 影响当前情况的根源
- 第二张牌：现在 - 当前的状态和挑战
- 第三张牌：未来 - 可能的发展方向

解读要点

1. 整体观察
首先观察三张牌的整体能量：
- 大部分是正位还是逆位？
- 颜色搭配给人什么感觉？
- 牌面人物的朝向和互动

2. 寻找连接
- 过去如何影响现在？
- 现在的状态如何指向未来？
- 三张牌是否有共同的主题或元素？

3. 故事叙述
将三张牌串联成一个完整的故事，这样的解读更有说服力和指导意义。

实例分析

案例：过去-变革，现在-星星，未来-太阳

解读：你经历了突然的变化和破坏（变革），这个经历虽然痛苦，但让你重新审视自己的人生。现在你正在重新找到希望和方向（星星），内心逐渐平静，开始相信未来。如果你能保持这种积极的心态，未来将迎来光明和成功（太阳）。

这种连贯的解读比单独说"变革代表破坏，星星代表希望，太阳代表成功"要有意义得多。
      `,
    },
    {
      id: 2,
      title: "逆位牌的深层含义",
      description: "不要害怕逆位，它们有独特的智慧",
      difficulty: "中级",
      readTime: "8分钟",
      content: `
逆位牌的深层含义

很多初学者看到逆位牌就紧张，认为逆位就是"不好"。实际上，逆位牌有着丰富的含义层次。

逆位的基本含义

1. 能量阻滞
正位的能量无法正常流动，可能是：
- 内在的阻碍
- 外在的障碍
- 时机不成熟

2. 内化表现
能量转向内在：
- 内省和反思
- 潜意识的影响
- 隐藏的动机

3. 过度或不足
正位能量的极端表现：
- 过度发挥导致失衡
- 能量不足无法显现

解读技巧

观察牌面
- 图像倒置后的视觉效果
- 能量流动的方向变化
- 象征元素的新含义

结合正位理解
逆位不是正位的反面，而是正位的另一种表达方式。

考虑问题背景
同一张逆位牌在不同问题中的含义可能完全不同。

常见逆位牌解读

愚者逆位：
- 不是"愚蠢"，而是缺乏准备的冒险
- 需要更多思考再行动
- 或者是过度谨慎，错失机会

转变逆位：
- 不是"不会死"，而是抗拒改变
- 停滞不前
- 或者是缓慢但深刻的内在转变

记住，逆位牌是卡牌智慧的重要组成部分，学会解读它们会让你的指引更加准确和深入。
      `,
    },
    {
      id: 3,
      title: "提问的艺术",
      description: "好的问题是准确指引的关键",
      difficulty: "初级",
      readTime: "6分钟",
      content: `
提问的艺术

卡牌指引的准确性很大程度上取决于问题的质量。一个好的问题能够引导出更精准和有用的答案。

问题类型

开放式问题 ✅
- "我在这段关系中需要学习什么？"
- "如何改善我的工作状况？"
- "我应该关注哪些方面来实现目标？"

封闭式问题 ❌
- "他爱我吗？"
- "我会升职吗？"
- "我们会复合吗？"

提问技巧

1. 聚焦自己
好的问题关注你能控制的部分：
- ❌ "他什么时候会联系我？"
- ✅ "我如何处理对他的感情？"

2. 寻求指导而非预测
- ❌ "我会在什么时候找到工作？"
- ✅ "我在求职过程中应该注意什么？"

3. 具体但不限制
- ❌ "我今天会遇到什么？"（太宽泛）
- ❌ "我今天下午3点会发生什么？"（太具体）
- ✅ "我今天在工作中需要注意什么？"

问题示例

感情关系
- "我在这段关系中的成长课题是什么？"
- "如何改善我们之间的沟通？"
- "我需要释放哪些情感模式？"

职场发展
- "我的职业发展方向是什么？"
- "如何发挥我的优势？"
- "我需要培养哪些技能？"

个人成长
- "我目前的人生课题是什么？"
- "如何克服内心的恐惧？"
- "我的潜能在哪里？"

避免的问题类型

1. 关于他人的隐私
- "他在想什么？"
- "她的真实感受是什么？"

2. 具体时间预测
- "我什么时候会结婚？"
- "股票什么时候会涨？"

3. 是非判断
- "我应该选择A还是B？"
- "这个决定是对的吗？"

记住，卡牌是一个自我探索和成长的工具，最好的问题是那些能够帮助你更好地了解自己和指导行动的问题。
      `,
    },
  ]

  const [selectedSkill, setSelectedSkill] = useState<(typeof skills)[0] | null>(null)

  if (selectedSkill) {
    return (
      <div className="starry-background min-h-screen">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            paddingTop: "50px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => setSelectedSkill(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              color: "#F5F5DC",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: "8px",
              borderRadius: "6px",
              zIndex: 20,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(-3px)"
              e.currentTarget.style.color = "#FFD700"
              e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)"
              e.currentTarget.style.color = "#F5F5DC"
              e.currentTarget.style.backgroundColor = "transparent"
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            <ArrowLeft size={18} />
            返回
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "0 20px 40px" }}>
          <div
            style={{
              backgroundColor: "rgba(54, 69, 79, 0.9)",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid rgba(255, 215, 0, 0.2)",
              backdropFilter: "blur(15px)",
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#FFD700", marginBottom: "8px" }}>
                {selectedSkill.title}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    padding: "4px 8px",
                    backgroundColor: "rgba(255, 215, 0, 0.2)",
                    color: "#FFD700",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 215, 0, 0.3)",
                  }}
                >
                  {selectedSkill.difficulty}
                </span>
                <span style={{ fontSize: "12px", color: "#D4AF37" }}>阅读时间：{selectedSkill.readTime}</span>
              </div>
              <p style={{ color: "#F5F5DC", fontSize: "14px" }}>{selectedSkill.description}</p>
            </div>

            <div
              style={{ color: "#F5F5DC", lineHeight: "1.6" }}
              dangerouslySetInnerHTML={{
                __html: selectedSkill.content
                  .replace(/\n/g, "<br>")
                  .replace(/❌ (.*)/g, '<div style="color: #ef4444; margin: 8px 0;">❌ $1</div>')
                  .replace(/✅ (.*)/g, '<div style="color: #10b981; margin: 8px 0;">✅ $1</div>'),
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="starry-background min-h-screen">
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          paddingTop: "50px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            color: "#F5F5DC",
            fontSize: "15px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            padding: "8px",
            borderRadius: "6px",
            zIndex: 20,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-3px)"
            e.currentTarget.style.color = "#FFD700"
            e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)"
            e.currentTarget.style.color = "#F5F5DC"
            e.currentTarget.style.backgroundColor = "transparent"
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.2)"
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
          }}
        >
          <ArrowLeft size={18} />
          返回
        </button>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", padding: "15px 0 25px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: "600", color: "#FFD700", marginBottom: "6px" }}>牌阵、牌位、提问技巧</h1>
        <p style={{ color: "#D4AF37", fontSize: "14px" }}>掌握解读技巧</p>
      </div>

      {/* Skills List */}
      <div style={{ padding: "0 20px 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
          <Lightbulb size={18} style={{ color: "#FFD700" }} />
          <span style={{ color: "#F5F5DC", fontSize: "16px", fontWeight: "500" }}>技巧指南</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {skills.map((skill) => (
            <Card
              key={skill.id}
              className="border-0 shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
              onClick={() => setSelectedSkill(skill)}
            >
              <div style={{ padding: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#F5F5DC", marginBottom: "6px" }}>
                      {skill.title}
                    </h3>
                    <p style={{ color: "#D4AF37", fontSize: "14px", marginBottom: "8px" }}>{skill.description}</p>
                  </div>
                  <BookOpen size={20} style={{ color: "#FFD700", marginLeft: "12px" }} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      padding: "4px 8px",
                      backgroundColor:
                        skill.difficulty === "初级"
                          ? "rgba(16, 185, 129, 0.2)"
                          : skill.difficulty === "中级"
                            ? "rgba(255, 193, 7, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                      color:
                        skill.difficulty === "初级" ? "#10b981" : skill.difficulty === "中级" ? "#ffc107" : "#ef4444",
                      borderRadius: "12px",
                      border: `1px solid ${
                        skill.difficulty === "初级"
                          ? "rgba(16, 185, 129, 0.3)"
                          : skill.difficulty === "中级"
                            ? "rgba(255, 193, 7, 0.3)"
                            : "rgba(239, 68, 68, 0.3)"
                      }`,
                    }}
                  >
                    {skill.difficulty}
                  </span>
                  <span style={{ fontSize: "12px", color: "#D4AF37" }}>阅读时间：{skill.readTime}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div style={{ marginTop: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <TrendingUp size={18} style={{ color: "#FFD700" }} />
            <span style={{ color: "#F5F5DC", fontSize: "16px", fontWeight: "500" }}>学习统计</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
            <div
              style={{
                padding: "16px",
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <Target size={16} style={{ color: "#FFD700" }} />
                <span style={{ color: "#F5F5DC", fontSize: "14px", fontWeight: "500" }}>技巧总数</span>
              </div>
              <span style={{ color: "#FFD700", fontSize: "20px", fontWeight: "600" }}>{skills.length}</span>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
