import Link from 'next/link'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import sortiesWeekend from '@/data/sorties-weekend.json'
import { upcomingSorties } from '@/lib/sorties-seo'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'

// Aperçu des prochaines sorties autour de Toulouse, calculé à chaque build (l'agent republie chaque semaine).
export default function NextWeekendRides() {
  const next = upcomingSorties(sortiesWeekend.sorties).filter((s) => s.fiabilite === 'confirmee').slice(0, 3)
  if (next.length === 0) return null

  return (
    <div className="bg-[#f2f4f7] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="À venir autour de Toulouse"
            title="Les prochaines sorties vélo"
            text="Randonnées ouvertes à tous organisées par les clubs de la région, mises à jour chaque semaine. Le TOAC Cyclo ne participe pas à toutes."
          />
        </Reveal>
        <ul className="grid md:grid-cols-3 gap-6">
          {next.map((s) => (
            <li key={s.id} className="bg-white rounded-xl border border-[#00205b]/10 p-6">
              <h3 className="font-bold text-[#00205b] text-xl mb-3">{s.titre}</h3>
              <p className="flex items-start gap-3 text-sm text-gray-800 mb-2">
                <Calendar className="w-5 h-5 text-[#0077b6] flex-shrink-0" aria-hidden="true" />
                <span>{s.date_label}{s.heure_rdv ? ` à ${s.heure_rdv}` : ''}</span>
              </p>
              <p className="flex items-start gap-3 text-sm text-gray-800">
                <MapPin className="w-5 h-5 text-[#0077b6] flex-shrink-0" aria-hidden="true" />
                <span>{s.lieu_depart}{s.organisateur ? ` · ${s.organisateur}` : ''}</span>
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="/sorties"
          data-umami-event="clic_sorties_weekend_accueil"
          className="mt-8 inline-flex items-center gap-1.5 font-bold text-[#0077b6] hover:text-[#00205b] transition-colors"
        >
          Voir toutes les sorties à venir <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
