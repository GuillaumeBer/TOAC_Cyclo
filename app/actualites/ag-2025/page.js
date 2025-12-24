'use client'
import Link from 'next/link'
import { ArrowLeft, Calendar, Users, Target, Award, FileText } from 'lucide-react'

export default function AG2025Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link 
            href="/#actualites" 
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b5e2]/20 border border-[#00b5e2] rounded-sm text-[#00b5e2] text-xs font-bold uppercase tracking-widest mb-6">
            Vie du Club
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Assemblée Générale 2025
          </h1>
          
          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#00b5e2]" />
              <span>06 Décembre 2025</span>
            </div>

          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Intro */}
        <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-[#00b5e2]">
          <p className="text-gray-600 leading-relaxed text-lg">
            L'Assemblée Générale s'est tenue le vendredi 6 décembre 2025. Un moment privilégié pour revenir sur une année riche en émotions et tracer la route pour les saisons à venir.
          </p>
        </div>

        {/* Bilan 2024 */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
              <Award className="w-6 h-6 text-[#00b5e2]" /> Rétrospective 2024
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2 flex-shrink-0"></span>
                  <span><strong>Sortie des Anciens :</strong> Une nouveauté très appréciée avec 14 participants sur 100km.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2 flex-shrink-0"></span>
                  <span><strong>Journée du Souvenir :</strong> Désormais pérennisée chaque mois d'octobre à Mérenvielle.</span>
                </li>
                 <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2 flex-shrink-0"></span>
                  <span><strong>Exploits :</strong> Traversée des Pyrénées en une semaine et périple anglais Londres-Édimbourg (malgré la tempête !).</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
              <Target className="w-6 h-6 text-[#00b5e2]" /> Cap sur 2026
            </h2>
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2 flex-shrink-0"></span>
                  <span><strong>Randonnée des Rameaux :</strong> Retour confirmé pour le week-end du 29 mars 2026.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2 flex-shrink-0"></span>
                  <span><strong>Montagnarde :</strong> Direction le Cantal (Maurs) en mai.</span>
                </li>
                 <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b5e2] mt-2 flex-shrink-0"></span>
                  <span><strong>Paris-Brest-Paris 2027 :</strong> Les brevets 2026 seront qualificatifs pour une inscription prioritaire.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nouveau Bureau */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00b5e2]" /> Nouveau Bureau 2026-2028
          </h2>
          <p className="text-gray-600 mb-6">
            L'assemblée a élu à l'unanimité le nouveau bureau qui guidera le club pour les deux prochaines années :
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "BERSAC Guillaume", "FILLION Thierry", "HEULIN Antoine",
              "HUDEBINE Nicolas", "MURATET Daniel", "PARDUILLAR Jérôme",
              "PLAISANCE Christophe", "RIESCO Xavier", "RIZZI Patrick"
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border border-gray-100">
                <div className="w-2 h-2 rounded-full bg-[#00205b]"></div>
                <span className="font-medium text-gray-700">{member}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
           <h3 className="font-bold text-[#00205b] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" /> Documents officiels
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Les comptes-rendus détaillés et les présentations financières sont disponibles pour tous les adhérents sur demande ou dans l'espace documentaire.
          </p>
        </div>

      </div>
    </div>
  )
}
