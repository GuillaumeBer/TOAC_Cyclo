'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_ITEMS, CTA } from '@/lib/navigation'

const SECTIONS = ['top', 'sorties', 'evenements', 'actualites', 'activites', 'club', 'contact']

const linkBase = 'relative whitespace-nowrap px-3 2xl:px-4 py-4 text-sm font-bold uppercase tracking-wider transition-colors duration-200'

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (e) => e.key === 'Escape' && setIsMobileMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMobileMenuOpen])

  useEffect(() => setIsMobileMenuOpen(false), [pathname])

  // Scrollspy sur la page d'accueil uniquement
  useEffect(() => {
    if (pathname !== '/') return

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50) {
        setActiveSection('contact')
        return
      }

      const scrollPosition = window.scrollY + 100 // Offset pour la navbar
      for (const section of SECTIONS) {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section)
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const isActive = (item) => {
    if (pathname === '/') return item.sections.includes(activeSection)
    return (item.paths || []).some((p) => pathname === p || pathname.startsWith(`${p}/`))
  }

  return (
    <nav
      aria-label="Navigation principale"
      className={`fixed w-full z-50 top-0 bg-[#00205b]/95 backdrop-blur text-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-none'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <Link href="/#top" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/images/logo-toac-header.png"
              alt="Logo TOAC Cyclo"
              width={50}
              height={50}
              className="w-12 h-12 rounded"
              sizes="48px"
            />
            <div className="font-bold text-2xl tracking-tight leading-none">
              TOAC<span className="text-[#00b5e2]">CYCLO</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {NAV_ITEMS.map((item) => {
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
              aria-current={pathname === CTA.href ? 'true' : undefined}
              className="ml-2 px-5 py-2.5 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] text-sm font-bold uppercase tracking-wider rounded-sm transition-colors"
            >
              {CTA.name}
            </Link>
          </div>

          <div className="-mr-2 flex xl:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#00205b] border-t border-white/10 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <ul className="px-4 pt-2 pb-4 flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-[#00b5e2]"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    if (item.href === '/#top') window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href={CTA.href}
                className="block text-center px-4 py-3 bg-[#fcd34d] text-[#00205b] text-sm font-bold uppercase tracking-wider rounded-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Rejoindre le club
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
