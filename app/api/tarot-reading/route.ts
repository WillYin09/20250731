import { type NextRequest, NextResponse } from "next/server"
import { callQwenAPI } from "../../services/qwen-api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cards, spreadType, action, question } = body

    console.log("API收到请求:", { spreadType, action, cardsCount: cards?.length, question })

    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      console.log("❌ 无效的卡牌数据")
      return NextResponse.json(
        {
          error: "无效的卡牌数据",
          text: "抱歉，卡牌数据有误，请重新选择卡牌进行指引。",
        },
        { status: 400 },
      )
    }

    // 提取公共的优化 prompt 模板
    const optimizedSystemPrompt = `你是一位极具洞察力的资深塔罗师，拥有深厚的心理学、哲学知识和丰富的人生阅历。请为用户提供**深入、温暖、有启发性**的塔罗牌解读。

解读要求：
1. **语言风格**：神秘而温暖，富有诗意且富有哲理，能够触动人心，直接与用户对话
2. **结构清晰**：分为整体解读、深度分析、行动建议、祝福与展望四个部分
3. **核心解读原则**：
   - **故事串联**：不要单独解读每张牌，而是将牌阵串联成完整的故事线
   - **情感共鸣**：使用"你"直接对话，承认困难但给出希望，用"虽然...但是..."的转折句式
   - **具体化描述**：避免抽象概念，用具体场景和感受来描述，结合用户具体问题
   - **专业平衡**：用通俗易懂的语言解释深奥概念，平衡专业性和可读性
4. **深度分析要求**：
   - 分析牌与牌之间的能量互动和因果关系
   - 结合心理学、哲学、人生经验，深入剖析每张牌对用户问题的深层含义
   - 强调"过去-现在-未来"的连贯性和发展脉络
   - 给出个性化的深度洞察，而非通用解读
5. **个性化**：结合用户问题和卡牌组合给出针对性建议
6. **积极导向**：即使是挑战性的卡牌也要给出建设性的指导
7. **格式要求**：纯文本输出，不要使用表格、符号、格式化标记，保持自然的段落结构

请用中文回答，语调温和而充满智慧，让用户感受到深刻的洞察和温暖的指引。`

    const optimizedUserPrompt = `请为我解读这次${spreadType}指引：

用户问题：${question || "寻求人生指引"}

抽到的卡牌：
${cards
  .map(
    (card, index) =>
      `${index + 1}. ${card.translation || card.name} (${card.reversed ? "逆位" : "正位"}) - ${card.meaning || "深度洞察"}`,
  )
  .join("\n")}

请提供一个**深入、温暖、有启发性**的解读，分为四个部分：整体解读、深度分析、行动建议、祝福与展望。

**特别要求**：
- **整体解读**：分析牌阵的整体能量和趋势，直接回应用户问题，感受整个故事的能量
- **深度分析**：将牌阵串联成完整的故事线，分析牌与牌之间的关系和因果关系，结合用户问题给出深层洞察。使用"虽然...但是..."的转折句式，承认困难但给出希望
- **行动建议**：提供具体、实用的行动指导，包括短期和长期建议，用具体场景描述
- **祝福与展望**：给予温暖的鼓励和对未来的积极展望，直接与用户对话

**格式要求**：纯文本输出，不要使用表格、符号、格式化标记，保持自然的段落结构，确保内容连贯流畅。

请确保解读内容深入、有启发性，能够真正帮助用户理解和行动。`

    // 调用Qwen API
    try {
      const aiResponse = await callQwenAPI([
        { role: "system", content: optimizedSystemPrompt },
        { role: "user", content: optimizedUserPrompt },
      ])

      if (aiResponse && aiResponse.trim().length > 50) {
        return NextResponse.json({
          text: aiResponse.trim(),
          success: true,
          source: "qwen",
        })
      }
    } catch (qwenError) {
      console.error("Qwen API调用失败，使用备用解读:", qwenError)
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
      if (question?.includes(keyword)) {
        fallbackMessage = response
        break
      }
    }

    return NextResponse.json({
      text: fallbackMessage,
      success: true,
      source: "fallback",
    })
  } catch (error) {
    console.error("塔罗牌解读API错误:", error)
    return NextResponse.json(
      {
        error: "服务器内部错误",
        text: "抱歉，解读服务暂时不可用，请稍后再试。",
      },
      { status: 500 },
    )
  }
}
