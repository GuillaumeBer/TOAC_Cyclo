import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Bike, Home, Mail } from 'lucide-react'

export const metadata = {
  title: 'Montagnarde 2027 : à vos agendas',
  description: "Le séjour annuel du TOAC Cyclo aura lieu pendant le week-end de l'Ascension 2027. Lieu et programme à venir.",
  openGraph: { images: ['/images/montagnarde.jpg'] },
}

export default function Montagnarde2027Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/montagnarde.jpg"
            alt="Les cyclos du TOAC en séjour"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00205b] to-[#00205b]/80"></div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link
            href="/#actualites"
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b5e2]/20 border border-[#00b5e2] rounded-sm text-[#00b5e2] text-xs font-bold uppercase tracking-widest mb-6">
            Séjour Club · Programme à venir
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Montagnarde 2027 : à vos agendas !
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#00b5e2]" />
              <span>Week-end de l'Ascension 2027 (à partir du jeudi 6 mai)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00b5e2]" />
              <span>Destination à définir</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-[#00b5e2]">
          <h2 className="text-2xl font-bold text-[#00205b] mb-4">Le Séjour</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Chaque année, le TOAC Cyclo se retrouve pendant le week-end de l'Ascension pour quelques jours de vélo
            et de convivialité dans une nouvelle région. Pour l'édition 2027, la destination et le programme
            seront annoncés prochainement sur cette page.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Réservez dès maintenant votre week-end : le séjour débutera le jeudi 6 mai 2027.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-[#00205b] mb-2 flex items-center gap-2">
              <Bike className="w-5 h-5 text-[#00b5e2]" /> Au programme
            </h3>
            <p className="text-sm text-gray-600">
              Randonnées à la journée pour tous les niveaux, avec des circuits plus sportifs pour ceux qui le souhaitent.
              Détails à venir.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="font-bold text-[#00205b] mb-2 flex items-center gap-2">
              <Home className="w-5 h-5 text-[#00b5e2]" /> Hébergement
            </h3>
            <p className="text-sm text-gray-600">
              Le lieu d'hébergement sera communiqué avec la destination.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 text-center">
          <p className="text-gray-600 mb-4">Une question, une idée de destination ?</p>
          <a
            href="mailto:toac.cyclo@gmail.com?subject=[montagnarde 2027]"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00b5e2] text-[#00205b] font-bold rounded-sm hover:bg-[#009bc2] transition-colors"
          >
            <Mail className="w-5 h-5" /> Contacter le bureau du TOAC Cyclo
          </a>
        </div>
      </div>
    </div>
  )
}
