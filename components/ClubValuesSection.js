import { Users, Award, Shield } from 'lucide-react'

function InfoBlock({ title, icon: Icon, desc }) {
  return (
    <div className="bg-gray-50 p-8 border-t-4 border-[#00205b] hover:bg-white hover:shadow-lg transition-all duration-300 group">
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:border-[#00b5e2]">
        <Icon className="w-6 h-6 text-[#00205b]" />
      </div>
      <h3 className="text-lg font-bold text-[#00205b] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
    </div>
  )
}

export default function ClubValuesSection() {
  return (
    <div id="club" className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#00205b] mb-3">L'Esprit TOAC</h2>
        <div className="h-1 w-12 bg-[#00b5e2] mb-4"></div>
        <p className="text-gray-600 max-w-2xl">
          Plus qu'un club, une institution toulousaine où la performance rencontre la convivialité.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <InfoBlock 
          icon={Users} 
          title="Convivialité & Respect" 
          desc="Nos sorties dominicales sont sacrées. Pas de compétition, juste le plaisir de rouler ensemble. Le respect du code de la route et des autres usagers est notre priorité absolue." 
        />
        <InfoBlock 
          icon={Award} 
          title="Double Affiliation" 
          desc="Affilié FFCT pour la randonnée et FSGT pour le sport. Une structure solide qui vous permet de choisir la pratique qui vous correspond le mieux." 
        />
        <InfoBlock 
          icon={Shield} 
          title="Sécurité & Formation" 
          desc="Des capitaines de route formés, des rappels réguliers des règles de sécurité. Rouler au TOAC, c'est rouler l'esprit tranquille." 
        />
      </div>
    </div>
    </div>
  )
}
