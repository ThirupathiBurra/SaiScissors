'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Scissors, Phone } from 'lucide-react'
import { NAV_LINKS, BUSINESS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[rgba(201,168,76,0.12)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}>
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="Saiscissors Home"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.3)] group-hover:shadow-[0_0_25px_rgba(201,168,76,0.5)] transition-shadow duration-300">
                <Scissors className="w-4.5 h-4.5 text-black" size={18} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-lg font-700 text-white tracking-wide group-hover:text-[#E2C97E] transition-colors duration-300">
                  Saiscissors
                </span>
                <span className="text-[10px] text-[#9CA3AF] tracking-[0.15em] uppercase font-body">
                  Men&apos;s Parlour A/C
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-1" role="navigation">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-2 text-sm font-medium text-[#9CA3AF] hover:text-white transition-colors duration-200 relative group rounded-lg hover:bg-white/5"
                  >
                    {link.label}
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] group-hover:w-4/5 transition-all duration-300 rounded-full" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${BUSINESS.phoneRaw}`}
                className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-[#C9A84C] transition-colors duration-200 px-3 py-2"
              >
                <Phone size={15} />
                <span className="hidden lg:block">{BUSINESS.phone}</span>
              </a>
              <Link
                href="/booking"
                className="btn-gold px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl border border-[rgba(201,168,76,0.2)] text-[#9CA3AF] hover:text-white hover:border-[rgba(201,168,76,0.5)] transition-all duration-200"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-expanded={isMobileOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[280px] z-50 bg-[#111111] border-l border-[rgba(201,168,76,0.15)] flex flex-col md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(255,255,255,0.06)]">
                <span className="font-heading text-lg text-white">Menu</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Items */}
              <ul className="flex flex-col gap-1 px-4 py-4 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-4 py-3 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-white/5 transition-all duration-200 text-base font-medium"
                    >
                      {link.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Drawer Footer */}
              <div className="px-4 py-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col gap-3">
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-sm font-medium hover:bg-[rgba(201,168,76,0.08)] transition-all"
                >
                  <Phone size={15} />
                  {BUSINESS.phone}
                </a>
                <Link
                  href="/booking"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-gold w-full py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:shadow-gold transition-all text-center block"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
