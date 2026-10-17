import Link from 'next/link'
import { SITE_URL } from '@/lib/site'
import { Calendar, MapPin, Trophy, Users, Heart, ArrowLeft, Bike } from 'lucide-react'
import SeeAlso from '@/components/SeeAlso'

export const metadata = {
  title: 'Randonnée des Rameaux',
  description: 'La randonnée cyclo annuelle du TOAC Cyclo : parcours, infos pratiques et Trophée André Lafarge.',
  openGraph: { images: ['/images/TOAC1.jpg'] },
}

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Randonnée des Rameaux 2027',
  startDate: '2027-03-21T08:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Complexe Sportif TOAC',
    address: { '@type': 'PostalAddress', addressLocality: 'Toulouse', addressCountry: 'FR' },
  },
  organizer: { '@type': 'SportsClub', name: 'TOAC Cyclotourisme', url: SITE_URL },
  image: `${SITE_URL}/images/TOAC1.jpg`,
  description: 'Randonnée cyclo annuelle du TOAC Cyclo, parcours pour tous les niveaux. Inscriptions sur place le matin même.',
}

export default function RandoRameauxPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      {/* Header */}
      <div className="bg-[#00205b] pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link
            href="/calendrier"
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au calendrier
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b5e2]/10 border border-[#00b5e2] rounded-sm text-[#00b5e2] text-xs font-bold uppercase tracking-widest mb-6">
            <Trophy className="w-4 h-4" /> Événement Phare
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            La Randonnée des Rameaux
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Le rendez-vous incontournable du printemps, organisé chaque année le dimanche des Rameaux
            par le TOAC Cyclo. Un événement qui rassemble cyclistes de tous horizons pour une journée
            de convivialité sur les routes autour de Toulouse.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Infos pratiques */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#00b5e2] flex items-center justify-center text-[#00205b]">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#0077b6] uppercase font-bold tracking-wider mb-1">Prochaine édition</div>
                  <div className="text-2xl font-bold text-[#00205b]">Dimanche 21 Mars 2027</div>
                  <div className="text-gray-500">Départ à partir de 08h00</div>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#00205b]/10 flex items-center justify-center text-[#00205b]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#0077b6] uppercase font-bold tracking-wider mb-1">Départ & Arrivée</div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=TOAC+Omnisports+Toulouse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-bold text-[#00205b] hover:text-[#0077b6] transition-colors"
                  >
                    Complexe TOAC ↗
                  </a>
                  <div className="text-gray-500">Toulouse</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trophée André Lafarge */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-[#00205b] shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#00205b] mb-3">🏆 Trophée André Lafarge</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Créé en <strong className="text-[#00205b]">2014</strong>, ce trophée rend hommage à <strong className="text-[#00205b]">André Lafarge</strong>,
                  fondateur de la section Cyclotourisme du TOAC en <strong className="text-[#00205b]">1976</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Chaque année, il récompense le <strong className="text-[#0077b6]">club le plus représenté</strong> lors
                  de la Randonnée des Rameaux. Un symbole de l'esprit de convivialité et de rassemblement
                  qui anime notre événement.
                </p>
              </div>
            </div>
          </div>

          {/* Les parcours */}
          <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-3">
              <Bike className="w-6 h-6 text-[#0077b6]" /> Les Parcours
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Plusieurs circuits sont proposés pour s'adapter à tous les niveaux, vous permettant
              de découvrir de beaux paysages sur des routes peu fréquentées.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#0077b6]">~50 km</div>
                <div className="text-gray-500 text-sm">Parcours découverte</div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#0077b6]">~80 km</div>
                <div className="text-gray-500 text-sm">Parcours intermédiaire</div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#0077b6]">~100+ km</div>
                <div className="text-gray-500 text-sm">Parcours sportif</div>
              </div>
            </div>
          </div>

          {/* Mobilisation */}
          <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#0077b6]" /> Une Organisation Collective
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              La Randonnée des Rameaux est <strong className="text-[#00205b]">le seul moment de l'année</strong> où
              tous les membres du TOAC Cyclo sont sollicités pour l'organisation.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Heart className="w-5 h-5 text-[#0077b6]" />
                <span>Accueil des participants</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Heart className="w-5 h-5 text-[#0077b6]" />
                <span>Ravitaillement</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Heart className="w-5 h-5 text-[#0077b6]" />
                <span>Assistance technique</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <div className="inline-block px-8 py-4 bg-[#00b5e2]/10 border border-[#0077b6] rounded-lg">
              <p className="text-xl text-[#00205b] font-bold">
                Les inscriptions se feront sur place le matin de la randonnée.
              </p>
            </div>
          </div>

          <SeeAlso current="/rando-rameaux" />
        </div>
      </div>
    </div>
  )
}
