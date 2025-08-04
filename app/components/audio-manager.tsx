"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"

interface AudioContextType {
  isPlaying: boolean
  volume: number
  toggleMusic: () => void
  setVolume: (volume: number) => void
  playCardSelectSound: () => void
  playCardFlipSound: () => void
  playMysticalSound: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.3)
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize audio elements
    backgroundMusicRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hollow_Knight_-_A_Tale_of_Grimm_Troupe_%28Hydr0.org%29-2Ffw03Ckmo8ya7fa2rqwpTBZfe4hej.mp3")

    // Initialize Web Audio Context for sound effects
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.log("Web Audio API not supported")
    }

    // Configure background music
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true
      backgroundMusicRef.current.volume = volume
    }

    return () => {
      // Cleanup
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause()
        backgroundMusicRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    // Update volume for background music
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume
    }
  }, [volume])

  const toggleMusic = async () => {
    if (!backgroundMusicRef.current) return

    try {
      if (isPlaying) {
        backgroundMusicRef.current.pause()
        setIsPlaying(false)
      } else {
        await backgroundMusicRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.log("Audio playback failed:", error)
      // Handle autoplay restrictions
      setIsPlaying(false)
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
  }

  // Generate sound effects using Web Audio API
  const generateSound = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!audioContextRef.current) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)
      
      oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContextRef.current.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + duration)
      
      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + duration)
    } catch (error) {
      console.log("Sound generation failed:", error)
    }
  }

  const playCardSelectSound = () => {
    // 清脆的卡牌选择音效 - 高音调短促音
    generateSound(800, 0.1, 'sine')
    setTimeout(() => generateSound(1000, 0.05, 'sine'), 50)
  }

  const playCardFlipSound = () => {
    // 卡牌翻转音效 - 中音调渐强渐弱
    generateSound(400, 0.2, 'triangle')
    setTimeout(() => generateSound(600, 0.15, 'triangle'), 100)
  }

  const playMysticalSound = () => {
    // 神秘音效 - 多频率组合
    generateSound(200, 0.3, 'sine')
    setTimeout(() => generateSound(300, 0.25, 'sine'), 50)
    setTimeout(() => generateSound(400, 0.2, 'sine'), 100)
  }

  const value: AudioContextType = {
    isPlaying,
    volume,
    toggleMusic,
    setVolume,
    playCardSelectSound,
    playCardFlipSound,
    playMysticalSound,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
