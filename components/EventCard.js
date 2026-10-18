import { Calendar, MapPin, Users, Lock, Compass } from 'lucide-react'
import Disclosure from '@/components/Disclosure'
import EventDetails from '@/components/EventDetails'

function EventBadge({ type, label }) {
  if (type === 'public') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        {label || 'Organisé par le club · Ouvert à tous'}
      </span>
    )
  }
  if (type === 'members') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 mb-3">
        <Lock className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
        {label || 'Organisé par le club · Réservé aux adhérents'}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-900 border border-sky-200 mb-3">
      <Compass className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
      {label || 'Épreuve extérieure · Participation du club'}
    </span>
  )
}

// Carte d'événement du calendrier : le détail se déplie sur place.
export default function EventCard({ event }) {
  return (
    <article id={event.id} className="scroll-mt-24 bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#00b5e2]">
      <EventBadge type={event.type} label={event.category} />
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
