import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ITEMS = [
  { href: '/calendrier', title: 'Calendrier 2027', text: 'Tous les rendez-vous de la saison' },
  { href: '/activites', title: 'Nos activités', text: 'Gravel, longue distance, cyclomontagnardes' },
  { href: '/rejoindre', title: 'Rejoindre le club', text: "Essai, adhésion et tarifs" },
]

// Bloc « Pour aller plus loin » en bas de page : relie les pages principales entre elles.
export default function SeeAlso({ current, dark = false }) {
  const list = ITEMS.filter((i) => i.href !== current)

  return (
    <section aria-labelledby="see-also-title">
      <h2 id="see-also-title" className={`text-xl font-bold mb-4 ${dark ? 'text-white' : 'text-[#00205b]'}`}>Pour aller plus loin</h2>
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
