interface PerformanceTestResult {
  timestamp: string
  duration: number
  status: 'success' | 'error'
  error?: string
  responseSize?: number
  networkLatency?: number
  processingTime?: number
}

interface TestConfig {
  iterations: number
  delayBetweenTests: number
  timeout: number
}

class APIPerformanceTester {
  private results: PerformanceTestResult[] = []
  private isRunning = false

  async testSingleRequest(): Promise<PerformanceTestResult> {
    const startTime = Date.now()
    
    // 模拟真实的业务数据
    const testData = {
      message: "我想了解我的感情发展，最近遇到了一些困惑，希望能得到指引。",
      cards: [
        { 
          name: "The Fool", 
          translation: "愚者", 
          position: "过去", 
          reversed: false 
        },
        { 
          name: "The Magician", 
          translation: "魔术师", 
          position: "现在", 
          reversed: true 
        },
        { 
          name: "The High Priestess", 
          translation: "女祭司", 
          position: "未来", 
          reversed: false 
        }
      ],
      question: "我想了解我的感情发展，最近遇到了一些困惑，希望能得到指引。",
      spreadType: "三牌阵"  // 添加缺失的牌阵类型
    }

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      })

      const endTime = Date.now()
      const duration = endTime - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const responseData = await response.json()
      const responseText = JSON.stringify(responseData)
      const responseSize = new Blob([responseText]).size

      return {
        timestamp: new Date().toISOString(),
        duration,
        status: 'success',
        responseSize,
        networkLatency: duration * 0.3, // 估算网络延迟
        processingTime: duration * 0.7   // 估算处理时间
      }
    } catch (error) {
      const endTime = Date.now()
      return {
        timestamp: new Date().toISOString(),
        duration: endTime - startTime,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  async runPerformanceTest(config: TestConfig = { iterations: 5, delayBetweenTests: 2000, timeout: 30000 }): Promise<PerformanceTestResult[]> {
    if (this.isRunning) {
      throw new Error('Test already running')
    }

    this.isRunning = true
    this.results = []

    console.log(`🚀 Starting API performance test...`)
    console.log(`📊 Config: ${config.iterations} iterations, ${config.delayBetweenTests}ms delay, ${config.timeout}ms timeout`)

    for (let i = 0; i < config.iterations; i++) {
      console.log(`\n🔄 Test ${i + 1}/${config.iterations}`)
      
      const result = await this.testSingleRequest()
      this.results.push(result)

      console.log(`⏱️  Duration: ${result.duration}ms`)
      console.log(`📈 Status: ${result.status}`)
      
      if (result.status === 'error') {
        console.log(`❌ Error: ${result.error}`)
      } else {
        console.log(`📦 Response size: ${result.responseSize} bytes`)
      }

      if (i < config.iterations - 1) {
        console.log(`⏳ Waiting ${config.delayBetweenTests}ms before next test...`)
        await new Promise(resolve => setTimeout(resolve, config.delayBetweenTests))
      }
    }

    this.isRunning = false
    this.generateReport()
    return this.results
  }

  generateReport(): void {
    if (this.results.length === 0) {
      console.log('❌ No test results to analyze')
      return
    }

    const successfulTests = this.results.filter(r => r.status === 'success')
    const failedTests = this.results.filter(r => r.status === 'error')

    console.log('\n📊 PERFORMANCE TEST REPORT')
    console.log('=' * 50)

    if (successfulTests.length > 0) {
      const durations = successfulTests.map(r => r.duration)
      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length
      const minDuration = Math.min(...durations)
      const maxDuration = Math.max(...durations)

      console.log(`✅ Successful tests: ${successfulTests.length}/${this.results.length}`)
      console.log(`⏱️  Average duration: ${avgDuration.toFixed(2)}ms`)
      console.log(`⚡ Fastest: ${minDuration}ms`)
      console.log(`🐌 Slowest: ${maxDuration}ms`)
      const avgResponseSize = successfulTests.reduce((sum, r) => sum + (r.responseSize || 0), 0) / successfulTests.length
      console.log(`📦 Avg response size: ${avgResponseSize.toFixed(0)} bytes`)

      // 性能评估
      if (avgDuration < 5000) {
        console.log(`🟢 EXCELLENT: Response time under 5 seconds`)
      } else if (avgDuration < 10000) {
        console.log(`🟡 GOOD: Response time under 10 seconds`)
      } else if (avgDuration < 15000) {
        console.log(`🟠 ACCEPTABLE: Response time under 15 seconds`)
      } else {
        console.log(`🔴 POOR: Response time over 15 seconds - needs optimization`)
      }
    }

    if (failedTests.length > 0) {
      console.log(`\n❌ Failed tests: ${failedTests.length}`)
      failedTests.forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.error} (${test.duration}ms)`)
      })
    }

    console.log('\n💡 RECOMMENDATIONS:')
    if (successfulTests.length > 0) {
      const avgDuration = successfulTests.reduce((sum, r) => sum + r.duration, 0) / successfulTests.length
      
      if (avgDuration > 10000) {
        console.log('🔧 Consider switching to a domestic API provider')
        console.log('🔧 Optimize prompt length and complexity')
        console.log('🔧 Implement request caching for similar queries')
        console.log('🔧 Add loading states and progress indicators')
      } else if (avgDuration > 5000) {
        console.log('🔧 Consider prompt optimization')
        console.log('🔧 Add request timeout handling')
      } else {
        console.log('✅ Current performance is acceptable')
      }
    }
  }

  getResults(): PerformanceTestResult[] {
    return [...this.results]
  }

  clearResults(): void {
    this.results = []
  }
}

// 导出单例实例
export const apiPerformanceTester = new APIPerformanceTester()

// 便捷测试函数
export const runQuickTest = () => apiPerformanceTester.runPerformanceTest({ iterations: 3, delayBetweenTests: 1000, timeout: 15000 })
export const runFullTest = () => apiPerformanceTester.runPerformanceTest({ iterations: 10, delayBetweenTests: 3000, timeout: 30000 }) 