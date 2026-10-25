import { Map, Hammer } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'

// Vue « Ultra & endurance » : brevets (BRM) et grands raids, à partir de 200 km ou sur plusieurs jours.
// Organisés par d'autres clubs ; des membres du TOAC Cyclo y participent.
export default function LongueDistance() {
  return (
    <>
      <SectionTitle
        icon={Map}
        eyebrow="Brevets et grands raids"
        title="Ultra & endurance"
        text="À partir de 200 km, ou sur plusieurs jours : brevets des randonneurs mondiaux (BRM) et grands défis d'endurance."
      />

      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border-l-4 border-[#00b5e2] mb-8">
        <h3 className="text-xl font-bold text-[#00205b] mb-3">Paris-Brest-Paris 2027 : du 22 au 26 août</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          La 21ème édition du mythique <a href="https://www.paris-brest-paris.org/" target="_blank" rel="noopener noreferrer" className="text-[#0077b6] hover:underline font-bold">Paris-Brest-Paris</a>, organisée par l'Audax Club Parisien.
          Plusieurs membres du TOAC Cyclo envisagent d'y participer !
        </p>
        <ul className="text-gray-600 leading-relaxed text-sm space-y-2">
          <li><strong>Qualification :</strong> valider les 4 BRM (200, 300, 400 et 600 km) entre le 1er novembre 2026 et le 30 juin 2027.</li>
          <li><strong>Pré-inscription (optionnelle, 50 €) :</strong> ouverte à partir du 16 janvier 2027, et d'autant plus tôt que le plus long BRM validé en 2026 est long. Sans BRM en 2026, elle ouvre le 27 mars 2027. Elle permet de choisir sa vague de départ.</li>
          <li><strong>Inscription définitive :</strong> du 29 mai au 4 juillet 2027, avec au moins 3 des 4 BRM déjà validés.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Infos à vérifier sur le site officiel de l'événement avant de vous inscrire.</p>
      </div>

      <div className="bg-white rounded-lg border border-dashed border-[#00b5e2] p-6 text-center">
        <Hammer className="w-8 h-8 text-[#00b5e2] mx-auto mb-3" aria-hidden="true" />
        <h3 className="font-bold text-[#00205b] text-lg mb-1">Le calendrier des brevets est en construction</h3>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Nous préparons une sélection de BRM et d'événements longue distance autour de Toulouse. Revenez bientôt !
        </p>
      </div>
    </>
  )
}
