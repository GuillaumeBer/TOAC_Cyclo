import Link from 'next/link'
import { ArrowRight, Calendar, Bike } from 'lucide-react'
import calendrier from '@/data/calendrier.json'
import reguliere from '@/data/sorties.json'
import EventCard, { EventBadge } from '@/components/EventCard'
import PageHeader from '@/components/PageHeader'
import { SITE_URL } from '@/lib/site'

export const metadata = {
  title: 'Le club et son calendrier 2027 : Randonnée des Rameaux, AG, Montagnarde',
  description: "Les grands rendez-vous du TOAC Cyclo à Toulouse en 2027 : Randonnée des Rameaux organisée par le club (21 mars 2027, ouverte à tous), Montagnarde et Assemblée Générale (adhérents), participation de membres à Paris-Brest-Paris.",
  alternates: {
    canonical: '/club',
  },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Randonnée des Rameaux 2027 — TOAC Cyclotourisme',
  startDate: '2027-03-21T08:00:00+01:00',
  endDate: '2027-03-21T14:00:00+01:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  isAccessibleForFree: false,
  location: {
    '@type': 'Place',
    name: 'Complexe Sportif TOAC',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Chemin du Touch',
      postalCode: '31300',
      addressLocality: 'Toulouse',
      addressRegion: 'Occitanie',
      addressCountry: 'FR',
    },
  },
  organizer: { '@type': 'SportsClub', name: 'TOAC Cyclotourisme', url: SITE_URL },
  image: `${SITE_URL}/images/TOAC1.jpg`,
  description: 'Grande randonnée cyclotouriste annuelle du TOAC Cyclo à Toulouse, ouverte à tous (licenciés et non-licenciés). Circuits route de 50 km, 80 km et 100+ km. Inscriptions sur place le matin même.',
}

export default function CalendrierPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <PageHeader
        title="Le club et son calendrier"
        breadcrumb={[{ name: 'Le club' }]}
        intro="Ce que le TOAC Cyclo organise : ses sorties régulières et ses rendez-vous de la saison 2027."
      />

      <div className="max-w-[76rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14 [&>*]:max-w-4xl">
        {/* Sorties régulières : ce que le club organise chaque semaine, et le dimanche chez d'autres */}
        <section aria-labelledby="sorties-regulieres">
          <h2 id="sorties-regulieres" className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Bike className="w-6 h-6 text-[#00b5e2]" aria-hidden="true" /> Sorties régulières
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {reguliere.map((r) => (
              <div key={r.title} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0077b6] mb-2">{r.tag}</p>
                <h3 className="font-bold text-[#00205b] text-base">{r.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{r.when}</p>
                <p className="text-sm text-gray-600">{r.where}</p>
                {r.link && (
                  <Link href={r.link} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[#0077b6] hover:text-[#00205b]">
                    {r.linkLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#00b5e2]" aria-hidden="true" /> Dates à retenir
            </h2>
          </div>
          {/* Légende : dit une seule fois qui organise, les badges ne disent ensuite que « pour qui ». */}
          <p className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600">
            <span>Tout est organisé par le club :</span>
            <EventBadge type="public" className="" />
            <EventBadge type="members" className="" />
          </p>
          <div className="space-y-4">
            {calendrier.evenements.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
