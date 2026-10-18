/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique dans le dossier `out/` prêt à déposer dans `/www` sur un hébergement OVH
  output: 'export',
  trailingSlash: true,
  // Export statique : pas d'optimisation à la volée. Les WebP sont générés avant le build
  // (scripts/optimize-images.mjs) et choisis par lib/image-loader.js.
  images: {
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [128, 256, 384],
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

