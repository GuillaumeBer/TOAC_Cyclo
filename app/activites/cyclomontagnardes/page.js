'use client'
import Link from 'next/link'
import { ArrowLeft, Mountain, Map, Route } from 'lucide-react'

export default function CyclomontagnardesPage() {
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
            Montagne
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Cyclomontagnardes 2026
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl">
            Des défis d'exception au cœur des massifs français. Dénivelé, paysages grandioses et dépassement de soi au programme.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Liste des événements */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
              <Mountain className="w-6 h-6 text-[#00b5e2]" /> Calendrier 2026
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Ces événements sont organisés par la Fédération Française de Cyclotourisme. Plusieurs membres du TOAC Cyclo y participent chaque année — rejoignez-nous !
            </p>
          </div>

          <div className="grid gap-6">
            {/* Alpes Sud - ANNULÉE */}
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-200 opacity-60">
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-500 line-through">Cyclomontagnarde des Alpes du Sud</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                    <Map className="w-4 h-4" /> Vaison-la-Romaine (84)
                  </div>
                </div>
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-sm">ANNULÉE</span>
              </div>
            </div>

            {/* Volcans */}
            <ActivityCard 
              title="Cyclomontagnarde des Volcans"
              date="30-31 Mai"
              location="Mozac (63)"
              distance="230 km"
              denivele="4400 m"
              details="Vulcania, Guéry, Croix Morand, Croix Saint-Robert, Geneste"
              link="https://puy-de-dome.ffvelo.fr/cmv/"
            />
            {/* Haute Savoie */}
            <ActivityCard 
              title="Cyclomontagnarde de Haute-Savoie"
              date="06-07 Juin"
              location="Annecy-le-Vieux (74)"
              distance="218 km"
              denivele="4318 m"
              details="Colombière, Romme, Joux Plane, Gêts"
              link="https://www.cyclomontagnarde-annecy.com/"
            />
            {/* Jura */}
            <ActivityCard 
              title="Cyclomontagnarde du Jura"
              date="20-21 Juin"
              location="Lons-le-Saunier (39)"
              distance="240 km"
              denivele="3990 m"
              details="Baume-les-Messieurs, Nanchez, Onoz, Saint-Amour"
              link="https://ffvelo.fr/evenements/cyclomontagnarde-du-jura-2026/"
            />
            {/* Vosges */}
            <ActivityCard 
              title="Cyclomontagnarde Vosges Alsace"
              date="27-28 Juin"
              location="Wihr-au-Val (68)"
              distance="204 km"
              denivele="4210 m"
              details="Breitfirst, Grosse Pierre, Calvaire, Labaroche"
              link="https://www.cmvalsace.fr/"
            />
            {/* Luchon-Bayonne */}
            <ActivityCard 
              title="Cyclomontagnarde Luchon-Bayonne"
              date="27-28 Juin"
              location="Luchon → Bayonne"
              distance="320 km"
              denivele="5257 m"
              details="Peyresourde, Aspin, Tourmalet, Soulor, Aubisque, Osquich"
              link="https://www.luchonbayonne.fr/"
            />
            {/* Pyrénées */}
            <ActivityCard 
              title="Cyclomontagnarde du Massif Pyrénéen"
              date="04-05 Juillet"
              location="Saint-Bertrand-de-Comminges (31)"
              distance="223 km"
              denivele="4208 m"
              details="Ares, Menté, Peyresourde, Val Louron Azet"
              link="https://ffvelo.fr/evenements/cyclomontagnarde-du-massif-pyreneen/"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

function ActivityCard({ title, date, location, distance, denivele, details, highlight, link }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border ${highlight ? 'border-[#00b5e2] ring-1 ring-[#00b5e2]' : 'border-gray-100'} hover:shadow-md transition-shadow`}>
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-4">
        <div>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-[#00205b] hover:text-[#00b5e2] transition-colors">
              {title} ↗
            </a>
          ) : (
            <h3 className="text-xl font-bold text-[#00205b]">{title}</h3>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Map className="w-4 h-4" /> {location}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="px-3 py-1 bg-[#00205b] text-white text-sm font-bold rounded-sm mb-1">{date}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 mb-4 text-sm font-bold text-gray-700">
        <span className="flex items-center gap-1"><Route className="w-4 h-4 text-gray-400" /> {distance}</span>
        <span className="flex items-center gap-1"><Mountain className="w-4 h-4 text-gray-400" /> {denivele} D+</span>
      </div>
      
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Cols :</span> {details}
      </p>
    </div>
  )
}

