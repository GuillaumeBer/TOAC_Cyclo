'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import { CalendarRange, Bike, Trees, Mountain, MapPin, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'

const DISCIPLINE_ICONS = { route: Bike, gravel: Trees, vtt: Mountain }
const DISCIPLINE_LABELS = { route: 'Route', gravel: 'Gravel', vtt: 'VTT' }
const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

function isoOf(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

// Mois (année, index) à afficher entre deux dates ISO incluses.
function monthsBetween(startIso, endIso) {
  const months = []
  let [y, m] = startIso.split('-').map(Number)
  m -= 1
  const [ey, em] = endIso.split('-').map(Number)
  while (y < ey || (y === ey && m <= em - 1)) {
    months.push({ year: y, month: m })
    m += 1
    if (m > 11) {
      m = 0
      y += 1
    }
  }
  return months
}

function MonthCard({ year, month, items, startIso, endIso }) {
  const label = new Date(year, month, 1).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = (new Date(year, month, 1).getDay() + 6) % 7 // lundi = 0
  const byDay = new Map()
  for (const s of items) {
    const day = Number(s.date.slice(8, 10))
    byDay.set(day, (byDay.get(day) || 0) + 1)
  }

  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="grid md:grid-cols-[minmax(0,20rem)_1fr]">
      <div className="px-5 py-5 md:border-r border-gray-100">
        <h3 className="display text-2xl font-bold text-[#00205b] capitalize mb-4">{label}</h3>
        <div aria-hidden="true">
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-gray-400 mb-1">
          {WEEKDAYS.map((d, i) => <span key={i}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {cells.map((d, i) => {
            if (!d) return <span key={i} />
            const iso = isoOf(year, month, d)
            const outside = iso < startIso || iso > endIso
            const count = byDay.get(d)
            const weekend = i % 7 >= 5
            return (
              <span
                key={i}
                className={`aspect-square flex items-center justify-center rounded-md font-medium ${
                  count
                    ? 'bg-[#00205b] text-white font-bold'
                    : outside
                    ? 'text-gray-300'
                    : weekend
                    ? 'bg-[#00b5e2]/10 text-[#0077b6]'
                    : 'text-gray-500'
                }`}
              >
                {d}
              </span>
            )
          })}
        </div>
        </div>
      </div>

      <ul className="px-5 py-5 space-y-3 border-t md:border-t-0 border-gray-100" aria-label={`Sorties de ${label}`}>
        {items.length === 0 && (
          <li className="text-sm text-gray-500 italic">Les organisateurs n’ont pas encore publié leurs dates.</li>
        )}
        {items.map((s) => {
          const day = new Date(`${s.date}T12:00:00`)
          const provisional = s.fiabilite !== 'confirmee'
          const title = (
            <>
              <span className="font-bold text-[#00205b]">{s.titre}</span>
              {s.url && <ArrowUpRight className="inline w-3.5 h-3.5 ml-0.5 text-[#0077b6]" aria-hidden="true" />}
            </>
          )
          return (
            <li key={s.id} className="flex items-start gap-3">
              <span className="w-12 flex-shrink-0 text-center leading-tight">
                <span className="block text-[10px] font-bold uppercase text-gray-500">
                  {day.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '')}
                </span>
                <span className="display block text-2xl font-bold text-[#0077b6]">{day.getDate()}</span>
              </span>
              <div className="min-w-0 text-sm">
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-umami-event="clic_apercu_sortie"
                    data-umami-event-titre={s.titre}
                    className="hover:underline"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600 mt-0.5">
                  {s.lieu_depart && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" aria-hidden="true" /> {s.lieu_depart}
                    </span>
                  )}
                  {(s.disciplines || []).map((d) => {
                    const Icon = DISCIPLINE_ICONS[d] || Bike
                    return (
                      <span key={d} className="inline-flex items-center gap-1 text-gray-500" title={DISCIPLINE_LABELS[d]}>
                        <Icon className="w-3 h-3" aria-hidden="true" /> {DISCIPLINE_LABELS[d]}
                      </span>
                    )
                  })}
                  {provisional && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">à confirmer</span>
                  )}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Vision à ~3 mois : un calendrier dont on choisit le mois, et une liste légère (sans horaires ni circuits, encore inconnus).
export default function OutlookCalendar({ items, startIso, endIso }) {
  const months = startIso && endIso && startIso <= endIso ? monthsBetween(startIso, endIso) : []
  const keyOf = ({ year, month }) => `${year}-${String(month + 1).padStart(2, '0')}`
  const countOf = (m) => items.filter((s) => s.date.startsWith(keyOf(m))).length
  const firstWithEvents = months.findIndex((m) => countOf(m) > 0)
  const [picked, setPicked] = useState(null)
  if (months.length === 0) return null

  const index = Math.min(picked ?? Math.max(firstWithEvents, 0), months.length - 1)
  const current = months[index]
  const monthName = (m, opts) => new Date(m.year, m.month, 1).toLocaleDateString('fr-FR', opts)
  const choose = (i) => {
    setPicked(i)
    trackEvent('apercu_mois', { mois: keyOf(months[i]) })
  }

  return (
    <section className="mt-16" aria-labelledby="apercu-3-mois">
      <div className="mb-6">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0077b6] mb-3">
          <span className="h-px w-10 bg-[#0077b6]" aria-hidden="true" /> Pour planifier
        </p>
        <h2 id="apercu-3-mois" className="display text-3xl md:text-4xl font-bold text-[#00205b] flex items-center gap-3">
          <CalendarRange className="w-7 h-7 text-[#00b5e2]" aria-hidden="true" /> Et dans les 3 prochains mois
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl text-sm">
          Les dates déjà annoncées, sans le détail : horaires et circuits seront précisés à l’approche de la sortie. Les jours en bleu foncé ont au moins une sortie.
        </p>
      </div>

      <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <header className="flex items-center gap-2 px-3 sm:px-5 py-3 border-b border-gray-100">
          <button
            type="button"
            onClick={() => choose(index - 1)}
            disabled={index === 0}
            aria-label="Mois précédent"
            className="p-2 rounded-md text-[#00205b] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <div role="tablist" aria-label="Choisir le mois" className="flex-1 flex flex-wrap justify-center gap-2">
            {months.map((m, i) => {
              const count = countOf(m)
              const active = i === index
              return (
                <button
                  key={keyOf(m)}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => choose(i)}
                  className={`px-3 py-1.5 rounded-full text-sm font-bold capitalize transition-colors ${
                    active ? 'bg-[#00205b] text-white' : 'bg-gray-100 text-[#00205b] hover:bg-gray-200'
                  }`}
                >
                  {monthName(m, { month: 'long' })}
                  <span className={`ml-1.5 text-xs ${active ? 'text-[#00b5e2]' : 'text-gray-500'}`}>{count}</span>
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={() => choose(index + 1)}
            disabled={index === months.length - 1}
            aria-label="Mois suivant"
            className="p-2 rounded-md text-[#00205b] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </header>

        <MonthCard
          key={keyOf(current)}
          year={current.year}
          month={current.month}
          startIso={startIso}
          endIso={endIso}
          items={items.filter((s) => s.date.startsWith(keyOf(current)))}
        />
      </article>
    </section>
  )
}
