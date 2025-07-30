import { type NextRequest, NextResponse } from "next/server"

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

    // 尝试调用AI服务
    try {
      const aiResponse = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SILICONFLOW_API_TOKEN}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: `你是一位专业的情绪指引师，拥有深厚的心理学知识和直觉洞察力。请为用户提供准确、有洞察力的卡牌解读。

解读要求：
1. 语言风格：神秘而温暖，富有诗意但不失实用性
2. 结构清晰：分为整体解读、深度分析、行动建议、祝福与展望四个部分
3. 内容精炼：每个部分控制在100-150字以内，避免冗长
4. 个性化：结合用户问题和卡牌组合给出针对性建议
5. 积极导向：即使是挑战性的卡牌也要给出建设性的指导

请用中文回答，语调温和而充满智慧。`,
            },
            {
              role: "user",
              content: `请为我解读这次${spreadType}指引：

用户问题：${question || "寻求人生指引"}

抽到的卡牌：
${cards
  .map(
    (card, index) =>
      `${index + 1}. ${card.translation || card.name} (${card.reversed ? "逆位" : "正位"}) - ${card.meaning || "深度洞察"}`,
  )
  .join("\n")}

请提供一个结构清晰、内容精炼的解读，分为四个部分：整体解读、深度分析、行动建议、祝福与展望。每个部分控制在150字以内。`,
            },
          ],
          temperature: 0.8,
          max_tokens: 1500,
        }),
      })

      if (aiResponse.ok) {
        const aiData = await aiResponse.json()
        const aiText = aiData.choices?.[0]?.message?.content

        if (aiText && aiText.trim().length > 50) {
          console.log("✅ AI解读成功生成")
          return NextResponse.json({
            text: aiText.trim(),
            success: true,
            source: "ai",
          })
        }
      }

      console.log("⚠️ AI响应无效，使用备用解读")
    } catch (aiError) {
      console.error("AI调用失败:", aiError)
    }

    // 生成高质量的备用解读内容
    const generateQualityReading = (cards: any[], spreadType: string, userQuestion?: string) => {
      const questionContext = userQuestion ? `关于您的问题"${userQuestion}"，` : ""

      // 分析卡牌能量
      const positiveCards = cards.filter((card) => !card.reversed).length
      const reversedCards = cards.filter((card) => card.reversed).length

      let energyDescription = ""
      if (positiveCards > reversedCards) {
        energyDescription = "整体能量偏向积极正面，预示着成长和机遇"
      } else if (reversedCards > positiveCards) {
        energyDescription = "当前存在一些挑战，但这正是转化和突破的契机"
      } else {
        energyDescription = "正逆位平衡，显示出人生的复杂性和多面性"
      }

      const reading = `## 整体解读

${questionContext}从您抽取的${cards.length}张牌来看，${energyDescription}。宇宙正在为您编织一个充满可能性的故事，每张牌都承载着深刻的智慧和指引。

## 深度分析

${cards
  .map((card, index) => {
    const position = ["过去/根源", "现在/核心", "未来/结果", "外在影响", "内在指引"][index] || `第${index + 1}个层面`
    return `**${card.translation || card.name}·${card.reversed ? "逆位" : "正位"}** (${position})：${card.reversed ? "提醒您关注内在的阻碍，这是成长的机会" : "带来积极的能量和前进的动力"}。`
  })
  .join("\n\n")}

## 行动建议

1. **保持觉察**：密切关注内心的声音和直觉的指引
2. **积极行动**：将洞察转化为具体的行动步骤
3. **保持平衡**：在追求目标的同时，不忘照顾内心的需求

## 祝福与展望

愿这次指引为您点亮前行的明灯。记住，卡牌揭示的是可能性，而真正的力量在于您的选择和行动。相信自己的智慧，拥抱变化，您的人生将绽放出独特的光彩。🌟`

      return reading
    }

    const readingText = generateQualityReading(cards, spreadType, question)

    console.log("✅ 备用解读生成成功")

    return NextResponse.json({
      text: readingText,
      success: true,
      source: "fallback",
    })
  } catch (error) {
    console.error("API处理错误:", error)

    const errorReading = `## 卡牌指引

虽然当前遇到了一些技术问题，但请相信，您选择的每张牌都蕴含着深刻的意义。

## 整体解读

从能量的角度来看，您正处在一个重要的人生节点。宇宙正在为您准备新的机遇和挑战，这是成长和转化的时刻。

## 行动建议

1. 保持内心的平静和开放
2. 相信自己的直觉和判断力  
3. 勇敢地迎接即将到来的变化

## 祝福与展望

愿您在人生的旅途中找到属于自己的光芒，每一步都充满智慧和勇气。🌟`

    return NextResponse.json({
      text: errorReading,
      success: true,
      source: "error_fallback",
    })
  }
}
