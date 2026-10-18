import { Bike, Map, Mountain, Sunset, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'
import ActivityTabs from '@/components/ActivityTabs'
import activites from '@/data/activites.json'

const { brm: BRM, longueDistance: LONGUE_EVENTS, cyclomontagnardes: CMV, gravel: GRAVEL_EVENTS } = activites

export const metadata = {
  title: 'Activités : longue distance (BRM, PBP), cyclomontagnardes & gravel',
  description: 'Brevets randonneurs (BRM) et Paris-Brest-Paris 2027, Cyclomontagnardes FFVélo, sorties gravel afterwork le jeudi à Toulouse/Blagnac et bikepacking en Occitanie avec le TOAC Cyclo.',
  alternates: {
    canonical: '/activites',
  },
}

function SectionTitle({ icon: Icon, eyebrow, title, text }) {
  return (
    <div className="mb-8">
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0077b6] mb-3">
        <span className="h-px w-10 bg-[#0077b6]" aria-hidden="true" /> {eyebrow}
      </p>
      <h2 className="display text-4xl md:text-5xl font-bold text-[#00205b] flex items-center gap-3">
        <Icon className="w-8 h-8 text-[#00b5e2]" aria-hidden="true" /> {title}
      </h2>
      {text && <p className="mt-3 text-gray-600 max-w-2xl">{text}</p>}
    </div>
  )
}

// Ligne d'un événement : titre (lien si disponible), détail, date éventuelle.
function EventRow({ title, text, href, date, tag }) {
  return (
    <li className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-md transition-shadow">
      <div>
        <h3 className="font-bold text-[#00205b] text-lg flex items-center gap-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="clic_evenement_externe"
              data-umami-event-titre={title}
              className="hover:text-[#0077b6] transition-colors"
            >
              {title} ↗
            </a>
          ) : (
            title
          )}
          {tag && <span className="px-2 py-0.5 bg-[#00205b] text-white text-xs font-bold rounded">{tag}</span>}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{text}</p>
      </div>
      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-bold rounded-full self-start sm:self-center whitespace-nowrap">
        {date || 'Dates à venir'}
      </span>
    </li>
  )
}

const header = {
  title: 'Nos activités',
  breadcrumb: [{ name: 'Activités' }],
  intro: "Au-delà des sorties club, trois univers pour se faire plaisir et se dépasser : la longue distance, les cyclomontagnardes et l'aventure gravel.",
}

export default function ActivitesPage() {
  const tabs = [
    {
      id: 'longue-distance',
      label: 'Longue distance',
      image: '/images/longue-distance.jpg',
      content: (
        <>
      <SectionTitle icon={Map} eyebrow="Brevets et randonnées" title="Longue distance" text="Préparez Paris-Brest-Paris 2027 : brevets des randonneurs mondiaux (BRM) et défis d'endurance." />

      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border-l-4 border-[#00b5e2] mb-8">
        <h3 className="text-xl font-bold text-[#00205b] mb-3">Paris-Brest-Paris 2027 : du 22 au 26 août</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          La 21ème édition du mythique <a href="https://www.paris-brest-paris.org/" target="_blank" rel="noopener noreferrer" className="text-[#0077b6] hover:underline font-bold">Paris-Brest-Paris</a>.
          Plusieurs membres du TOAC Cyclo envisagent d'y participer !
        </p>
        <ul className="text-gray-600 leading-relaxed text-sm space-y-2">
          <li><strong>Qualification :</strong> valider les 4 BRM (200, 300, 400 et 600 km) entre le 1er novembre 2026 et le 30 juin 2027.</li>
          <li><strong>Pré-inscription (optionnelle, 50 €) :</strong> ouverte à partir du 16 janvier 2027, et d'autant plus tôt que le plus long BRM validé en 2026 est long. Sans BRM en 2026, elle ouvre le 27 mars 2027. Elle permet de choisir sa vague de départ.</li>
          <li><strong>Inscription définitive :</strong> du 29 mai au 4 juillet 2027, avec au moins 3 des 4 BRM déjà validés.</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Infos à vérifier sur le site officiel de l'événement avant de vous inscrire.</p>
      </div>

      <h3 className="font-bold text-[#00205b] text-lg mb-1">BRM près de chez nous, 2027</h3>
      <p className="text-sm text-gray-500 mb-4">Les calendriers seront publiés par les clubs organisateurs : cliquez sur le nom pour accéder à leur site.</p>
      <ul className="space-y-3 mb-10">
        {BRM.map((e) => <EventRow key={e.title} {...e} />)}
      </ul>

      <h3 className="font-bold text-[#00205b] text-lg mb-1">Autres événements notables, 2027</h3>
      <p className="text-sm text-gray-500 mb-4">Organisés par des clubs tiers : les dates ci-dessous sont celles annoncées par les organisateurs.</p>
      <ul className="space-y-3 mb-6">
        {LONGUE_EVENTS.map((e) => <EventRow key={e.title} {...e} />)}
      </ul>
      <a href="https://www.audax-club-parisien.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#00205b] rounded-sm hover:bg-gray-200 transition-colors text-sm font-bold">
        <ExternalLink className="w-4 h-4" aria-hidden="true" /> Site Audax Club Parisien
      </a>
        </>
      ),
    },
    {
      id: 'cyclomontagnardes',
      label: 'Cyclo­montagnardes',
      image: '/images/cyclomontagnardes.jpg',
      content: (
        <>
      <SectionTitle icon={Mountain} eyebrow="Montagne" title="Cyclomontagnardes" text="Des défis d'exception au cœur des grands massifs français, organisés sous l'égide de la FFVélo. Plusieurs membres du TOAC y participent chaque année." />

      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border-l-4 border-[#00b5e2] mb-8">
        <h3 className="text-xl font-bold text-[#00205b] mb-3">Le Brevet Cyclomontagnard Français (BCMF)</h3>
        <p className="text-gray-600 leading-relaxed mb-4">
          Label d'excellence de la Fédération Française de Cyclotourisme, le BCMF invite à gravir les 5 grands massifs français (Alpes, Pyrénées, Massif central, Jura, Vosges) avec un dénivelé positif d'au moins 3 600 m à chaque épreuve.
        </p>
        <ul className="text-gray-600 leading-relaxed text-sm space-y-2">
          <li><strong>Deux formules sans chrono :</strong> le <em>Défi Grimpeur</em> (intégrale en 1 jour) ou le <em>Défi Baroudeur</em> (le parcours en 2 jours avec étape).</li>
          <li><strong>Rythme libre :</strong> sans classement ni esprit de compétition, le plaisir pur de la haute montagne et des grands cols.</li>
          <li><strong>Permanence du brevet :</strong> pas de limite de durée pour collectionner les 5 massifs sur son carnet de route BCMF.</li>
        </ul>
      </div>

      <h3 className="font-bold text-[#00205b] text-lg mb-1">Calendrier des épreuves & massifs</h3>
      <p className="text-sm text-gray-500 mb-4">Dates annoncées ou prévisionnelles des organisations sous label FFVélo :</p>
      <ul className="space-y-3 mb-6">
        {CMV.map((e) => <EventRow key={e.title} {...e} />)}
      </ul>
      <a href="https://ffvelo.fr/cyclomontagnardes/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#00205b] rounded-sm hover:bg-gray-200 transition-colors text-sm font-bold">
        <ExternalLink className="w-4 h-4" aria-hidden="true" /> Page officielle des Cyclomontagnardes FFVélo
      </a>
        </>
      ),
    },
    {
      id: 'gravel',
      label: 'Gravel & aventure',
      image: '/images/gravel.jpg',
      content: (
        <>
      <SectionTitle icon={Bike} eyebrow="Section Gravel" title="Gravel & aventure" text="Des sorties afterwork conviviales aux aventures longue distance en autonomie." />

      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border-l-4 border-[#00b5e2] mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h3 className="text-xl font-bold text-[#00205b] flex items-center gap-2">
            <Sunset className="w-5 h-5 text-[#00b5e2]" aria-hidden="true" /> Sorties afterwork gravel
          </h3>
          <span className="px-2 py-1 bg-[#00205b] text-white text-xs font-bold uppercase rounded">Organisé par TOAC Cyclo</span>
        </div>
        <p className="text-gray-600 mb-5">Pour décompresser après le travail et profiter des soirées d'été.</p>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm">
          {[
            [Calendar, '1 semaine sur 2 (avril à septembre)'],
            [Clock, 'Le jeudi, départ 18h30 / 19h00'],
            [MapPin, 'Blagnac ou Saint-Martin'],
            [Bike, '30-50 km + guinguette 🍻'],
          ].map(([Icon, label]) => (
            <li key={label} className="flex items-center gap-3 p-3 bg-[#00b5e2]/10 rounded-md">
              <Icon className="w-5 h-5 text-[#0077b6]" aria-hidden="true" /> {label}
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-bold text-[#00205b] text-lg mb-1">Événements gravel 2027</h3>
      <p className="text-sm text-gray-500 mb-4">Une sélection d'événements et randonnées bikepacking en Occitanie auxquels certains adhérents du TOAC sont susceptibles de participer :</p>
      <ul className="space-y-3 mb-6">
        {GRAVEL_EVENTS.map((e) => <EventRow key={e.title} {...e} />)}
      </ul>
      <a href="https://ogravel.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#00205b] rounded-sm hover:bg-gray-200 transition-colors text-sm font-bold">
        <ExternalLink className="w-4 h-4" aria-hidden="true" /> Portail Ô Gravel Occitanie
      </a>
        </>
      ),
    },
  ]

  return <ActivityTabs header={header} tabs={tabs} />
}
