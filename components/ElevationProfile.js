// Profil d'altitude stylisé, clin d'œil aux cols : sert de séparation entre sections.
// `fill` : couleur de la section qui suit (le profil « monte » depuis le bas).
export default function ElevationProfile({ fill = '#ffffff', className = '' }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full h-12 md:h-20 ${className}`}
    >
      <path
        d="M0 120 V84 L90 70 L170 78 L260 44 L330 56 L430 18 L500 36 L590 30 L680 62 L770 48 L860 72 L960 26 L1040 40 L1130 12 L1210 34 L1300 58 L1380 46 L1440 60 V120 Z"
        fill={fill}
      />
      <path
        d="M0 84 L90 70 L170 78 L260 44 L330 56 L430 18 L500 36 L590 30 L680 62 L770 48 L860 72 L960 26 L1040 40 L1130 12 L1210 34 L1300 58 L1380 46 L1440 60"
        fill="none"
        stroke="#00b5e2"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
