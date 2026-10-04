import Link from 'next/link'
import { ArrowLeft, Mountain, Sunset, Calendar, MapPin, Clock } from 'lucide-react'

export const metadata = {
  title: 'Sorties Gravel & Aventure',
  description: 'Sorties afterwork gravel, bikepacking et événements gravel du TOAC Cyclo.',
}

export default function GravelPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link
            href="/#activites"
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux activités
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b5e2]/20 border border-[#00b5e2] rounded-sm text-[#00b5e2] text-xs font-bold uppercase tracking-widest mb-6">
            Section Gravel
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Sorties Gravel & Aventure
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl">
            Découvrez la pratique Gravel au TOAC : des sorties afterwork conviviales aux aventures longue distance en autonomie.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Afterwork */}
        <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-[#00b5e2]">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
              <Sunset className="w-6 h-6 text-[#00b5e2]" /> Sorties Afterwork Gravel
            </h2>
            <span className="px-2 py-1 bg-[#00205b] text-white text-xs font-bold uppercase rounded">Organisé par TOAC Cyclo</span>
          </div>
          <p className="text-gray-600 mb-6">
            Pour décompresser après le travail et profiter des soirées d'été.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-md">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span>1 semaine sur 2 (Avril à Septembre)</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-md">
              <Clock className="w-5 h-5 text-orange-600" />
              <span>Le Jeudi, départ 18h30/19h00</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-md">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span>Blagnac ou Saint-Martin</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-md">
              <Mountain className="w-5 h-5 text-orange-600" />
              <span>30-50 km + Guinguette 🍻</span>
            </div>
          </div>
        </div>

        {/* Événements tiers */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
              <Calendar className="w-6 h-6 text-[#00b5e2]" /> Événements Gravel — 2027
            </h2>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Ces événements sont organisés par des clubs tiers. Des membres du TOAC Cyclo y participent régulièrement — pourquoi pas vous ?
            </p>
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-md text-blue-900 text-sm ">
              <Calendar className="w-5 h-5 text-[#00b5e2] flex-shrink-0 mt-0.5" />
              <p>
                <strong>Calendrier 2027 à venir :</strong> les dates de la prochaine saison seront ajoutées dès que les organisateurs les auront publiées.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-[#00205b]">POU100</h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-full">Dates à venir</span>
              </div>
              <p className="text-gray-600">Week-end de Pâques : 100 km (ou 100 mi), ou 250 km sur le week-end.</p>
              <a href="https://727bikepacking.fr/pou100/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-[#00205b] font-bold text-sm transition-colors mt-4">
                En savoir plus →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-[#00205b]">Occitanie 600</h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-full">Dates à venir</span>
              </div>
              <p className="text-gray-600">600 km en autonomie à travers la région. Pas de compétition, juste l'aventure.</p>
              <a href="https://ogravel.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-[#00205b] font-bold text-sm transition-colors mt-4">
                En savoir plus →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-[#00205b]">Toulouse Grand Tour</h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-full">Dates à venir</span>
              </div>
              <p className="text-gray-600">L'exploration locale avec plusieurs parcours au choix.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-[#00205b]">g727 (Grand Départ)</h3>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-full">Dates à venir</span>
              </div>
              <p className="text-gray-600">Une grande boucle de 727 km, réductible. Bivouac, autonomie, sans délai.</p>
              <a href="https://727bikepacking.fr/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-[#00205b] font-bold text-sm transition-colors mt-4">
                En savoir plus →
              </a>
            </div>
          </div>
        </div>

        {/* Contact */}


      </div>
    </div>
  )
}
