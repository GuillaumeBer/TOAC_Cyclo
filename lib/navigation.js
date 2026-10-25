// Menu principal : uniquement de vraies pages (aucune ancre de l'accueil),
// pour que chaque entrée se comporte de la même façon.
// `paths` : préfixes d'URL qui activent l'entrée (page elle-même et pages liées).
// `exact` : l'entrée n'est active que sur sa propre page (pas sur ses sous-pages).
export const NAV_ITEMS = [
  { name: 'Accueil', href: '/', paths: [] },
  { name: 'Calendrier', href: '/calendrier', paths: ['/calendrier'], exact: true },
  { name: 'Sorties', href: '/calendrier/sorties-weekend', paths: ['/calendrier/sorties-weekend'] },
  { name: 'Activités', href: '/activites', paths: ['/activites'] },
  { name: 'Histoire', href: '/histoire', paths: ['/histoire'] },
]

export const CTA = { name: 'Rejoindre', href: '/rejoindre', paths: ['/rejoindre'] }

// Plan du site du pied de page.
export const SITE_MAP = [
  { name: 'Calendrier 2027', href: '/calendrier' },
  { name: 'Sorties à venir', href: '/calendrier/sorties-weekend' },
  { name: 'Activités', href: '/activites' },
  { name: 'Notre histoire', href: '/histoire' },
  { name: 'Rejoindre le club', href: '/rejoindre' },
]
