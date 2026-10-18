import manifest from './image-manifest.json'

// Loader next/image pour l'export statique : renvoie la version pré-générée
// (scripts/optimize-images.mjs) la plus proche au-dessus de la largeur demandée.
export default function imageLoader({ src, width }) {
  const entries = manifest[src]
  if (!entries) return src
  const [w, ext] = entries.find(([x]) => x >= width) || entries[entries.length - 1]
  return src.replace(/^\/images\/(.+)\.\w+$/, `/_img/$1-${w}.${ext}`)
}
