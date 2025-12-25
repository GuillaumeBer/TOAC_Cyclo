'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mountain, Map, Bike } from 'lucide-react'

// Images placeholders que l'utilisateur pourra remplacer
import activitiesData from '@/data/activities.json'

const ICON_MAP = {
  Bike: Bike,
  Map: Map,
  Mountain: Mountain
}

const ACTIVITIES = activitiesData.map(activity => ({
  ...activity,
  icon: ICON_MAP[activity.iconName]
}))

export default function ActivitiesSection() {
  return (
    <div id="activites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#00205b] mb-4">Nos Activités</h2>
          <div className="h-1 w-20 bg-[#00b5e2] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Au-delà des sorties club hebdomadaires, le TOAC Cyclo vous propose des défis variés pour tous les goûts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ACTIVITIES.map((activity, index) => (
            <Link
              href={activity.link}
              key={index}
              className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
            >
              {/* Background Image (Placeholder gradient if no image) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${activity.color}`}>
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white z-10">
                <div className="mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4">
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
                  <p className="text-gray-100 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {activity.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 translate-y-4 group-hover:translate-y-0">
                  Découvrir <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
