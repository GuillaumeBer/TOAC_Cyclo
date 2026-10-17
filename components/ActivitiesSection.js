import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mountain, Map, Bike } from 'lucide-react'
import activitiesData from '@/data/activities.json'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'

const ICON_MAP = { Bike, Map, Mountain }

const ACTIVITIES = activitiesData.map((activity) => ({
  ...activity,
  icon: ICON_MAP[activity.iconName],
}))

export default function ActivitiesSection() {
  return (
    <div id="activites" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Plus loin, plus haut"
            title="Nos activités"
            text="Au-delà des sorties club hebdomadaires, le TOAC Cyclo vous propose des défis variés pour tous les goûts."
          />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {ACTIVITIES.map((activity, index) => (
            <Reveal key={activity.title} delay={index * 120}>
              <Link
                href={activity.link}
                className="group relative h-[28rem] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 block"
              >
                <Image
                  src={activity.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00205b] via-[#00205b]/50 to-transparent"></div>

                <span className="display absolute top-5 right-6 text-7xl font-bold text-white/25" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="absolute inset-0 p-7 flex flex-col justify-end text-white z-10">
                  <div className="w-12 h-12 bg-[#00b5e2] text-[#00205b] rounded-lg flex items-center justify-center mb-4">
                    <activity.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="display text-3xl font-bold mb-3">{activity.title}</h3>
                  <p className="text-gray-100 leading-relaxed mb-5">{activity.desc}</p>
                  <span className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-[#fcd34d]">
                    Découvrir <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
