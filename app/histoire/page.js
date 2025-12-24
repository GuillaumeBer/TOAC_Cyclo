'use client'
import Link from 'next/link'
import { ArrowLeft, Calendar, Users, Trophy, Heart, Bike } from 'lucide-react'

export default function HistoirePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00205b] to-[#001540]">
      {/* Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Notre Histoire
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
            Depuis 1976, le TOAC Cyclo rassemble les passionnés de vélo autour de valeurs 
            communes : convivialité, entraide et plaisir de rouler ensemble.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          
          {/* 1976 - Fondation */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/30">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[#00b5e2]"></div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-[#00b5e2] text-[#00205b] text-sm font-bold rounded">1976</div>
                <h2 className="text-2xl font-bold text-white">Fondation du Club</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                <strong className="text-white">André Lafarge</strong> fonde la section Cyclotourisme du TOAC 
                (Toulouse Olympique Aéronautique Club). Le club naît avec une philosophie claire : 
                pas de compétition, mais le <strong className="text-[#00b5e2]">plaisir de rouler ensemble</strong>.
              </p>
              <div className="flex items-center gap-2 text-[#00b5e2]">
                <Users className="w-5 h-5" />
                <span className="text-sm">Club du CSE d'Airbus Toulouse</span>
              </div>
            </div>
          </div>

          {/* Affiliation */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/30">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white/30"></div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-white/10 text-white text-sm font-bold rounded">Affiliations</div>
                <h2 className="text-2xl font-bold text-white">Double Affiliation</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Le club s'affilie à deux fédérations majeures de la randonnée cyclo en France :
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-lg font-bold text-white mb-1">FF Vélo</div>
                  <div className="text-sm text-gray-400">Fédération Française de Cyclotourisme</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-lg font-bold text-white mb-1">FSGT</div>
                  <div className="text-sm text-gray-400">Fédération Sportive et Gymnique du Travail</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2014 - Trophée */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/30">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-amber-500"></div>
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-amber-500 text-white text-sm font-bold rounded">2014</div>
                <h2 className="text-2xl font-bold text-white">Trophée André Lafarge</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                En hommage au fondateur, le club crée le <strong className="text-amber-400">Trophée André Lafarge</strong>, 
                décerné chaque année lors de la Randonnée des Rameaux au club le plus représenté.
              </p>
              <div className="flex items-center gap-2 text-amber-400">
                <Trophy className="w-5 h-5" />
                <span className="text-sm">Un symbole de convivialité et de rassemblement</span>
              </div>
            </div>
          </div>

          {/* Aujourd'hui */}
          <div className="relative pl-8 pb-12 border-l-2 border-[#00b5e2]/30">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-[#00b5e2]"></div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 ml-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-1 bg-[#00b5e2] text-[#00205b] text-sm font-bold rounded">Aujourd'hui</div>
                <h2 className="text-2xl font-bold text-white">Un Club Ouvert</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4">
                Le TOAC Cyclo accueille principalement des employés et retraités d'Airbus et leurs ayants droit, 
                mais le club reste <strong className="text-[#00b5e2]">ouvert aux personnes extérieures</strong> 
                (sous réserve d'approbation par le bureau).
              </p>
              <p className="text-gray-300 leading-relaxed">
                Nos <strong className="text-white">sorties club</strong> ont lieu le vendredi et les jours fériés. 
                Les <strong className="text-white">randonnées interclubs</strong> se déroulent le dimanche matin, de mi-février à fin octobre.
              </p>
            </div>
          </div>

          {/* Valeurs */}
          <div className="relative pl-8">
            <div className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 rounded-full bg-white"></div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6 ml-4">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#00b5e2]" /> Nos Valeurs
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {['Convivialité', 'Ténacité', 'Dépassement de soi', 'Entraide', 'Plaisir', 'Respect'].map((value) => (
                  <div key={value} className="flex items-center gap-3 text-gray-300">
                    <Bike className="w-5 h-5 text-[#00b5e2]" />
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
