import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ACTIVITIES = [
  { href: '/activites/gravel', title: 'Gravel & aventure', text: 'Chemins, bikepacking et grandes boucles' },
  { href: '/activites/longue-distance', title: 'Brevets & longue distance', text: 'Du 200 km à Paris-Brest-Paris' },
  { href: '/activites/cyclomontagnardes', title: 'Cyclomontagnardes', text: 'Les grands cols, de mai à juillet' },
]

const GENERAL = [
  { href: '/calendrier', title: 'Calendrier 2027', text: 'Tous les rendez-vous de la saison' },
  { href: '/rejoindre', title: 'Venir essayer le club', text: 'Une sortie d\'essai, sans engagement' },
  { href: '/adhesion', title: 'Adhésion et tarifs', text: 'Cotisation et licences' },
]

// Bloc « Voir aussi » en bas de page : relie les pages entre elles.
// group="activites" liste les autres activités ; group="general" les pages clés du site.
export default function SeeAlso({ group = 'general', current, dark = false }) {
  const list = (group === 'activites' ? ACTIVITIES : GENERAL).filter((i) => i.href !== current)
  const title = group === 'activites' ? 'Découvrir les autres activités' : 'Pour aller plus loin'

  return (
    <section aria-labelledby="see-also-title">
      <h2 id="see-also-title" className={`text-xl font-bold mb-4 ${dark ? 'text-white' : 'text-[#00205b]'}`}>{title}</h2>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`group flex h-full items-center justify-between gap-3 p-5 rounded-lg border hover:border-[#00b5e2] transition-all ${dark ? 'bg-white/5 border-white/15 hover:bg-white/10' : 'bg-white shadow-sm border-gray-100 hover:shadow-md'}`}
            >
              <span>
                <span className={`block font-bold ${dark ? 'text-white' : 'text-[#00205b]'}`}>{item.title}</span>
                <span className={`block text-sm mt-1 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>{item.text}</span>
              </span>
              <ArrowRight className="w-5 h-5 text-[#00b5e2] flex-shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
