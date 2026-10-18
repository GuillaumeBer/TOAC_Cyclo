'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS, CTA } from '@/lib/navigation'

const linkBase = 'relative whitespace-nowrap px-3 2xl:px-4 py-4 text-sm font-bold uppercase tracking-wider transition-colors duration-200'

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile ouvert : page figée derrière, focus gardé dans le menu (Tab / Maj+Tab), Échap pour fermer.
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const button = buttonRef.current
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false)
        return button?.focus({ preventScroll: true })
      }
      if (e.key !== 'Tab') return
      const focusables = [button, ...menuRef.current.querySelectorAll('a')]
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
    }
  }, [isMobileMenuOpen])

  useEffect(() => setIsMobileMenuOpen(false), [pathname])

  // Chaque entrée du menu est une vraie page : l'état actif ne dépend que de l'URL.
  // trailingSlash est activé : on retire le « / » final avant de comparer.
  const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
  const isActive = (item) =>
    item.href === '/'
      ? path === '/'
      : item.paths.some((p) => path === p || (!item.exact && path.startsWith(`${p}/`)))

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed w-full z-50 top-0 bg-[#00205b] text-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-none'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/images/logo-toac-header.png"
              alt=""
              width={50}
              height={50}
              className="w-12 h-12 rounded"
              sizes="48px"
            />
            <div className="font-bold text-2xl tracking-tight leading-none">
              TOAC<span className="text-[#00b5e2]">CYCLO</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1 2xl:gap-2">
            {/* Le logo mène déjà à l'accueil : pas d'entrée « Accueil » sur grand écran */}
            {NAV_ITEMS.filter((item) => item.href !== '/').map((item) => {
              const active = isActive(item)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? 'true' : undefined}
                  className={`${linkBase} ${active ? 'text-[#00b5e2]' : 'text-white hover:text-[#00b5e2]'}`}
                >
                  {item.name}
                  {active && <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00b5e2] animate-fade-in-up"></span>}
                </Link>
              )
            })}
            <Link
              href={CTA.href}
              aria-current={path === CTA.href ? 'true' : undefined}
              className={`ml-2 px-5 py-2.5 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] text-sm font-bold uppercase tracking-wider rounded-sm transition-colors ${path === CTA.href ? 'ring-2 ring-white ring-offset-2 ring-offset-[#00205b]' : ''}`}
            >
              {CTA.name}
            </Link>
          </div>

          <div className="-mr-2 flex lg:hidden">
            <button
              ref={buttonRef}
              aria-controls="menu-mobile"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile plein écran propre sans bug de positionnement */}
      {isMobileMenuOpen && (
        <div id="menu-mobile" ref={menuRef} className="lg:hidden bg-[#00205b] border-t border-white/10 h-[calc(100dvh-5rem)] overflow-y-auto flex flex-col justify-between px-6 py-6">
          <ul className="flex flex-col divide-y divide-white/10">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item)
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block py-4 text-lg font-bold uppercase tracking-wider transition-colors ${active ? 'text-[#00b5e2]' : 'text-white hover:text-[#00b5e2]'}`}
                    aria-current={active ? 'true' : undefined}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="pt-6 pb-6 border-t border-white/10 flex flex-col gap-3">
            <Link
              href={CTA.href}
              className={`w-full py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] text-center text-base font-bold uppercase tracking-wider rounded-sm shadow-lg transition-transform active:scale-95 ${path === CTA.href ? 'ring-2 ring-white ring-offset-2 ring-offset-[#00205b]' : ''}`}
              aria-current={path === CTA.href ? 'true' : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Rejoindre le club
            </Link>
            <p className="text-center text-xs text-gray-400">
              Cyclotourisme à Toulouse depuis 1976 · Sans compétition
            </p>
          </div>
        </div>
      )}
    </nav>
  )
}
