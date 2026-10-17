import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ElevationProfile from '@/components/ElevationProfile'

export default function HeroSection() {
  return (
    <div id="top" className="relative bg-[#00205b] overflow-hidden">
      <div className="relative min-h-[92vh] flex flex-col justify-end pt-28">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-toac.jpg"
            alt="Équipe TOAC Cyclotourisme"
            fill
            className="object-cover object-[70%_center]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00205b] via-[#00205b]/55 to-[#00205b]/30" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#00205b]/90 via-[#00205b]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 md:pb-16">
          <div className="max-w-4xl animate-fade-in-up">
            <p className="flex items-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#89d3e8] mb-5">
              <span className="h-px w-10 bg-[#89d3e8]" aria-hidden="true" />
              Cyclotourisme · Toulouse · depuis 1976
            </p>
            <h1 className="display text-6xl sm:text-7xl lg:text-8xl xl:text-[8.5rem] font-bold text-white">
              Roulez avec <span className="text-[#00b5e2]">le TOAC</span> Cyclo
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-100 font-light leading-relaxed max-w-2xl">
              Sorties conviviales, tous niveaux, sans compétition. Venez essayer, on vous accueille.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/rejoindre"
                className="px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-all flex items-center justify-center gap-2 text-lg shadow-lg"
              >
                Venir essayer <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="mt-12 md:mt-16">
            <p className="text-xs text-gray-300 italic">
              « Des tours de quoi ? Des tours d'vélo pardi ! »{' '}
              <a href="https://www.youtube.com/watch?v=WizGTZtjgvo" target="_blank" rel="noopener noreferrer" className="hover:text-white underline-offset-2 hover:underline">
                — Bourvil, « A bicyclette »
              </a>
            </p>
          </div>
        </div>
      </div>
      <ElevationProfile fill="#ffffff" className="-mb-px" />
    </div>
  )
}
