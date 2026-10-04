import Link from 'next/link'
import { Bike, Users, Calendar, MapPin, ArrowRight, Gift } from 'lucide-react'
import sorties from '@/data/sorties.json'

const ICON_MAP = { Bike, Users }

export default function RidesSection() {
  return (
    <div id="sorties" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#00205b] mb-3">Nos sorties régulières</h2>
          <div className="h-1 w-16 bg-[#00b5e2] mb-4"></div>
          <p className="text-gray-600 max-w-2xl text-lg">
            Pas besoin d'être un champion : on roule à l'allure du groupe, tous niveaux, dans la bonne humeur.
            Venez essayer, on vous accueille.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {sorties.map((sortie) => {
            const Icon = ICON_MAP[sortie.iconName]
            return (
              <div
                key={sortie.title}
                className="bg-gray-50 p-6 lg:p-8 border-t-4 border-[#00205b] hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-gray-100">
                  <Icon className="w-6 h-6 text-[#00205b]" />
                </div>
                <h3 className="text-xl font-bold text-[#00205b] mb-2">{sortie.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{sortie.desc}</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-0.5 text-[#00b5e2] flex-shrink-0" /> {sortie.when}
                  </li>
                  <li className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-[#00b5e2] flex-shrink-0" /> {sortie.where}
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">{sortie.detail}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col lg:flex-row items-stretch gap-6">
          <div className="flex-1 flex items-start gap-4 bg-[#00b5e2]/10 border border-[#00b5e2]/40 rounded-lg p-6">
            <div className="w-12 h-12 rounded-full bg-[#00b5e2] flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-[#00205b]" />
            </div>
            <div>
              <h3 className="font-bold text-[#00205b] text-lg">Nouvelles adhérentes : cotisation club offerte</h3>
              <p className="text-sm text-gray-600 mt-1">
                La cotisation du club est gratuite la première année pour toutes les nouvelles adhérentes.
              </p>
            </div>
          </div>
          <Link
            href="/rejoindre"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00205b] text-white font-bold rounded-sm hover:bg-[#00b5e2] hover:text-[#00205b] transition-colors text-lg"
          >
            Venir essayer une sortie <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
