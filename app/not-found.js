import Link from 'next/link'
import { ArrowLeft, Compass, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Page introuvable (404)',
}

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#00205b] text-white flex items-center justify-center px-4 pt-28 pb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="max-w-xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00b5e2]/20 text-[#00b5e2] mb-6">
          <Compass className="w-8 h-8" aria-hidden="true" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#00b5e2] mb-2">Erreur 404</p>
        <h1 className="display text-5xl sm:text-6xl font-bold mb-4">Sortie de route !</h1>
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          La page que vous cherchez n'existe pas ou a changé d'itinéraire. Rejoignez le peloton sur la trace principale.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Retour à l'accueil
          </Link>
          <Link
            href="/sorties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/40 hover:border-white hover:bg-white/10 text-white font-bold rounded-sm transition-colors"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" /> Voir les sorties
          </Link>
        </div>
      </div>
    </div>
  )
}
