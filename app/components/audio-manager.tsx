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
  const cardSelectSoundRef = useRef<HTMLAudioElement | null>(null)
  const cardFlipSoundRef = useRef<HTMLAudioElement | null>(null)
  const mysticalSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio elements
    backgroundMusicRef.current = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hollow_Knight_-_A_Tale_of_Grimm_Troupe_%28Hydr0.org%29-2Ffw03Ckmo8ya7fa2rqwpTBZfe4hej.mp3")
    cardSelectSoundRef.current = new Audio("/audio/card-select.mp3")
    cardFlipSoundRef.current = new Audio("/audio/card-flip.mp3")
    mysticalSoundRef.current = new Audio("/audio/mystical-sound.mp3")

    // Configure background music
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true
      backgroundMusicRef.current.volume = volume
    }

    // Configure sound effects
    const soundEffects = [cardSelectSoundRef.current, cardFlipSoundRef.current, mysticalSoundRef.current]
    soundEffects.forEach((sound) => {
      if (sound) {
        sound.volume = volume * 0.7 // Sound effects slightly quieter than music
      }
    })

    return () => {
      // Cleanup
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause()
        backgroundMusicRef.current = null
      }
      soundEffects.forEach((sound) => {
        if (sound) {
          sound.pause()
        }
      })
    }
  }, [])

  useEffect(() => {
    // Update volume for all audio elements
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = volume
    }
    const soundEffects = [cardSelectSoundRef.current, cardFlipSoundRef.current, mysticalSoundRef.current]
    soundEffects.forEach((sound) => {
      if (sound) {
        sound.volume = volume * 0.7
      }
    })
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

  const playCardSelectSound = () => {
    if (cardSelectSoundRef.current) {
      cardSelectSoundRef.current.currentTime = 0
      cardSelectSoundRef.current.play().catch(() => {
        // Ignore playback errors for sound effects
      })
    }
  }

  const playCardFlipSound = () => {
    if (cardFlipSoundRef.current) {
      cardFlipSoundRef.current.currentTime = 0
      cardFlipSoundRef.current.play().catch(() => {
        // Ignore playback errors for sound effects
      })
    }
  }

  const playMysticalSound = () => {
    if (mysticalSoundRef.current) {
      mysticalSoundRef.current.currentTime = 0
      mysticalSoundRef.current.play().catch(() => {
        // Ignore playback errors for sound effects
      })
    }
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
