type IsotipoProps = {
  className?: string
  style?: React.CSSProperties
}

// Isologo real de ADS (Ascensores del Sur), extraído en alta resolución del
// manual de marca del cliente (PNG transparente, sin alterar el isologo).
export function Isotipo({ className, style }: IsotipoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/logo/ads-logo.png" alt="ADS — Ascensores del Sur" className={className} style={style} />
  )
}
