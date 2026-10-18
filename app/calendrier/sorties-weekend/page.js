import Link from 'next/link'
import { ArrowLeft, Calendar, Compass } from 'lucide-react'
import sortiesWeekend from '@/data/sorties-weekend.json'
import WeekendRidesClient from '@/components/WeekendRidesClient'

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
      <div className="bg-[#00205b] text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-[76rem] mx-auto relative z-10 flex flex-col items-start">
          <div className="flex flex-wrap items-center gap-3 text-sm mb-8">
            <Link href="/calendrier" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour au calendrier
            </Link>
            <span className="text-white/30" aria-hidden="true">/</span>
            <span className="text-gray-300">Sorties du week-end</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b5e2]/20 border border-[#00b5e2]/40 text-[#00b5e2] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" /> Autour de Toulouse (~60 km)
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Sorties cyclo des week-ends
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Les randonnées interclubs (FSGT, FFVélo, FFC) et événements route, gravel ou VTT ouverts à tous autour de Toulouse, avec leurs circuits et traces GPX.
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[76rem] mx-auto [&>*]:max-w-4xl">
          <WeekendRidesClient initialData={sortiesWeekend} />
        </div>
      </div>
    </div>
  )
}
