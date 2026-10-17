import Link from 'next/link'
import { Users, Award, Shield } from 'lucide-react'
import chiffres from '@/data/chiffres.json'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'

const VALEURS = [
  {
    icon: Users,
    title: 'Convivialité & respect',
    desc: 'Nos sorties du vendredi, du dimanche matin et des jours fériés sont sacrées. Pas de compétition, juste le plaisir de rouler ensemble.',
  },
  {
    icon: Award,
    title: 'Double affiliation',
    desc: 'Affilié FF Vélo et FSGT, deux fédérations dédiées à la randonnée cyclo. Une structure solide pour tous.',
  },
  {
    icon: Shield,
    title: 'Sécurité & formation',
    desc: "Les membres veillent les uns sur les autres pour assurer la sécurité de tous. Rouler au TOAC, c'est rouler serein.",
  },
]

export default function ClubSection() {
  return (
    <div id="club" className="bg-[#f2f4f7] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Reveal>
          <SectionHeading
            eyebrow="Le club"
            title="L'esprit TOAC Cyclo"
            text="Plus qu'un club, une institution toulousaine où l'accomplissement de défis rencontre la convivialité."
            action={
              <Link
                href="/histoire"
                className="inline-flex items-center px-6 py-3 bg-[#00205b] text-white font-bold rounded-sm hover:bg-[#00b5e2] hover:text-[#00205b] transition-colors text-sm shadow-sm flex-shrink-0 self-start md:self-auto"
              >
                Découvrir notre histoire →
              </Link>
            }
          />
        </Reveal>

        {/* Chiffres clés */}
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-4 mb-14 md:mb-20 border-y border-[#00205b]/15">
            {chiffres.map((c, i) => (
              <div
                key={c.label}
                className={`py-8 px-4 md:px-6 text-center lg:text-left ${i > 0 ? 'lg:border-l border-[#00205b]/15' : ''} ${i % 2 === 1 ? 'border-l lg:border-l border-[#00205b]/15' : ''}`}
              >
                <dt className="sr-only">{c.label}</dt>
                <dd>
                  <span className="display block text-6xl md:text-7xl font-bold text-[#00205b]">{c.value}</span>
                  <span className="block text-sm text-gray-600 mt-3 leading-snug max-w-[16rem] mx-auto lg:mx-0">{c.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Valeurs du club */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-14 mb-14">
          {VALEURS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="w-14 h-14 rounded-full bg-[#00205b] text-[#00b5e2] flex items-center justify-center mb-5">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="display text-2xl font-bold text-[#00205b] mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/rejoindre#adhesion"
              className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-[#00205b] text-[#00205b] font-bold rounded-sm hover:bg-[#00205b] hover:text-white transition-colors"
            >
              Adhésion et tarifs →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
