import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Gift } from 'lucide-react'
import Reveal from '@/components/Reveal'
import ElevationProfile from '@/components/ElevationProfile'

// Appel final : bandeau clair (le reste de la page est bleu autour), puis profil de col vers le pied de page.
export default function JoinBanner() {
  return (
    <div className="bg-[#f2f4f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10 md:pb-14 grid md:grid-cols-2 items-center gap-10 lg:gap-16">
        <Reveal>
          <h2 className="display text-5xl md:text-6xl lg:text-7xl font-bold text-[#00205b]">Et si vous rouliez avec nous ?</h2>
          <p className="text-lg text-gray-700 mt-5 max-w-lg">
            Venez faire une sortie d'essai : on vous accueille et on s'adapte à votre rythme.
          </p>
          <p className="mt-3 flex items-start gap-2 text-sm font-bold text-[#0077b6]">
            <Gift className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" /> Nouvelle adhérente ? Votre cotisation club est offerte la 1ère année.
          </p>
          <Link
            href="/rejoindre"
            className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors text-lg shadow-md"
          >
            Venir essayer <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl rotate-1">
            <Image
              src="/images/TOAC2.jpg"
              alt="Des cyclistes du TOAC Cyclo réunis avant une sortie"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
      <ElevationProfile fill="#00205b" className="-mb-px" />
    </div>
  )
}
