/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique dans le dossier `out/` prêt à déposer dans `/www` sur un hébergement OVH
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

