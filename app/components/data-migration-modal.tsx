"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { dataMigration, MigrationResult } from "../utils/data-migration"
import { Download, Upload, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"

interface DataMigrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DataMigrationModal({ isOpen, onClose }: DataMigrationModalProps) {
  const [migrationStatus, setMigrationStatus] = useState<"idle" | "migrating" | "success" | "error">("idle")
  const [migrationResult, setMigrationResult] = useState<MigrationResult | null>(null)
  const [dataStats, setDataStats] = useState(dataMigration.getDataStats())

  useEffect(() => {
    if (isOpen) {
      setDataStats(dataMigration.getDataStats())
    }
  }, [isOpen])

  const handleMigration = async () => {
    setMigrationStatus("migrating")
    
    try {
      const result = dataMigration.migrateFromLocalStorage()
      setMigrationResult(result)
      setMigrationStatus(result.success ? "success" : "error")
      
      // 更新数据统计
      setDataStats(dataMigration.getDataStats())
      
      // 如果迁移成功，3秒后自动关闭
      if (result.success) {
        setTimeout(() => {
          onClose()
        }, 3000)
      }
    } catch (error) {
      setMigrationResult({
        success: false,
        message: "迁移过程中发生错误: " + (error as Error).message
      })
      setMigrationStatus("error")
    }
  }

  const handleExportData = () => {
    const data = dataMigration.exportUserData()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `抽张塔罗吧-数据备份-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const content = e.target?.result as string
          const result = dataMigration.importUserData(content)
          setMigrationResult(result)
          setMigrationStatus(result.success ? "success" : "error")
          setDataStats(dataMigration.getDataStats())
          
          if (result.success) {
            setTimeout(() => {
              onClose()
            }, 3000)
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleClearData = () => {
    if (confirm("确定要清空所有数据吗？此操作不可恢复！")) {
      dataMigration.clearAllData()
      setDataStats(dataMigration.getDataStats())
      setMigrationStatus("success")
      setMigrationResult({
        success: true,
        message: "所有数据已清空"
      })
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }

  const needsMigration = dataMigration.needsMigration()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center" style={{ color: "#FFD700" }}>
            数据管理
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 数据统计 */}
          <Card className="p-4" style={{ backgroundColor: "rgba(54, 69, 79, 0.9)" }}>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>
                当前数据统计
              </h3>
              <div className="text-xs space-y-1" style={{ color: "#D4AF37" }}>
                <div>收藏记录: {dataStats.favoritesCount} 条</div>
                <div>已解锁卡牌: {dataStats.collectionCount} 张</div>
                <div>用户统计: {dataStats.hasStats ? "已设置" : "未设置"}</div>
                <div>数据大小: {(dataStats.totalStorageSize / 1024).toFixed(1)} KB</div>
              </div>
            </div>
          </Card>

          {/* 迁移提示 */}
          {needsMigration && (
            <Card className="p-4 border-yellow-500/30" style={{ backgroundColor: "rgba(54, 69, 79, 0.9)" }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#FFD700" }} />
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold" style={{ color: "#F5F5DC" }}>
                    检测到Web环境数据
                  </h3>
                  <p className="text-xs" style={{ color: "#D4AF37" }}>
                    发现您之前在Web环境中使用过此应用，是否要迁移数据到当前环境？
                  </p>
                  <Button
                    size="sm"
                    onClick={handleMigration}
                    disabled={migrationStatus === "migrating"}
                    className="w-full"
                    style={{
                      backgroundColor: "#FFD700",
                      color: "#000",
                      border: "none"
                    }}
                  >
                    {migrationStatus === "migrating" ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        迁移中...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        迁移数据
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* 数据操作 */}
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              className="w-full"
              style={{
                color: "#FFD700",
                borderColor: "rgba(255, 215, 0, 0.3)",
                backgroundColor: "rgba(255, 215, 0, 0.1)"
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              导出数据备份
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleImportData}
              className="w-full"
              style={{
                color: "#FFD700",
                borderColor: "rgba(255, 215, 0, 0.3)",
                backgroundColor: "rgba(255, 215, 0, 0.1)"
              }}
            >
              <Upload className="w-4 h-4 mr-2" />
              导入数据备份
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleClearData}
              className="w-full"
              style={{
                color: "#ef4444",
                borderColor: "rgba(239, 68, 68, 0.3)",
                backgroundColor: "rgba(239, 68, 68, 0.1)"
              }}
            >
              <AlertCircle className="w-4 h-4 mr-2" />
              清空所有数据
            </Button>
          </div>

          {/* 迁移结果 */}
          {migrationResult && (
            <Card className="p-4" style={{ 
              backgroundColor: migrationResult.success 
                ? "rgba(34, 197, 94, 0.1)" 
                : "rgba(239, 68, 68, 0.1)" 
            }}>
              <div className="flex items-start gap-3">
                {migrationResult.success ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#22c55e" }} />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#ef4444" }} />
                )}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold" style={{ 
                    color: migrationResult.success ? "#22c55e" : "#ef4444" 
                  }}>
                    {migrationResult.success ? "操作成功" : "操作失败"}
                  </h3>
                  <p className="text-xs" style={{ color: "#D4AF37" }}>
                    {migrationResult.message}
                  </p>
                  {migrationResult.migratedData && (
                    <div className="text-xs space-y-1" style={{ color: "#D4AF37" }}>
                      <div>迁移收藏: {migrationResult.migratedData.favorites} 条</div>
                      <div>迁移卡牌: {migrationResult.migratedData.collection} 张</div>
                      <div>迁移统计: {migrationResult.migratedData.stats ? "是" : "否"}</div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* 关闭按钮 */}
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full"
            style={{ color: "#D4AF37" }}
          >
            关闭
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 