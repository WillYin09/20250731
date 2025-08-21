import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dyin0802.com'
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/app`, lastModified: new Date() },
  ]
}
