import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Target } from 'lucide-react'
import event from '@/data/featured-event.json'

export default function FeaturedEventSection() {
  return (
    <div id="evenements" className="bg-[#00205b] text-white relative overflow-hidden py-16 md:py-24">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-10 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b5e2]/10 border border-[#00b5e2] rounded-sm text-[#00b5e2] text-xs font-bold uppercase tracking-widest">
                <Target className="w-4 h-4" /> {event.category}
             </div>
             
             <div>
                <h2 className="text-4xl md:text-5xl font-bold font-sans leading-tight mb-4">
                   {event.title}
                </h2>
                <p className="text-xl text-gray-300 font-light leading-relaxed">
                   {event.description}
                </p>
             </div>

             <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-sm bg-[#00b5e2] flex items-center justify-center text-[#00205b]">
                      <Calendar className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Date</div>
                      <div className="text-lg font-bold">{event.dateLabel}</div>
                      <div className="text-sm text-gray-400">{event.dateDetail}</div>
                   </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 rounded-sm bg-white/10 flex items-center justify-center text-white">
                      <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                      <div className="text-xs text-[#00b5e2] uppercase font-bold tracking-wider mb-1">Lieu</div>
                      <a href={event.locationLink} target="_blank" rel="noopener noreferrer" className="text-lg font-bold hover:text-[#00b5e2] transition-colors">{event.locationLabel} ↗</a>
                      <div className="text-sm text-gray-400">{event.locationDetail}</div>
                   </div>
                </div>
             </div>

             <div className="pt-6">
                <Link 
                   href={event.link} 
                   className="inline-flex items-center gap-2 px-6 py-3 bg-[#00b5e2] text-[#00205b] font-bold rounded-sm hover:bg-white transition-colors"
                >
                   En savoir plus →
                </Link>
             </div>
          </div>

          <div className="lg:w-1/2 w-full">
             <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00b5e2] to-blue-600 opacity-20 blur-lg rounded-lg group-hover:opacity-30 transition duration-500"></div>
                
                <div className="relative rounded-sm overflow-hidden border-4 border-white/10 shadow-2xl bg-white">
                   <Image 
                      src={event.image} 
                      alt={event.imageAlt} 
                      width={800}
                      height={600}
                      className="w-full h-auto transform transition duration-700 group-hover:scale-105" 
                   />
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
