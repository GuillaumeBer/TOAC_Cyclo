import { Compass } from 'lucide-react'
import sortiesWeekend from '@/data/sorties-weekend.json'
import WeekendRidesClient from '@/components/WeekendRidesClient'
import PageHeader from '@/components/PageHeader'
import { sortiesJsonLd, faqJsonLd, FAQ } from '@/lib/sorties-seo'

export const metadata = {
  title: 'Sorties vélo ce week-end à Toulouse : toutes les randonnées cyclo, gravel, interclubs',
  description: "Quelles sorties vélo ce week-end autour de Toulouse ? Toutes les randonnées cyclotouristes sans compétition, quel que soit l'organisateur (FSGT, FFVélo, UFOLEP, clubs), et le gravel, mises à jour chaque semaine : horaires, départs, distances et traces GPS.",
  alternates: {
    canonical: '/calendrier/sorties-weekend',
  },
}

export default function SortiesWeekendPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sortiesJsonLd(sortiesWeekend.sorties)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />
      {/* Header */}
      <PageHeader
        title="Sorties vélo ce week-end à Toulouse"
        breadcrumb={[{ name: 'Calendrier', href: '/calendrier' }, { name: 'Sorties du week-end' }]}
        badge={
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00b5e2]/20 border border-[#00b5e2]/40 text-[#00b5e2] text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" aria-hidden="true" /> Autour de Toulouse (~60 km)
          </div>
        }
        intro="Toutes les randonnées cyclotouristes sans compétition ouvertes à tous autour de Toulouse, quel que soit l'organisateur (FSGT, FFVélo, UFOLEP, clubs indépendants), route, gravel ou VTT, avec leurs circuits et traces GPX."
      />

      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[76rem] mx-auto [&>*]:max-w-4xl">
          <WeekendRidesClient initialData={sortiesWeekend} />

          <section className="mt-16" aria-labelledby="faq-sorties">
            <h2 id="faq-sorties" className="display text-3xl font-bold text-[#00205b] mb-6">Questions fréquentes</h2>
            <dl className="space-y-5">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-white rounded-lg border border-gray-100 p-5 shadow-sm">
                  <dt className="font-bold text-[#00205b] mb-1">{q}</dt>
                  <dd className="text-sm text-gray-600 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  )
}
