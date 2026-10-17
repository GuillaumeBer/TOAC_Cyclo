'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bike, CalendarDays, ArrowUpRight } from 'lucide-react'
import calendrier from '@/data/calendrier.json'
import sorties from '@/data/sorties.json'

// Bandeau « Prochainement » du hero : sortie régulière, prochain événement (avec décompte) et adhésion.
export default function NextUp() {
  const [days, setDays] = useState(null)

  const today = new Date().toISOString().slice(0, 10)
  const next = calendrier.evenements
    .filter((e) => e.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start))[0]

  useEffect(() => {
    if (!next) return
    const start = new Date(`${next.start}T00:00:00`)
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    setDays(Math.round((start - now) / 86400000))
  }, [next?.start])

  const sortie = sorties[0]
  const cardBase =
    'group flex items-center gap-4 p-4 sm:p-5 bg-[#00205b]/70 backdrop-blur-md border border-white/15 hover:border-[#00b5e2] hover:bg-[#00205b]/85 transition-colors'

  return (
    <ul className="grid md:grid-cols-3 gap-px bg-white/10 rounded-lg overflow-hidden shadow-2xl">
      <li>
        <Link href="/#sorties" className={`${cardBase} h-full`}>
          <span className="w-11 h-11 rounded-full bg-[#00b5e2] text-[#00205b] flex items-center justify-center flex-shrink-0">
            <Bike className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#89d3e8]">Chaque semaine</span>
            <span className="block font-bold text-white truncate">{sortie.title}</span>
            <span className="block text-sm text-gray-300">{sortie.when}</span>
          </span>
        </Link>
      </li>
      {next && (
        <li>
          <Link href={next.link} className={`${cardBase} h-full`}>
            <span className="w-11 h-11 rounded-full bg-[#fcd34d] text-[#00205b] flex items-center justify-center flex-shrink-0">
              <CalendarDays className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#fcd34d]">
                {days === null ? 'Prochain rendez-vous' : days > 0 ? `Dans ${days} jour${days > 1 ? 's' : ''}` : days === 0 ? 'Aujourd’hui' : 'En cours'}
              </span>
              <span className="block font-bold text-white truncate">{next.title}</span>
              <span className="block text-sm text-gray-300 truncate">{next.dateLabel}</span>
            </span>
          </Link>
        </li>
      )}
      <li>
        <Link href="/rejoindre#adhesion" className={`${cardBase} h-full justify-between`}>
          <span className="min-w-0">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-[#89d3e8]">Rejoindre le club</span>
            <span className="block font-bold text-white">Adhésion et tarifs</span>
            <span className="block text-sm text-gray-300">Première année offerte aux nouvelles adhérentes</span>
          </span>
          <ArrowUpRight className="w-6 h-6 text-[#00b5e2] flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </li>
    </ul>
  )
}
