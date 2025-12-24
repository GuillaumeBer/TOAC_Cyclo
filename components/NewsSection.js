import Image from 'next/image'
import Link from 'next/link'
import { Calendar, ArrowRight, MapPin, FileText } from 'lucide-react'

const NEWS_ITEMS = [
  {
    category: "Séjour Club",
    title: "Montagnarde 2026 : Direction le Cantal !",
    date: "14-17 Mai 2026",
    location: "Maurs (15)",
    summary: "Rendez-vous dans le sud du Cantal au Domaine La Châtaigneraie pour notre séjour annuel. Au programme : convivialité et parcours vallonnés.",
    image: "/images/montagnarde.jpg", // Image à générer
    link: "/actualites/montagnarde-2026"
  },
  {
    category: "Vie du Club",
    title: "Campagne d'adhésion 2026",
    date: "Saison 2026",
    location: "En ligne",
    summary: "Rejoignez-nous pour une nouvelle année de vélo ! La campagne d'adhésion est ouverte pour tous les passionnés.",
    image: "/images/hero-toac.jpg",
    link: "/adhesion"
  },
  {
    category: "Vie du Club",
    title: "Retour sur l'AG 2025",
    date: "06 Déc 2025",
    location: "Toulouse",
    summary: "Bilan moral, nouveautés 2026 et élection du bureau : découvrez le résumé de notre Assemblée Générale.",
    image: "/images/TOAC2.jpg",
    link: "/actualites/ag-2025"
  }
]

function NewsCard({ item }) {
  return (
    <div className="group bg-white flex flex-col h-full shadow-lg rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="h-48 md:h-56 relative overflow-hidden bg-gray-200">
        <Image 
          src={item.image} 
          alt={item.title} 
          width={400} 
          height={300} 
          className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-[#00b5e2] text-[#00205b] text-xs font-bold uppercase tracking-wider rounded-sm shadow-md">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-[#00b5e2]" /> {item.date}
          </div>
          {item.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1 text-[#00b5e2]" /> {item.location}
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-[#00205b] mb-3 leading-snug group-hover:text-[#00b5e2] transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6 leading-relaxed flex-1">
          {item.summary}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-100">
          <Link href={item.link} className="inline-flex items-center text-[#00205b] font-bold text-sm uppercase tracking-wide hover:text-[#00b5e2] transition-colors">
            Lire la suite <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function PlaceholderCard({ index }) {
  return (
    <div className="group bg-white flex flex-col h-full shadow-sm border border-gray-100 border-dashed rounded-lg overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
      <div className="h-48 md:h-56 relative bg-gray-50 flex items-center justify-center">
        <FileText className="w-12 h-12 text-gray-300" />
        <div className="absolute bottom-4 left-4 bg-gray-200 text-gray-500 text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-sm">
          À venir
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-sm font-medium text-gray-400 mb-3 flex items-center">
          <Calendar className="w-4 h-4 mr-2" /> Prochainement
        </div>
        <h3 className="text-lg font-bold text-gray-400 mb-2">
          Actualité #{index}
        </h3>
        <div className="h-2 w-24 bg-gray-100 rounded mb-4"></div>
        <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
        <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
      </div>
    </div>
  )
}

export default function NewsSection() {
  return (
    <div id="actualites" className="min-h-screen flex items-center bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#00205b] mb-3">Actualités du Club</h2>
            <div className="h-1 w-16 bg-[#00b5e2]"></div>
          </div>
          <Link href="/actualites" className="hidden md:flex items-center px-6 py-3 bg-white text-[#00205b] font-bold border border-gray-200 rounded-sm hover:border-[#00b5e2] hover:text-[#00b5e2] transition-colors shadow-sm">
            Toutes les actualités <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, index) => (
            <NewsCard key={index} item={item} />
          ))}

        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/actualites" className="inline-flex items-center px-6 py-3 bg-white text-[#00205b] font-bold border border-gray-200 rounded-sm hover:border-[#00b5e2] hover:text-[#00b5e2] transition-colors shadow-sm">
            Toutes les actualités <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
