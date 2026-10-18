// URL publique du site : à ajuster si le domaine change.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toac-cyclo.com'

// Identifiant de suivi Umami Cloud (sans cookie, RGPD) : à renseigner dans .env ou ici.
export const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || ''
export const UMAMI_SCRIPT_URL = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || 'https://cloud.umami.is/script.js'

export const CLUB = {
  name: 'TOAC Cyclotourisme',
  alternateName: 'TOAC Cyclo Toulouse',
  email: 'toac.cyclo@gmail.com',
  foundingDate: '1976',
  address: {
    streetAddress: 'Complexe Sportif TOAC, Chemin du Touch',
    postalCode: '31300',
    addressLocality: 'Toulouse',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
  geo: {
    latitude: 43.6119,
    longitude: 1.4036,
  },
}

