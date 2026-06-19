'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HIGHLIGHTS } from '@/lib/constants'

export default function HighlightsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="highlights"
      className="relative section-pad bg-[#0a0a0a]"
      ref={ref}
    >
      {/* Subtle top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.2)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            The Saiscissors{' '}
            <span className="gold-text italic">Difference</span>
          </h2>
          <p className="text-[#6B7280] text-base max-w-xl mx-auto">
            Every visit is crafted to give you a premium grooming experience you can trust.
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="group glass-card p-6 h-full flex flex-col items-center text-center gap-4 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_30px_rgba(201,168,76,0.1)] transition-all duration-400 cursor-default">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[rgba(201,168,76,0.15)] to-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center group-hover:scale-110 group-hover:border-[rgba(201,168,76,0.45)] group-hover:shadow-[0_0_20px_rgba(201,168,76,0.2)] transition-all duration-400">
                    <Icon
                      size={22}
                      className="text-[#C9A84C] group-hover:text-[#E2C97E] transition-colors duration-300"
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="font-heading text-base font-semibold text-white mb-2 group-hover:text-[#E2C97E] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="mt-auto w-8 h-[2px] rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
