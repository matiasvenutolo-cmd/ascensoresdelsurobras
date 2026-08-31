export function mediaUrl(img: unknown, size?: 'thumbnail' | 'card' | 'hero'): string | undefined {
  if (img && typeof img === 'object' && 'url' in img) {
    const m = img as { url?: string; sizes?: Record<string, { url?: string }> }
    return (size && m.sizes?.[size]?.url) || m.url || undefined
  }
  return undefined
}
