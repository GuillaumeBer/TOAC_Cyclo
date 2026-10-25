import { ChevronDown } from 'lucide-react'
import sortiesWeekend from '@/data/sorties-weekend.json'
import WeekendRidesClient from '@/components/WeekendRidesClient'
import ActivityTabs from '@/components/ActivityTabs'
import Randonnees from '@/components/Randonnees'
import LongueDistance from '@/components/LongueDistance'
import { sortiesJsonLd, faqJsonLd, FAQ } from '@/lib/sorties-seo'

export const metadata = {
  title: 'Sorties vélo à venir autour de Toulouse : randonnées cyclo, gravel, interclubs',
  description: "Quelles sorties vélo ce week-end ou dans les prochains mois autour de Toulouse ? Toutes les randonnées cyclotouristes sans compétition, quel que soit l'organisateur (FSGT, FFVélo, UFOLEP, clubs), et les grands événements plus loin : mises à jour chaque semaine, avec horaires, départs, distances et traces GPS.",
  alternates: {
    canonical: '/sorties',
  },
}

const header = {
  title: 'Sorties vélo à venir',
  breadcrumb: [{ name: 'Sorties' }],
  intro: "Toutes les randonnées cyclo ouvertes à tous, sans compétition, quel que soit l'organisateur : autour de Toulouse, sorties d'exception, ultra et endurance.",
}

// Anciennes ancres (liens externes, redirections .htaccess) conservées.
const ALIASES = {
  activites: 'plus-loin',
  randonnees: 'plus-loin',
  'grands-evenements': 'plus-loin',
  cyclomontagnardes: 'plus-loin',
  gravel: 'plus-loin',
}

export default function SortiesPage() {
  const tabs = [
    {
      id: 'pres-de-toulouse',
      label: 'Autour de Toulouse',
      content: (
        <>
          <WeekendRidesClient initialData={sortiesWeekend} />

          <section className="mt-16" aria-labelledby="faq-sorties">
            <h2 id="faq-sorties" className="display text-3xl font-bold text-[#00205b] mb-6">Questions fréquentes</h2>
            <div className="space-y-3">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group bg-white rounded-lg border border-gray-100 shadow-sm">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-bold text-[#00205b] [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </section>
        </>
      ),
    },
    {
      id: 'plus-loin',
      label: "Sorties d'exception",
      content: <Randonnees />,
    },
    {
      id: 'longue-distance',
      label: 'Ultra & endurance',
      content: <LongueDistance />,
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sortiesJsonLd(sortiesWeekend.sorties)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      <ActivityTabs header={header} tabs={tabs} aliases={ALIASES} />
    </>
  )
}
