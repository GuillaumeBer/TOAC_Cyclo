import PageHeader from '@/components/PageHeader'
import Image from 'next/image'
import { Users, Trophy, Heart, Bike } from 'lucide-react'

export const metadata = {
  title: 'Notre histoire depuis 1976',
  description: "Fondé en 1976 par André Lafarge, découvrez l'histoire de la section cyclotourisme du TOAC à Toulouse (Trophée André Lafarge, affiliations FFVélo et FSGT).",
  alternates: {
    canonical: '/histoire',
  },
}

export default function HistoirePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PageHeader
        title="Notre histoire"
        breadcrumb={[{ name: 'Notre histoire' }]}
        intro="Depuis 1976, le TOAC Cyclo rassemble les passionnés de vélo autour de valeurs communes : convivialité, entraide et plaisir de rouler ensemble."
      />

      {/* Timeline */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-[76rem] mx-auto [&>*]:max-w-4xl">

          {/* 1976 - Fondation */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/40">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[#00b5e2]"></div>
            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-[#00b5e2] text-[#00205b] text-sm font-bold rounded">1976</div>
                <h2 className="text-2xl font-bold text-[#00205b]">Fondation du club</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                <strong className="text-[#00205b]">André Lafarge</strong> fonde la section Cyclotourisme du TOAC
                (Toulouse Olympique Aéronautique Club). Le club naît avec une philosophie claire :
                pas de compétition, mais le <strong className="text-[#0077b6]">plaisir de rouler ensemble</strong>.
              </p>
              <div className="flex items-center gap-2 text-[#0077b6]">
                <Users className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm">Club du CSE d'Airbus Toulouse</span>
              </div>
            </div>
          </div>

          {/* Affiliation */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/40">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-gray-300"></div>
            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-gray-100 text-[#00205b] text-sm font-bold rounded">Affiliations</div>
                <h2 className="text-2xl font-bold text-[#00205b]">Double affiliation</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le club s'affilie à deux fédérations majeures de la randonnée cyclo en France :
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="text-lg font-bold text-[#00205b] mb-1">FF Vélo</div>
                  <div className="text-sm text-gray-500">Fédération Française de Cyclotourisme</div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                  <div className="text-lg font-bold text-[#00205b] mb-1">FSGT</div>
                  <div className="text-sm text-gray-500">Fédération Sportive et Gymnique du Travail</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2014 - Trophée */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/40">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-amber-500"></div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-amber-400 text-[#00205b] text-sm font-bold rounded">2014</div>
                <h2 className="text-2xl font-bold text-[#00205b]">Trophée André Lafarge</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                En hommage au fondateur, le club crée le <strong className="text-amber-700">Trophée André Lafarge</strong>,
                décerné chaque année lors de la Randonnée des Rameaux au club le plus représenté.
              </p>
              <div className="flex items-center gap-2 text-amber-700">
                <Trophy className="w-5 h-5" aria-hidden="true" />
                <span className="text-sm">Un symbole de convivialité et de rassemblement</span>
              </div>
            </div>
          </div>

          {/* Aujourd'hui */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/40">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[#00b5e2]"></div>
            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-[#00b5e2] text-[#00205b] text-sm font-bold rounded">Aujourd'hui</div>
                <h2 className="text-2xl font-bold text-[#00205b]">Un club ouvert</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Le TOAC Cyclo accueille les salariés, retraités et ayants droit d'Airbus,
                mais le club est aussi <strong className="text-[#0077b6]">ouvert aux personnes extérieures</strong>,
                avec une cotisation différente.
              </p>
              <div className="mt-4 relative h-64 md:h-96 rounded-lg overflow-hidden shadow-sm mb-4">
                <Image
                  src="/images/TOAC2.jpg"
                  alt="Le Club TOAC aujourd'hui"
                  fill
                  sizes="(min-width: 896px) 840px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-gray-600 leading-relaxed">
                Nos <strong className="text-[#00205b]">sorties club</strong> ont lieu le vendredi et les jours fériés.
                Les <strong className="text-[#00205b]">randonnées interclubs</strong> se déroulent le dimanche matin, de mi-février à fin octobre.
              </p>
            </div>
          </div>

          {/* Valeurs */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[#00205b]"></div>
            <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-6 ml-4">
              <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#0077b6]" aria-hidden="true" /> Nos valeurs
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {['Convivialité', 'Ténacité', 'Dépassement de soi', 'Entraide', 'Plaisir', 'Respect'].map((value) => (
                  <div key={value} className="flex items-center gap-3 text-gray-600">
                    <Bike className="w-5 h-5 text-[#0077b6]" aria-hidden="true" />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
