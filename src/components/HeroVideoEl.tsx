'use client'

import { useEffect, useRef } from 'react'

export function HeroVideoEl() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.playbackRate = 0.8
    const keepRate = () => {
      video.playbackRate = 0.8
    }
    video.addEventListener('loadedmetadata', keepRate)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.1 },
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
      video.removeEventListener('loadedmetadata', keepRate)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="hero-video"
      src="/video/hero.webm"
      poster="/video/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
    />
  )
}
