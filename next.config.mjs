/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 开发环境优化
  experimental: {
    // 启用更快的HMR
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // 开发服务器配置
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 优化开发环境的热重载
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.next'],
      }
    }
    return config
  },
}

export default nextConfig
