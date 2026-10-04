import Link from 'next/link'
import { ArrowLeft, Map, Download, Calendar, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Brevets & Randonnées',
  description: "Brevets randonneurs (BRM), préparation Paris-Brest-Paris et défis d'endurance au TOAC Cyclo.",
}

export default function LongueDistancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link
            href="/#activites"
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux activités
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00b5e2]/20 border border-[#00b5e2] rounded-sm text-[#00b5e2] text-xs font-bold uppercase tracking-widest mb-6">
            Longue Distance
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Brevets & Randonnées
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl">
            Préparez Paris-Brest-Paris 2027 ! Participez aux BRM (Brevets des Randonneurs Mondiaux) et dépassez vos limites sur de longues distances.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Intro PBP */}
        <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-[#00b5e2]">
          <h2 className="text-2xl font-bold text-[#00205b] mb-4">Paris-Brest-Paris 2027</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            La 21ème édition du mythique <a href="https://www.paris-brest-paris.org/" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline font-bold">Paris-Brest-Paris</a> aura lieu du 22 au 26 août 2027.
            Plusieurs membres du TOAC Cyclo envisagent d'y participer !
          </p>
          <p className="text-gray-600 leading-relaxed text-sm">
            Les conditions de qualification et d'inscription (brevets à valider, priorités de départ) sont détaillées sur le site officiel de l'événement.
          </p>
        </div>

        {/* BRM Locaux */}
        <div>
          <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2 mb-2">
            <Map className="w-6 h-6 text-[#00b5e2]" /> BRM Près de chez nous — 2027
          </h2>
          <p className="text-gray-500 text-sm mb-4">Les calendriers 2027 seront publiés par les clubs organisateurs : cliquez sur le nom pour accéder à leur site.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-[#00b5e2]">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[#00205b] text-lg">TOAC Cyclo</h3>
                <span className="px-2 py-0.5 bg-[#00205b] text-white text-xs font-bold rounded">Interne</span>
              </div>
              <p className="text-sm text-gray-600">Sorties réservées aux membres du club</p>
              <p className="text-xs text-gray-500 mt-2">Dates 2027 à venir</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[#00205b] text-lg"><a href="https://www.ccc31.fr/les-differents-brevets-organises-par-le-ccc/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b5e2] transition-colors">Castanet ↗</a></h3>
                
              </div>
              <p className="text-sm text-gray-600">200, 300, 400 et 600 km</p>
              <p className="text-xs text-gray-500 mt-2">Dates 2027 à venir</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[#00205b] text-lg"><a href="https://crmuret.org/brevet-200-km/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b5e2] transition-colors">Muret ↗</a></h3>
                
              </div>
              <p className="text-sm text-gray-600">200 km</p>
              <p className="text-xs text-gray-500 mt-2">Dates 2027 à venir</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-[#00205b] text-lg"><a href="http://lesdejantes81.free.fr/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00b5e2] transition-colors">L'Isle sur Tarn ↗</a></h3>
                
              </div>
              <p className="text-sm text-gray-600">200 km et 1000 km</p>
              <p className="text-xs text-gray-500 mt-2">Dates 2027 à venir</p>
            </div>
          </div>
        </div>

        {/* Événements Notables */}
        <div>
          <h2 className="text-2xl font-bold text-[#00205b] flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-[#00b5e2]" /> Autres Événements Notables — 2027
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Ces événements sont organisés par des clubs tiers. Cliquez sur le nom pour accéder au site officiel.
          </p>
            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-md text-blue-900 text-sm mb-6">
              <Calendar className="w-5 h-5 text-[#00b5e2] flex-shrink-0 mt-0.5" />
              <p>
                <strong>Calendrier 2027 à venir :</strong> les dates de la prochaine saison seront ajoutées dès que les organisateurs les auront publiées.
              </p>
            </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-[#00205b] text-white">
                  <tr>
                    <th className="p-4 whitespace-nowrap">Événement</th>
                    <th className="p-4 whitespace-nowrap">Distance</th>
                    <th className="p-4 whitespace-nowrap">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="p-4 font-medium min-w-[200px]">
                      <a href="https://www.cyclo-club-montebourg-saint-germain-de-tournebut.com/" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline">La vie de Château (34→49) ↗</a>
                    </td>
                    <td className="p-4 whitespace-nowrap">1500 / 1950 km</td>
                    <td className="p-4 whitespace-nowrap">À venir</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium min-w-[200px]">
                      <a href="https://www.cyclo-randonneurs.fr/" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline">Les Sources de la Loire (03) ↗</a>
                    </td>
                    <td className="p-4 whitespace-nowrap">600 km (8000D+)</td>
                    <td className="p-4 whitespace-nowrap">À venir</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium min-w-[200px]">
                      <a href="https://raacyclo.blogspot.com/p/nos-organisations.html" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline">Les Monédières (33) ↗</a>
                    </td>
                    <td className="p-4 whitespace-nowrap">600 km (8000D+)</td>
                    <td className="p-4 whitespace-nowrap">À venir</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium min-w-[200px]">
                      <a href="http://www.assas-cyclisme-evasion.fr/" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline">Assas Mimizan & retour (34) ↗</a>
                    </td>
                    <td className="p-4 whitespace-nowrap">1000 km</td>
                    <td className="p-4 whitespace-nowrap">À venir</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium min-w-[200px]">
                      <a href="https://1200desraa.blogspot.com/" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline">Ronde Aliénor d'Aquitaine (33) ↗</a>
                    </td>
                    <td className="p-4 whitespace-nowrap">1200 km</td>
                    <td className="p-4 whitespace-nowrap">À venir</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium min-w-[200px]">
                      <a href="https://bcbcyclotourismevttbollene.clubeo.com/" target="_blank" rel="noopener noreferrer" className="text-[#00b5e2] hover:underline">Vercors Lure Ventoux (84) ↗</a>
                    </td>
                    <td className="p-4 whitespace-nowrap">600 km (11000D+)</td>
                    <td className="p-4 whitespace-nowrap">À venir</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Liens externes */}
        <div className="flex gap-4">
          <a href="https://www.audax-club-parisien.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#00205b] rounded-sm hover:bg-gray-200 transition-colors text-sm font-bold">
            <ExternalLink className="w-4 h-4" /> Site Audax Club Parisien
          </a>
        </div>

        {/* Contact */}


      </div>
    </div>
  )
}
