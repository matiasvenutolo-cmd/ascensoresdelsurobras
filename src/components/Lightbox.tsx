'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CloseIcon } from './icons'

export function Lightbox({ photos, titulo }: { photos: string[]; titulo: string }) {
  const [index, setIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const close = () => setIndex(null)
  const prev = () => setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length))
  const next = () => setIndex((i) => (i === null ? null : (i + 1) % photos.length))

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index])

  return (
    <>
      <div className="detail-gallery">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            className="detail-photo"
            onClick={() => setIndex(i)}
            aria-label={`Ampliar foto ${i + 1} de ${titulo}`}
          >
            <Image
              src={src}
              alt={`${titulo} — foto ${i + 1}`}
              fill
              sizes="(max-width: 900px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de fotos de ${titulo}`}
          onClick={close}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const dx = e.changedTouches[0].clientX - touchStartX.current
            if (dx > 50) prev()
            else if (dx < -50) next()
            touchStartX.current = null
          }}
        >
          <button className="lightbox-close" onClick={close} aria-label="Cerrar">
            <CloseIcon size={18} />
          </button>

          {photos.length > 1 && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Foto anterior"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[index]} alt={`${titulo} — foto ${index + 1}`} className="lightbox-img" onClick={(e) => e.stopPropagation()} />

          {photos.length > 1 && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Foto siguiente"
            >
              ›
            </button>
          )}

          <div className="lightbox-count">
            {index + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  )
}
