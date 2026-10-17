import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ElevationProfile from '@/components/ElevationProfile'

export default function JoinBanner() {
  return (
    <div>
    <div className="bg-[#f2f4f7]">
      <ElevationProfile fill="#00205b" className="-mb-px" />
    </div>
    <div className="relative overflow-hidden bg-[#00205b]">
      <Image
        src="/images/TOAC2.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00205b] via-[#00205b]/85 to-[#00205b]/40" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="display text-5xl md:text-7xl font-bold text-white">Et si vous rouliez avec nous ?</h2>
          <p className="text-lg text-gray-200 mt-4">
            Venez faire une sortie d'essai : on vous accueille et on s'adapte à votre rythme.
          </p>
        </div>
        <Link
          href="/rejoindre"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors text-lg shadow-lg flex-shrink-0"
        >
          Venir essayer <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
    </div>
  )
}
