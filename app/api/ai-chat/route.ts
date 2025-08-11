import { type NextRequest, NextResponse } from "next/server"

interface TarotCard {
  name: string
  isReversed?: boolean
}

// 直接在Vercel Functions中调用Qwen API
async function callQwenAPI(messages: any[], model = "qwen-turbo-latest") {
  const apiKey = process.env.ALIYUN_QWEN_API_KEY
  if (!apiKey) {
    console.error("未配置阿里云Qwen API Key")
    throw new Error("API配置错误")
  }

  try {
    const response = await fetch("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 3000,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Qwen API调用失败: ${response.status} ${errorText}`)
      throw new Error(`API调用失败: ${response.status}`)
    }

    const data = await response.json()
    return data.choices?.[0]?.message?.content || ""
  } catch (error) {
    console.error("Qwen API调用异常:", error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, cards, question }: { message: string; cards?: TarotCard[]; question?: string } = body

    console.log("AI聊天API收到请求:", { question, message, cardsCount: cards?.length })

    if (!message || !message.trim()) {
      return NextResponse.json(
        {
          error: "无效的消息数据",
          text: "抱歉，消息数据有误，请重新发送。",
        },
        { status: 400 },
      )
    }

    // 1. 优先尝试Qwen
    try {
             // 构建消息数组，包含用户问题和塔罗牌信息
       const messages = [
         {
                       role: "system",
            content: `你是一位专业的塔罗牌解读师，擅长严格按照牌阵位置进行解读。请按照以下要求提供专业解读：

【核心要求】
1. 篇幅控制在400-600字内，确保解读完整
2. 用温暖、专业且富有启发性的语言
3. 严格按照牌阵位置顺序进行解读
4. 结合塔罗牌含义和用户具体问题

【牌阵解读结构】
你必须严格按照牌阵位置进行解读，每个位置都要明确标注：

1. 【位置名称 - 塔罗牌名称】
   - 解释这张牌在这个位置的含义
   - 说明为什么这张牌出现在这个位置
   - 结合用户问题分析这个位置的意义

2. 【位置关联】
   - 解释不同位置之间的关系
   - 建立完整的故事线
   - 让用户理解整体发展脉络

【表达要求】
- 制造情绪起伏：用长短句结合，通过提问、总结制造"留白"
- 提炼金句：在解读中突出1-2个核心观点，用"💡"标记
- 增强画面感：使用具体、生动的比喻和意象
- 个性化表达：避免常规化语言，追求新颖但符合语境的表达
- 情感递进：从理解到解读，再到启发和支持，逐步加深情感层次

【核心原则】
- 陪伴而非教育：做用户的倾听者和支持者，而非指导者
- 启发而非建议：提供思考角度，让用户自己找到答案
- 理解而非评判：理解用户的处境，不评判对错
- 支持而非要求：表达陪伴和支持，不要求用户改变
- 专业而非随意：严格按照牌阵结构，不忽略位置意义

【输出格式】
请用自然流畅的语言，严格按照牌阵位置顺序解读，每个位置都要明确标注。让用户感受到被理解、被陪伴、被支持，同时获得专业的牌阵解读。避免使用"你应该"、"我建议你"等指导性语言，除非用户明确要求建议。`
         },
                   {
            role: "user", 
            content: `问题：${question || "寻求人生指导"}

牌阵信息：
${cards?.map((card, index) => {
  const position = index === 0 ? "过去" : index === 1 ? "现在" : "未来";
  return `【${position}】${card.name}${card.isReversed ? '(逆位)' : ''}`;
}).join('\n') || '无'}

用户问题：${message}

请严格按照牌阵位置顺序进行解读，每个位置都要明确标注。`
          }
       ]
      
      const aiResponse = await callQwenAPI(messages)

      if (aiResponse && aiResponse.trim().length > 10) {
        return NextResponse.json({
          message: aiResponse.trim(),
          success: true,
          source: "qwen",
        })
      }
    } catch (qwenError) {
      console.error("Qwen API调用失败，使用备用回答:", qwenError)
    }

    // 2. 备用回答
    const fallbackResponses = [
      "💡 我深深理解你此刻的困惑。每个人的人生都有这样的转折点，就像塔罗牌中的月亮牌，在黑暗中寻找光明。我会陪伴你一起探索这个问题的深层含义，帮助你找到内心的答案。",
      "💡 你的问题触动了我。从塔罗的角度看，每个挑战都蕴含着成长的可能。就像宝剑牌提醒我们的：困难往往蕴含着新的开始。我会支持你，一起寻找前进的方向。",
      "💡 感谢你愿意分享这么深刻的问题。每个人的经历都是独特的，就像每张塔罗牌都有其独特的能量。让我为你提供一些思考的角度，陪伴你找到内心的答案。",
      "💡 你的问题让我想到了塔罗牌中的星星牌——即使在最黑暗的时刻，希望的光芒依然存在。我会陪伴你，一起探索这个问题的深层含义，发现属于你的智慧。",
    ]

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return NextResponse.json({
      message: randomResponse,
      success: true,
      source: "fallback",
    })
  } catch (error) {
    console.error("AI聊天API错误:", error)
    return NextResponse.json(
      {
        error: "服务器内部错误",
        text: "抱歉，服务器暂时无法处理您的请求，请稍后再试。",
      },
      { status: 500 },
    )
  }
}
