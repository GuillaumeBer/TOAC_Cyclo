import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function JoinBanner() {
  return (
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
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Et si vous rouliez avec nous ?</h2>
          <p className="text-lg text-gray-200 mt-4">
            Une sortie d'essai, une question, un conseil : écrivez-nous, on vous répond vite.
          </p>
        </div>
        <div className="flex flex-col gap-3 flex-shrink-0">
          <Link
            href="/rejoindre"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors text-lg shadow-lg"
          >
            Venir essayer <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/adhesion"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-bold rounded-sm transition-colors"
          >
            Adhésion et tarifs
          </Link>
        </div>
      </div>
    </div>
  )
}
