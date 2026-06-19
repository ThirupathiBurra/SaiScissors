'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { BUSINESS } from '@/lib/constants'
import { usePublicReviews } from '@/hooks/usePublicReviews'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'fill-[#C9A84C] text-[#C9A84C]' : 'fill-[rgba(201,168,76,0.15)] text-[rgba(201,168,76,0.15)]'}
        />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { reviews, loading } = usePublicReviews()

  return (
    <section id="reviews" className="relative section-pad bg-[#0d0d0d]" ref={ref}>
      {/* Separator lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#C9A84C] opacity-[0.025] blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Client Reviews
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our{' '}
            <span className="gold-text italic">Clients Say</span>
          </h2>
          <p className="text-[#6B7280] text-base max-w-xl mx-auto">
            Real words from real customers. Rated {BUSINESS.rating}★ by {BUSINESS.reviews}+ happy clients.
          </p>
        </motion.div>

        {/* Overall Rating Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 sm:px-8 py-4 rounded-2xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)] w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
            <div className="text-center">
              <p className="font-heading text-5xl font-bold gold-text">{BUSINESS.rating}</p>
              <div className="flex justify-center mt-1">
                <StarRating rating={Math.floor(BUSINESS.rating)} />
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[rgba(201,168,76,0.2)]" />
            <div>
              <p className="text-white font-semibold text-lg">{BUSINESS.reviews}+ Reviews</p>
              <p className="text-[#6B7280] text-sm mt-0.5">Verified customers</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-[rgba(201,168,76,0.2)]" />
            <div>
              <p className="text-white font-semibold text-lg">Google Rated</p>
              <p className="text-[#6B7280] text-sm mt-0.5">Bhupalpally&apos;s favourite</p>
            </div>
          </div>
        </motion.div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((testimonial, i) => (
            <motion.div
              key={testimonial.id || testimonial.customerName || i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="group glass-card h-full p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_25px_rgba(201,168,76,0.08)] hover:-translate-y-1.5 transition-all duration-400">
                {/* Quote icon */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.15)] flex items-center justify-center">
                    <Quote size={18} className="text-[#C9A84C]" />
                  </div>
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review text */}
                <blockquote className="text-[#9CA3AF] text-sm leading-relaxed flex-1 italic">
                  &ldquo;{testimonial.text || (testimonial as any).review}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                    {(testimonial as any).initial || testimonial.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.customerName || (testimonial as any).name}</p>
                    <p className="text-[#6B7280] text-xs">{(testimonial as any).role || 'Customer'}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-[#4B5563] flex items-center gap-1">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
