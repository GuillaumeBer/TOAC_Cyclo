import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

const NEWS = [
  {
    id: 1,
    title: "Retour sur le séjour en Espagne",
    date: "15 Oct 2024",
    excerpt: "Soleil, dénivelé et tapas sur la Costa Brava. Découvrez le récit de notre semaine catalane.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Récit"
  },
  {
    id: 2,
    title: "Commande des nouvelles tenues",
    date: "01 Oct 2024",
    excerpt: "La boutique club est ouverte jusqu'au 15 novembre. Équipez-vous aux couleurs du TOAC pour l'hiver.",
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Club"
  },
  {
    id: 3,
    title: "Réunion Sécurité & Code",
    date: "28 Sept 2024",
    excerpt: "Un rappel indispensable des bonnes pratiques pour rouler en groupe en toute sécurité.",
    image: "https://images.unsplash.com/photo-1558522767-b50035043ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Sécurité"
  }
]

function NewsCard({ item }) {
  return (
    <div className="group bg-white flex flex-col h-full shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-[#00b5e2]/30">
      <div className="h-48 md:h-56 overflow-hidden relative">
        <Image 
          src={item.image} 
          alt={item.title} 
          fill
          className="object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute bottom-0 left-0 bg-[#00205b] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider">
          {item.category}
        </div>
      </div>
      <div className="p-8 flex flex-col flex-1">
        <div className="text-sm font-medium text-[#00b5e2] mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" /> {item.date}
        </div>
        <h3 className="text-xl font-bold text-[#00205b] mb-3 leading-snug group-hover:text-[#00b5e2] transition-colors">
          {item.title}
        </h3>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1">
          {item.excerpt}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center text-[#00205b] font-bold text-sm uppercase tracking-wide group-hover:text-[#00b5e2] cursor-pointer">
          Lire l'article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
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
        <button className="hidden md:flex items-center text-[#00205b] font-bold uppercase text-sm tracking-wide hover:text-[#00b5e2] transition-colors">
          Voir tout <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {NEWS.map(item => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
    </div>
  )
}
