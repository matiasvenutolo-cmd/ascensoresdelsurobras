'use client'

import { useEffect, useRef } from 'react'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.1 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <video ref={videoRef} src="/video/hero.webm" poster="/video/hero-poster.jpg" autoPlay muted loop playsInline />
      <div className="hero-overlay-brand" />
      <div className="hero-overlay-contrast" />
    </>
  )
}
