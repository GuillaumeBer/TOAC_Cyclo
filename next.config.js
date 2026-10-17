/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

// Anciennes adresses regroupées : les liens existants continuent de fonctionner.
nextConfig.redirects = async () => [
  { source: '/activites/gravel', destination: '/activites#gravel', permanent: true },
  { source: '/activites/longue-distance', destination: '/activites#longue-distance', permanent: true },
  { source: '/activites/cyclomontagnardes', destination: '/activites#cyclomontagnardes', permanent: true },
  { source: '/adhesion', destination: '/rejoindre#adhesion', permanent: true },
  { source: '/actualites/ag-2025', destination: '/', permanent: true },
]

module.exports = nextConfig
