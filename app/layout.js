import './globals.css'
import { Inter, Barlow_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'
import { SITE_URL, CLUB } from '@/lib/site'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
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
  title: {
    default: 'TOAC Cyclotourisme - Club de vélo Toulouse',
    template: '%s | TOAC Cyclotourisme',
  },
  description: 'TOAC Cyclotourisme - Le club cycliste historique du TOAC à Toulouse. Découvrez nos sorties, événements et rejoignez notre communauté de passionnés.',
  keywords: ['cyclotourisme', 'vélo', 'Toulouse', 'TOAC', 'club cycliste', 'randonnée vélo'],
  authors: [{ name: 'TOAC Cyclotourisme' }],
  icons: {
    icon: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'TOAC Cyclotourisme - Club de vélo Toulouse',
    description: 'Le club cycliste historique du TOAC à Toulouse. La passion du vélo, l\'excellence de l\'organisation.',
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
  description: 'Section cyclotourisme du TOAC à Toulouse : sorties conviviales, tous niveaux, sans compétition.',
  url: SITE_URL,
  email: CLUB.email,
  foundingDate: CLUB.foundingDate,
  sport: 'Cyclotourisme',
  address: { '@type': 'PostalAddress', ...CLUB.address },
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
        <Analytics />
      </body>
    </html>
  )
}
