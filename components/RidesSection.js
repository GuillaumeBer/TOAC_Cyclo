import Link from 'next/link'
import { Calendar, MapPin, ArrowRight, Gift } from 'lucide-react'
import sorties from '@/data/sorties.json'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'

export default function RidesSection() {
  return (
    <div id="sorties" className="bg-white pt-10 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Rouler avec nous"
            title="Nos sorties régulières"
            text="Pas besoin d'être un champion : on roule à l'allure du groupe, tous niveaux, dans la bonne humeur. Le club est ouvert à tous, salariés Airbus ou non."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {sorties.map((sortie, i) => (
            <Reveal key={sortie.title} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-2xl bg-[#00205b] text-white p-7 lg:p-9">
                <span
                  className="display absolute -right-3 -top-6 text-[9rem] lg:text-[11rem] font-bold text-white/[0.07] select-none pointer-events-none group-hover:text-[#00b5e2]/20 transition-colors duration-500"
                  aria-hidden="true"
                >
                  {sortie.badge}
                </span>
                <div className="relative">
                  <h3 className="display text-3xl lg:text-4xl font-bold mb-3">{sortie.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6 max-w-md">{sortie.desc}</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 mt-0.5 text-[#00b5e2] flex-shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">Quand : </span>{sortie.when}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 text-[#00b5e2] flex-shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">Où : </span>{sortie.where}</span>
                    </li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-4">{sortie.detail}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-4">
            <div className="flex-1 flex items-center gap-4 bg-[#fcd34d]/25 border border-[#fcd34d] rounded-2xl p-5 md:p-6">
              <div className="w-12 h-12 rounded-full bg-[#fcd34d] flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-[#00205b]" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-[#00205b] text-lg">Nouvelles adhérentes : cotisation club offerte</h3>
                <p className="text-sm text-gray-700 mt-1">
                  La cotisation du club est gratuite la première année pour toutes les nouvelles adhérentes.
                </p>
              </div>
            </div>
            <Link
              href="/rejoindre"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-2xl transition-colors text-lg shadow-sm"
            >
              Venir essayer une sortie <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
