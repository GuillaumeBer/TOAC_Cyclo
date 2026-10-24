'use client'

import { useEffect, useMemo, useState } from 'react'
import { Calendar, Clock, MapPin, ExternalLink, CheckCircle2, AlertTriangle, Route, Euro, Users, Sparkles, Filter, ChevronRight, ChevronDown, RotateCcw, Shield, Bike, Trees, Mountain } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const DISCIPLINE_LABELS = {
  route: 'Route',
  gravel: 'Gravel',
  vtt: 'VTT',
}

// Disciplines en gris neutre + icône : le vert et l'ambre restent réservés à la fiabilité (vérifié / à vérifier).
const DISCIPLINE_ICONS = {
  route: Bike,
  gravel: Trees,
  vtt: Mountain,
}

const FEDERATION_STYLES = {
  FSGT: 'bg-[#00205b] text-white',
  'FFVélo': 'bg-[#0077b6] text-white',
  FFC: 'bg-slate-700 text-white',
  UFOLEP: 'bg-indigo-700 text-white',
}

function formatKm(val) {
  if (val == null) return ''
  return `${Number(val).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`
}

function formatUpdatedAt(isoStr) {
  if (!isoStr) return null
  const d = new Date(isoStr)
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatHorairesLabel(s) {
  const rdv = s.heure_rdv
  const depart = s.heure_depart
  if (rdv && depart && rdv !== depart) {
    return `À partir de ${depart} (RDV ${rdv})`
  }
  if (rdv || depart) {
    return `À partir de ${rdv || depart}`
  }
  return s.horaires_label || 'Horaire à confirmer'
}

function toIsoDate(d) {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function addDays(baseDate, days) {
  const d = new Date(baseDate)
  d.setDate(d.getDate() + days)
  return d
}

function formatShortRange(startDate, endDate) {
  const sameMonth = startDate.getMonth() === endDate.getMonth()
  const startDay = startDate.getDate()
  const endStr = endDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  if (sameMonth) {
    return `${startDay} – ${endStr}`
  }
  const startStr = startDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  return `${startStr} – ${endStr}`
}

function isPastSortie(s, now) {
  const todayIso = toIsoDate(now)
  if (!s.date || s.date < todayIso) return true
  if (s.date > todayIso) return false
  // Même jour : vérifier si le créneau de départ est déjà passé
  const timeStr = s.heure_depart || s.heure_rdv
  if (timeStr && /^\d{1,2}:\d{2}$/.test(timeStr)) {
    const [hh, mm] = timeStr.split(':').map(Number)
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    const cutoffMinutes = hh * 60 + mm + 120 // 2h de battement pour les départs libres
    return nowMinutes >= cutoffMinutes
  }
  return now.getHours() >= 12
}

export default function WeekendRidesClient({ initialData }) {
  const [data, setData] = useState(initialData)
  const [weekFilter, setWeekFilter] = useState('all') // Par défaut : les 4 prochaines semaines
  const [disciplineFilter, setDisciplineFilter] = useState('route') // Par défaut : Route
  const [federationFilter, setFederationFilter] = useState('all')

  // Sur OVH, permet de lire directement /data/sorties-weekend.json s'il a été mis à jour sans rebuild complet
  useEffect(() => {
    fetch('/data/sorties-weekend.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((fresh) => {
        if (fresh && Array.isArray(fresh.sorties)) {
          setData(fresh)
        }
      })
      .catch(() => {})
  }, [])

  // Découpage des 4 prochaines semaines en tranches de 7 jours (par défaut : 7 jours à venir)
  const { weeks, maxDateIso, now } = useMemo(() => {
    const currentNow = new Date()
    const w0Start = new Date(currentNow)
    const w0End = addDays(currentNow, 7)
    const w1Start = addDays(currentNow, 8)
    const w1End = addDays(currentNow, 14)
    const w2Start = addDays(currentNow, 15)
    const w2End = addDays(currentNow, 21)
    const w3Start = addDays(currentNow, 22)
    const w3End = addDays(currentNow, 28)

    const weekRanges = [
      {
        id: 'week-0',
        title: '7 prochains jours',
        rangeLabel: formatShortRange(w0Start, w0End),
        startIso: toIsoDate(w0Start),
        endIso: toIsoDate(w0End),
      },
      {
        id: 'week-1',
        title: 'Semaine +2',
        rangeLabel: formatShortRange(w1Start, w1End),
        startIso: toIsoDate(w1Start),
        endIso: toIsoDate(w1End),
      },
      {
        id: 'week-2',
        title: 'Semaine +3',
        rangeLabel: formatShortRange(w2Start, w2End),
        startIso: toIsoDate(w2Start),
        endIso: toIsoDate(w2End),
      },
      {
        id: 'week-3',
        title: 'Semaine +4',
        rangeLabel: formatShortRange(w3Start, w3End),
        startIso: toIsoDate(w3Start),
        endIso: toIsoDate(w3End),
      },
    ]

    return {
      weeks: weekRanges,
      maxDateIso: toIsoDate(w3End),
      now: currentNow,
    }
  }, [])

  // Toutes les sorties à venir (non passées) sur la fenêtre glissante de 4 semaines
  const upcomingSorties = useMemo(
    () => (data?.sorties || []).filter((s) => !isPastSortie(s, now) && s.date <= maxDateIso),
    [data, now, maxDateIso]
  )

  // Nombre de sorties par semaine (après filtres discipline / fédération pour guider l'utilisateur)
  const matchesPracticeAndFed = useMemo(() => {
    return (s) => {
      if (disciplineFilter !== 'all' && !(s.disciplines || []).includes(disciplineFilter)) return false
      if (federationFilter !== 'all') {
        if (federationFilter === 'autre') {
          if (s.federation === 'FSGT' || s.federation === 'FFVélo') return false
        } else if (s.federation !== federationFilter) {
          return false
        }
      }
      return true
    }
  }, [disciplineFilter, federationFilter])

  const weeksWithCounts = useMemo(() => {
    return weeks.map((w) => ({
      ...w,
      count: upcomingSorties.filter(
        (s) => s.date >= w.startIso && s.date <= w.endIso && matchesPracticeAndFed(s)
      ).length,
    }))
  }, [weeks, upcomingSorties, matchesPracticeAndFed])

  const totalMatchingAllWeeks = useMemo(
    () => upcomingSorties.filter(matchesPracticeAndFed).length,
    [upcomingSorties, matchesPracticeAndFed]
  )

  const activeWeekObj = useMemo(
    () => weeksWithCounts.find((w) => w.id === weekFilter) || null,
    [weeksWithCounts, weekFilter]
  )

  const nextWeekWithEvents = useMemo(() => {
    if (weekFilter === 'all') return null
    const currentIndex = weeksWithCounts.findIndex((w) => w.id === weekFilter)
    if (currentIndex === -1) return null
    return weeksWithCounts.slice(currentIndex + 1).find((w) => w.count > 0) || weeksWithCounts[currentIndex + 1] || null
  }, [weeksWithCounts, weekFilter])

  const filteredSorties = useMemo(() => {
    return upcomingSorties.filter((s) => {
      if (!matchesPracticeAndFed(s)) return false
      if (weekFilter !== 'all' && activeWeekObj) {
        if (s.date < activeWeekObj.startIso || s.date > activeWeekObj.endIso) return false
      }
      return true
    })
  }, [upcomingSorties, matchesPracticeAndFed, weekFilter, activeWeekObj])

  // Regrouper par date (AAAA-MM-JJ)
  const groupedByDate = useMemo(() => {
    const groups = []
    let current = null
    for (const s of filteredSorties) {
      if (!current || current.date !== s.date) {
        current = { date: s.date, dateLabel: s.date_label, items: [] }
        groups.push(current)
      }
      current.items.push(s)
    }
    return groups
  }, [filteredSorties])

  const updatedLabel = formatUpdatedAt(data?.updatedAt)

  return (
    <div className="space-y-8">
      {/* Bandeau d'information & filtres */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 md:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#00b5e2] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-gray-600">
              <strong className="text-[#00205b]">Sorties à venir autour de Toulouse (~60 km) :</strong> affichage par défaut sur les <strong className="text-[#00205b]">4 prochaines semaines</strong>. Sélectionnez une semaine ci-dessous pour affiner.
              {updatedLabel && (
                <span className="block text-xs text-gray-500 mt-1">
                  Dernière mise à jour : {updatedLabel}
                </span>
              )}
            </div>
          </div>

          <span className="px-3 py-1.5 bg-[#00205b] text-white text-xs font-bold rounded self-start md:self-center flex-shrink-0">
            {upcomingSorties.length} {upcomingSorties.length > 1 ? 'sorties à venir (4 sem.)' : 'sortie à venir (4 sem.)'}
          </span>
        </div>

        {/* Avertissement Contenu généré par IA */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-md bg-amber-50/90 border border-amber-200 text-xs text-amber-950 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="font-bold">Contenu généré par IA :</strong> ces informations sont collectées automatiquement sur le web et peuvent comporter des erreurs ou des changements de dernière minute (horaires, tracés, météo).{' '}
            <strong className="font-bold underline decoration-amber-400 underline-offset-2">
              Vérifiez toujours les informations sur le site officiel de l&apos;organisateur
            </strong>{' '}
            avant de vous déplacer.
          </p>
        </div>

        {/* Barre de filtres modernes en menus déroulants */}
        <div className="pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {/* 1. Menu déroulant Dates */}
            <div>
              <label htmlFor="filter-dates" className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0077b6]" aria-hidden="true" /> Dates &amp; période :
              </label>
              <div className="relative">
                <select
                  id="filter-dates"
                  value={weekFilter}
                  onChange={(e) => {
                    setWeekFilter(e.target.value)
                    trackEvent('filtre_sorties_semaine', { semaine: e.target.value })
                  }}
                  className="w-full appearance-none bg-gray-50/80 hover:bg-white focus:bg-white border border-gray-300 hover:border-gray-400 focus:border-[#00205b] focus:ring-2 focus:ring-[#00205b]/20 rounded-md py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-bold text-gray-800 shadow-xs transition-all cursor-pointer"
                >
                  {weeksWithCounts.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.rangeLabel} ({w.count} {w.count > 1 ? 'sorties' : 'sortie'})
                    </option>
                  ))}
                  <option value="all">
                    Toutes les 4 semaines ({totalMatchingAllWeeks} {totalMatchingAllWeeks > 1 ? 'sorties' : 'sortie'})
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* 2. Menu déroulant Pratique */}
            <div>
              <label htmlFor="filter-practice" className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#0077b6]" aria-hidden="true" /> Pratique :
              </label>
              <div className="relative">
                <select
                  id="filter-practice"
                  value={disciplineFilter}
                  onChange={(e) => {
                    setDisciplineFilter(e.target.value)
                    trackEvent('filtre_sorties_weekend', { discipline: e.target.value })
                  }}
                  className="w-full appearance-none bg-gray-50/80 hover:bg-white focus:bg-white border border-gray-300 hover:border-gray-400 focus:border-[#00205b] focus:ring-2 focus:ring-[#00205b]/20 rounded-md py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-bold text-gray-800 shadow-xs transition-all cursor-pointer"
                >
                  <option value="all">Toutes les pratiques (Route, Gravel, VTT)</option>
                  <option value="route">Route (Cyclotourisme)</option>
                  <option value="gravel">Gravel</option>
                  <option value="vtt">VTT</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              </div>
            </div>

            {/* 3. Menu déroulant Fédération */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label htmlFor="filter-fed" className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#0077b6]" aria-hidden="true" /> Fédération :
              </label>
              <div className="relative">
                <select
                  id="filter-fed"
                  value={federationFilter}
                  onChange={(e) => {
                    setFederationFilter(e.target.value)
                    trackEvent('filtre_sorties_weekend', { federation: e.target.value })
                  }}
                  className="w-full appearance-none bg-gray-50/80 hover:bg-white focus:bg-white border border-gray-300 hover:border-gray-400 focus:border-[#00205b] focus:ring-2 focus:ring-[#00205b]/20 rounded-md py-2.5 pl-3.5 pr-10 text-xs sm:text-sm font-bold text-gray-800 shadow-xs transition-all cursor-pointer"
                >
                  <option value="all">Toutes les fédérations</option>
                  <option value="FSGT">FSGT 31 (Cyclotourisme)</option>
                  <option value="FFVélo">FFVélo (FFCT)</option>
                  <option value="autre">FFC / Autres organisateurs</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Résumé des résultats et bouton de réinitialisation */}
          <div className="mt-3.5 flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-50">
            <span>
              <strong className="text-[#00205b] font-bold">{filteredSorties.length}</strong> {filteredSorties.length > 1 ? 'sorties trouvées' : 'sortie trouvée'} avec ces critères
            </span>
            {(weekFilter !== 'all' || disciplineFilter !== 'route' || federationFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setWeekFilter('all')
                  setDisciplineFilter('route')
                  setFederationFilter('all')
                }}
                className="inline-flex items-center gap-1 font-bold text-[#0077b6] hover:text-[#00205b] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" /> Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Liste des sorties groupées par journée */}
      {groupedByDate.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-10 text-center">
          <p className="text-lg font-bold text-[#00205b] mb-2">
            {upcomingSorties.length === 0
              ? 'Aucune sortie à venir enregistrée pour le moment'
              : activeWeekObj
              ? `Aucune sortie recensée sur la période ${activeWeekObj.rangeLabel}`
              : 'Aucune sortie à venir ne correspond à ces filtres'}
          </p>
          <p className="text-sm text-gray-600 mb-5">
            {upcomingSorties.length === 0
              ? 'Les prochaines randonnées du week-end seront publiées dès la prochaine recherche.'
              : 'Consultez les semaines suivantes ou élargissez vos filtres.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {nextWeekWithEvents && nextWeekWithEvents.count > 0 && (
              <button
                type="button"
                onClick={() => setWeekFilter(nextWeekWithEvents.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00205b] text-white text-sm font-bold rounded-sm hover:bg-[#003380] transition-colors"
              >
                Voir la période {nextWeekWithEvents.rangeLabel}
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
            {weekFilter !== 'all' && totalMatchingAllWeeks > 0 && (
              <button
                type="button"
                onClick={() => setWeekFilter('all')}
                className="px-4 py-2 bg-gray-100 text-[#00205b] text-sm font-bold rounded-sm hover:bg-gray-200 transition-colors"
              >
                Afficher toutes les 4 semaines ({totalMatchingAllWeeks})
              </button>
            )}
            {(disciplineFilter !== 'all' || federationFilter !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setDisciplineFilter('all')
                  setFederationFilter('all')
                }}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-sm hover:bg-gray-50 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {groupedByDate.map((group) => (
            <section key={group.date} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#00205b] text-white text-sm font-bold rounded-sm shadow-xs">
                  <Calendar className="w-4 h-4 text-[#00b5e2]" aria-hidden="true" />
                  {group.dateLabel}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {group.items.length} {group.items.length > 1 ? 'sorties recensées' : 'sortie recensée'}
                </span>
                <div className="flex-1 h-px bg-gray-200" aria-hidden="true" />
              </div>

              <div className="space-y-4">
                {group.items.map((s) => {
                  const editionYear = s.date?.slice(0, 4)
                  const isConfirmed = s.fiabilite === 'confirmee'
                  const isCancelled = s.statut === 'annulee'
                  return (
                    <article
                      key={s.id}
                      className={`bg-white rounded-lg shadow-sm border transition-shadow hover:shadow-md overflow-hidden ${
                        isCancelled
                          ? 'border-red-300 opacity-75'
                          : isConfirmed
                          ? 'border-gray-200 border-l-4 border-l-emerald-500'
                          : 'border-gray-200 border-l-4 border-l-amber-400'
                      }`}
                    >
                      <div className="p-6 space-y-4">
                        {/* Ligne supérieure : badges + titre */}
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              {s.federation && (
                                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${FEDERATION_STYLES[s.federation] || 'bg-gray-800 text-white'}`}>
                                  {s.federation}
                                </span>
                              )}
                              {(s.disciplines || []).map((d) => {
                                const Icon = DISCIPLINE_ICONS[d]
                                return (
                                  <span
                                    key={d}
                                    className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border bg-gray-100 text-gray-700 border-gray-200"
                                  >
                                    {Icon && <Icon className="w-3.5 h-3.5 text-gray-500" aria-hidden="true" />}
                                    {DISCIPLINE_LABELS[d] || d}
                                  </span>
                                )
                              })}
                              {isCancelled ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-800 border border-red-200">
                                  Annulée
                                </span>
                              ) : isConfirmed ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                                  Vérifié chez l'organisateur
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                                  Infos à vérifier auprès du club
                                </span>
                              )}
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-[#00205b]">
                              {s.titre}
                            </h2>
                            {s.organisateur && (
                              <p className="text-sm text-gray-500 flex items-start gap-1.5">
                                <Users className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0077b6]" aria-hidden="true" />
                                <span>Organisé par <strong className="text-gray-700">{s.organisateur}</strong></span>
                              </p>
                            )}
                          </div>

                          {s.url && (
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-umami-event="clic_sortie_weekend_infos"
                              data-umami-event-titre={s.titre}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-[#00205b] text-[#00205b] hover:text-white text-xs font-bold rounded-sm transition-colors self-start"
                            >
                              Site de l'événement <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>

                        {/* Infos pratiques : Horaires & Lieu de départ */}
                        <div className="grid sm:grid-cols-2 gap-3 p-3.5 bg-gray-50 rounded-md border border-gray-100 text-sm">
                          <div className="flex items-start gap-2.5">
                            <Clock className="w-4 h-4 text-[#0077b6] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <div>
                              <span className="font-bold text-[#00205b] block">{formatHorairesLabel(s)}</span>
                              {s.preuve_date && (
                                <span className="text-xs text-gray-500 block mt-0.5 leading-relaxed">
                                  « {s.preuve_date} »
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5">
                              <MapPin className="w-4 h-4 text-[#0077b6] flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <div>
                                <span className="font-bold text-[#00205b]">
                                  {s.lieu_depart || 'Lieu à préciser'}
                                  {s.code_postal ? ` (${s.code_postal})` : ''}
                                </span>
                                {s.distance_toulouse_km != null && (
                                  <span className="text-xs text-gray-500 ml-1.5">
                                    · ~{Math.round(s.distance_toulouse_km)} km de Toulouse
                                  </span>
                                )}
                                {s.adresse_depart && (
                                  <span className="block text-xs text-gray-600 mt-0.5">
                                    {s.adresse_depart}
                                  </span>
                                )}
                              </div>
                            </div>
                            {s.maps_url && (
                              <a
                                href={s.maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-umami-event="clic_sortie_weekend_maps"
                                data-umami-event-commune={s.lieu_depart}
                                className="text-xs font-bold text-[#0077b6] hover:underline whitespace-nowrap flex-shrink-0"
                              >
                                Carte ↗
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Circuits & Traces GPX / OpenRunner */}
                        {(s.circuits?.length > 0 || s.circuits_non_precises > 0) && (
                          <div className="space-y-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                              <Route className="w-3.5 h-3.5 text-[#00b5e2]" aria-hidden="true" />
                              Circuits proposés
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {s.circuits.map((c, idx) => {
                                const staleYear = c.trace_annee && c.trace_annee !== editionYear
                                const discLabel = DISCIPLINE_LABELS[c.discipline] || c.discipline
                                const content = (
                                  <>
                                    <span className="font-bold text-[#00205b]">
                                      {discLabel} {formatKm(c.distance_km)}
                                    </span>
                                    {c.denivele_m != null && (
                                      <span className="text-gray-500">· D+ {Math.round(c.denivele_m)} m</span>
                                    )}
                                    {c.lien_trace && (
                                      <span className="text-[#0077b6] font-bold ml-1">
                                        Tracé ↗
                                      </span>
                                    )}
                                    {staleYear && (
                                      <span
                                        className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-amber-100 text-amber-900 rounded"
                                        title={`Le titre du tracé sur OpenRunner mentionne l'année ${c.trace_annee}`}
                                      >
                                        ⚠ tracé {c.trace_annee}
                                      </span>
                                    )}
                                  </>
                                )

                                return c.lien_trace ? (
                                  <a
                                    key={idx}
                                    href={c.lien_trace}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-umami-event="clic_trace_openrunner"
                                    data-umami-event-sortie={s.titre}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs bg-sky-50/70 hover:bg-sky-100 border border-sky-200 transition-colors"
                                  >
                                    {content}
                                  </a>
                                ) : (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs bg-gray-50 border border-gray-200"
                                  >
                                    {content}
                                  </span>
                                )
                              })}
                              {s.circuits_non_precises > 0 && (
                                <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs bg-gray-50 text-gray-600 border border-gray-200 italic">
                                  {s.circuits_non_precises} circuit(s) annoncé(s) (distances non publiées en ligne)
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Tarif éventuel */}
                        {s.tarif_inscription && (
                          <div className="pt-2 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-600">
                            <Euro className="w-4 h-4 text-[#0077b6] flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>
                              <strong className="text-gray-700">Inscription :</strong> {s.tarif_inscription}
                            </span>
                          </div>
                        )}
                      </div>
                    </article>
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
