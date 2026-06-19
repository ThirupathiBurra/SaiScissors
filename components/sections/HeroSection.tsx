'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { Star, Clock, CheckCircle, Phone, CalendarDays, ChevronDown } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: 'easeOut' as const },
  }),
}

export default function HeroSection() {

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#C9A84C] opacity-[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C9A84C] opacity-[0.03] blur-[80px] pointer-events-none" />

      {/* Diagonal lines pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(201,168,76,0.5) 0px,
            rgba(201,168,76,0.5) 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
      />

      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-60" />

      {/* ── Floating decorative scissors icon ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute right-8 top-1/3 -translate-y-1/2 pointer-events-none hidden lg:block"
      >
        <svg width="320" height="320" viewBox="0 0 100 100" fill="none" className="text-[#C9A84C]">
          <circle cx="25" cy="25" r="12" stroke="currentColor" strokeWidth="4" fill="none" />
          <circle cx="75" cy="25" r="12" stroke="currentColor" strokeWidth="4" fill="none" />
          <line x1="35" y1="32" x2="80" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <line x1="65" y1="32" x2="20" y2="80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl">

          {/* Status Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 mb-7"
          >
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open Now
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.08)] text-[#C9A84C] text-xs font-medium">
              <Clock size={11} />
              Closes {BUSINESS.closingTime}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6"
          >
            <span className="text-white">Crafting </span>
            <span
              className="gold-text italic"
            >
              Confidence
            </span>
            <span className="text-white block mt-1">One Cut at a Time</span>
          </motion.h1>

          {/* Supporting tagline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="text-[#9CA3AF] text-base sm:text-xl mb-8 font-light tracking-wide"
          >
            <span className="hidden sm:inline">Premium Haircuts&nbsp;&nbsp;•&nbsp;&nbsp;Beard Styling&nbsp;&nbsp;•&nbsp;&nbsp;Hair Spa&nbsp;&nbsp;•&nbsp;&nbsp;Grooming</span>
            <span className="sm:hidden flex flex-wrap gap-x-3 gap-y-1 text-sm">
              <span>Premium Haircuts</span><span className="text-[#C9A84C]">/</span>
              <span>Beard Styling</span><span className="text-[#C9A84C]">/</span>
              <span>Hair Spa</span><span className="text-[#C9A84C]">/</span>
              <span>Grooming</span>
            </span>
          </motion.p>

          {/* Trust badges */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-2 sm:gap-4 mb-8 sm:mb-10"
          >
            {/* Rating */}
            <div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[rgba(201,168,76,0.07)] border border-[rgba(201,168,76,0.15)]">
              <div className="flex items-center gap-0.5">
                {[1,2,3,4].map((i) => (
                  <Star key={i} size={13} className="fill-[#C9A84C] text-[#C9A84C]" />
                ))}
                <Star size={13} className="text-[#C9A84C]" style={{ fill: 'url(#half)' }} />
              </div>
              <span className="text-white font-semibold text-sm">{BUSINESS.rating}</span>
              <span className="text-[#6B7280] text-sm">({BUSINESS.reviews} reviews)</span>
            </div>

            {/* Verified */}
            <div className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]">
              <CheckCircle size={14} className="text-[#C9A84C]" />
              <span className="text-[#9CA3AF] text-sm">Premium Parlour</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)]">
              <span className="text-[#9CA3AF] text-sm">📍 Bhupalpally</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Link
              href="/booking"
              className="btn-gold group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <CalendarDays size={17} />
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-white font-semibold text-sm border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.05)] hover:bg-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <Phone size={16} className="text-[#C9A84C]" />
              Call Now
            </a>
          </motion.div>

          {/* Address sub-line */}
          <motion.p
            custom={5}
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="mt-8 text-xs text-[#4B5563] flex items-center gap-1.5"
          >
            <span className="text-[#C9A84C]">📍</span>
            {BUSINESS.address}
          </motion.p>
        </div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4B5563]"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  )
}
