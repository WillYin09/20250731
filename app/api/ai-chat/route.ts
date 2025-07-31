import { type NextRequest, NextResponse } from "next/server"
import { callQwenAPI } from "../../services/qwen-api"

export async function POST(request: NextRequest) {
  try {
    const { message, cards, question } = await request.json()

    // 构建上下文信息
    let context = ""
    if (cards && cards.length > 0) {
      context = `当前指引的卡牌：${cards.map((card: any) => `${card.translation}(${card.name})`).join("、")}`
    }
    if (question) {
      context += `\n用户的问题：${question}`
    }

    // 1. 优先尝试Qwen
    try {
      const messages = [
        {
          role: "system",
          content: `你是一位极具洞察力的情绪指引师，拥有深厚的心理学、哲学知识和丰富的人生阅历。请用温暖、智慧且富有启发性的语调回答用户的问题。

回答要求：
1. 控制在150-200字以内，确保内容充实而有深度
2. 语言要优美、富有诗意且富有哲理，能够触动人心
3. 给出实用的建议和指引，结合心理学和人生智慧
4. 保持神秘而温暖的氛围，富有启发性
5. 结合卡牌的智慧，提供个性化的深度洞察
6. 不要过于简短，确保回答的深度和启发性

${context ? `\n背景信息：${context}` : ""}`,
        },
        { role: "user", content: message },
      ]
      const aiResponse = await callQwenAPI(messages)
      if (aiResponse) {
        return NextResponse.json({
          success: true,
          message: aiResponse,
          source: "qwen",
        })
      }
    } catch (qwenError) {
      console.error("Qwen API调用失败，尝试SiliconFlow:", qwenError)
    }

    // 下面保留SiliconFlow原有API调用和fallback逻辑
    try {
      const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SILICONFLOW_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3",
          messages: [
            {
              role: "system",
              content: `你是一位经验丰富的情绪指引师，拥有深厚的心理学知识。请用温暖、智慧且略带启发性的语调回答用户的问题。\n\n回答要求：\n1. 控制在100-150字以内\n2. 语言要优美、富有诗意\n3. 给出实用的建议和指引\n4. 保持神秘而温暖的氛围\n5. 结合卡牌的智慧\n${context ? `\n背景信息：${context}` : ""}`,
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const aiResponse = data.choices[0]?.message?.content

        if (aiResponse) {
          return NextResponse.json({
            success: true,
            message: aiResponse,
            source: "ai",
          })
        }
      }
    } catch (aiError) {
      console.error("AI API调用失败:", aiError)
    }

    // 备用回答机制和错误处理保持不变
    const fallbackResponses = {
      过去: "过去的经历如同夜空中的星辰，虽已远去却依然闪烁着智慧的光芒。那些看似困难的时刻，实际上是宇宙为你准备的成长礼物。每一次挫折都在为今日的坚强奠定基础，相信过去的一切都有其深层的意义。",
      现在: "此刻的你正站在人生的十字路口，内心的直觉正在轻声指引着方向。现在是行动的时机，也是静心聆听内在声音的时刻。相信自己的判断，同时保持开放的心态去接纳新的可能性。",
      未来: "未来如同晨曦中的薄雾，朦胧中蕴含着无限的可能。你的选择和行动将如画笔般描绘出属于自己的人生画卷。保持积极的心态，未来的道路将因你的勇气而变得光明。",
      情感: "情感的能量如同月光般温柔而神秘。真正的情感需要两颗心灵的共鸣，而不仅仅是表面的吸引。打开心扉，用真诚去感受，情感将在最合适的时机降临到你的生命中。",
      职场: "职场的发展如同种子的成长，需要耐心的浇灌和时间的沉淀。现在正是积累能量的时期，专注于提升自己的能力，机会将在你准备充分时自然出现。",
      财富: "财富不仅仅是物质的积累，更是内在价值的体现。保持正直的品格，用智慧去创造价值，财富将如流水般自然而来。记住，真正的富有来自于内心的满足。",
      健康: "身心的和谐如同天地间的平衡，需要你用心去维护。倾听身体的声音，给予它足够的关爱和休息。健康的生活方式将为你带来持久的活力和幸福。",
      人际: "人际关系如同花园中的花朵，需要用心去培育。真诚的沟通和理解是最好的养料。学会倾听他人的心声，同时也要勇敢表达自己的想法，和谐的关系将自然绽放。",
    }

    let fallbackMessage =
      "亲爱的朋友，卡牌的智慧告诉我们，每个问题都蕴含着成长的机会。相信你内心的直觉，它会指引你找到属于自己的答案。保持开放的心态，生活的安排总是最好的。"

    for (const [keyword, response] of Object.entries(fallbackResponses)) {
      if (message.includes(keyword)) {
        fallbackMessage = response
        break
      }
    }

    return NextResponse.json({
      success: true,
      message: fallbackMessage,
      source: "fallback",
    })
  } catch (error) {
    console.error("AI聊天API错误:", error)
    return NextResponse.json({
      success: true,
      message: "星辰的指引暂时模糊，但请相信，答案就在你的心中。静下心来，聆听内在的声音，它会为你点亮前行的道路。",
      source: "error_fallback",
    })
  }
}
