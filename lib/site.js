// URL publique du site : à ajuster si le domaine change (ou via NEXT_PUBLIC_SITE_URL sur Vercel).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toac-cyclo.com'

export const CLUB = {
  name: 'TOAC Cyclotourisme',
  email: 'toac.cyclo@gmail.com',
  foundingDate: '1976',
  address: {
    streetAddress: 'Complexe Sportif TOAC',
    addressLocality: 'Toulouse',
    addressCountry: 'FR',
  },
}
