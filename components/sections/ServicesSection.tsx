'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Clock, Scissors, Sparkles, Star, Heart, Zap } from 'lucide-react'
import { usePublicServices } from '@/hooks/usePublicServices'

const iconMap: Record<string, any> = {
  'haircut': Scissors,
  'beard': Sparkles,
  'spa': Star,
  'facial': Heart,
  'combo': Zap,
};

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { services, loading } = usePublicServices()

  return (
    <section
      id="services"
      className="relative section-pad bg-[#0d0d0d]"
      ref={ref}
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.15)] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A84C] opacity-[0.025] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Our Services
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">
            Premium{' '}
            <span className="gold-text italic">Grooming Services</span>
          </h2>
          <p className="text-[#6B7280] text-base max-w-xl mx-auto">
            From classic cuts to luxury treatments — each service is performed with expert precision and care.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = (service as any).icon || iconMap[service.category] || Scissors;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <article className="group glass-card h-full p-6 flex flex-col gap-4 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_30px_rgba(201,168,76,0.1)] hover:-translate-y-1.5 transition-all duration-400">
                  {/* Top row: icon + price */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(201,168,76,0.18)] to-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center group-hover:scale-110 group-hover:border-[rgba(201,168,76,0.5)] group-hover:shadow-[0_0_16px_rgba(201,168,76,0.2)] transition-all duration-300">
                      <Icon size={20} className="text-[#C9A84C]" />
                    </div>

                    <div className="text-right">
                      <span className="font-heading text-xl font-bold gold-text">
                        {typeof service.price === 'number' ? `₹ ${service.price}` : service.price}
                      </span>
                      <p className="text-[10px] text-[#4B5563] tracking-wider uppercase mt-0.5">onwards</p>
                    </div>
                  </div>

                  {/* Name + description */}
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-white mb-2 group-hover:text-[#E2C97E] transition-colors duration-300">
                      {service.name}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Duration + book button */}
                  <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.05)]">
                    <div className="flex items-center gap-1.5 text-[#9CA3AF] text-xs">
                      <Clock size={12} className="text-[#C9A84C]" />
                      {service.durationMinutes ? `${service.durationMinutes} min` : '—'}
                    </div>
                    <Link href="/booking" className="text-xs font-semibold text-[#C9A84C] border border-[rgba(201,168,76,0.25)] px-3 py-1.5 rounded-full hover:bg-[rgba(201,168,76,0.12)] hover:border-[rgba(201,168,76,0.5)] transition-all duration-200">
                      Book Now →
                    </Link>
                  </div>
                </article>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-[#6B7280] text-sm mb-5">
            All services include complimentary tea/coffee & premium grooming products.
          </p>
          <Link
            href="/booking"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-black font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] hover:scale-[1.03] transition-all duration-300"
          >
            View All & Book
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
