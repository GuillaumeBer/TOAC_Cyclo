import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  metadataBase: new URL('https://toac-cyclo.com'),
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

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased text-gray-900 bg-white">
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
