export async function callDeepSeekAPI(messages: any[]) {
  const apiToken = process.env.NEXT_PUBLIC_SILICONFLOW_API_TOKEN

  if (!apiToken || apiToken === "your_api_token_here") {
    throw new Error("API_TOKEN_NOT_CONFIGURED")
  }

  const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek-ai/DeepSeek-R1-0528-Qwen3-8B",
      messages: messages,
      temperature: 0.7,
      max_tokens: 2000,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("DeepSeek API请求失败:", response.status, errorText)
    throw new Error(`API调用失败: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || ""
}
