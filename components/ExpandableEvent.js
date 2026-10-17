import Image from 'next/image'
import { Calendar, MapPin } from 'lucide-react'
import Disclosure from '@/components/Disclosure'
import EventDetails from '@/components/EventDetails'

// Carte d'événement de l'accueil (fond sombre) dont le détail se déplie sur place.
export default function ExpandableEvent({ id, item, details }) {
  return (
    <article id={id} className="scroll-mt-24 bg-white/5 border border-white/15 rounded-2xl overflow-hidden">
      <div className="grid sm:grid-cols-[16rem_1fr] md:grid-cols-[20rem_1fr]">
        <div className="relative h-44 sm:h-full min-h-[10rem]">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 768px) 20rem, (min-width: 640px) 16rem, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00b5e2] mb-2">{item.category}</p>
          <h3 className="display text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-300 mb-3">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#00b5e2]" aria-hidden="true" /> {item.date}</span>
            {item.location && (
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#00b5e2]" aria-hidden="true" /> {item.location}</span>
            )}
          </p>
          <p className="text-gray-300 leading-relaxed">{item.summary}</p>
        </div>
      </div>

      <Disclosure hashId={id} variant="bar" closedLabel="Voir le détail" openLabel="Masquer le détail">
        <EventDetails dark details={details} className="p-6 md:p-8 border-t border-white/15" />
      </Disclosure>
    </article>
  )
}
