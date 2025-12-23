import Image from 'next/image'
import { Calendar, MapPin, Bike, Target } from 'lucide-react'

export default function FeaturedEventSection() {
  return (
    <div id="evenements" className="bg-[#00205b] text-white min-h-screen flex items-center relative overflow-hidden border-t border-white/10 pt-16 md:pt-24">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b5e2]/10 border border-[#00b5e2] rounded-sm text-[#00b5e2] text-xs font-bold uppercase tracking-widest">
                <Target className="w-4 h-4" /> Événement Club
             </div>
             
             <div>
                <h2 className="text-4xl md:text-5xl font-bold font-sans leading-tight mb-4">
                   Randonnée des Rameaux
                </h2>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                   Le rendez-vous incontournable du printemps organisé par le TOAC. Venez découvrir nos parcours au cœur des côteaux du Gers.
                </p>
             </div>

             <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-sm bg-[#00b5e2] flex items-center justify-center text-[#00205b]">
                      <Calendar className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Date</div>
                      <div className="text-lg font-bold">Dim. 13 Avril</div>
                      <div className="text-sm text-gray-400">Départ 08h00</div>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center text-white">
                      <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Lieu</div>
                      <div className="text-lg font-bold">Complexe TOAC</div>
                      <div className="text-sm text-gray-400">Toulouse</div>
                   </div>
                </div>
             </div>

             <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#00205b] font-bold uppercase tracking-wide hover:bg-[#00b5e2] hover:text-white transition-all rounded-sm shadow-lg">
                S'inscrire à l'événement
             </button>
          </div>

          <div className="lg:w-1/2 w-full">
             <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00b5e2] to-blue-600 opacity-20 blur-lg rounded-lg group-hover:opacity-30 transition duration-500"></div>
                
                <div className="relative rounded-sm overflow-hidden border-4 border-white/10 shadow-2xl bg-[#001845] aspect-[4/3]">
                   <Image 
                      src="https://images.unsplash.com/photo-1596736209867-27b34b9d0b06?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                      alt="Cyclistes au printemps" 
                      fill
                      className="object-cover transform transition duration-700 group-hover:scale-105 opacity-80" 
                   />
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-[#00205b] via-transparent to-transparent"></div>
                   
                   <div className="absolute top-6 right-6 bg-[#00b5e2] text-[#00205b] font-bold px-4 py-2 text-sm uppercase tracking-wider shadow-lg transform rotate-3">
                     Édition 2025
                   </div>

                   <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="text-center border-2 border-[#00b5e2]/30 bg-[#00205b]/80 backdrop-blur-sm p-6 rounded-sm">
                         <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">RANDONNÉE DES RAMEAUX</h3>
                         <div className="w-16 h-1 bg-[#00b5e2] mx-auto mb-4"></div>
                         <div className="flex justify-center gap-3 text-sm font-medium text-gray-300">
                            <span className="flex items-center gap-1"><Bike className="w-4 h-4 text-[#00b5e2]"/> 50km</span>
                            <span className="text-[#00b5e2]">•</span>
                            <span className="flex items-center gap-1"><Bike className="w-4 h-4 text-[#00b5e2]"/> 70km</span>
                            <span className="text-[#00b5e2]">•</span>
                            <span className="flex items-center gap-1"><Bike className="w-4 h-4 text-[#00b5e2]"/> 90km</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
