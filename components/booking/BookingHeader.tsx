'use client'

import { motion } from 'framer-motion'
import { Scissors, Star } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'

export default function BookingHeader() {
  return (
    <section className="relative pt-10 sm:pt-16 pb-8 sm:pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.04)_0%,transparent_70%)]" />
      </div>

      {/* Decorative scissors watermark */}
      <div className="absolute right-0 top-12 opacity-[0.03] pointer-events-none select-none">
        <Scissors size={280} className="text-[#C9A84C] rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-5">
            <a href="/" className="text-xs text-[#4B5563] hover:text-[#C9A84C] transition-colors">Home</a>
            <span className="text-[#2D2D2D]">/</span>
            <span className="text-xs text-[#9CA3AF]">Book Appointment</span>
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.07)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-[#C9A84C]">Booking Available · Closes {BUSINESS.closingTime}</span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            Book Your <br />
            <span className="gold-text italic">Premium</span> Experience
          </h1>

          <p className="text-[#6B7280] text-base leading-relaxed mb-6 max-w-lg">
            Reserve your slot at Saiscissors in minutes. Choose your service, pick your stylist,
            and lock in your preferred time — all without a phone call.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={13} className="fill-[#C9A84C] text-[#C9A84C]" />
                ))}
                <Star size={13} className="fill-[#C9A84C]/50 text-[#C9A84C]/50" />
              </div>
              <span className="text-sm text-[#9CA3AF]">{BUSINESS.rating} · {BUSINESS.reviews}+ reviews</span>
            </div>
            <span className="text-[#2D2D2D]">·</span>
            <span className="text-xs text-[#6B7280]">No advance payment</span>
            <span className="text-[#2D2D2D]">·</span>
            <span className="text-xs text-[#6B7280]">Free cancellation</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent" />
    </section>
  )
}
