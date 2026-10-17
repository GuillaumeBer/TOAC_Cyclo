import { Calendar, MapPin } from 'lucide-react'
import Disclosure from '@/components/Disclosure'
import EventDetails from '@/components/EventDetails'

// Carte d'événement du calendrier : le détail se déplie sur place.
export default function EventCard({ event }) {
  return (
    <article id={event.id} className="scroll-mt-24 bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#00b5e2]">
      <span className="inline-block px-2 py-0.5 bg-[#00205b] text-white text-xs font-bold uppercase tracking-wider rounded mb-3">{event.category}</span>
      <h3 className="text-xl font-bold text-[#00205b]">{event.title}</h3>
      <p className="flex items-center gap-2 text-gray-700 font-medium mt-2">
        <Calendar className="w-4 h-4 text-[#0077b6]" aria-hidden="true" /> {event.dateLabel}
      </p>
      <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
        <MapPin className="w-4 h-4 text-[#0077b6]" aria-hidden="true" /> {event.location}
      </p>
      {event.detail && <p className="text-sm text-gray-600 mt-2">{event.detail}</p>}

      <div className="mt-3">
        <Disclosure hashId={event.id} variant="link" closedLabel="Plus d'infos" openLabel="Masquer le détail">
          <EventDetails details={event.details} className="border-t border-gray-100 pt-5" />
        </Disclosure>
      </div>
    </article>
  )
}
