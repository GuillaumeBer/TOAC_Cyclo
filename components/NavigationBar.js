'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function NavigationBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const NavItem = ({ name, href }) => (
    <Link
      href={href}
      className="relative px-4 py-4 text-sm font-bold uppercase tracking-wider transition-colors duration-200 text-white hover:text-[#00b5e2]"
    >
      {name}
    </Link>
  )

  return (
    <nav className="fixed w-full z-50 top-0 bg-[#00205b] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image 
              src="/images/logo-toac.png" 
              alt="Logo TOAC Cyclo" 
              width={50}
              height={50}
              className="w-12 h-12"
            />
            <div className="font-bold text-2xl tracking-tight leading-none">
              TOAC<span className="text-[#00b5e2]">CYCLO</span>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-4">
            <NavItem name="Accueil" href="#top" />
            <NavItem name="Événements" href="#evenements" />
            <NavItem name="Le Club" href="#club" />
            <NavItem name="Actualités" href="#actualites" />
            <NavItem name="Contact" href="#contact" />
          </div>

          <div className="hidden lg:block ml-6">
            <Link 
              href="/espace-membre"
              className="px-6 py-2 rounded-sm text-sm font-bold transition-all duration-300 border bg-transparent text-white border-white hover:bg-white hover:text-[#00205b]"
            >
              Espace Membre
            </Link>
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
            <Link href="#top" className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-[#00b5e2]" onClick={() => setIsMobileMenuOpen(false)}>
              Accueil
            </Link>
            <Link href="#evenements" className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-[#00b5e2]" onClick={() => setIsMobileMenuOpen(false)}>
              Événements
            </Link>
            <Link href="#club" className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-[#00b5e2]" onClick={() => setIsMobileMenuOpen(false)}>
              Le Club
            </Link>
            <Link href="#actualites" className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-[#00b5e2]" onClick={() => setIsMobileMenuOpen(false)}>
              Actualités
            </Link>
            <Link href="#contact" className="px-4 py-3 text-sm font-bold uppercase tracking-wider text-white hover:text-[#00b5e2]" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
            <Link 
              href="/espace-membre"
              className="mx-4 mt-4 px-6 py-3 rounded-sm text-sm font-bold text-center transition-all duration-300 border border-white text-white hover:bg-white hover:text-[#00205b]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Espace Membre
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
