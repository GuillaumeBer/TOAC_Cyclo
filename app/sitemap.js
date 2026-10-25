import { SITE_URL } from '@/lib/site'
import sortiesWeekend from '@/data/sorties-weekend.json'

export const dynamic = 'force-static'

const ROUTES = [
  { path: '/', priority: 1 },
  { path: '/rejoindre/', priority: 0.9 },
  { path: '/sorties/', priority: 0.9, lastModified: new Date(sortiesWeekend.updatedAt) },
  { path: '/club/', priority: 0.8 },
  { path: '/histoire/', priority: 0.5 },
  { path: '/mentions-legales/', priority: 0.2 },
  { path: '/confidentialite/', priority: 0.2 },
]

export default function sitemap() {
  return ROUTES.map(({ path, priority, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    // Pas de date pour les pages statiques : une date qui change à chaque déploiement finit ignorée par Google
    ...(lastModified && { lastModified }),
    priority,
  }))
}
