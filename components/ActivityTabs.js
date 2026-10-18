'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { trackEvent } from '@/lib/analytics'

// En-tête sombre avec trois onglets, puis le panneau de l'activité choisie.
// Motif ARIA « tabs » : flèches gauche/droite, Début/Fin, un seul onglet dans l'ordre de tabulation.
// L'ancre de l'adresse (#gravel, #longue-distance, #cyclomontagnardes) choisit l'onglet à l'ouverture.
export default function ActivityTabs({ header, tabs }) {
  const [active, setActive] = useState(tabs[0].id)
  const refs = useRef({})

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1)
      if (tabs.some((t) => t.id === id)) setActive(id)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [tabs])

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
      <div className="bg-[#00205b] text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-[76rem] mx-auto relative z-10 flex flex-col items-start">
          {header}
          <div role="tablist" aria-label="Activités" className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-2xl">
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
                  className="group text-left min-w-0"
                >
                  <span
                    className={`relative block aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selected ? 'border-[#00b5e2] shadow-lg shadow-[#00b5e2]/20' : 'border-transparent group-hover:border-white/60'
                    }`}
                  >
                    <Image
                      src={t.image}
                      alt=""
                      fill
                      sizes="(min-width: 672px) 220px, 33vw"
                      className={`object-cover transition-all duration-500 ${selected ? 'scale-105' : 'opacity-50 grayscale-[40%] group-hover:opacity-90 group-hover:grayscale-0'}`}
                    />
                    {selected && <span className="absolute inset-x-0 bottom-0 h-1 bg-[#00b5e2]" aria-hidden="true" />}
                  </span>
                  <span
                    lang="fr"
                    className={`mt-2 flex items-start gap-1.5 text-xs sm:text-sm font-bold leading-tight hyphens-auto [overflow-wrap:anywhere] transition-colors ${
                      selected ? 'text-white' : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

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
