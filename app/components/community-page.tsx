"use client"

import { useState } from "react"
import { MessageCircle, Heart, Share2, Plus, TrendingUp, Users, Sparkles, BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import KnowledgeDetailModal from "./knowledge-detail-modal"
import CardMeaningPage from "./card-meaning-page"
import DivinationSkillsPage from "./divination-skills-page"
import BeginnerGuidePage from "./beginner-guide-page"
import CardReadingPage from "./card-reading-page"

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

export default function CommunityPage() {
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null)
  const [currentView, setCurrentView] = useState("main") // main, cardMeaning, divinationSkills, beginnerGuide, threeCardReading

  const knowledgeArticles: KnowledgeArticle[] = [
    {
      id: 1,
      title: "愚者牌的深层心理学解读",
      author: "塔罗心理学专家",
      avatar: "🧠",
      level: "专家",
      verified: true,
      content: "愚者牌在心理学层面代表原始自我（Primitive Self）的显现。荣格认为，愚者象征着个体化过程中最纯真的状态，是集体无意识的原型之一...",
      fullContent: `愚者牌的深层心理学解读

愚者牌在心理学层面代表原始自我（Primitive Self）的显现。荣格认为，愚者象征着个体化过程中最纯真的状态，是集体无意识的原型之一。

🧠 心理学视角

1. 原始自我原型
愚者代表人类最原始、最纯真的心理状态，不受社会规范约束，完全按照本能行事。这种状态在心理学上被称为"原始自我"。

2. 无意识的力量
愚者的行为看似鲁莽，实则体现了深层无意识的智慧。他相信直觉，不受理性思维的限制，这正是创造力的源泉。

3. 回归本真
在现代社会中，我们往往被各种规则和期望束缚。愚者提醒我们要回归内心的纯真，重新连接内在的智慧。

💡 深层含义

- 信任直觉：愚者教导我们相信内在的声音
- 拥抱未知：对未知保持开放和好奇的态度
- 释放束缚：放下社会期待，做真实的自己
- 创造性思维：突破常规思维，寻找新的可能性

🎯 实践应用

当愚者牌出现时，可能意味着：
- 需要重新审视自己的人生方向
- 应该相信直觉而不是过度分析
- 是时候尝试新的可能性
- 需要回归内心的纯真状态

愚者牌提醒我们，真正的智慧往往来自内心的纯真，而不是外在的知识。`,
      category: "心理学深度解析",
      tags: ["愚者牌", "心理学", "荣格理论", "原型"],
      readTime: "8分钟",
      difficulty: "专家",
    },
    {
      id: 2,
      title: "塔罗牌阵的心理学基础",
      author: "塔罗治疗师",
      avatar: "🎯",
      level: "专家",
      verified: true,
      content: "塔罗牌阵不仅仅是占卜工具，更是心理投射的载体。每个牌位都对应着不同的心理层面，通过系统性的排列...",
      fullContent: `塔罗牌阵的心理学基础

塔罗牌阵不仅仅是占卜工具，更是心理投射的载体。每个牌位都对应着不同的心理层面，通过系统性的排列，能够帮助我们更深入地理解自己的内心世界。

🧠 心理学原理

1. 投射理论
塔罗牌阵利用心理投射原理，让无意识的内容通过图像符号显现出来。当我们选择特定位置的牌时，实际上是在投射自己的心理状态。

2. 象征性思维
塔罗牌阵中的每个位置都有其象征意义，对应着不同的心理功能：
- 意识层面：理性思维、逻辑分析
- 前意识：记忆、经验、习惯
- 无意识：深层欲望、恐惧、原型

3. 系统性思维
牌阵通过特定的排列方式，创造了一个完整的心理地图，帮助我们系统性地探索内心世界。

🎯 经典牌阵解析

三牌阵（过去-现在-未来）
- 过去：影响当前情况的根源，对应前意识
- 现在：当前的心理状态，对应意识
- 未来：潜在的发展方向，对应无意识

凯尔特十字
- 中心：核心问题，对应自我
- 十字：外在环境，对应人格面具
- 基础：深层原因，对应阴影
- 目标：理想状态，对应自性

💡 实践技巧

1. 建立连接
在解读牌阵时，要寻找牌与牌之间的连接，理解它们如何共同讲述一个完整的故事。

2. 深度探索
不要满足于表面的解释，要深入探索每张牌在当前位置的特殊含义。

3. 整合理解
将牌阵作为一个整体来理解，而不是孤立地解读每张牌。

塔罗牌阵是探索内心世界的强大工具，通过系统性的排列和深度的解读，能够帮助我们更好地理解自己。`,
      category: "牌阵理论",
      tags: ["牌阵", "心理学", "投射理论", "系统性思维"],
      readTime: "12分钟",
      difficulty: "专家",
    },
    {
      id: 3,
      title: "塔罗牌与荣格原型理论",
      author: "深度心理学研究者",
      avatar: "🌌",
      level: "专家",
      verified: true,
      content: "塔罗牌与荣格的集体无意识理论有着深刻的联系。大阿卡纳牌实际上对应着荣格提出的主要原型...",
      fullContent: `塔罗牌与荣格原型理论

塔罗牌与荣格的集体无意识理论有着深刻的联系。大阿卡纳牌实际上对应着荣格提出的主要原型，这些原型是人类心理的普遍模式。

🧠 原型对应关系

1. 愚者 - 原始自我原型
代表最纯真的心理状态，不受社会规范约束，完全按照本能行事。

2. 魔术师 - 自我原型
代表意识的整合能力，能够协调内在的各种力量。

3. 女祭司 - 阿尼玛原型
代表内在的直觉和智慧，是男性心理中的女性面向。

4. 女皇 - 母亲原型
代表滋养、创造和丰盛，是生命力的象征。

5. 皇帝 - 父亲原型
代表权威、结构和秩序，是理性思维的象征。

6. 教皇 - 智慧老人原型
代表精神指导和传统智慧，是内在导师的象征。

7. 恋人 - 阿尼玛/阿尼姆斯原型
代表内在的阴阳平衡，是完整性的象征。

8. 战车 - 英雄原型
代表意志力和自我控制，是克服困难的象征。

💡 深层含义

原型的作用：
- 提供心理发展的路线图
- 帮助理解内在的动力
- 指导个体化过程
- 连接集体无意识

🎯 实践应用

在塔罗解读中运用原型理论：
1. 识别当前活跃的原型
2. 理解原型之间的互动
3. 指导心理发展过程
4. 促进内在整合

塔罗牌是探索原型的强大工具，通过理解原型，我们能够更深入地理解自己和他人。`,
      category: "深度心理学",
      tags: ["荣格理论", "原型", "集体无意识", "个体化"],
      readTime: "15分钟",
      difficulty: "专家",
    },
    {
      id: 4,
      title: "塔罗牌中的阴影工作",
      author: "阴影治疗师",
      avatar: "🌑",
      level: "专家",
      verified: true,
      content: "阴影是荣格心理学中的重要概念，指我们不愿意承认的内在面向。塔罗牌中的某些牌特别适合进行阴影工作...",
      fullContent: `塔罗牌中的阴影工作

阴影是荣格心理学中的重要概念，指我们不愿意承认的内在面向。塔罗牌中的某些牌特别适合进行阴影工作，帮助我们整合被压抑的部分。

🌑 阴影的本质

阴影包含：
- 被社会否定的特质
- 我们不愿意承认的欲望
- 童年时期被压抑的面向
- 集体无意识中的负面原型

🧠 塔罗牌中的阴影表现

1. 恶魔牌 - 欲望的阴影
代表被压抑的欲望和本能，提醒我们承认和整合这些面向。

2. 高塔牌 - 幻想的阴影
代表被打破的虚假自我，是真实自我的显现。

3. 月亮牌 - 恐惧的阴影
代表内在的恐惧和不确定性，需要被理解和接纳。

4. 死神牌 - 改变的阴影
代表对改变的恐惧，实际上是转化的开始。

💡 阴影工作技巧

1. 识别阴影
- 观察哪些牌让你感到不舒服
- 注意你的情绪反应
- 探索这些反应的根源

2. 接纳阴影
- 不要试图消除阴影
- 理解阴影的积极作用
- 学会与阴影共处

3. 整合阴影
- 将阴影特质融入意识
- 找到建设性的表达方式
- 实现内在的平衡

🎯 实践方法

阴影工作练习：
1. 选择一张让你感到不舒服的牌
2. 深入探索这种不适感
3. 理解这种反应的根源
4. 寻找建设性的表达方式

阴影工作是塔罗牌深度应用的重要方面，通过面对和整合阴影，我们能够实现更完整的自我。`,
      category: "阴影工作",
      tags: ["阴影", "荣格理论", "心理整合", "自我接纳"],
      readTime: "10分钟",
      difficulty: "专家",
    },
  ]

  const topics = [
    {
      name: "每日指引",
      count: "立刻抽牌",
      trend: "up",
      color: "bg-primary-100 text-primary-700",
      action: "threeCardReading",
    },
    {
      name: "牌意解读",
      count: "78张卡牌详解",
      trend: "up",
      color: "bg-secondary-100 text-secondary-700",
      action: "cardMeaning",
    },
    {
      name: "指引技巧",
      count: "牌阵、牌位、提问技巧",
      trend: "up",
      color: "bg-accent-100 text-accent-700",
      action: "divinationSkills",
    },
    {
      name: "新手指南",
      count: "从0~1入门指南",
      trend: "up",
      color: "bg-pink-100 text-pink-700",
      action: "beginnerGuide",
    },
  ]

  const handleTopicClick = (action: string) => {
    setCurrentView(action)
  }

  const handleBackToMain = () => {
    setCurrentView("main")
  }

  const handleArticleClick = (article: KnowledgeArticle) => {
    setSelectedArticle(article)
  }

  // Render different views based on currentView
  if (currentView === "cardMeaning") {
    return <CardMeaningPage onBack={handleBackToMain} />
  }

  if (currentView === "divinationSkills") {
    return <DivinationSkillsPage onBack={handleBackToMain} />
  }

  if (currentView === "beginnerGuide") {
    return <BeginnerGuidePage onBack={handleBackToMain} />
  }

  if (currentView === "threeCardReading") {
    return <CardReadingPage spreadType="三牌阵" onBack={handleBackToMain} />
  }

  // Main knowledge view
  return (
    <>
      <div className="space-y-6 pb-8 starry-background min-h-screen">
        {/* Header - 移动端优化 */}
        <div className="flex items-center pt-4 px-4">
          <div>
            <h1 className="serif-font text-xl font-bold" style={{ color: "#F5F5DC" }}>
              知识学习
            </h1>
            <p className="text-sm" style={{ color: "#D4AF37" }}>
              精选塔罗牌知识与学习技巧
            </p>
          </div>
        </div>

        {/* Hot Topics - 移动端优化 */}
        <div className="space-y-3 px-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: "#FFD700" }} />
            <h2 className="serif-font text-base font-semibold" style={{ color: "#F5F5DC" }}>
              热门话题
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {topics.map((topic) => (
              <Card
                key={topic.name}
                className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "rgba(54, 69, 79, 0.9)",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                  backdropFilter: "blur(15px)",
                }}
                onClick={() => handleTopicClick(topic.action)}
              >
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm" style={{ color: "#F5F5DC" }}>
                      {topic.name}
                    </h3>
                    <div
                      className="text-xs px-2 py-1 rounded-full border"
                      style={{
                        color: topic.trend === "up" ? "#10b981" : "#ef4444",
                        backgroundColor: topic.trend === "up" ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)",
                        borderColor: topic.trend === "up" ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)",
                      }}
                    >
                      {topic.trend === "up" ? "↗" : "↘"}
                    </div>
                  </div>
                                      <div className="flex items-center gap-1 text-xs" style={{ color: "#D4AF37" }}>
                      <BookOpen className="w-3 h-3" />
                      {topic.count}
                    </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Knowledge Articles - 移动端优化 */}
                  <div className="space-y-3 px-4">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4" style={{ color: "#FFD700" }} />
              <h2 className="serif-font text-base font-semibold" style={{ color: "#F5F5DC" }}>
                深度知识
              </h2>
            </div>

          {knowledgeArticles.map((article) => (
            <Card
              key={article.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
              onClick={() => handleArticleClick(article)}
            >
              <div className="p-4 space-y-3">
                {/* Article header */}
                <div className="flex items-center gap-3">
                  <div className="text-xl">{article.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm truncate" style={{ color: "#F5F5DC" }}>
                        {article.author}
                      </span>
                      {article.verified && (
                        <div
                          className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "#3b82f6" }}
                        >
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                      <span
                        className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 border"
                        style={{
                          backgroundColor: "rgba(255, 215, 0, 0.1)",
                          color: "#FFD700",
                          borderColor: "rgba(255, 215, 0, 0.3)",
                        }}
                      >
                        {article.difficulty}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} style={{ color: "#D4AF37" }} />
                </div>

                {/* Article title */}
                <h3 className="font-semibold text-base" style={{ color: "#F5F5DC" }}>
                  {article.title}
                </h3>

                {/* Article content */}
                <p className="text-sm leading-relaxed" style={{ color: "#D4AF37" }}>
                  {article.content}
                </p>

                {/* Article meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "#D4AF37" }}>
                      {article.readTime}
                    </span>
                    <span className="text-xs" style={{ color: "#6b7280" }}>
                      •
                    </span>
                    <span className="text-xs" style={{ color: "#D4AF37" }}>
                      {article.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(255, 215, 0, 0.1)",
                          color: "#FFD700",
                          border: "1px solid rgba(255, 215, 0, 0.2)",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      <KnowledgeDetailModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />
    </>
  )
}
