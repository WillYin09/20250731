"use client"

import { useState } from "react"
import { Home, Heart, Users, User, Music, VolumeX } from "lucide-react"
import HomePage from "./components/home-page"
import FavoritesPage from "./components/favorites-page"
import CommunityPage from "./components/community-page"
import ProfilePage from "./components/profile-page"
import { AudioProvider, useAudio } from "./components/audio-manager"
import AutoMigrationDetector from "./components/auto-migration-detector"

function MusicControls() {
  const { isPlaying, toggleMusic, volume, setVolume } = useAudio()

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        onClick={toggleMusic}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.1)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent"
        }}
      >
        {isPlaying ? (
          <Music size={16} style={{ color: "#FFD700" }} className="music-playing-indicator" />
        ) : (
          <VolumeX size={16} style={{ color: "#D4AF37" }} />
        )}
      </button>
    </div>
  )
}

function TarotApp() {
  const [activeTab, setActiveTab] = useState("home")

  const tabs = [
    { id: "home", label: "首页", icon: Home },
    { id: "favorites", label: "收藏", icon: Heart },
    { id: "community", label: "经验", icon: Users },
    { id: "profile", label: "我的", icon: User },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />
      case "favorites":
        return <FavoritesPage />
      case "community":
        return <CommunityPage />
      case "profile":
        return <ProfilePage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="starry-background" style={{ minHeight: "100vh", position: "relative" }}>
      {/* Status Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "44px",
          background: "rgba(54, 69, 79, 0.9)",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 1000,
          borderBottom: "1px solid rgba(255, 215, 0, 0.2)",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "600", color: "#FFD700" }}>抽张塔罗吧</div>
        <MusicControls />
      </div>

      {/* Main Content */}
      <div style={{ paddingTop: "44px", paddingBottom: "80px", minHeight: "100vh" }}>{renderContent()}</div>
      
      {/* Auto Migration Detector */}
      <AutoMigrationDetector />

      {/* Bottom Navigation */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80px",
          background: "rgba(54, 69, 79, 0.95)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 20px",
          zIndex: 1000,
          borderTop: "1px solid rgba(255, 215, 0, 0.2)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                backgroundColor: isActive ? "rgba(255, 215, 0, 0.1)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(255, 215, 0, 0.05)"
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent"
                }
              }}
            >
              <tab.icon
                size={20}
                style={{
                  color: isActive ? "#FFD700" : "#D4AF37",
                  transition: "all 0.3s ease",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: isActive ? "600" : "400",
                  color: isActive ? "#FFD700" : "#D4AF37",
                  transition: "all 0.3s ease",
                }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <TarotApp />
    </AudioProvider>
  )
}
