import './globals.css'

export const metadata = {
  title: 'TOAC Cyclotourisme - Club de vélo Toulouse',
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
  },
}

import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased text-gray-900 bg-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
