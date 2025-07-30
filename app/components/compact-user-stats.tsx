"use client"

import { TrendingUp, Calendar, Award } from "lucide-react"

export default function CompactUserStats() {
  const stats = [
    {
      icon: TrendingUp,
      label: "指引次数",
      value: "1",
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
    },
    {
      icon: Calendar,
      label: "连续登录",
      value: "2天",
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      icon: Award,
      label: "最高出品",
      value: "金币侍卫",
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
  ]

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "rgba(54, 69, 79, 0.8)",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(255, 215, 0, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <h3 style={{ fontSize: "12px", fontWeight: "600", color: "#F5F5DC", marginBottom: "8px" }}>核心数据</h3>

             <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflow: "hidden" }}>
         {stats.map((stat, index) => (
           <div
             key={index}
             style={{
               display: "flex",
               alignItems: "center",
               gap: "6px",
               padding: "4px 6px",
               backgroundColor: stat.bgColor,
               borderRadius: "6px",
               flex: 1,
               border: `1px solid ${stat.color}30`,
               minHeight: "0",
             }}
           >
             <div
               style={{
                 width: "16px",
                 height: "16px",
                 borderRadius: "4px",
                 backgroundColor: stat.color,
                 display: "flex",
                 alignItems: "center",
                 justifyContent: "center",
                 flexShrink: 0,
               }}
             >
               <stat.icon size={8} color="white" />
             </div>
             <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
               <div style={{ fontSize: "8px", color: "#D4AF37", marginBottom: "1px", fontWeight: "500" }}>{stat.label}</div>
               <div
                 style={{
                   fontSize: "10px",
                   fontWeight: "600",
                   color: "#F5F5DC",
                   overflow: "hidden",
                   textOverflow: "ellipsis",
                   whiteSpace: "nowrap",
                 }}
               >
                 {stat.value}
               </div>
             </div>
           </div>
         ))}
       </div>
    </div>
  )
} 