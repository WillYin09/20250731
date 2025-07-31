"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { apiPerformanceTester, runQuickTest, runFullTest } from "../utils/api-performance-test"

interface TestResult {
  timestamp: string
  duration: number
  status: 'success' | 'error'
  error?: string
  responseSize?: number
}

export default function APITestPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [results, setResults] = useState<TestResult[]>([])
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const runTest = async (testType: 'quick' | 'full') => {
    setIsRunning(true)
    setResults([])
    setLogs([])

    addLog(`🚀 Starting ${testType} performance test...`)

    try {
      const testResults = testType === 'quick' 
        ? await runQuickTest()
        : await runFullTest()

      setResults(testResults)
      addLog(`✅ Test completed with ${testResults.length} results`)
      
      // 分析结果
      const successfulTests = testResults.filter(r => r.status === 'success')
      if (successfulTests.length > 0) {
        const avgDuration = successfulTests.reduce((sum, r) => sum + r.duration, 0) / successfulTests.length
        addLog(`📊 Average duration: ${avgDuration.toFixed(2)}ms`)
        
        if (avgDuration < 5000) {
          addLog(`🟢 EXCELLENT: Response time under 5 seconds`)
        } else if (avgDuration < 10000) {
          addLog(`🟡 GOOD: Response time under 10 seconds`)
        } else if (avgDuration < 15000) {
          addLog(`🟠 ACCEPTABLE: Response time under 15 seconds`)
        } else {
          addLog(`🔴 POOR: Response time over 15 seconds - needs optimization`)
        }
      }
    } catch (error) {
      addLog(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsRunning(false)
    }
  }

  const clearResults = () => {
    setResults([])
    setLogs([])
    apiPerformanceTester.clearResults()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">API Performance Test</h1>
          <p className="text-gray-300">测试Deepseek API的响应性能</p>
        </div>

        {/* 控制按钮 */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => runTest('quick')}
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isRunning ? '测试中...' : '快速测试 (3次)'}
            </Button>
            <Button 
              onClick={() => runTest('full')}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              {isRunning ? '测试中...' : '完整测试 (10次)'}
            </Button>
            <Button 
              onClick={clearResults}
              disabled={isRunning}
              variant="outline"
              className="border-red-400 text-red-400 hover:bg-red-400/10"
            >
              清除结果
            </Button>
          </div>
        </Card>

        {/* 测试结果 */}
        {results.length > 0 && (
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">测试结果</h2>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.status === 'success' 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white">
                      测试 {index + 1}: {result.duration}ms
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      result.status === 'success' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {result.status === 'success' ? '成功' : '失败'}
                    </span>
                  </div>
                  {result.status === 'error' && (
                    <p className="text-red-300 text-sm mt-1">{result.error}</p>
                  )}
                  {result.status === 'success' && result.responseSize && (
                    <p className="text-green-300 text-sm mt-1">
                      响应大小: {result.responseSize} bytes
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 日志 */}
        {logs.length > 0 && (
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">测试日志</h2>
            <div className="bg-black/50 p-4 rounded-lg max-h-60 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-green-400 text-sm font-mono">
                  {log}
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 使用说明 */}
        <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">使用说明</h2>
          <div className="text-gray-300 space-y-2">
            <p>• <strong>快速测试</strong>: 执行3次API调用，间隔1秒</p>
            <p>• <strong>完整测试</strong>: 执行10次API调用，间隔3秒</p>
            <p>• <strong>性能评估</strong>: 根据平均响应时间给出优化建议</p>
            <p>• <strong>目标时间</strong>: 争取将响应时间控制在10秒以内</p>
          </div>
        </Card>
      </div>
    </div>
  )
} 