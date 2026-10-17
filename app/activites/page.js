import Link from 'next/link'
import { ArrowLeft, Bike, Map, Mountain, Sunset, Calendar, Clock, MapPin, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Activités : gravel, longue distance, cyclomontagnardes',
  description: 'Sorties gravel afterwork, brevets randonneurs et Paris-Brest-Paris, cyclomontagnardes : les défis proposés par le TOAC Cyclo.',
}

const GRAVEL_EVENTS = [
  { title: 'POU100', text: 'Week-end de Pâques : 100 km (ou 100 mi), ou 250 km sur le week-end.', href: 'https://727bikepacking.fr/pou100/' },
  { title: 'Occitanie 600', text: "600 km en autonomie à travers la région. Pas de compétition, juste l'aventure.", href: 'https://ogravel.com/' },
  { title: 'Toulouse Grand Tour', text: "L'exploration locale avec plusieurs parcours au choix." },
  { title: 'g727 (Grand Départ)', text: 'Une grande boucle de 727 km, réductible. Bivouac, autonomie, sans délai.', href: 'https://727bikepacking.fr/' },
]

const BRM = [
  { title: 'TOAC Cyclo', text: 'Sorties réservées aux membres du club', tag: 'Interne' },
  { title: 'Castanet', text: '200, 300, 400 et 600 km', href: 'https://www.ccc31.fr/' },
  { title: 'Muret', text: '200 km' },
  { title: "L'Isle sur Tarn", text: '200 km et 1000 km', href: 'http://lesdejantes81.free.fr/' },
]

const LONGUE_EVENTS = [
  { title: 'Bordeaux - Saint-Malo', text: '840 km (ou 430 km en « Little BSM »)', date: '12-16 mai', href: 'https://www.bordeauxsaintmalo.com/en' },
  { title: 'Tour cyclotouriste FFVélo (Épinal)', text: '~2 800 km en 21 jours', date: '5-27 juin', href: 'https://ffvelo.fr/voyages-velo/2027-tour-cyclotouriste/' },
  { title: 'Race Across France', text: '200 à 2 500 km', date: '16-27 juin', href: 'https://www.raceacrossseries.com/race-across-france' },
  { title: "Ronde Aliénor d'Aquitaine (33)", text: '1 200 km', date: 'Début 2027, dates à venir', href: 'https://1200desraa.blogspot.com/' },
]

const CMV = [
  { title: 'Cyclomontagnarde des Volcans', text: 'Mozac (63)', href: 'https://puy-de-dome.ffvelo.fr/cmv/' },
  { title: 'Cyclomontagnarde de Haute-Savoie', text: 'Annecy-le-Vieux (74)', href: 'https://www.cyclomontagnarde-annecy.com/' },
  { title: 'Cyclomontagnarde du Jura', text: 'Lons-le-Saunier (39)', href: 'https://ffvelo.fr/' },
  { title: 'Cyclomontagnarde Vosges Alsace', text: 'Wihr-au-Val (68)' },
  { title: 'Cyclomontagnarde Luchon-Bayonne', text: 'Luchon → Bayonne', href: 'https://www.luchonbayonne.fr/' },
  { title: 'Cyclomontagnarde du Massif Pyrénéen', text: 'Saint-Bertrand-de-Comminges (31)', href: 'https://ffvelo.fr/evenements/cyclomontagnarde-du-massif-pyreneen/' },
]

const TABS = [
  { id: 'gravel', label: 'Gravel & aventure', icon: Bike },
  { id: 'longue-distance', label: 'Longue distance', icon: Map },
  { id: 'cyclomontagnardes', label: 'Cyclomontagnardes', icon: Mountain },
]

function SectionTitle({ icon: Icon, eyebrow, title, text }) {
  return (
    <div className="mb-6">
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
            <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b6] transition-colors">
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

export default function ActivitesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Nos activités</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Au-delà des sorties club, trois univers pour se faire plaisir et se dépasser : l'aventure gravel, la longue distance et les grands cols.
          </p>
          <nav aria-label="Aller à une activité" className="mt-8 flex flex-wrap gap-3">
            {TABS.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/40 hover:border-[#00b5e2] hover:bg-white/10 rounded-full text-sm font-bold transition-colors"
              >
                <Icon className="w-4 h-4" aria-hidden="true" /> {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        {/* Gravel */}
        <section id="gravel" className="scroll-mt-24">
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
          <p className="text-sm text-gray-500 mb-4">Organisés par des clubs tiers, avec des membres du TOAC. Les dates seront ajoutées dès leur publication.</p>
          <ul className="space-y-3">
            {GRAVEL_EVENTS.map((e) => <EventRow key={e.title} {...e} />)}
          </ul>
        </section>

        {/* Longue distance */}
        <section id="longue-distance" className="scroll-mt-24">
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
        </section>

        {/* Cyclomontagnardes */}
        <section id="cyclomontagnardes" className="scroll-mt-24">
          <SectionTitle icon={Mountain} eyebrow="Montagne" title="Cyclomontagnardes" text="Des défis d'exception au cœur des massifs français, organisés par la FFVélo. Plusieurs membres du TOAC y participent chaque année. Dates 2027 à venir." />
          <ul className="space-y-3">
            {CMV.map((e) => <EventRow key={e.title} {...e} />)}
          </ul>
        </section>

        <div className="bg-[#00205b] text-white rounded-lg p-8 text-center">
          <h2 className="display text-3xl md:text-4xl font-bold mb-3">Envie d'essayer ?</h2>
          <p className="text-gray-300 mb-6">Venez rouler avec nous, on vous indique la sortie adaptée à votre niveau.</p>
          <Link href="/rejoindre" className="inline-flex items-center justify-center px-6 py-3 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors">
            Rejoindre le club
          </Link>
        </div>
      </div>
    </div>
  )
}
