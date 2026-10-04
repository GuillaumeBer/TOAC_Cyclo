import { SITE_URL } from '@/lib/site'

const ROUTES = [
  { path: '', priority: 1 },
  { path: '/rejoindre', priority: 0.9 },
  { path: '/calendrier', priority: 0.8 },
  { path: '/adhesion', priority: 0.8 },
  { path: '/rando-rameaux', priority: 0.8 },
  { path: '/actualites/montagnarde-2027', priority: 0.6 },
  { path: '/activites/gravel', priority: 0.6 },
  { path: '/activites/longue-distance', priority: 0.6 },
  { path: '/activites/cyclomontagnardes', priority: 0.6 },
  { path: '/histoire', priority: 0.5 },
  { path: '/actualites/ag-2025', priority: 0.3 },
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
