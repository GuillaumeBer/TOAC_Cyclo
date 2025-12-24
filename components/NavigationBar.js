'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('')

  // Gestion du scrollspy pour la page d'accueil uniquement
  useEffect(() => {
    if (pathname !== '/') return

    const handleScroll = () => {
      const sections = ['top', 'evenements', 'activites', 'club', 'actualites', 'contact']
      const scrollPosition = window.scrollY + 100 // Offset pour la navbar

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const isActive = (href, sectionId) => {
    if (pathname === '/') {
      return activeSection === sectionId
    }
    // Sur les sous-pages, on active en fonction du path
    if (sectionId === 'activites' && pathname.startsWith('/activites')) return true
    if (sectionId === 'actualites' && pathname.startsWith('/actualites')) return true
    if (sectionId === 'club' && (pathname === '/adhesion' || pathname === '/histoire')) return true
    return false
  }

  const NavItem = ({ name, href, sectionId }) => {
    const active = isActive(href, sectionId)
    
    return (
      <Link
        href={href}
        className={`relative px-4 py-4 text-sm font-bold uppercase tracking-wider transition-colors duration-200 
          ${active ? 'text-[#00b5e2]' : 'text-white hover:text-[#00b5e2]'}`}
      >
        {name}
        {active && (
          <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00b5e2] animate-fade-in-up"></span>
        )}
      </Link>
    )
  }

  return (
    <nav className="fixed w-full z-50 top-0 bg-[#00205b] text-white shadow-md">
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
          
          <div className="hidden lg:flex items-center gap-4">
            <NavItem name="Accueil" href="/#top" sectionId="top" />
            <NavItem name="Événements" href="/#evenements" sectionId="evenements" />
            <NavItem name="Activités" href="/#activites" sectionId="activites" />
            <NavItem name="Le Club" href="/#club" sectionId="club" />
            <NavItem name="Actualités" href="/#actualites" sectionId="actualites" />
            <NavItem name="Contact" href="/#contact" sectionId="contact" />
          </div>

          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#00205b] border-t border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col">
            {[
              { name: 'Accueil', href: '/#top' },
              { name: 'Événements', href: '/#evenements' },
              { name: 'Activités', href: '/#activites' },
              { name: 'Le Club', href: '/#club' },
              { name: 'Actualités', href: '/#actualites' },
              { name: 'Contact', href: '/#contact' },
            ].map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-[#00b5e2]" 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
