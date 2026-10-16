'use client'

import { createContext, useContext, useEffect, useState, Suspense, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { SITE } from '@/data/site'
import { WhatsappIcon, CloseIcon } from './icons'

type DrawerCtx = { openDrawer: () => void; closeDrawer: () => void }
const Ctx = createContext<DrawerCtx | null>(null)

export function useContactDrawer() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useContactDrawer debe usarse dentro de ContactDrawerProvider')
  return ctx
}

function AutoOpenFromQuery({ onOpen }: { onOpen: () => void }) {
  const params = useSearchParams()
  useEffect(() => {
    if (params.get('hablemos') === '1') onOpen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

function armarMensaje(fd: FormData) {
  const campo = (k: string) => String(fd.get(k) || '').trim()
  const nombre = campo('nombre')
  const email = campo('email')
  const telefono = campo('telefono')
  const mensaje = campo('mensaje')
  return {
    nombre,
    email,
    texto: [
      `Hola, soy ${nombre}. Quiero hacer una consulta de obra.`,
      mensaje ? `\n${mensaje}` : null,
      `\nMail: ${email}`,
      telefono ? `Teléfono: ${telefono}` : null,
    ]
      .filter(Boolean)
      .join('\n'),
  }
}

function ContactForm() {
  const [error, setError] = useState('')
  const [waUrl, setWaUrl] = useState<string | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('_hp')) return
    const { nombre, email, texto } = armarMensaje(fd)
    if (!nombre || !email) {
      setError('Completá tu nombre y mail.')
      return
    }
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setWaUrl(url)
  }

  if (waUrl) {
    return (
      <div className="drawer-success">
        <h4>¡Listo!</h4>
        <p>Te abrimos WhatsApp con tu consulta escrita. Solo falta tocar enviar.</p>
        <a className="drawer-whatsapp" href={waUrl} target="_blank" rel="noopener noreferrer">
          <WhatsappIcon size={17} />
          Si no se abrió, tocá acá
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="drawer-form">
      <div className="drawer-hp" aria-hidden="true">
        <label htmlFor="_hp">No completar</label>
        <input type="text" id="_hp" name="_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="drawer-field">
        <label htmlFor="nombre">Tu nombre</label>
        <input id="nombre" name="nombre" required placeholder="Juan García" />
      </div>
      <div className="drawer-field">
        <label htmlFor="email">Mail</label>
        <input id="email" name="email" type="email" required placeholder="juan@empresa.com" />
      </div>
      <div className="drawer-field">
        <label htmlFor="telefono">
          Teléfono <span className="opt">(opcional)</span>
        </label>
        <input id="telefono" name="telefono" placeholder="+54 11 1234-5678" />
      </div>
      <div className="drawer-field">
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Contanos brevemente: destino del proyecto, ubicación de la obra, equipo requerido…"
        />
      </div>

      {error && <p className="drawer-error">{error}</p>}

      <button type="submit" className="drawer-submit">
        <WhatsappIcon size={16} />
        Enviar por WhatsApp
      </button>
    </form>
  )
}

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('drawer-open', open)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <Ctx.Provider value={{ openDrawer: () => setOpen(true), closeDrawer: () => setOpen(false) }}>
      <Suspense fallback={null}>
        <AutoOpenFromQuery onOpen={() => setOpen(true)} />
      </Suspense>
      {children}
      <div className={`drawer-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer-panel${open ? ' open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <div>
            <h3>Conversemos de tu obra</h3>
            <p>Completá tus datos y te abrimos WhatsApp con la consulta lista para enviar.</p>
          </div>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Cerrar">
            <CloseIcon size={16} />
          </button>
        </div>
        <ContactForm />
      </aside>
    </Ctx.Provider>
  )
}

export function OpenDrawerButton({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { openDrawer } = useContactDrawer()
  return (
    <button className={className} onClick={openDrawer}>
      {children}
    </button>
  )
}
