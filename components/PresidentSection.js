import Image from 'next/image'
import { Quote } from 'lucide-react'

export default function PresidentSection() {
  return (
    <div className="bg-[#f2f4f7] min-h-screen flex items-center border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3 text-center md:text-left">
            <div className="inline-block p-1 border border-gray-300 mb-4 bg-white">
              <Image 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Président du club" 
                width={192}
                height={192}
                className="w-48 h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500" 
              />
            </div>
            <h3 className="text-xl font-bold text-[#00205b]">Alain D.</h3>
            <p className="text-sm text-gray-500 uppercase tracking-widest mt-1">Président de la Section</p>
          </div>
          <div className="md:w-2/3 relative">
            <Quote className="absolute -top-6 -left-6 w-12 h-12 text-[#00b5e2] opacity-20" />
            <h2 className="text-2xl md:text-3xl font-light text-[#00205b] mb-6 leading-relaxed italic">
              "Notre section continue de grandir avec toujours la même philosophie : <span className="font-bold">le plaisir de rouler ensemble</span>. Cette saison 2025 s'annonce riche en défis !"
            </h2>
            <button className="text-[#00205b] font-bold border-b-2 border-[#00b5e2] pb-1 hover:text-[#00b5e2] transition-colors uppercase text-sm tracking-wide">
              Lire l'édito complet
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
