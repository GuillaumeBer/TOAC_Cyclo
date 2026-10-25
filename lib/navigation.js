// Menu principal : uniquement de vraies pages (aucune ancre de l'accueil),
// pour que chaque entrée se comporte de la même façon.
// `paths` : préfixes d'URL qui activent l'entrée (page elle-même et pages liées).
// `exact` : l'entrée n'est active que sur sa propre page (pas sur ses sous-pages).
export const NAV_ITEMS = [
  { name: 'Accueil', href: '/', paths: [] },
  { name: 'Sorties', href: '/sorties', paths: ['/sorties'] },
  { name: 'Le club', href: '/club', paths: ['/club'] },
  { name: 'Histoire', href: '/histoire', paths: ['/histoire'] },
]

export const CTA = { name: 'Rejoindre', href: '/rejoindre', paths: ['/rejoindre'] }

// Plan du site du pied de page.
export const SITE_MAP = [
  { name: 'Sorties', href: '/sorties' },
  { name: 'Le club et son calendrier', href: '/club' },
  { name: 'Notre histoire', href: '/histoire' },
  { name: 'Rejoindre le club', href: '/rejoindre' },
]
