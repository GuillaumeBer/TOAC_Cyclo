import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ElevationProfile from '@/components/ElevationProfile'

export default function HeroSection() {
  return (
    <div id="top" className="relative bg-[#00205b] overflow-hidden">
      <div className="relative min-h-[92vh] sm:min-h-[95vh] flex flex-col justify-between md:justify-center pt-24 sm:pt-28 md:pt-24 pb-6 sm:pb-8 md:pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-toac.jpg"
            alt="Équipe TOAC Cyclotourisme"
            fill
            className="object-cover object-[62%_center] sm:object-[62%_bottom] md:object-[70%_center]"
            priority
            sizes="100vw"
          />
          {/* Dégradé mobile : haut et bas sombres pour le texte et le bouton, milieu transparent pour les cyclistes */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#00205b]/90 via-[#00205b]/20 to-[#00205b]/90 md:hidden" />
          {/* Dégradé desktop : de gauche à droite pour une lisibilité parfaite à gauche et la photo visible à droite */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#00205b]/95 via-[#00205b]/60 to-transparent" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-[#00205b]/80 via-transparent to-transparent" />
        </div>

        {/* Zone Titre & Description (Sur mobile : calé dans la fougère en haut ; Sur desktop : centré à gauche) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 sm:pt-6 md:pt-0">
          <div className="max-w-4xl animate-fade-in-up">
            <p className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#89d3e8] mb-2 sm:mb-5">
              <span className="h-px w-6 sm:w-10 bg-[#89d3e8]" aria-hidden="true" />
              Cyclotourisme · Toulouse · depuis 1976
            </p>
            <h1 className="display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] font-bold text-white tracking-tight leading-[1.05]">
              Roulez avec <span className="text-[#00b5e2]">le TOAC</span> Cyclo
            </h1>
            <p className="mt-2 sm:mt-5 text-sm sm:text-lg md:text-2xl text-gray-100 font-light leading-snug sm:leading-relaxed max-w-2xl">
              Sorties conviviales, tous niveaux, sans compétition. Venez essayer, on vous accueille.
            </p>

            {/* Bouton sur grand écran (regroupé avec le texte à gauche) */}
            <div className="hidden md:flex mt-8 flex-row gap-4">
              <Link
                href="/rejoindre"
                className="px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-all flex items-center justify-center gap-2 text-lg shadow-xl hover:shadow-2xl active:scale-95"
              >
                Venir essayer <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="hidden md:block mt-10">
              <p className="text-xs text-gray-300 italic">
                « Des tours de quoi ? Des tours d'vélo pardi ! »{' '}
                <a
                  href="https://www.youtube.com/watch?v=WizGTZtjgvo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline-offset-2 hover:underline"
                >
                  — Bourvil, « A bicyclette »
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Zone Basse sur MOBILE uniquement (bouton et citation en bas pour laisser les cyclistes au milieu) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-4 sm:pb-6 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/rejoindre"
              className="w-full px-6 py-3.5 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-all flex items-center justify-center gap-2 text-base shadow-xl active:scale-95"
            >
              Venir essayer <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-3 text-center">
            <p className="text-[11px] text-gray-300 italic">
              « Des tours de quoi ? Des tours d'vélo pardi ! » — Bourvil
            </p>
          </div>
        </div>
      </div>
      <ElevationProfile fill="#ffffff" className="-mb-px" />
    </div>
  )
}
