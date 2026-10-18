import { Compass } from 'lucide-react'
import sortiesWeekend from '@/data/sorties-weekend.json'
import WeekendRidesClient from '@/components/WeekendRidesClient'
import PageHeader from '@/components/PageHeader'

export const metadata = {
  title: 'Sorties du week-end autour de Toulouse (Interclubs FSGT, FFVélo, Gravel)',
  description: 'Randonnées cyclo, interclubs FSGT 31, FFVélo et gravel ouverts à tous les week-ends autour de Toulouse : horaires, lieux de départ, distances et traces OpenRunner.',
  alternates: {
    canonical: '/calendrier/sorties-weekend',
  },
}

export default function SortiesWeekendPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Sorties cyclo des week-ends"
        breadcrumb={[{ name: 'Calendrier', href: '/calendrier' }, { name: 'Sorties du week-end' }]}
        badge={
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b5e2]/20 border border-[#00b5e2]/40 text-[#00b5e2] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" /> Autour de Toulouse (~60 km)
          </div>
        }
        intro="Les randonnées interclubs (FSGT, FFVélo, FFC) et événements route, gravel ou VTT ouverts à tous autour de Toulouse, avec leurs circuits et traces GPX."
      />

      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[76rem] mx-auto [&>*]:max-w-4xl">
          <WeekendRidesClient initialData={sortiesWeekend} />
        </div>
      </div>
    </div>
  )
}
