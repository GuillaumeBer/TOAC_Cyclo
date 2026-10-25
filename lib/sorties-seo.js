import { SITE_URL } from '@/lib/site'

const PAGE_URL = `${SITE_URL}/sorties/`
const IMAGE = `${SITE_URL}/images/hero-toac.jpg`

// Sorties à venir (date du jour comprise), triées par date puis par heure de rendez-vous.
export function upcomingSorties(sorties, today = new Date()) {
  const todayIso = today.toISOString().slice(0, 10)
  return (sorties || [])
    .filter((s) => s.date >= todayIso)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.heure_rdv || '').localeCompare(b.heure_rdv || ''))
}

function eventJsonLd(s) {
  const time = s.heure_depart || s.heure_rdv
  const kms = (s.circuits || [])
    .filter((c) => c.distance_km)
    .map((c) => `${Math.round(c.distance_km)} km`)
    .join(', ')
  return {
    '@type': 'SportsEvent',
    name: s.titre,
    description: `Sortie vélo ${(s.disciplines || []).join(' / ')} au départ de ${s.lieu_depart}${kms ? `, circuits : ${kms}` : ''}.`,
    startDate: time ? `${s.date}T${time}` : s.date,
    endDate: s.date,
    image: IMAGE,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: 'Cyclisme',
    location: {
      '@type': 'Place',
      name: s.lieu_depart,
      address: {
        '@type': 'PostalAddress',
        streetAddress: s.adresse_depart || undefined,
        postalCode: s.code_postal || undefined,
        addressLocality: s.lieu_depart,
        addressCountry: 'FR',
      },
    },
    organizer: { '@type': 'Organization', name: s.organisateur || s.federation, url: s.url || undefined },
    url: s.url || PAGE_URL,
  }
}

// Sortie d'exception (data/activites.json) : plusieurs jours possibles, lieu sans adresse précise.
function exceptionJsonLd(e) {
  return {
    '@type': 'SportsEvent',
    name: e.titre,
    description: [e.resume, e.parcours].filter(Boolean).join(' '),
    startDate: e.start,
    endDate: e.end,
    image: IMAGE,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: 'Cyclisme',
    location: { '@type': 'Place', name: e.lieu_depart, address: { '@type': 'PostalAddress', addressLocality: e.lieu_depart, addressCountry: 'FR' } },
    organizer: { '@type': 'Organization', name: e.organisateur || e.titre, url: e.url || undefined },
    url: e.url || PAGE_URL,
  }
}

// Paris-Brest-Paris : date officielle connue, affiché dans l'onglet « Ultra & endurance ».
const PBP = {
  '@type': 'SportsEvent',
  name: 'Paris-Brest-Paris 2027',
  description: "21e édition du brevet de 1 200 km organisé par l'Audax Club Parisien, ouvert aux cyclistes qualifiés par les BRM 200, 300, 400 et 600 km.",
  startDate: '2027-08-22',
  endDate: '2027-08-26',
  image: IMAGE,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  sport: 'Cyclisme',
  location: { '@type': 'Place', name: 'Rambouillet', address: { '@type': 'PostalAddress', addressLocality: 'Rambouillet', addressCountry: 'FR' } },
  organizer: { '@type': 'Organization', name: 'Audax Club Parisien', url: 'https://www.paris-brest-paris.org/' },
  url: 'https://www.paris-brest-paris.org/',
}

// Seules les sorties dont l'organisateur a confirmé la date sont publiées en données structurées (une date fausse
// serait reprise telle quelle par Google et les IA). Renvoie null plutôt qu'un bloc vide quand il n'y en a aucune.
export function sortiesJsonLd(sorties, exceptions = [], today = new Date()) {
  const todayIso = today.toISOString().slice(0, 10)
  const events = [
    ...upcomingSorties(sorties, today).filter((s) => s.fiabilite === 'confirmee').map(eventJsonLd),
    ...exceptions.filter((e) => e.fiabilite === 'confirmee' && e.end >= todayIso).map(exceptionJsonLd),
    ...(PBP.endDate >= todayIso ? [PBP] : []),
  ]
  return events.length ? { '@context': 'https://schema.org', '@graph': events } : null
}

export const FAQ = [
  {
    q: 'Quelles sorties vélo y a-t-il ce week-end et dans les prochains mois autour de Toulouse ?',
    a: "La liste ci-dessus est mise à jour chaque semaine : toutes les randonnées cyclotouristes sans compétition, quel que soit l'organisateur (FSGT 31, FFVélo, UFOLEP, clubs indépendants), et les événements gravel, dans un rayon d'environ 60 km autour de Toulouse, avec horaires, lieu de départ, distances et traces GPS quand elles existent.",
  },
  {
    q: 'Faut-il être licencié pour participer ?',
    a: "La plupart des randonnées sont ouvertes à tous, licenciés ou non : une participation modique est parfois demandée à l'inscription, et certains organisateurs demandent un certificat ou une licence. Le détail est indiqué par l'organisateur sur chaque fiche.",
  },
  {
    q: 'Quelle différence entre FSGT et FFVélo ?',
    a: "Ce sont deux fédérations qui organisent des randonnées cyclotouristes sans classement, avec plusieurs circuits de distances différentes. La FSGT 31 est très présente dans l'agglomération toulousaine, la FFVélo propose aussi des brevets et des cyclomontagnardes.",
  },
  {
    q: 'Puis-je rouler avec le TOAC Cyclo ?',
    a: "Oui : le club propose ses propres sorties route le vendredi après-midi et gravel le jeudi en afterwork, ouvertes aux salariés Airbus comme aux extérieurs. Le dimanche, le TOAC Cyclo participe à des randonnées organisées par d'autres clubs. Une première sortie d'essai est possible avant de s'inscrire.",
  },
  {
    q: 'Le TOAC Cyclo participe-t-il à toutes ces sorties ?',
    a: "Non : cette page recense les sorties de tous les clubs autour de Toulouse, et le TOAC Cyclo n'y participe pas systématiquement. Pour savoir où le club roule, contactez-nous.",
  },
]

export function faqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}
