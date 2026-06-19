'use client'

import { Scissors, Phone, MapPin, Clock } from 'lucide-react'
import { BUSINESS, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#080808] border-t border-[rgba(201,168,76,0.1)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center">
                <Scissors size={17} className="text-black" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-lg font-bold text-white">Saiscissors</span>
                <span className="text-[10px] text-[#9CA3AF] tracking-widest uppercase">Men&apos;s Parlour A/C</span>
              </div>
            </div>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-5 max-w-[240px]">
              Crafting confidence with precision grooming, premium service, and a welcoming environment in Bhupalpally.
            </p>
            {/* Telugu name */}
            <p className="text-[#4B5563] text-xs font-body mb-6">{BUSINESS.teluguName}</p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[#9CA3AF] hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.06)] transition-all duration-200"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-[#9CA3AF] hover:text-[#C9A84C] hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.06)] transition-all duration-200"
              >
                <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white mb-5 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-[#6B7280] hover:text-[#C9A84C] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white mb-5 tracking-wider uppercase">
              Opening Hours
            </h3>
            <ul className="flex flex-col gap-3">
              {BUSINESS.openHours.map((h, i) => (
                <li key={i} className="flex flex-col gap-0.5">
                  <span className="text-xs text-[#9CA3AF] uppercase tracking-wide">{h.day}</span>
                  <div className="flex items-center gap-1.5 text-sm text-white">
                    <Clock size={12} className="text-[#C9A84C]" />
                    {h.hours}
                  </div>
                </li>
              ))}
              <li className="mt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open Now · Closes {BUSINESS.closingTime}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white mb-5 tracking-wider uppercase">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(201,168,76,0.15)] transition-all">
                    <Phone size={14} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-0.5">Phone</p>
                    <p className="text-sm text-white group-hover:text-[#C9A84C] transition-colors">{BUSINESS.phone}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(201,168,76,0.15)] transition-all">
                    <MapPin size={14} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] mb-0.5">Address</p>
                    <p className="text-sm text-white leading-relaxed group-hover:text-[#C9A84C] transition-colors">
                      {BUSINESS.address}
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4B5563] text-center sm:text-left">
            © {new Date().getFullYear()} {BUSINESS.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-[#4B5563]">
            Bhupalpally, Telangana — 506169
          </p>
        </div>
      </div>
    </footer>
  )
}
