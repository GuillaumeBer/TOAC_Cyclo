import Link from 'next/link'
import { Users, Award, Shield } from 'lucide-react'
import chiffres from '@/data/chiffres.json'

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
    <div id="club" className="bg-gradient-to-b from-white to-[#f2f4f7] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Titre de section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#00205b] mb-3">L'Esprit TOAC Cyclo</h2>
            <div className="h-1 w-16 bg-[#00b5e2]"></div>
            <p className="text-gray-600 max-w-2xl mt-4">
              Plus qu'un club, une institution toulousaine où l'accomplissement de défis rencontre la convivialité.
            </p>
          </div>
          <Link
            href="/histoire"
            className="hidden md:flex items-center px-6 py-3 bg-[#00205b] text-white font-bold rounded-sm hover:bg-[#00b5e2] transition-colors text-sm shadow-sm flex-shrink-0"
          >
            Découvrir notre histoire →
          </Link>
        </div>

        {/* Chiffres clés */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-12">
          {chiffres.map((c) => (
            <div key={c.label} className="bg-[#00205b] text-white rounded-lg p-5 md:p-6 text-center">
              <dt className="sr-only">{c.label}</dt>
              <dd>
                <span className="block text-3xl md:text-4xl font-extrabold text-[#00b5e2]">{c.value}</span>
                <span className="block text-xs md:text-sm text-gray-300 mt-2 leading-snug">{c.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* Valeurs du club */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-16">
          <InfoBlock
            icon={Users}
            title="Convivialité & Respect"
            desc="Nos sorties du vendredi, du dimanche matin et des jours fériés sont sacrées. Pas de compétition, juste le plaisir de rouler ensemble."
          />
          <InfoBlock
            icon={Award}
            title="Double Affiliation"
            desc="Affilié FF Vélo et FSGT, deux fédérations dédiées à la randonnée cyclo. Une structure solide pour tous."
          />
          <InfoBlock
            icon={Shield}
            title="Sécurité & Formation"
            desc="Les membres veillent les uns sur les autres pour assurer la sécurité de tous. Rouler au TOAC, c'est rouler serein."
          />
        </div>

        <div className="text-center mb-12 md:hidden">
          <Link
            href="/histoire"
            className="inline-flex items-center px-6 py-3 bg-[#00205b] text-white font-bold rounded-sm hover:bg-[#00b5e2] transition-colors text-sm shadow-sm"
          >
            Découvrir notre histoire →
          </Link>
        </div>

      </div>
    </div>
  )
}
