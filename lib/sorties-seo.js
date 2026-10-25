import { SITE_URL } from '@/lib/site'

const PAGE_URL = `${SITE_URL}/calendrier/sorties-weekend`

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
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: !s.tarif_inscription,
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
    organizer: { '@type': 'Organization', name: s.organisateur || s.federation },
    url: s.url || PAGE_URL,
  }
}

// Seules les sorties dont l'organisateur a confirmé la date sont publiées en données structurées.
export function sortiesJsonLd(sorties) {
  const events = upcomingSorties(sorties).filter((s) => s.fiabilite === 'confirmee')
  return {
    '@context': 'https://schema.org',
    '@graph': events.map(eventJsonLd),
  }
}

export const FAQ = [
  {
    q: 'Quelles sorties vélo y a-t-il ce week-end autour de Toulouse ?',
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
    a: "Oui : le club propose des sorties route le vendredi et le dimanche, et gravel le jeudi en afterwork, ouvertes aux salariés Airbus comme aux extérieurs. Une première sortie d'essai est possible avant de s'inscrire.",
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
