// Structure de navigation du site : un menu plat, une page par rubrique.
// `sections` : ancres de l'accueil qui activent l'entrée pendant le défilement.
// `paths` : préfixes d'URL qui activent l'entrée sur les sous-pages.
export const NAV_ITEMS = [
  { name: 'Accueil', href: '/#top', sections: ['top', 'sorties', 'evenements', 'actualites'] },
  { name: 'Calendrier', href: '/calendrier', sections: [], paths: ['/calendrier', '/rando-rameaux', '/actualites'] },
  { name: 'Activités', href: '/activites', sections: ['activites'], paths: ['/activites'] },
  { name: 'Le Club', href: '/histoire', sections: ['club'], paths: ['/histoire'] },
  { name: 'Contact', href: '/#contact', sections: ['contact'] },
]

export const CTA = { name: 'Rejoindre', href: '/rejoindre', paths: ['/rejoindre'] }

// Plan du site du pied de page.
export const SITE_MAP = [
  { name: 'Calendrier 2027', href: '/calendrier' },
  { name: 'Randonnée des Rameaux', href: '/rando-rameaux' },
  { name: 'Montagnarde 2027', href: '/actualites/montagnarde-2027' },
  { name: 'Activités', href: '/activites' },
  { name: 'Notre histoire', href: '/histoire' },
  { name: 'Rejoindre le club', href: '/rejoindre' },
  { name: 'Adhésion et tarifs', href: '/rejoindre#adhesion' },
]
