import { MetadataRoute } from 'next'
import { TAROT_CARDS } from './data/tarot-cards'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-domain.com'
  
  // 基础页面
  const basePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tarot-cards`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/spreads`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // 塔罗牌详情页面
  const cardPages = TAROT_CARDS.map((card) => ({
    url: `${baseUrl}/tarot-cards/${card.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 牌阵页面
  const spreadPages = [
    'three-card-spread',
    'love-spread', 
    'career-spread',
    'celtic-cross',
    'daily-guidance'
  ].map((spread) => ({
    url: `${baseUrl}/spreads/${spread}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...basePages, ...cardPages, ...spreadPages]
}
