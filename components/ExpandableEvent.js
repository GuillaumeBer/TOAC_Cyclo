'use client'

import { useEffect, useId, useState } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Bike, Home, ChevronDown } from 'lucide-react'

const ICONS = { Calendar, MapPin, Bike, Home }

// Carte d'événement dont le détail se déplie sur place (sans changer de page).
// Le bouton pilote la zone dépliée (aria-expanded / aria-controls) ; la zone repliée est inerte
// pour que le clavier et les lecteurs d'écran ne la traversent pas.
export default function ExpandableEvent({ id, item }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  // Ouvre la carte si l'adresse contient son ancre (ex. lien depuis le calendrier).
  useEffect(() => {
    const check = () => setOpen((o) => o || window.location.hash === `#${id}`)
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [id])

  return (
    <article id={id} className="scroll-mt-24 bg-white/5 border border-white/15 rounded-2xl overflow-hidden">
      <div className="grid sm:grid-cols-[16rem_1fr] md:grid-cols-[20rem_1fr]">
        <div className="relative h-44 sm:h-full min-h-[10rem]">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 768px) 20rem, (min-width: 640px) 16rem, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00b5e2] mb-2">{item.category}</p>
          <h3 className="display text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-300 mb-3">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#00b5e2]" aria-hidden="true" /> {item.date}</span>
            {item.location && (
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#00b5e2]" aria-hidden="true" /> {item.location}</span>
            )}
          </p>
          <p className="text-gray-300 leading-relaxed">{item.summary}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-center gap-2 py-3.5 border-t border-white/15 text-sm font-bold uppercase tracking-wider text-[#fcd34d] hover:bg-white/10 transition-colors"
      >
        {open ? 'Masquer le détail' : 'Voir le détail'}
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-6 p-6 md:p-8 border-t border-white/15">
            {item.details.map((d) => {
              const Icon = ICONS[d.icon]
              return (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-lg bg-[#00b5e2]/15 text-[#00b5e2] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#00b5e2] mb-1">{d.label}</p>
                    <p className="text-gray-200 leading-relaxed">{d.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </article>
  )
}
