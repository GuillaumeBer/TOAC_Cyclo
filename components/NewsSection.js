import { Calendar, ArrowRight, FileText } from 'lucide-react'

function PlaceholderCard({ index }) {
  return (
    <div className="group bg-white flex flex-col h-full shadow-sm border border-gray-100 border-dashed">
      <div className="h-48 md:h-56 overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <FileText className="w-16 h-16 text-gray-300" />
        <div className="absolute bottom-0 left-0 bg-gray-400 text-white text-xs font-bold px-4 py-2 uppercase tracking-wider">
          À venir
        </div>
      </div>
      <div className="p-8 flex flex-col flex-1">
        <div className="text-sm font-medium text-gray-400 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" /> Prochainement
        </div>
        <h3 className="text-xl font-bold text-gray-400 mb-3 leading-snug">
          Article à venir #{index}
        </h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
          Cette section sera bientôt enrichie avec les dernières nouvelles du club. Restez connectés !
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center text-gray-400 font-bold text-sm uppercase tracking-wide">
          Bientôt disponible <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  )
}

export default function NewsSection() {
  return (
    <div id="actualites" className="min-h-screen flex items-center pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-[#00205b] mb-3">Actualités Récentes</h2>
          <div className="h-1 w-12 bg-[#00b5e2]"></div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <PlaceholderCard index={1} />
        <PlaceholderCard index={2} />
        <PlaceholderCard index={3} />
      </div>
      
      <div className="text-center mt-12 text-gray-500">
        <p className="italic">Les actualités du club seront bientôt disponibles ici.</p>
      </div>
    </div>
    </div>
  )
}
