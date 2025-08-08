import { type NextRequest, NextResponse } from "next/server"

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
    const { messages, question } = body

    console.log("AI聊天API收到请求:", { question, messagesCount: messages?.length })

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
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
      const aiResponse = await callQwenAPI(messages)

      if (aiResponse && aiResponse.trim().length > 10) {
        return NextResponse.json({
          text: aiResponse.trim(),
          success: true,
          source: "qwen",
        })
      }
    } catch (qwenError) {
      console.error("Qwen API调用失败，使用备用回答:", qwenError)
    }

    // 2. 备用回答
    const fallbackResponses = [
      "我理解你的问题，让我为你提供一些思考的角度...",
      "这是一个很有趣的问题，从塔罗的角度来看...",
      "每个人的情况都是独特的，我建议你可以从以下几个方面来思考...",
      "感谢你的分享，这让我想到了一个相关的智慧...",
    ]

    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return NextResponse.json({
      text: randomResponse,
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
