export async function callQwenAPI(messages: any[], model = "qwen-turbo-latest") {
  const apiKey = process.env.ALIYUN_QWEN_API_KEY
  if (!apiKey) throw new Error("未配置阿里云Qwen API Key")

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
      // 可根据需要添加 stream、extra_body 等参数
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Qwen API调用失败: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  // 兼容新版返回结构
  return data.choices?.[0]?.message?.content || ""
}