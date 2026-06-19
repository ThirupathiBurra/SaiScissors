'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowRight, Navigation } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="relative section-pad bg-[#0a0a0a]" ref={ref}>
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A84C] opacity-[0.025] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Visit Us
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Find{' '}
            <span className="gold-text italic">Saiscissors</span>
          </h2>
          <p className="text-[#6B7280] text-base max-w-xl mx-auto">
            Drop in or call ahead. We&apos;re conveniently located in the heart of Bhupalpally, ready to serve you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Address */}
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-[#C9A84C]" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base font-semibold text-white mb-1.5">Our Location</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{BUSINESS.address}</p>
                <a
                  href={BUSINESS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#C9A84C] hover:text-[#E2C97E] transition-colors font-medium"
                >
                  <Navigation size={12} />
                  Get Directions on Google Maps
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-[#C9A84C]" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-base font-semibold text-white mb-1.5">Call Us</h3>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="text-2xl font-heading font-bold gold-text hover:opacity-80 transition-opacity"
                >
                  {BUSINESS.phone}
                </a>
                <p className="text-[#6B7280] text-xs mt-1.5">Available during business hours</p>
                <a
                  href={`tel:${BUSINESS.phoneRaw}`}
                  className="btn-gold inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:shadow-[0_0_20px_rgba(201,168,76,0.35)] hover:scale-[1.03] transition-all duration-300"
                >
                  <Phone size={14} />
                  Call Now
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="glass-card p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-[#C9A84C]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-base font-semibold text-white">Opening Hours</h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Open
                  </span>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {BUSINESS.openHours.map((h, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="text-[#9CA3AF] text-sm">{h.day}</span>
                      <span className="text-white text-sm font-medium">{h.hours}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.05)]">
                  <p className="text-[#6B7280] text-xs">
                    🎉 Walk-ins welcome. Appointments preferred during peak hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Instagram */}
            <div className="glass-card p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#833AB4] to-[#FD1D1D] flex items-center justify-center flex-shrink-0">
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Follow on Instagram</p>
                  <p className="text-[#6B7280] text-xs">@saiscissors · Daily updates</p>
                </div>
              </div>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-4 py-2 rounded-full border border-[rgba(255,255,255,0.1)] text-white text-xs font-medium hover:bg-white/10 transition-all flex items-center gap-1.5"
              >
                Follow
                <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>

          {/* Right: Map placeholder + CTA card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Map placeholder */}
            <div className="glass-card overflow-hidden flex-1 min-h-[300px] lg:min-h-0 relative group">
              {/* Simulated map panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#161616] to-[#0f0f0f]">
                {/* Grid lines simulating map */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />

                {/* Road lines */}
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-[rgba(201,168,76,0.12)]" />
                <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-[rgba(201,168,76,0.07)]" />
                <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-[rgba(201,168,76,0.07)]" />
                <div className="absolute left-1/3 top-0 bottom-0 w-[2px] bg-[rgba(201,168,76,0.07)]" />
                <div className="absolute left-2/3 top-0 bottom-0 w-[2px] bg-[rgba(201,168,76,0.07)]" />

                {/* Location pin */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center shadow-[0_0_30px_rgba(201,168,76,0.5)]">
                      <MapPin size={22} className="text-black" fill="black" />
                    </div>
                    <div className="w-3 h-3 bg-[#C9A84C] rounded-full mt-1 shadow-[0_0_10px_rgba(201,168,76,0.6)]" />
                    <div className="w-1 h-4 bg-gradient-to-b from-[#C9A84C] to-transparent" />
                  </motion.div>

                  {/* Pulse ring */}
                  <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-0 w-14 h-14 rounded-full border-2 border-[#C9A84C] opacity-40 animate-ping" />
                </div>

                {/* Label */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="glass-card px-4 py-2 text-center">
                    <p className="text-white text-xs font-semibold">Saiscissors Men&apos;s Parlour</p>
                    <p className="text-[#C9A84C] text-[10px] mt-0.5">Opp Bus Depot, Bhupalpally</p>
                  </div>
                </div>

                {/* Open map button */}
                <div className="absolute top-4 right-4">
                  <a
                    href={BUSINESS.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card px-3 py-1.5 text-xs text-[#C9A84C] flex items-center gap-1.5 hover:border-[rgba(201,168,76,0.5)] transition-all"
                  >
                    <Navigation size={11} />
                    Open Maps
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="glass-card p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,168,76,0.05)] to-transparent" />
              <div className="relative">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  Ready for a{' '}
                  <span className="gold-text italic">Fresh Look?</span>
                </h3>
                <p className="text-[#6B7280] text-sm mb-6">
                  Call us or walk in. No appointment needed, but highly recommended!
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${BUSINESS.phoneRaw}`}
                    className="btn-gold flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] hover:scale-[1.02] transition-all duration-300"
                  >
                    <Phone size={16} />
                    {BUSINESS.phone}
                  </a>
                  <a
                    href={BUSINESS.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-semibold text-sm border border-[rgba(201,168,76,0.3)] hover:bg-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.5)] transition-all duration-300"
                  >
                    <MapPin size={16} className="text-[#C9A84C]" />
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
