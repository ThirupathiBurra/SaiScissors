'use client'

import { motion } from 'framer-motion'
import { Star, Check, Award } from 'lucide-react'
import { BARBERS, type Barber } from '@/lib/booking-constants'
import { cn } from '@/lib/utils'

interface BarberSelectorProps {
  selected: Barber | null
  onSelect: (barber: Barber) => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={
            i <= Math.floor(rating)
              ? 'fill-[#C9A84C] text-[#C9A84C]'
              : 'fill-transparent text-[rgba(201,168,76,0.2)]'
          }
        />
      ))}
      <span className="ml-1 text-xs text-[#9CA3AF]">{rating}</span>
    </div>
  )
}

export default function BarberSelector({ selected, onSelect }: BarberSelectorProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
          Choose Your <span className="gold-text italic">Stylist</span>
        </h2>
        <p className="text-[#6B7280] text-sm">
          All our professionals are trained, certified, and dedicated to your best look.
        </p>
      </div>

      {/* Barber Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BARBERS.map((barber, i) => {
          const isSelected = selected?.id === barber.id
          const isAny = barber.id === 'any'

          return (
            <motion.button
              key={barber.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4, ease: 'easeOut' }}
              onClick={() => barber.available && onSelect(barber)}
              disabled={!barber.available}
              aria-pressed={isSelected}
              className={cn(
                'group relative text-left rounded-2xl border p-5 transition-all duration-300 cursor-pointer',
                isSelected
                  ? 'bg-[rgba(201,168,76,0.07)] border-[#C9A84C] shadow-[0_0_25px_rgba(201,168,76,0.12)]'
                  : barber.available
                  ? 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.07)] hover:border-[rgba(201,168,76,0.3)] hover:bg-[rgba(201,168,76,0.03)]'
                  : 'bg-[rgba(255,255,255,0.01)] border-[rgba(255,255,255,0.04)] opacity-50 cursor-not-allowed'
              )}
            >
              {/* Top Stylist badge */}
              {barber.topStylist && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)]">
                  <Award size={9} className="text-[#C9A84C]" />
                  <span className="text-[10px] font-semibold text-[#C9A84C] uppercase tracking-wide">Top Pick</span>
                </div>
              )}

              {/* Selected check */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#C9A84C] flex items-center justify-center"
                >
                  <Check size={11} className="text-black" strokeWidth={3} />
                </motion.div>
              )}

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${barber.colorFrom}, ${barber.colorTo})`,
                      boxShadow: isSelected ? `0 0 16px ${barber.colorFrom}40` : undefined,
                    }}
                  >
                    {barber.initial}
                  </div>
                  {/* Availability dot */}
                  <span
                    className={cn(
                      'absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#111]',
                      barber.available ? 'bg-emerald-400' : 'bg-[#4B5563]'
                    )}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      'font-heading text-base font-semibold leading-tight transition-colors duration-200',
                      isSelected ? 'text-[#E2C97E]' : 'text-white'
                    )}
                  >
                    {barber.name}
                  </h3>
                  <p className="text-[#9CA3AF] text-xs mb-2">{barber.role}</p>

                  {!isAny && <StarRating rating={barber.rating} />}

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {barber.expertise.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-medium border transition-colors duration-200',
                          isSelected
                            ? 'border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.1)] text-[#C9A84C]'
                            : 'border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] text-[#6B7280]'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-[#4B5563] text-xs leading-relaxed mt-3 border-t border-[rgba(255,255,255,0.05)] pt-3">
                {barber.bio}
              </p>

              {/* Experience + availability */}
              <div className="flex items-center justify-between mt-3">
                {!isAny && (
                  <span className="text-xs text-[#6B7280]">
                    🏆 {barber.experience} exp · {barber.reviewCount} reviews
                  </span>
                )}
                <span
                  className={cn(
                    'text-xs font-medium ml-auto',
                    barber.available ? 'text-emerald-400' : 'text-[#4B5563]'
                  )}
                >
                  {barber.available ? '● Available today' : '○ Fully booked'}
                </span>
              </div>

              {/* Selected bottom accent */}
              {isSelected && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] rounded-full"
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {!selected && (
        <p className="text-center text-[#4B5563] text-xs mt-6">
          Pick your preferred stylist or choose &quot;Any Available&quot; →
        </p>
      )}
    </div>
  )
}
