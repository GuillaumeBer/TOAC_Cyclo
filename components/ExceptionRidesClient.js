'use client'

import { useEffect, useMemo, useState } from 'react'
import { Calendar, MapPin, ExternalLink, CheckCircle2, Filter, ChevronDown, RotateCcw, Users, Bike, Trees, Mountain } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const DISCIPLINE_LABELS = { route: 'Route', gravel: 'Gravel', vtt: 'VTT' }
const DISCIPLINE_ICONS = { route: Bike, gravel: Trees, vtt: Mountain }
const FEDERATION_STYLES = {
  FSGT: 'bg-[#00205b] text-white',
  'FFVélo': 'bg-[#0077b6] text-white',
  UFOLEP: 'bg-indigo-700 text-white',
}
const MOIS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

const SELECT_CLASS =
  'w-full appearance-none bg-gray-50/80 hover:bg-white focus:bg-white border border-gray-300 hover:border-gray-400 focus:border-[#00205b] focus:ring-2 focus:ring-[#00205b]/20 rounded-md py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-bold text-gray-800 shadow-xs transition-all cursor-pointer'

const monthKey = (iso) => iso.slice(0, 7)
const monthLabel = (key) =>
  new Date(`${key}-15T12:00:00`).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })

// Jours de l'événement affichés à la place de l'heure : « 22-23 » + « mai ».
function dayBlock(e) {
  const d1 = Number(e.start.slice(8, 10))
  const d2 = Number(e.end.slice(8, 10))
  const month = MOIS_FR[Number(e.start.slice(5, 7)) - 1]
  return { days: d1 === d2 ? `${d1}` : `${d1}-${d2}`, month }
}

function SelectField({ id, label, icon: Icon, value, onChange, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-[#0077b6]" aria-hidden="true" /> {label}
      </label>
      <div className="relative">
        <select id={id} value={value} onChange={onChange} className={SELECT_CLASS}>
          {children}
        </select>
        <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
      </div>
    </div>
  )
}

// Sorties d'exception : mêmes sélecteurs et mêmes cartes repliables que l'onglet « Autour de Toulouse »,
// pour des événements plus longs ou plus lointains, organisés par d'autres clubs (dates souvent à confirmer).
export default function ExceptionRidesClient({ events: initialEvents, bcmf }) {
  const [events, setEvents] = useState(initialEvents)
  const [month, setMonth] = useState('all')
  const [discipline, setDiscipline] = useState('all')
  const [federation, setFederation] = useState('all')
  const [montagne, setMontagne] = useState(false)

  // Sur OVH, lit directement /data/activites.json s'il a été mis à jour sans rebuild complet
  useEffect(() => {
    fetch('/data/activites.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((fresh) => {
        if (fresh && Array.isArray(fresh.randonnees)) setEvents(fresh.randonnees)
      })
      .catch(() => {})
  }, [])

  // L'ancienne ancre #cyclomontagnardes active directement le repère Montagne
  useEffect(() => {
    if (window.location.hash === '#cyclomontagnardes') setMontagne(true)
  }, [])

  const sorted = useMemo(() => [...events].sort((a, b) => a.start.localeCompare(b.start)), [events])

  const matchesPracticeAndFed = (e) => {
    if (discipline !== 'all' && !(e.disciplines || []).includes(discipline)) return false
    if (federation !== 'all') {
      if (federation === 'autre') {
        if (['FSGT', 'FFVélo', 'UFOLEP'].includes(e.federation)) return false
      } else if (e.federation !== federation) {
        return false
      }
    }
    return !montagne || e.montagne
  }

  const months = useMemo(() => {
    const keys = [...new Set(sorted.map((e) => monthKey(e.start)))]
    return keys.map((key) => ({
      key,
      count: sorted.filter((e) => monthKey(e.start) === key && matchesPracticeAndFed(e)).length,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted, discipline, federation, montagne])

  const shown = sorted.filter((e) => (month === 'all' || monthKey(e.start) === month) && matchesPracticeAndFed(e))
  const total = sorted.filter(matchesPracticeAndFed).length
  const groups = []
  for (const e of shown) {
    const key = monthKey(e.start)
    let g = groups[groups.length - 1]
    if (!g || g.key !== key) {
      g = { key, items: [] }
      groups.push(g)
    }
    g.items.push(e)
  }
  const dirty = month !== 'all' || discipline !== 'all' || federation !== 'all' || montagne

  const reset = () => {
    setMonth('all')
    setDiscipline('all')
    setFederation('all')
    setMontagne(false)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 md:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <SelectField id="ex-month" label="Dates & période :" icon={Calendar} value={month} onChange={(e) => { setMonth(e.target.value); trackEvent('filtre_exceptions', { mois: e.target.value }) }}>
            <option value="all">Toute la saison ({total} {total > 1 ? 'sorties' : 'sortie'})</option>
            {months.map((m) => (
              <option key={m.key} value={m.key}>
                {monthLabel(m.key)} ({m.count} {m.count > 1 ? 'sorties' : 'sortie'})
              </option>
            ))}
          </SelectField>

          <SelectField id="ex-practice" label="Pratique :" icon={Filter} value={discipline} onChange={(e) => { setDiscipline(e.target.value); trackEvent('filtre_exceptions', { discipline: e.target.value }) }}>
            <option value="all">Toutes les pratiques</option>
            <option value="route">Route</option>
            <option value="gravel">Gravel</option>
            <option value="vtt">VTT</option>
          </SelectField>

          <SelectField id="ex-fed" label="Fédération :" icon={Users} value={federation} onChange={(e) => { setFederation(e.target.value); trackEvent('filtre_exceptions', { federation: e.target.value }) }}>
            <option value="all">Toutes les fédérations</option>
            <option value="FSGT">FSGT 31 (Cyclotourisme)</option>
            <option value="FFVélo">FFVélo</option>
            <option value="UFOLEP">UFOLEP</option>
            <option value="autre">Autres organisateurs</option>
          </SelectField>
        </div>

        <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none text-sm">
            <input
              type="checkbox"
              checked={montagne}
              onChange={(e) => { setMontagne(e.target.checked); trackEvent('filtre_exceptions', { montagne: e.target.checked }) }}
              className="w-4 h-4 rounded border-gray-300 accent-[#00205b] cursor-pointer"
            />
            <span className="inline-flex items-center gap-1.5 font-bold text-[#00205b]">
              <Mountain className="w-4 h-4 text-[#0077b6]" aria-hidden="true" /> Montagne uniquement
            </span>
          </label>
          <span>
            <strong className="text-[#00205b] font-bold">{shown.length}</strong> {shown.length > 1 ? 'sorties trouvées' : 'sortie trouvée'} avec ces critères
            {dirty && (
              <button type="button" onClick={reset} className="ml-3 inline-flex items-center gap-1 font-bold text-[#0077b6] hover:text-[#00205b] hover:underline cursor-pointer">
                <RotateCcw className="w-3 h-3" aria-hidden="true" /> Réinitialiser les filtres
              </button>
            )}
          </span>
        </div>
      </div>

      {montagne && bcmf}

      {groups.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-10 text-center">
          <p className="text-lg font-bold text-[#00205b]">Aucune sortie ne correspond à ces filtres</p>
        </div>
      ) : (
        <div className="space-y-10">
          {groups.map((group) => (
            <section key={group.key} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#00205b] text-white text-sm font-bold rounded-sm shadow-xs capitalize">
                  <Calendar className="w-4 h-4 text-[#00b5e2]" aria-hidden="true" />
                  {monthLabel(group.key)}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {group.items.length} {group.items.length > 1 ? 'sorties' : 'sortie'}
                </span>
                <div className="flex-1 h-px bg-gray-200" aria-hidden="true" />
              </div>

              <div className="space-y-4">
                {group.items.map((e) => {
                  const { days, month: monthShort } = dayBlock(e)
                  const confirmed = e.fiabilite === 'confirmee'
                  return (
                    <details
                      key={e.id}
                      open={shown.length <= 2}
                      className={`group bg-white rounded-lg shadow-sm border border-gray-200 border-l-4 ${confirmed ? 'border-l-emerald-500' : 'border-l-amber-400'} transition-shadow hover:shadow-md overflow-hidden`}
                    >
                      <summary
                        onClick={() => trackEvent('deplier_sortie_exception', { sortie: e.titre })}
                        className="flex items-center gap-3 sm:gap-4 cursor-pointer list-none px-4 sm:px-5 py-3.5 [&::-webkit-details-marker]:hidden hover:bg-gray-50/70"
                      >
                        <span className="w-12 sm:w-14 flex-shrink-0 text-center leading-tight">
                          <span className="display block text-xl font-bold text-[#00205b]">{days}</span>
                          <span className="block text-[11px] font-bold uppercase text-gray-500">{monthShort}</span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-[#00205b] leading-snug">{e.titre}</h3>
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-gray-600 mt-0.5">
                            <span className="inline-flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" /> {e.lieu_depart}
                            </span>
                            {e.parcours && <span className="text-gray-500">· {e.parcours}</span>}
                            {FEDERATION_STYLES[e.federation] && (
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${FEDERATION_STYLES[e.federation]}`}>
                                {e.federation}
                              </span>
                            )}
                            {(e.disciplines || []).map((d) => {
                              const Icon = DISCIPLINE_ICONS[d]
                              return (
                                <span key={d} className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border bg-gray-100 text-gray-700 border-gray-200">
                                  {Icon && <Icon className="w-3 h-3 text-gray-500" aria-hidden="true" />}
                                  {DISCIPLINE_LABELS[d] || d}
                                </span>
                              )
                            })}
                            {e.montagne && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-900 border border-sky-200">
                                <Mountain className="w-3 h-3" aria-hidden="true" /> Montagne
                              </span>
                            )}
                          </span>
                        </span>
                        {confirmed && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" aria-label="Vérifié chez l'organisateur" />}
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>

                      <div className="p-5 sm:p-6 space-y-3 border-t border-gray-100">
                        {e.resume && <p className="text-sm text-gray-700 leading-relaxed">{e.resume}</p>}
                        {e.organisateur && (
                          <p className="text-sm text-gray-500 flex items-start gap-1.5">
                            <Users className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0077b6]" aria-hidden="true" />
                            <span>Organisé par <strong className="text-gray-700">{e.organisateur}</strong></span>
                          </p>
                        )}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          {confirmed ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                              {e.date_label} · vérifié chez l&apos;organisateur
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                              {e.date_label} · dates à vérifier auprès de l&apos;organisateur
                            </span>
                          )}
                          {e.url && (
                            <a
                              href={e.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-umami-event="clic_evenement_externe"
                              data-umami-event-titre={e.titre}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-[#00205b] text-[#00205b] hover:text-white text-xs font-bold rounded-sm transition-colors"
                            >
                              Site de l&apos;événement <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </details>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
