import { Calendar, MapPin, Bike, Home, Trophy, Users, ClipboardList, Route, ExternalLink } from 'lucide-react'

const ICONS = { Calendar, MapPin, Bike, Home, Trophy, Users, ClipboardList, Route }

// Liste des informations d'un événement (icône, intitulé, texte, lien externe éventuel).
export default function EventDetails({ details, dark = false, single = false, className = '' }) {
  const label = dark ? 'text-[#00b5e2]' : 'text-[#0077b6]'
  const text = dark ? 'text-gray-200' : 'text-gray-700'
  const icon = dark ? 'bg-[#00b5e2]/15 text-[#00b5e2]' : 'bg-[#00b5e2]/15 text-[#0077b6]'

  return (
    <ul className={`grid ${single ? '' : 'sm:grid-cols-2'} gap-x-8 gap-y-6 ${className}`}>
      {details.map((d) => {
        const Icon = ICONS[d.icon] || Calendar
        return (
          <li key={d.label} className="flex items-start gap-4">
            <span className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${icon}`}>
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${label}`}>{d.label}</p>
              <p className={`leading-relaxed ${text}`}>{d.text}</p>
              {d.link && (
                <a
                  href={d.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 mt-2 text-sm font-bold underline underline-offset-2 hover:no-underline ${dark ? 'text-white' : 'text-[#0077b6]'}`}
                >
                  {d.link.label} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
