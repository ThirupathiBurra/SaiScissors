'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Scissors, IndianRupee, ChevronRight } from 'lucide-react'
import { type BookingData } from '@/lib/booking-constants'
import { formatDateShort, getEstimatedEndTime } from '@/lib/availability'
import { BOOKING_STEPS } from '@/lib/booking-constants'
import { cn } from '@/lib/utils'

interface BookingSummaryProps {
  data: BookingData
  currentStep: number
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.05)] last:border-0">
      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0', highlight ? 'bg-[rgba(201,168,76,0.15)]' : 'bg-[rgba(255,255,255,0.04)]')}>
        <Icon size={13} className={highlight ? 'text-[#C9A84C]' : 'text-[#6B7280]'} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-[#4B5563] uppercase tracking-wide">{label}</p>
        <p className={cn('text-xs font-medium truncate', highlight ? 'text-[#E2C97E]' : 'text-[#9CA3AF]')}>{value}</p>
      </div>
    </div>
  )
}

export default function BookingSummary({ data, currentStep }: BookingSummaryProps) {
  const { service, barber, date, slot } = data

  const estimatedEnd =
    service && slot ? getEstimatedEndTime(slot, service.durationMinutes) : null

  const stepsTotal = BOOKING_STEPS.length
  const progress = ((currentStep - 1) / (stepsTotal - 1)) * 100

  return (
    <div className="glass-card p-5 sticky top-24">
      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center">
          <Scissors size={14} className="text-black" />
        </div>
        <div>
          <p className="text-xs text-[#6B7280] uppercase tracking-wide">Booking Summary</p>
          <p className="text-sm font-semibold text-white">Saiscissors</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-[10px] text-[#4B5563] mb-1.5">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Summary lines */}
      <AnimatePresence mode="popLayout">
        {service && (
          <motion.div key="service" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <SummaryRow icon={Scissors} label="Service" value={service.name} highlight />
          </motion.div>
        )}
        {barber && (
          <motion.div key="barber" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <SummaryRow icon={User} label="Stylist" value={barber.name} />
          </motion.div>
        )}
        {date && (
          <motion.div key="date" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <SummaryRow icon={Calendar} label="Date" value={formatDateShort(date)} />
          </motion.div>
        )}
        {slot && (
          <motion.div key="slot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <SummaryRow icon={Clock} label="Time" value={`${slot.displayTime}${estimatedEnd ? ` – ${estimatedEnd}` : ''}`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!service && !barber && !date && !slot && (
        <div className="py-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] flex items-center justify-center mx-auto mb-3">
            <Scissors size={20} className="text-[#2D2D2D]" />
          </div>
          <p className="text-xs text-[#4B5563]">Your selections will appear here</p>
        </div>
      )}

      {/* Price box */}
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.07)]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
              <IndianRupee size={12} />
              <span>Estimated total</span>
            </div>
            <span className="font-heading text-xl font-bold gold-text">{service.priceDisplay}</span>
          </div>
          <p className="text-[10px] text-[#4B5563] mt-1">Payment at parlour · No advance required</p>
        </motion.div>
      )}

      {/* Next step hint */}
      {currentStep < stepsTotal && (
        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-[#4B5563]">
          <ChevronRight size={12} />
          <span>Next: <span className="text-[#9CA3AF]">{BOOKING_STEPS[currentStep]?.label}</span></span>
        </div>
      )}
    </div>
  )
}
