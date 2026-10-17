import Link from 'next/link'
import { ArrowLeft, Mountain, Map, Route, Calendar } from 'lucide-react'
import SeeAlso from '@/components/SeeAlso'

export const metadata = {
  title: 'Cyclomontagnardes',
  description: 'Les cyclomontagnardes auxquelles participent les cyclos du TOAC : Alpes, Pyrénées, Vosges et Jura.',
}

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
            Cyclomontagnardes
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
              <Mountain className="w-6 h-6 text-[#00b5e2]" /> Calendrier 2027
            </h2>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Ces événements sont organisés par la Fédération Française de Cyclotourisme. Plusieurs membres du TOAC Cyclo y participent chaque année — rejoignez-nous !
            </p>
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-md text-blue-900 text-sm ">
              <Calendar className="w-5 h-5 text-[#00b5e2] flex-shrink-0 mt-0.5" />
              <p>
                <strong>Calendrier 2027 à venir :</strong> les dates de la prochaine saison seront ajoutées dès que les organisateurs les auront publiées.
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            <ActivityCard
              title="Cyclomontagnarde des Volcans"
              location="Mozac (63)"
              link="https://puy-de-dome.ffvelo.fr/cmv/"
            />
            <ActivityCard
              title="Cyclomontagnarde de Haute-Savoie"
              location="Annecy-le-Vieux (74)"
              link="https://www.cyclomontagnarde-annecy.com/"
            />
            <ActivityCard
              title="Cyclomontagnarde du Jura"
              location="Lons-le-Saunier (39)"
              link="https://ffvelo.fr/"
            />
            <ActivityCard
              title="Cyclomontagnarde Vosges Alsace"
              location="Wihr-au-Val (68)"
            />
            <ActivityCard
              title="Cyclomontagnarde Luchon-Bayonne"
              location="Luchon → Bayonne"
              link="https://www.luchonbayonne.fr/"
            />
            <ActivityCard
              title="Cyclomontagnarde du Massif Pyrénéen"
              location="Saint-Bertrand-de-Comminges (31)"
              link="https://ffvelo.fr/evenements/cyclomontagnarde-du-massif-pyreneen/"
            />
          </div>
        </div>

        <SeeAlso group="activites" current="/activites/cyclomontagnardes" />


      </div>
    </div>
  )
}

function ActivityCard({ title, location, link }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        <div>
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-[#00205b] hover:text-[#0077b6] transition-colors">
              {title} ↗
            </a>
          ) : (
            <span className="text-xl font-bold text-[#00205b]">{title}</span>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <Map className="w-4 h-4" /> {location}
          </div>
        </div>
        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-sm self-start">Dates à venir</span>
      </div>
    </div>
  )
}
