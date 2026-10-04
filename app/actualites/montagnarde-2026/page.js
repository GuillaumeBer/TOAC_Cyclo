'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Bike, Home, Clock, Users } from 'lucide-react'

export default function Montagnarde2026Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/montagnarde.jpg"
            alt="Paysage Cantal"
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
            Séjour Club · Édition terminée
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Montagnarde 2026 : Direction le Cantal !
          </h1>

          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#00b5e2]" />
              <span>14-17 Mai 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#00b5e2]" />
              <span>Maurs (15), Domaine La Châtaigneraie</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Colonne principale */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#00205b] mb-4">Le Séjour</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pour l'édition 2026, le TOAC Cyclo met le cap sur le Cantal ! Nous serons basés à
                <strong className="text-[#00205b]"> Maurs (15600)</strong>, surnommée "La Nice du Cantal",
                située idéalement à la jonction de la Dordogne et de l'Aveyron.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Ce séjour est l'occasion idéale de partager des moments conviviaux tout en découvrant
                de nouvelles routes dans un cadre magnifique.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#00205b] mb-4 flex items-center gap-2">
                <Bike className="w-6 h-6 text-[#00b5e2]" /> Au Programme
              </h2>
              <ul className="space-y-4 text-gray-600 leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2.5"></span>
                  <span><strong>Jeudi 14 mai :</strong> Arrivée avant le déjeuner, installation et première sortie l'après-midi.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2.5"></span>
                  <span><strong>Vendredi & Samedi :</strong> Randonnées à la journée (pique-nique ou restaurant selon météo).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2.5"></span>
                  <span><strong>Dimanche 17 mai :</strong> Sortie le matin, déjeuner au centre et retour sur Toulouse.</span>
                </li>
              </ul>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-bold text-[#00205b] mb-2">Les Parcours</h3>
                <p className="text-sm text-gray-600">
                  Des circuits adaptés seront proposés : brevets BPF pour les chasseurs de tampons,
                  et parcours plus sportifs avec du dénivelé. Le relief du sud Cantal est vallonné ("casse-pattes")
                  sans être de la haute montagne.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-[#00205b] mb-4 flex items-center gap-2">
                <Home className="w-6 h-6 text-[#00b5e2]" /> Hébergement
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous logerons au <a href="https://www.vacances-chataigneraie.com/" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline">Domaine La Châtaigneraie</a>, un village de vacances 4 étoiles.
              </p>
              <ul className="grid sm:grid-cols-2 gap-4">
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#00b5e2]"></div> Chambres ou gîtes
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#00b5e2]"></div> Piscine couverte/chauffée
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#00b5e2]"></div> Restauration sur place
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#00b5e2]"></div> Cadre verdoyant
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 sticky top-24">
              <h3 className="font-bold text-[#00205b] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#00b5e2]" /> Infos Pratiques
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Accès</div>
                  <p className="text-gray-600 text-sm">
                    ~204 km de Toulouse<br />
                    2h30 via A20<br />
                    ou 184 km par routes secondaires
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Domaine+La+Châtaigneraie+Maurs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[#00b5e2] hover:underline flex items-center gap-1 mt-2"
                  >
                    Voir sur Google Maps ↗
                  </a>
                </div>

                <div>
                  <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Repas</div>
                  <p className="text-gray-600 text-sm">
                    Pension complète du déjeuner du jeudi au déjeuner du dimanche.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 mb-2">📧 Contact :</p>
                  <a
                    href="mailto:contact@toac-cyclo.com?subject=[montagnarde 2026]"
                    className="block w-full py-3 bg-[#00b5e2] text-[#00205b] font-bold text-center rounded-sm hover:bg-[#009bc2] transition-colors"
                  >
                    Contacter le bureau du TOAC cyclo
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
