"use client"

import { useState } from "react"
import { MessageCircle, Heart, Share2, Plus, TrendingUp, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PostDetailModal from "./post-detail-modal"
import CommentModal from "./comment-modal"
import SharePostModal from "./share-post-modal"
import CardMeaningPage from "./card-meaning-page"
import DivinationSkillsPage from "./divination-skills-page"
import BeginnerGuidePage from "./beginner-guide-page"
import CardReadingPage from "./card-reading-page"

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

export default function CommunityPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [commentModalPost, setCommentModalPost] = useState<Post | null>(null)
  const [shareModalPost, setShareModalPost] = useState<Post | null>(null)
  const [currentView, setCurrentView] = useState("main") // main, cardMeaning, divinationSkills, beginnerGuide, threeCardReading
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { name: "精选内容", avatar: "🔮", level: "牌意解读", verified: true },
      content: "愚者牌的深层含义：代表纯真、新的开始和无限的可能性。当这张牌出现时，通常意味着新的旅程即将开始...",
      fullContent: `愚者牌的深层含义：代表纯真、新的开始和无限的可能性。当这张牌出现时，通常意味着新的旅程即将开始。

🌟 **正位含义**：
- 新的旅程即将开始
- 保持开放和好奇的心态
- 相信直觉，勇敢迈出第一步
- 释放过去的束缚，拥抱未知

⚠️ **逆位含义**：
- 可能过于鲁莽或缺乏计划
- 需要更多的准备和思考
- 避免盲目的冒险

愚者牌提醒我们要保持初心，像孩子一样对世界充满好奇。即使前路未卜，也要相信自己的内在智慧。`,
      image: true,
      likes: 24,
      comments: 8,
      time: "精选",
      tags: ["愚者牌", "牌意解读"],
      isLiked: false,
      shareCount: 5,
    },
    {
      id: 2,
      user: { name: "指引技巧", avatar: "⭐", level: "解读方法", verified: false },
      content: "三牌阵解读技巧：过去-现在-未来要结合起来看，形成完整的故事线。很多新手会单独分析每张牌...",
      fullContent: `三牌阵解读技巧：过去-现在-未来要结合起来看，形成完整的故事线。

很多新手在解读三牌阵时，会单独分析每张牌的含义，但其实最重要的是要把三张牌连接起来，形成一个完整的故事。

📖 **解读步骤**：

1. **整体观察**：先看三张牌的整体感觉，是积极的还是需要注意的？

2. **寻找连接**：
   - 过去的经历如何影响现在？
   - 现在的状态会如何发展到未来？
   - 三张牌之间有什么共同的主题？

3. **故事叙述**：用讲故事的方式把三张牌串联起来，这样解读会更有说服力。

💡 **实例分析**：
假设抽到：过去-高塔，现在-星星，未来-太阳
故事线：经历了突然的变化和破坏（高塔），现在正在重新找到希望和方向（星星），未来将迎来光明和成功（太阳）。`,
      likes: 56,
      comments: 12,
      time: "精选",
      tags: ["三牌阵", "解读技巧"],
      isLiked: true,
      shareCount: 12,
    },
    {
      id: 3,
      user: { name: "新手指南", avatar: "🌙", level: "基础知识", verified: false },
      content: "转变牌的含义解析：转变牌不是真的结束，而是代表转变和转化。这张牌提醒我们...",
      fullContent: `转变牌的含义解析：转变牌不是真的结束，而是代表转变和转化。这张牌提醒我们：

🔄 **核心含义**：
- 结束与开始：一个阶段的结束，新阶段的开始
- 转变与转化：内在的成长和外在的变化
- 释放与重生：放下旧有的束缚，迎接新的可能

💡 **解读要点**：
- 不要被表面的"结束"吓到
- 关注转变带来的积极影响
- 理解变化是成长的必经之路

转变牌教导我们，变化虽然令人不安，但却是生命进化的自然过程。`,
      likes: 18,
      comments: 15,
      time: "精选",
      tags: ["转变牌", "新手指南"],
      isLiked: false,
      shareCount: 3,
    },
  ])

  const topics = [
    {
      name: "每日指引",
      count: 1234,
      trend: "up",
      color: "bg-primary-100 text-primary-700",
      action: "threeCardReading",
    },
    {
      name: "牌意解读",
      count: 856,
      trend: "up",
      color: "bg-secondary-100 text-secondary-700",
      action: "cardMeaning",
    },
    {
      name: "指引技巧",
      count: 642,
      trend: "down",
      color: "bg-accent-100 text-accent-700",
      action: "divinationSkills",
    },
    {
      name: "新手指南",
      count: 423,
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

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId: number, comment: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
          }
        }
        return post
      }),
    )
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

  // Main community view
  return (
    <>
      <div className="space-y-6 pb-8 starry-background min-h-screen">
        {/* Header - 移动端优化 */}
        <div className="flex items-center justify-between pt-4 px-4">
          <div>
            <h1 className="serif-font text-xl font-bold" style={{ color: "#F5F5DC" }}>
              经验分享
            </h1>
            <p className="text-sm" style={{ color: "#D4AF37" }}>
              精选卡牌知识与指引心得
            </p>
          </div>
          <Button
            className="text-white ripple-effect text-sm px-3 py-2 border-0"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #B8860B 100%)",
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
            }}
            onClick={() => {
              // 检测是否为微信小程序环境
              const isWeChatMiniProgram = typeof wx !== 'undefined' && wx.shareAppMessage
              
              if (isWeChatMiniProgram) {
                // 微信小程序环境
                wx.shareAppMessage({
                  title: '我在抽张塔罗吧获得了指引',
                  path: '/pages/index/index'
                })
              } else {
                // Web环境下的分享逻辑
                if (navigator.share) {
                  navigator.share({
                    title: '抽张塔罗吧 - 经验分享',
                    text: '我在抽张塔罗吧获得了指引，推荐给你！',
                    url: window.location.href
                  })
                } else {
                  // 复制链接到剪贴板
                  navigator.clipboard.writeText(window.location.href)
                  alert('链接已复制到剪贴板')
                }
              }
            }}
          >
            <Share2 className="w-4 h-4 mr-1" />
            分享
          </Button>
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
                    <Users className="w-3 h-3" />
                    {topic.count.toLocaleString()} 阅读
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Posts - 移动端优化 */}
        <div className="space-y-3 px-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300"
              style={{
                backgroundColor: "rgba(54, 69, 79, 0.9)",
                border: "1px solid rgba(255, 215, 0, 0.2)",
                backdropFilter: "blur(15px)",
              }}
            >
              <div className="p-4 space-y-3">
                {/* User info - 移动端优化 */}
                <div className="flex items-center gap-3">
                  <div className="text-xl">{post.user.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm truncate" style={{ color: "#F5F5DC" }}>
                        {post.user.name}
                      </span>
                      {post.user.verified && (
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
                          backgroundColor:
                            post.user.level === "大师"
                              ? "rgba(255, 215, 0, 0.1)"
                              : post.user.level === "进阶"
                                ? "rgba(147, 51, 234, 0.1)"
                                : "rgba(107, 114, 128, 0.1)",
                          color:
                            post.user.level === "大师" ? "#FFD700" : post.user.level === "进阶" ? "#9333ea" : "#6b7280",
                          borderColor:
                            post.user.level === "大师"
                              ? "rgba(255, 215, 0, 0.3)"
                              : post.user.level === "进阶"
                                ? "rgba(147, 51, 234, 0.3)"
                                : "rgba(107, 114, 128, 0.3)",
                        }}
                      >
                        {post.user.level}
                      </span>
                    </div>
                    <span className="text-xs" style={{ color: "#D4AF37" }}>
                      {post.time}
                    </span>
                  </div>
                </div>

                {/* Content - Clickable */}
                <div onClick={() => setSelectedPost(post)} className="cursor-pointer">
                  <p className="text-sm leading-relaxed" style={{ color: "#F5F5DC" }}>
                    {post.content}
                  </p>

                  {/* Image placeholder */}
                  {post.image && (
                    <div
                      className="w-full h-24 rounded-lg flex items-center justify-center mt-3"
                      style={{
                        background: "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(184, 134, 11, 0.1) 100%)",
                        border: "1px solid rgba(255, 215, 0, 0.2)",
                      }}
                    >
                      <Sparkles className="w-6 h-6" style={{ color: "#FFD700" }} />
                    </div>
                  )}
                </div>

                {/* Tags - 移动端优化 */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full border"
                      style={{
                        backgroundColor: "rgba(255, 215, 0, 0.1)",
                        color: "#FFD700",
                        borderColor: "rgba(255, 215, 0, 0.3)",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions - 移动端优化 */}
                <div className="flex items-center gap-4 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 transition-colors duration-200 text-sm hover:bg-transparent"
                    style={{
                      color: post.isLiked ? "#ef4444" : "#D4AF37",
                    }}
                    onClick={() => handleLike(post.id)}
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
                    <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                    收藏
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 text-sm hover:bg-transparent"
                    style={{ color: "#D4AF37" }}
                    onClick={() => setSelectedPost(post)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#3b82f6"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#D4AF37"
                    }}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    详情
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 text-sm hover:bg-transparent"
                    style={{ color: "#D4AF37" }}
                    onClick={() => setShareModalPost(post)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#10b981"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#D4AF37"
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    分享
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PostDetailModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
        onLike={handleLike}
        onComment={(post) => setCommentModalPost(post)}
        onShare={(post) => setShareModalPost(post)}
      />

      <CommentModal
        isOpen={!!commentModalPost}
        onClose={() => setCommentModalPost(null)}
        post={commentModalPost}
        onAddComment={handleAddComment}
      />

      <SharePostModal isOpen={!!shareModalPost} onClose={() => setShareModalPost(null)} post={shareModalPost} />
    </>
  )
}
