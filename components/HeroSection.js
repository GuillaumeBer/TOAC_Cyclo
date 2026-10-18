import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import ElevationProfile from '@/components/ElevationProfile'

export default function HeroSection() {
  return (
    <div id="top" className="relative bg-[#00205b] overflow-hidden">
      <div className="relative min-h-[86vh] sm:min-h-[88vh] md:min-h-[90vh] flex flex-col justify-between md:justify-center pt-24 sm:pt-28 md:pt-24 pb-4 sm:pb-6 md:pb-12">
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
            <p className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#89d3e8] mb-2 sm:mb-5">
              <span className="h-px w-6 sm:w-10 bg-[#89d3e8]" aria-hidden="true" />
              <span>Cyclotourisme · Toulouse · <span className="whitespace-nowrap">depuis 1976</span></span>
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
                Venir essayer <ArrowRight className="w-5 h-5" aria-hidden="true" />
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

        {/* Zone Basse sur MOBILE uniquement (bouton, citation et indicateur de scroll) */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pb-3 sm:pb-5 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/rejoindre"
              className="w-full px-6 py-3.5 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-all flex items-center justify-center gap-2 text-base shadow-xl active:scale-95"
            >
              Venir essayer <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-2.5 text-center">
            <p className="text-xs text-gray-300 italic">
              « Des tours de quoi ? Des tours d'vélo pardi ! » — Bourvil
            </p>
          </div>

          {/* Indicateur de défilement animé mobile */}
          <div className="mt-2 flex justify-center">
            <a
              href="#sorties"
              aria-label="Faire défiler vers nos sorties"
              className="group inline-flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer py-1"
            >
              <span className="text-xs font-bold tracking-widest uppercase text-[#89d3e8] group-hover:text-white transition-colors">
                Découvrir la suite
              </span>
              <div className="w-7 h-7 rounded-full border border-white/30 bg-white/10 flex items-center justify-center animate-bounce shadow-sm">
                <ChevronDown className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
            </a>
          </div>
        </div>

        {/* Indicateur de défilement animé GRAND ÉCRAN (discret en bas au centre) */}
        <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex-col items-center">
          <a
            href="#sorties"
            aria-label="Faire défiler vers nos sorties"
            className="group inline-flex flex-col items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-xs font-bold tracking-widest uppercase text-[#89d3e8] group-hover:text-white transition-colors">
              Découvrir le club
            </span>
            <div className="w-8 h-8 rounded-full border border-white/30 bg-white/10 flex items-center justify-center animate-bounce shadow-md group-hover:border-white/60 group-hover:bg-white/20 transition-all">
              <ChevronDown className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>
      <ElevationProfile fill="#ffffff" className="-mb-px" />
    </div>
  )
}
