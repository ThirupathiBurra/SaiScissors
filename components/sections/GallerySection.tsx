'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { usePublicGallery } from '@/hooks/usePublicGallery'
import Image from 'next/image'

// Barbershop-themed SVG icon patterns for each gallery card
const BarberSVGs = [
  // Scissors
  () => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
      <circle cx="30" cy="30" r="16" stroke="currentColor" strokeWidth="6" />
      <circle cx="90" cy="30" r="16" stroke="currentColor" strokeWidth="6" />
      <line x1="43" y1="40" x2="100" y2="100" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <line x1="77" y1="40" x2="20" y2="100" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
    </svg>
  ),
  // Razor / Comb
  () => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
      <rect x="15" y="50" width="90" height="20" rx="4" stroke="currentColor" strokeWidth="5" />
      {[25, 37, 49, 61, 73, 85].map((x) => (
        <line key={x} x1={x} y1="50" x2={x} y2="35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      ))}
    </svg>
  ),
  // Barber pole
  () => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
      <rect x="45" y="10" width="30" height="100" rx="15" stroke="currentColor" strokeWidth="5" />
      <path d="M45 30 Q60 40 75 50 Q60 60 45 70 Q60 80 75 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  // Mirror
  () => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
      <ellipse cx="60" cy="50" rx="35" ry="40" stroke="currentColor" strokeWidth="5" />
      <rect x="53" y="88" width="14" height="20" rx="4" stroke="currentColor" strokeWidth="5" />
      <rect x="42" y="105" width="36" height="6" rx="3" stroke="currentColor" strokeWidth="4" />
    </svg>
  ),
  // Hair brush
  () => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
      <rect x="30" y="40" width="60" height="35" rx="6" stroke="currentColor" strokeWidth="5" />
      {[42, 52, 62, 72, 82].map((x) => (
        <line key={x} x1={x} y1="75" x2={x} y2="88" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      ))}
      <rect x="50" y="15" width="20" height="28" rx="8" stroke="currentColor" strokeWidth="5" />
    </svg>
  ),
  // Star / award
  () => (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
      <polygon
        points="60,15 70,45 102,45 76,63 86,95 60,75 34,95 44,63 18,45 50,45"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  ),
]

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { items, loading } = usePublicGallery()

  return (
    <section id="gallery" className="relative section-pad bg-[#0a0a0a]" ref={ref}>
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Our Work
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            The{' '}
            <span className="gold-text italic">Gallery</span>
          </h2>
          <p className="text-[#6B7280] text-base max-w-xl mx-auto">
            Every cut tells a story. See the craftsmanship that keeps our clients coming back.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 sm:gap-4">
          {items.map((item, i) => {
            const BGIcon = BarberSVGs[i % BarberSVGs.length]

            // Varying heights for visual interest
            const isTall = i === 0 || i === 4

            return (
              <motion.div
                key={item.id ?? `gallery-${i}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={isTall ? 'md:row-span-2' : 'row-span-1'}
              >
                <div className="gallery-item rounded-2xl overflow-hidden border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.35)] transition-all duration-400 h-full min-h-[180px] md:min-h-[220px]">
                  {/* Background gradient + decorative icon or Image */}
                  <div
                    className={`gallery-img relative w-full h-full bg-gradient-to-br ${(item as any).gradient || 'from-zinc-900 to-zinc-800'} flex items-center justify-center`}
                    style={{ minHeight: isTall ? '160px' : '140px' }}
                  >
                    {item.imageUrl && !item.imageUrl.startsWith('http') ? (
                       <Image src={item.imageUrl} alt={item.caption || 'Gallery Image'} fill className="object-cover opacity-60" />
                    ) : item.imageUrl ? (
                       <Image src={item.imageUrl} alt={item.caption || 'Gallery Image'} fill className="object-cover opacity-60" unoptimized />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#C9A84C] p-8">
                        <BGIcon />
                      </div>
                    )}

                    {/* Gold shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,168,76,0.06)] via-transparent to-[rgba(201,168,76,0.03)]" />

                    {/* Corner accent */}
                    <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${(item as any).accent || 'bg-amber-400'}`} />

                    {/* Hover overlay with caption */}
                    <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.3)] to-transparent flex flex-col justify-end p-5">
                      <p className="font-heading text-white font-semibold text-lg leading-tight">
                        {item.caption}
                      </p>
                      <p className="text-[#C9A84C] text-xs tracking-wide mt-1">{(item as any).subtitle || item.category}</p>
                    </div>

                     {/* Always-visible bottom caption strip — desktop only */}
                     <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent">
                       <p className="font-heading text-white text-sm font-medium">{item.caption}</p>
                       <p className="text-[#9CA3AF] text-xs mt-0.5">{(item as any).subtitle || item.category}</p>
                     </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#4B5563] text-sm mb-4">Follow us on Instagram for daily transformations</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-sm font-medium hover:bg-[rgba(201,168,76,0.08)] hover:border-[rgba(201,168,76,0.6)] transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @saiscissors
          </a>
        </motion.div>
      </div>
    </section>
  )
}
