import Link from 'next/link'
import { ArrowLeft, ArrowRight, Calendar, Repeat, Compass } from 'lucide-react'
import calendrier from '@/data/calendrier.json'
import EventCard from '@/components/EventCard'
import { SITE_URL } from '@/lib/site'

export const metadata = {
  title: 'Calendrier 2027 : Randonnée des Rameaux & Grands Rendez-vous',
  description: "Les grands rendez-vous du TOAC Cyclo à Toulouse en 2027 : Randonnée des Rameaux (21 mars 2027, ouverte à tous), Montagnarde, Paris-Brest-Paris et calendrier annuel.",
  alternates: {
    canonical: '/calendrier',
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
      <div className="bg-[#00205b] text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-[76rem] mx-auto relative z-10 flex flex-col items-start">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Calendrier 2027</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Les grands rendez-vous du club et de la saison.
          </p>
        </div>
      </div>

      <div className="max-w-[76rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14 [&>*]:max-w-4xl">
        {/* Encart Sorties des week-ends */}
        <section>
          <Link
            href="/calendrier/sorties-weekend"
            data-umami-event="clic_carte_sorties_weekend"
            className="group block bg-gradient-to-r from-[#00205b] to-[#003580] text-white rounded-lg p-6 md:p-7 shadow-md hover:shadow-lg transition-all border border-[#00b5e2]/30"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00b5e2]">
                  <Compass className="w-4 h-4" aria-hidden="true" /> Où rouler ce week-end ?
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#fcd34d] transition-colors">
                  Sorties cyclo & interclubs des week-ends autour de Toulouse
                </h2>
                <p className="text-sm text-gray-300 max-w-2xl">
                  Consultez les randonnées route, gravel et VTT (FSGT 31, FFVélo, clubs voisins) recensées dans un rayon de 60 km, avec horaires, lieux de départ et traces OpenRunner.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#fcd34d] group-hover:bg-[#fde68a] text-[#00205b] font-bold text-sm rounded-sm self-start sm:self-center whitespace-nowrap transition-colors">
                Voir les sorties <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#00b5e2]" /> Dates à retenir
          </h2>
          <div className="space-y-4">
            {calendrier.evenements.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Repeat className="w-6 h-6 text-[#00b5e2]" /> Rendez-vous annuels
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {calendrier.rendezVousAnnuels.map((r) => {
              const isInternal = r.tag?.includes('Adhérents')
              const content = (
                <>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0077b6]">{r.when}</span>
                    {r.tag && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isInternal 
                          ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                          : 'bg-sky-50 text-sky-900 border border-sky-200'
                      }`}>
                        {r.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-[#00205b] text-base">{r.title}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{r.detail}</p>
                </>
              )
              const cls = 'block bg-white rounded-lg shadow-sm p-5 border border-gray-100'
              return r.link ? (
                <Link key={r.title} href={r.link} className={`${cls} hover:shadow-md transition-shadow`}>{content}</Link>
              ) : (
                <div key={r.title} className={cls}>{content}</div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
