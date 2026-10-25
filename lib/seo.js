export const SITE_NAME = 'TOAC Cyclo'
const OG_IMAGE = '/images/hero-toac.jpg'

// Métadonnées d'une page : titre, description, URL canonique et aperçus de partage cohérents entre eux.
// Next.js remplace l'objet openGraph du layout au lieu de le fusionner : chaque page le redéfinit donc en entier,
// sinon le partage d'une page afficherait le titre et l'adresse de l'accueil.
// `absoluteTitle` : titre affiché tel quel, sans le suffixe « | TOAC Cyclo » (accueil).
export function pageMetadata({ title, description, path, absoluteTitle = false }) {
  const shareTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: 'TOAC Cyclotourisme',
      type: 'website',
      locale: 'fr_FR',
      images: [OG_IMAGE],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: [OG_IMAGE] },
  }
}
