'use client'

import { motion } from 'framer-motion'
import { Check, Flame } from 'lucide-react'
import { BOOKING_SERVICES, type BookingService } from '@/lib/booking-constants'
import { cn } from '@/lib/utils'

interface ServiceSelectorProps {
  selected: BookingService | null
  onSelect: (service: BookingService) => void
}

export default function ServiceSelector({ selected, onSelect }: ServiceSelectorProps) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
          Choose a <span className="gold-text italic">Service</span>
        </h2>
        <p className="text-[#6B7280] text-sm">
          Select the service you&apos;d like to book. All services include complimentary grooming products.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BOOKING_SERVICES.map((service, i) => {
          const Icon = service.icon
          const isSelected = selected?.id === service.id

          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: 'easeOut' }}
              onClick={() => onSelect(service)}
              aria-pressed={isSelected}
              className={cn(
                'group relative text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer',
                isSelected
                  ? 'bg-[rgba(201,168,76,0.08)] border-[#C9A84C] shadow-[0_0_25px_rgba(201,168,76,0.15)]'
                  : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.07)] hover:border-[rgba(201,168,76,0.3)] hover:bg-[rgba(201,168,76,0.04)]'
              )}
            >
              {/* Popular badge */}
              {service.popular && (
                <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.3)] text-[#C9A84C] text-[10px] font-semibold uppercase tracking-wide">
                  <Flame size={9} />
                  Popular
                </span>
              )}

              {/* Selected checkmark */}
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
                {/* Icon */}
                <div
                  className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 border',
                    isSelected
                      ? 'bg-gradient-to-br from-[rgba(201,168,76,0.25)] to-[rgba(201,168,76,0.1)] border-[rgba(201,168,76,0.4)]'
                      : 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.06)] group-hover:border-[rgba(201,168,76,0.3)]'
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      'transition-colors duration-300',
                      isSelected ? 'text-[#E2C97E]' : 'text-[#6B7280] group-hover:text-[#C9A84C]'
                    )}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3
                      className={cn(
                        'font-heading text-base font-semibold leading-tight transition-colors duration-200',
                        isSelected ? 'text-[#E2C97E]' : 'text-white group-hover:text-[#E2C97E]'
                      )}
                    >
                      {service.name}
                    </h3>
                    <span
                      className={cn(
                        'text-sm font-bold flex-shrink-0 transition-colors duration-200',
                        isSelected ? 'gold-text' : 'text-[#9CA3AF]'
                      )}
                    >
                      {service.priceDisplay}
                    </span>
                  </div>
                  <p className="text-[#6B7280] text-xs leading-relaxed mb-2 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-[#4B5563]">
                    <span className={cn(isSelected ? 'text-[#C9A84C]' : '')}>
                      ⏱ {service.durationDisplay}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#2D2D2D]" />
                    <span>{service.category}</span>
                  </div>
                </div>
              </div>

              {/* Bottom gold line on selected */}
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

      {/* Hint */}
      {!selected && (
        <p className="text-center text-[#4B5563] text-xs mt-6">
          Tap a service above to continue →
        </p>
      )}
    </div>
  )
}
