import { Calendar, MapPin } from 'lucide-react'
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
            text="Pas besoin d'être un champion : on roule à l'allure du groupe, dans la bonne humeur. Le club est ouvert à tous, salariés Airbus ou non. Pour aller plus loin, il propose aussi du gravel, des brevets longue distance et des cyclomontagnardes."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {sorties.map((sortie, i) => (
            <Reveal key={sortie.title} delay={i * 120}>
              <article className="group relative h-full overflow-hidden rounded-2xl bg-[#f2f4f7] border border-[#00205b]/10 text-[#00205b] p-7 lg:p-8">
                <span
                  className="display absolute -right-2 -top-4 text-[8rem] font-bold text-[#00205b]/[0.06] select-none pointer-events-none group-hover:text-[#00b5e2]/20 transition-colors duration-500"
                  aria-hidden="true"
                >
                  {sortie.badge}
                </span>
                <div className="relative">
                  <h3 className="display text-3xl font-bold mb-3">{sortie.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{sortie.desc}</p>
                  <ul className="space-y-3 text-sm text-gray-800">
                    <li className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 mt-0.5 text-[#0077b6] flex-shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">Quand : </span>{sortie.when}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 mt-0.5 text-[#0077b6] flex-shrink-0" aria-hidden="true" />
                      <span><span className="sr-only">Où : </span>{sortie.where}</span>
                    </li>
                  </ul>
                  {sortie.detail && <p className="text-xs text-gray-600 mt-4">{sortie.detail}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
