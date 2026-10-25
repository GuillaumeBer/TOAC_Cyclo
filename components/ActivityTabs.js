'use client'

import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import PageHeader from '@/components/PageHeader'

// En-tête sombre (props de PageHeader) avec ses onglets, puis le panneau de l'activité choisie.
// Motif ARIA « tabs » : flèches gauche/droite, Début/Fin, un seul onglet dans l'ordre de tabulation.
// L'ancre de l'adresse (#pres-de-toulouse, #plus-loin, #longue-distance) choisit l'onglet à l'ouverture.
// `aliases` : anciennes ancres redirigées vers un onglet (ex. { cyclomontagnardes: 'randonnees' }).
export default function ActivityTabs({ header, tabs, aliases = {} }) {
  const [active, setActive] = useState(tabs[0].id)
  const refs = useRef({})

  useEffect(() => {
    const fromHash = () => {
      const raw = window.location.hash.slice(1)
      const id = aliases[raw] || raw
      if (tabs.some((t) => t.id === id)) setActive(id)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [tabs, aliases])

  const select = (id, focus = false) => {
    setActive(id)
    window.history.replaceState(null, '', `#${id}`)
    trackEvent('onglet_activite', { onglet: id })
    if (focus) refs.current[id]?.focus()
  }

  const onKeyDown = (e, index) => {
    const last = tabs.length - 1
    const target = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[e.key]
    if (target === undefined) return
    e.preventDefault()
    select(tabs[target].id, true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader {...header}>
          <div role="tablist" aria-label="Choisir la vue" className="mt-8 flex flex-wrap gap-3">
            {tabs.map((t, i) => {
              const selected = t.id === active
              return (
                <button
                  key={t.id}
                  ref={(el) => { refs.current[t.id] = el }}
                  role="tab"
                  type="button"
                  id={`tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(t.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`px-5 py-2.5 rounded-full text-sm sm:text-base font-bold border-2 transition-colors ${
                    selected
                      ? 'bg-[#00b5e2] border-[#00b5e2] text-[#00205b]'
                      : 'border-white/30 text-white hover:border-white hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 [&>*]:max-w-4xl">
        {tabs.map((t) => (
          <section
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={t.id !== active}
            className="animate-fade-in-up"
          >
            {t.content}
          </section>
        ))}
      </div>
    </div>
  )
}
