import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, ArrowRight, Repeat } from 'lucide-react'
import calendrier from '@/data/calendrier.json'

export const metadata = {
  title: 'Calendrier 2027',
  description: "Les grands rendez-vous du TOAC Cyclo en 2027 : Randonnée des Rameaux, Montagnarde, Paris-Brest-Paris et rendez-vous annuels du club.",
}

export default function CalendrierPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Calendrier 2027</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Les grands rendez-vous du club et de la saison.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        <section>
          <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#00b5e2]" /> Dates à retenir
          </h2>
          <div className="space-y-4">
            {calendrier.evenements.map((e) => (
              <Link
                key={e.id}
                href={e.link}
                className="group block bg-white rounded-lg shadow-sm p-6 border-l-4 border-[#00b5e2] hover:shadow-md transition-shadow"
              >
                <span className="inline-block px-2 py-0.5 bg-[#00205b] text-white text-xs font-bold uppercase tracking-wider rounded mb-3">{e.category}</span>
                <h3 className="text-xl font-bold text-[#00205b] group-hover:text-[#0077b6] transition-colors">{e.title}</h3>
                <p className="flex items-center gap-2 text-gray-700 font-medium mt-2">
                  <Calendar className="w-4 h-4 text-[#00b5e2]" /> {e.dateLabel}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 text-[#00b5e2]" /> {e.location}
                </p>
                <p className="text-sm text-gray-600 mt-2">{e.detail}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-[#00205b] mt-4 group-hover:text-[#0077b6] transition-colors">
                  Plus d'infos <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Repeat className="w-6 h-6 text-[#00b5e2]" /> Rendez-vous annuels
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {calendrier.rendezVousAnnuels.map((r) => {
              const content = (
                <>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0077b6] mb-1">{r.when}</p>
                  <h3 className="font-bold text-[#00205b]">{r.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{r.detail}</p>
                </>
              )
              const cls = 'block bg-white rounded-lg shadow-sm p-5 border border-gray-100'
              return r.link ? (
                <Link key={r.title} href={r.link} className={`${cls} hover:shadow-md transition-shadow`}>{content}</Link>
              ) : (
                <div key={r.title} className={cls}>{content}</div>
              )
            })}
          </div>
        </section>

        <section className="bg-[#00205b] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Envie de nous rejoindre ?</h2>
          <p className="text-gray-300 mb-6">Venez essayer une sortie avant de vous décider.</p>
          <Link
            href="/rejoindre"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors"
          >
            Venir essayer <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </div>
    </div>
  )
}
