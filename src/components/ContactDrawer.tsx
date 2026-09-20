'use client'

import { createContext, useContext, useEffect, useState, useActionState, Suspense, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitContacto, type ContactFormState } from '@/app/(frontend)/contacto/actions'
import { SITE } from '@/data/site'
import { SendIcon, WhatsappIcon, CloseIcon } from './icons'

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

const initialState: ContactFormState = { ok: false }

function ContactForm({ onSent }: { onSent: () => void }) {
  const [state, formAction, pending] = useActionState(submitContacto, initialState)

  if (state.ok) {
    return (
      <div className="drawer-success">
        <h4>¡Listo!</h4>
        <p>Recibimos tu consulta. Te contactamos a la brevedad.</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="drawer-form">
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
        <label htmlFor="mensaje">
          ¿Qué necesitás mover? <span className="opt">(opcional)</span>
        </label>
        <textarea id="mensaje" name="mensaje" placeholder="Contanos brevemente tu proyecto: tipo de obra, ubicación, etapa…" />
      </div>

      {state.error && <p className="drawer-error">{state.error}</p>}

      <button type="submit" className="drawer-submit" disabled={pending}>
        <SendIcon size={15} />
        {pending ? 'Enviando…' : 'Enviar'}
      </button>

      {SITE.whatsapp && (
        <a
          className="drawer-whatsapp"
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSent}
        >
          <WhatsappIcon size={17} />
          Escribinos por WhatsApp
        </a>
      )}
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
            <h3>Hablemos de tu obra</h3>
            <p>Te contactamos a la brevedad para coordinar el asesoramiento técnico.</p>
          </div>
          <button className="drawer-close" onClick={() => setOpen(false)} aria-label="Cerrar">
            <CloseIcon size={16} />
          </button>
        </div>
        <ContactForm onSent={() => setOpen(false)} />
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
