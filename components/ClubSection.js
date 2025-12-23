import Image from 'next/image'
import { Users, Award, Shield, Quote } from 'lucide-react'

function InfoBlock({ title, icon: Icon, desc }) {
  return (
    <div className="bg-gray-50 p-6 lg:p-8 border-t-4 border-[#00205b] hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100 group-hover:border-[#00b5e2]">
        <Icon className="w-6 h-6 text-[#00205b]" />
      </div>
      <h3 className="text-lg font-bold text-[#00205b] mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}

export default function ClubSection() {
  return (
    <div id="club" className="bg-gradient-to-b from-white to-[#f2f4f7] pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#00205b] mb-3">L'Esprit TOAC</h2>
          <div className="h-1 w-16 bg-[#00b5e2] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Plus qu'un club, une institution toulousaine où la performance rencontre la convivialité.
          </p>
        </div>

        {/* Valeurs du club */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-16">
          <InfoBlock 
            icon={Users} 
            title="Convivialité & Respect" 
            desc="Nos sorties dominicales sont sacrées. Pas de compétition, juste le plaisir de rouler ensemble." 
          />
          <InfoBlock 
            icon={Award} 
            title="Double Affiliation" 
            desc="Affilié FFCT pour la randonnée et FSGT pour le sport. Une structure solide pour tous." 
          />
          <InfoBlock 
            icon={Shield} 
            title="Sécurité & Formation" 
            desc="Des capitaines de route formés, des rappels réguliers. Rouler au TOAC, c'est rouler serein." 
          />
        </div>

        {/* Mot du Président */}
        <div className="bg-white rounded-sm shadow-lg p-8 lg:p-12 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
            <div className="md:w-1/4 text-center flex-shrink-0">
              <div className="inline-block p-1 border border-gray-300 mb-4 bg-white">
                <Image 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Président du club" 
                  width={160}
                  height={160}
                  className="w-40 h-40 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <h3 className="text-xl font-bold text-[#00205b]">Alain D.</h3>
              <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Président</p>
            </div>
            <div className="md:w-3/4 relative">
              <Quote className="absolute -top-4 -left-4 w-10 h-10 text-[#00b5e2] opacity-20" />
              <h3 className="text-xl md:text-2xl font-light text-[#00205b] mb-4 leading-relaxed italic">
                "Notre section continue de grandir avec toujours la même philosophie : <span className="font-bold">le plaisir de rouler ensemble</span>. Cette saison 2025 s'annonce riche en défis !"
              </h3>
              <button className="text-[#00205b] font-bold border-b-2 border-[#00b5e2] pb-1 hover:text-[#00b5e2] transition-colors uppercase text-sm tracking-wide">
                Lire l'édito complet
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
