// Structure de navigation du site (menu principal + plan du pied de page).
// `sections` : ancres de l'accueil qui activent l'entrée pendant le défilement.
// `paths` : préfixes d'URL qui activent l'entrée sur les sous-pages.
export const NAV_ITEMS = [
  { name: 'Accueil', href: '/#top', sections: ['top'] },
  {
    name: 'Agenda',
    sections: ['sorties', 'evenements'],
    paths: ['/calendrier', '/rando-rameaux', '/actualites/montagnarde-2027'],
    children: [
      { name: 'Calendrier 2027', href: '/calendrier', description: 'Tous les rendez-vous de la saison' },
      { name: 'Sorties régulières', href: '/#sorties', description: 'Vendredi et dimanche' },
      { name: 'Randonnée des Rameaux', href: '/rando-rameaux', description: '21 mars 2027' },
      { name: 'Montagnarde 2027', href: '/actualites/montagnarde-2027', description: 'Week-end de l\'Ascension' },
    ],
  },
  {
    name: 'Activités',
    sections: ['activites'],
    paths: ['/activites'],
    children: [
      { name: 'Toutes les activités', href: '/#activites' },
      { name: 'Gravel & aventure', href: '/activites/gravel' },
      { name: 'Brevets & longue distance', href: '/activites/longue-distance' },
      { name: 'Cyclomontagnardes', href: '/activites/cyclomontagnardes' },
    ],
  },
  { name: 'Actualités', href: '/#actualites', sections: ['actualites'], paths: ['/actualites/ag-2025'] },
  {
    name: 'Le Club',
    sections: ['club'],
    paths: ['/histoire', '/adhesion', '/rejoindre'],
    children: [
      { name: 'Notre histoire', href: '/histoire' },
      { name: 'Adhésion et tarifs', href: '/adhesion' },
      { name: 'Venir essayer le club', href: '/rejoindre' },
    ],
  },
  { name: 'Contact', href: '/#contact', sections: ['contact'] },
]

export const CTA = { name: 'Rejoindre', href: '/rejoindre' }
