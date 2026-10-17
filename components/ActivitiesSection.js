import Link from 'next/link'
import Image from 'next/image'
import activitiesData from '@/data/activities.json'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'

// Aperçu visuel des activités : le détail est sur la page « Activités ».
export default function ActivitiesSection() {
  return (
    <div id="activites" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Plus loin, plus haut" title="Nos activités" text="Gravel, longue distance, cyclomontagnardes : trois façons de se dépasser, à son rythme." />
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
