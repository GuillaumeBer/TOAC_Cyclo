import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import activitiesData from '@/data/activities.json'
import Reveal from '@/components/Reveal'

// Aperçu visuel des activités : le détail est sur la page « Activités ».
export default function ActivitiesSection() {
  return (
    <div id="activites" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-6">
            <h2 className="display text-3xl sm:text-4xl font-bold text-[#00205b]">Nos activités</h2>
            <Link
              href="/activites"
              className="inline-flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-wider text-[#0077b6] hover:text-[#00205b] transition-colors"
            >
              Tout voir <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
          {activitiesData.map((activity, index) => (
            <li key={activity.title}>
              <Reveal delay={index * 100}>
                <Link
                  href={activity.link}
                  className="group relative block aspect-[16/6] sm:aspect-[4/3] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <Image
                    src={activity.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00205b]/90 via-[#00205b]/20 to-transparent"></div>
                  <h3 className="display absolute bottom-0 left-0 right-0 p-4 md:p-5 text-2xl md:text-3xl font-bold text-white">
                    {activity.title}
                  </h3>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
