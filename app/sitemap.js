import { SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

const ROUTES = [
  { path: '', priority: 1 },
  { path: '/rejoindre', priority: 0.9 },
  { path: '/calendrier', priority: 0.8 },
  { path: '/calendrier/sorties-weekend', priority: 0.8 },
  { path: '/activites', priority: 0.7 },
  { path: '/histoire', priority: 0.5 },
  { path: '/mentions-legales', priority: 0.2 },
  { path: '/confidentialite', priority: 0.2 },
]

export default function sitemap() {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    priority,
  }))
}
