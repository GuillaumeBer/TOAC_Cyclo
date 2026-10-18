'use client'

import { useEffect, useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const VARIANTS = {
  // Barre pleine largeur en bas d'une carte sombre
  bar: {
    button: 'w-full flex items-center justify-center gap-2 py-3.5 border-t border-white/15 text-sm font-bold uppercase tracking-wider text-[#fcd34d] hover:bg-white/10 transition-colors',
    panel: '',
  },
  // Bouton plein sur fond sombre
  solid: {
    button: 'inline-flex items-center gap-2 px-7 py-3.5 bg-[#00b5e2] text-[#00205b] font-bold rounded-sm hover:bg-white transition-colors',
    panel: 'pt-6',
  },
  // Lien discret sur fond clair
  link: {
    button: 'inline-flex items-center gap-1.5 py-1 text-sm font-bold text-[#00205b] hover:text-[#0077b6] transition-colors',
    panel: 'pt-4',
  },
}

// Bouton + zone dépliante, pour afficher un détail sans changer de page.
// `hashId` : si l'adresse contient #hashId, la zone s'ouvre d'elle-même.
// La zone repliée est inerte : ni clavier ni lecteur d'écran ne la traversent.
export default function Disclosure({ hashId, closedLabel = 'Plus d\'infos', openLabel = 'Masquer le détail', variant = 'link', children }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const v = VARIANTS[variant]

  useEffect(() => {
    if (!hashId) return
    const check = () => setOpen((o) => o || window.location.hash === `#${hashId}`)
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [hashId])

  const toggle = () => {
    setOpen((o) => {
      if (!o) trackEvent('deplier_detail', { section: hashId || closedLabel })
      return !o
    })
  }

  return (
    <>
      <button type="button" onClick={toggle} aria-expanded={open} aria-controls={panelId} className={v.button}>
        {open ? openLabel : closedLabel}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className={v.panel}>{children}</div>
        </div>
      </div>
    </>
  )
}
