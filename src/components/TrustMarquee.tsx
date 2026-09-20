const WORDS = ['Calidad', 'Seguridad', 'Normativa', 'Ingeniería', 'Fabricación', 'Instalación']

export function TrustMarquee() {
  const items = [...WORDS, ...WORDS]
  return (
    <div className="trust-marquee" aria-hidden="true">
      <div className="trust-track">
        {items.map((w, i) => (
          <span key={i} style={{ display: 'contents' }}>
            <span>{w}</span>
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}
