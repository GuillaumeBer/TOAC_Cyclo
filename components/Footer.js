import Link from 'next/link'
import { MapPin, Mail, ExternalLink, Facebook, Instagram } from 'lucide-react'
import social from '@/data/social.json'
import { SITE_MAP } from '@/lib/navigation'

// Strava n'existe pas dans lucide
function StravaIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  )
}

const SOCIAL_ICONS = { Facebook, Instagram, Strava: StravaIcon }

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#00205b] text-white pt-10 pb-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.5fr_1fr] gap-x-8 gap-y-6 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-1 md:mb-3">
            <span className="font-bold text-2xl tracking-tight">TOAC<span className="text-[#00b5e2]">CYCLO</span></span>
          </div>
          <p className="max-w-sm text-gray-300 leading-relaxed hidden md:block">
            Le club cycliste historique du TOAC à Toulouse.
            La passion du vélo, l'excellence de l'organisation.
          </p>

          {/* Ajouter { name, url } dans data/social.json pour afficher les icônes (Facebook, Instagram, Strava) */}
          {social.length > 0 && <div className="flex gap-4 mt-6">
            {social.map(({ name, url }) => {
              const Icon = SOCIAL_ICONS[name]
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00b5e2] transition-colors group"
                >
                  <Icon className="w-5 h-5 text-white group-hover:text-[#00205b]" aria-hidden="true" />
                </a>
              )
            })}
          </div>}
        </div>
        <div>
          <h2 className="font-bold mb-3 text-base text-[#00b5e2]">Contact</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 md:block md:space-y-2 text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00b5e2] mt-0.5 flex-shrink-0" aria-hidden="true" />
              <a href="https://www.google.com/maps/search/?api=1&query=TOAC+Omnisports+Toulouse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Complexe Sportif TOAC<br />Toulouse, France</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00b5e2] flex-shrink-0" aria-hidden="true" />
              <a href="mailto:toac.cyclo@gmail.com" className="hover:text-white transition-colors">toac.cyclo@gmail.com</a>
            </li>
          </ul>
        </div>
        <nav aria-label="Plan du site">
          <h2 className="font-bold mb-3 text-base text-[#00b5e2]">Le site</h2>
          <ul className="columns-2 gap-x-6 text-gray-300">
            {SITE_MAP.map((c) => (
              <li key={c.href} className="break-inside-avoid">
                <Link href={c.href} className="inline-block py-1 hover:text-white transition-colors">{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-bold mb-3 text-base text-[#00b5e2]">Liens utiles</h2>
          <ul className="flex flex-wrap gap-x-5 lg:block text-gray-300">
            <li>
              <a href="https://meteofrance.com" target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white transition-colors flex items-center gap-2">
                Météo France <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://ffvelo.fr" target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white transition-colors flex items-center gap-2">
                FF Vélo <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://www.cyclotourisme-31.com/" target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white transition-colors flex items-center gap-2">
                FSGT Cyclotourisme 31 <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="https://openrunner.com" target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white transition-colors flex items-center gap-2">
                OpenRunner <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-6 pt-2 border-t border-white/10 text-center text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} TOAC Cyclotourisme. Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href="/mentions-legales" className="inline-block py-2 hover:text-white transition-colors">Mentions légales</Link>
          <Link href="/confidentialite" className="inline-block py-2 hover:text-white transition-colors">Confidentialité</Link>
        </div>
      </div>
    </footer>
  )
}
