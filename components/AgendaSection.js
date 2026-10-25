import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
import event from '@/data/featured-event.json'
import calendrier from '@/data/calendrier.json'
import Reveal from '@/components/Reveal'
import UntilDate from '@/components/UntilDate'
import Disclosure from '@/components/Disclosure'
import EventDetails from '@/components/EventDetails'
import SectionHeading from '@/components/SectionHeading'
import ElevationProfile from '@/components/ElevationProfile'

const detailsOf = (id) => calendrier.evenements.find((e) => e.id === id).details

// Une fois l'événement phare passé, on renvoie vers le calendrier.
const afterEvent = (
  <div className="max-w-2xl">
    <p className="text-lg text-gray-300 leading-relaxed">
      La {event.title} revient au printemps prochain. Retrouvez la date de la prochaine édition et les autres rendez-vous du club dans le calendrier du club.
    </p>
    <Link
      href="/club"
      className="mt-6 inline-flex items-center gap-2 px-7 py-3.5 bg-[#00b5e2] text-[#00205b] font-bold rounded-sm hover:bg-white transition-colors"
    >
      Voir le calendrier <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </Link>
  </div>
)

// Prochains rendez-vous : l'événement phare ouvert à tous, masqué automatiquement une fois passé.
export default function AgendaSection() {
  return (
    <div id="evenements">
      <div className="bg-white">
        <ElevationProfile fill="#00205b" className="-mb-px" />
      </div>
      <div className="bg-[#00205b] bg-grain text-white relative overflow-hidden pb-10 md:pb-14 pt-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-10 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <SectionHeading
              light
              eyebrow="À l'agenda"
              title="Prochains rendez-vous"
            />
          </Reveal>

          {/* Événement phare */}
          <UntilDate date={event.date} fallback={afterEvent}>
          <div id="rameaux-2027" className="scroll-mt-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <Reveal className="lg:w-1/2 space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Ouvert à tous · Cyclos extérieurs bienvenus
                </span>
              </div>
              <div>
                <h3 className="display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">{event.title}</h3>
                <p className="text-lg text-gray-300 font-light leading-relaxed">{event.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00b5e2] flex items-center justify-center text-[#00205b] flex-shrink-0">
                    <Calendar className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Date</div>
                    <div className="text-lg font-bold">{event.dateLabel}</div>
                    <div className="text-sm text-gray-300">{event.dateDetail}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Lieu</div>
                    <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-[#00b5e2] transition-colors">{event.locationLabel} ↗</a>
                    <div className="text-sm text-gray-300">{event.locationDetail}</div>
                  </div>
                </div>
              </div>

              <div>
                <Disclosure hashId="rameaux-2027" variant="solid" closedLabel="En savoir plus" openLabel="Masquer le détail">
                  <EventDetails dark single details={detailsOf('rameaux-2027')} className="border-t border-white/10 pt-6" />
                </Disclosure>
              </div>
            </Reveal>

            <Reveal className="lg:w-1/2 w-full" delay={150}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00b5e2] to-blue-600 opacity-20 blur-lg rounded-3xl group-hover:opacity-30 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    width={711}
                    height={614}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="w-full h-auto transform transition duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          </div>
          </UntilDate>
        </div>
      </div>
    </div>
  )
}
