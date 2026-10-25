import { Footprints, ExternalLink } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import ExceptionRidesClient from '@/components/ExceptionRidesClient'
import activites from '@/data/activites.json'

const { randonnees: RANDONNEES } = activites

// Explication du BCMF, affichée quand on coche « Montagne uniquement ».
const bcmf = (
  <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border-l-4 border-[#00b5e2]">
    <h3 className="text-xl font-bold text-[#00205b] mb-3">Le Brevet Cyclomontagnard Français (BCMF)</h3>
    <p className="text-gray-600 leading-relaxed mb-4">
      Label d'excellence de la Fédération Française de Cyclotourisme, le BCMF invite à gravir les 5 grands massifs français (Alpes, Pyrénées, Massif central, Jura, Vosges) avec un dénivelé positif d'au moins 3 600 m à chaque épreuve.
    </p>
    <ul className="text-gray-600 leading-relaxed text-sm space-y-2">
      <li><strong>Deux formules sans chrono :</strong> le <em>Défi Grimpeur</em> (intégrale en 1 jour) ou le <em>Défi Baroudeur</em> (le parcours en 2 jours avec étape).</li>
      <li><strong>Rythme libre :</strong> sans classement ni esprit de compétition, le plaisir pur de la haute montagne et des grands cols.</li>
      <li><strong>Permanence du brevet :</strong> pas de limite de durée pour collectionner les 5 massifs sur son carnet de route BCMF.</li>
    </ul>
    <a href="https://ffvelo.fr/cyclomontagnardes/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#00205b] rounded-sm hover:bg-gray-200 transition-colors text-sm font-bold">
      <ExternalLink className="w-4 h-4" aria-hidden="true" /> Page officielle des Cyclomontagnardes FFVélo
    </a>
  </div>
)

// Vue « Sorties d'exception » : événements de moins de 200 km, plus longs ou plus lointains, organisés par
// d'autres clubs. Le TOAC Cyclo n'organise rien ici : ses membres y participent ou pas.
export default function Randonnees() {
  return (
    <>
      <SectionTitle
        icon={Footprints}
        eyebrow="Plus longues ou plus loin · Moins de 200 km"
        title="Sorties d'exception"
        text="Des randonnées qui valent le déplacement, organisées par d'autres clubs et fédérations (FFVélo, FSGT, UFOLEP, clubs), sans compétition. Des membres du TOAC Cyclo y participent selon leurs envies."
      />
      <ExceptionRidesClient events={RANDONNEES} bcmf={bcmf} />
      <p className="text-xs text-gray-500 mt-6">
        Dates annoncées ou prévisionnelles : à vérifier sur le site de l'organisateur. À partir de 200 km, voyez l'onglet « Ultra & endurance ».
      </p>
    </>
  )
}
