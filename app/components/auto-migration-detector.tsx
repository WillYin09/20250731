"use client"

import { useState, useEffect } from "react"
import { dataMigration } from "../utils/data-migration"
import DataMigrationModal from "./data-migration-modal"

export default function AutoMigrationDetector() {
  const [showMigrationModal, setShowMigrationModal] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    // 延迟检查，确保应用完全加载
    const timer = setTimeout(() => {
      const needsMigration = dataMigration.needsMigration()
      if (needsMigration) {
        setShowMigrationModal(true)
      }
      setHasChecked(true)
    }, 2000) // 2秒后检查

    return () => clearTimeout(timer)
  }, [])

  // 如果已经检查过且不需要迁移，则不显示任何内容
  if (hasChecked && !dataMigration.needsMigration()) {
    return null
  }

  return (
    <DataMigrationModal
      isOpen={showMigrationModal}
      onClose={() => setShowMigrationModal(false)}
    />
  )
} 