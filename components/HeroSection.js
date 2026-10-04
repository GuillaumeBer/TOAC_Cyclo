import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <div id="top" className="relative min-h-[85vh] flex items-center bg-[#00205b] overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-toac.jpg"
          alt="Équipe TOAC Cyclotourisme"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#00205b]/70 md:bg-transparent" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#00205b]/95 via-[#00205b]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-8 animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6 font-sans">
              Roulez avec <span className="text-[#89d3e8]">le TOAC Cyclo</span>
            </h1>
            <div className="h-1 w-20 bg-[#00b5e2] mb-6"></div>
            <p className="text-xl md:text-2xl text-gray-100 font-light leading-relaxed mb-4 max-w-2xl">
              La section cyclotourisme du TOAC, à Toulouse : sorties conviviales, tous niveaux, sans compétition. Venez essayer, on vous accueille.
            </p>
            <p className="text-sm text-gray-300 italic mb-8">
              « Des tours de quoi ? Des tours d'vélo pardi ! »{' '}
              <a href="https://www.youtube.com/watch?v=WizGTZtjgvo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline-offset-2 hover:underline">
                — Bourvil, « A bicyclette »
              </a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/rejoindre"
              className="px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-all flex items-center justify-center gap-2 text-lg shadow-lg"
            >
              Venir essayer <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#sorties"
              className="px-8 py-4 border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold rounded-sm transition-all flex items-center justify-center text-lg"
            >
              Voir les sorties
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
