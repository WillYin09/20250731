"use client"

import { TAROT_CARDS } from "../data/tarot-cards"

interface StructuredDataProps {
  type: 'website' | 'article' | 'tarot-card' | 'spread'
  data?: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "塔罗牌在线解读平台",
          "description": "专业的塔罗牌在线解读平台，提供78张塔罗牌详细含义、免费占卜、牌阵解读、塔罗牌学习指南。",
          "url": "https://your-domain.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://your-domain.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://weibo.com/your-account",
            "https://www.zhihu.com/people/your-account"
          ]
        }
      
      case 'tarot-card':
        if (!data) return null
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `${data.translation} - ${data.name} 塔罗牌含义`,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "塔罗牌解读平台"
          },
          "publisher": {
            "@type": "Organization",
            "name": "塔罗牌解读平台",
            "logo": {
              "@type": "ImageObject",
              "url": "https://your-domain.com/logo.png"
            }
          },
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString(),
          "mainEntity": {
            "@type": "Thing",
            "name": data.translation,
            "description": data.description
          }
        }
      
      case 'spread':
        if (!data) return null
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": `${data.name} 塔罗牌阵解读方法`,
          "description": data.description,
          "step": data.steps?.map((step: any, index: number) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title,
            "text": step.description
          })) || []
        }
      
      default:
        return null
    }
  }

  const structuredData = getStructuredData()
  
  if (!structuredData) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
