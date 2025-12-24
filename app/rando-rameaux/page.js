'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Trophy, Users, Heart, ArrowLeft, Bike } from 'lucide-react'

export default function RandoRameauxPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00205b] to-[#001540]">
      {/* Header */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-start">
          <Link 
            href="/#evenements" 
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
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
            de convivialité au cœur des côteaux du Gers.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border-4 border-white/10 shadow-2xl bg-white">
            <Image 
              src="/images/rameaux-2026.jpg" 
              alt="Randonnée des Rameaux" 
              width={1200}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Infos pratiques */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#00b5e2] flex items-center justify-center text-[#00205b]">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Prochaine édition</div>
                  <div className="text-2xl font-bold text-white">Dimanche 29 Mars 2026</div>
                  <div className="text-gray-400">Départ à partir de 08h00</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Départ & Arrivée</div>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=TOAC+Omnisports+Toulouse" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-2xl font-bold text-white hover:text-[#00b5e2] transition-colors"
                  >
                    Complexe TOAC ↗
                  </a>
                  <div className="text-gray-400">Toulouse</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trophée André Lafarge */}
          <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-white shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">🏆 Trophée André Lafarge</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Créé en <strong className="text-white">2014</strong>, ce trophée rend hommage à <strong className="text-white">André Lafarge</strong>, 
                  fondateur de la section Cyclotourisme du TOAC en <strong className="text-white">1976</strong>.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Chaque année, il récompense le <strong className="text-[#00b5e2]">club le plus représenté</strong> lors 
                  de la Randonnée des Rameaux. Un symbole de l'esprit de convivialité et de rassemblement 
                  qui anime notre événement.
                </p>
              </div>
            </div>
          </div>

          {/* Les parcours */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Bike className="w-6 h-6 text-[#00b5e2]" /> Les Parcours
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Plusieurs circuits sont proposés pour s'adapter à tous les niveaux, vous permettant 
              de découvrir les magnifiques paysages vallonnés du Gers sur des routes peu fréquentées.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#00b5e2]">~50 km</div>
                <div className="text-gray-400 text-sm">Parcours découverte</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#00b5e2]">~80 km</div>
                <div className="text-gray-400 text-sm">Parcours intermédiaire</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-[#00b5e2]">~100+ km</div>
                <div className="text-gray-400 text-sm">Parcours sportif</div>
              </div>
            </div>
          </div>

          {/* Mobilisation */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#00b5e2]" /> Une Organisation Collective
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              La Randonnée des Rameaux est <strong className="text-white">le seul moment de l'année</strong> où 
              tous les membres du TOAC Cyclo sont sollicités pour l'organisation.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 text-gray-300">
                <Heart className="w-5 h-5 text-[#00b5e2]" />
                <span>Accueil des participants</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Heart className="w-5 h-5 text-[#00b5e2]" />
                <span>Ravitaillement</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Heart className="w-5 h-5 text-[#00b5e2]" />
                <span>Assistance technique</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8">
            <Link 
              href="/#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00b5e2] text-[#00205b] font-bold rounded-lg hover:bg-white transition-colors"
            >
              Nous contacter pour plus d'infos
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
