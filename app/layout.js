import './globals.css'
import { Inter, Barlow_Condensed } from 'next/font/google'
import Script from 'next/script'
import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'
import { SITE_URL, CLUB, UMAMI_WEBSITE_ID, UMAMI_SCRIPT_URL } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-display',
})

export const metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'TOAC Cyclotourisme — Club de vélo route & gravel à Toulouse',
    template: '%s | TOAC Cyclotourisme Toulouse',
  },
  description: 'Club de cyclotourisme du TOAC à Toulouse (route, gravel afterwork, longue distance BRM, cyclomontagnardes). Sorties conviviales sans compétition, ouvert à tous (Airbus et extérieurs).',
  keywords: [
    'club vélo Toulouse',
    'cyclotourisme Toulouse',
    'club vélo Blagnac',
    'club gravel Toulouse',
    'TOAC Cyclo',
    'TOAC Cyclotourisme',
    'randonnée vélo Toulouse',
    'Randonnée des Rameaux Toulouse',
    'FFVélo 31',
    'FSGT vélo Toulouse',
    'BRM Toulouse',
  ],
  authors: [{ name: 'TOAC Cyclotourisme' }],
  icons: {
    // Icônes redimensionnées par scripts/optimize-images.mjs (le favicon source fait 1024 px)
    icon: { url: '/_img/icon-48.png', sizes: '48x48', type: 'image/png' },
    apple: { url: '/_img/icon-180.png', sizes: '180x180' },
  },
  openGraph: {
    title: 'TOAC Cyclotourisme — Club de vélo route & gravel à Toulouse',
    description: 'Sorties vélo de route, gravel afterwork et défis longue distance à Toulouse. Sans compétition, ouvert à tous.',
    url: SITE_URL,
    siteName: 'TOAC Cyclotourisme',
    type: 'website',
    locale: 'fr_FR',
    images: ['/images/hero-toac.jpg'],
  },
}

export const viewport = {
  themeColor: '#00205b',
}

const clubJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsClub',
  name: CLUB.name,
  alternateName: CLUB.alternateName,
  description: 'Section cyclotourisme du TOAC à Toulouse (depuis 1976) : sorties vélo de route le vendredi et le dimanche, sorties gravel afterwork le jeudi, randonnées longue distance (BRM, Paris-Brest-Paris) et cyclomontagnardes FFVélo. Ouvert à tous sans compétition.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}/images/hero-toac.jpg`,
  email: CLUB.email,
  foundingDate: CLUB.foundingDate,
  sport: ['Cyclotourisme', 'Vélo de route', 'Gravel', 'Bikepacking'],
  knowsAbout: [
    'Cyclotourisme',
    'Vélo de route',
    'Gravel',
    'Brevet des Randonneurs Mondiaux (BRM)',
    'Paris-Brest-Paris',
    'Cyclomontagnardes FFVélo',
    'Randonnée des Rameaux',
  ],
  address: { '@type': 'PostalAddress', ...CLUB.address },
  geo: { '@type': 'GeoCoordinates', ...CLUB.geo },
  areaServed: ['Toulouse', 'Blagnac', 'Colomiers', 'Tournefeuille', 'Haute-Garonne'],
  memberOf: [
    { '@type': 'SportsOrganization', name: 'Fédération Française de Cyclotourisme (FFVélo)', url: 'https://ffvelo.fr' },
    { '@type': 'SportsOrganization', name: 'Fédération Sportive et Gymnique du Travail (FSGT)', url: 'https://www.fsgt.org' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${inter.variable} ${barlow.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased text-gray-900 bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clubJsonLd) }}
        />
        <noscript>
          <style>{'.reveal{opacity:1;transform:none}'}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00b5e2] focus:text-[#00205b] focus:font-bold focus:rounded-sm"
        >
          Aller au contenu
        </a>
        <NavigationBar />
        <main id="main">{children}</main>
        <Footer />
        {UMAMI_WEBSITE_ID && (
          <Script
            src={UMAMI_SCRIPT_URL}
            data-website-id={UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}
