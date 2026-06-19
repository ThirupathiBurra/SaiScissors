'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Clock, Zap, AlertCircle } from 'lucide-react'
import {
  generateSlots,
  getBookableDates,
  getNextAvailableSlot,
  formatDateShort,
  formatDateLong,
  isSameDay,
  getSlotSummary,
  isPeakHour,
} from '@/lib/availability'
import { type Barber, type TimeSlot } from '@/lib/booking-constants'
import { cn } from '@/lib/utils'

interface SlotPickerProps {
  barber: Barber
  selectedDate: Date | null
  selectedSlot: TimeSlot | null
  onDateSelect: (date: Date) => void
  onSlotSelect: (slot: TimeSlot) => void
}

const SLOT_STATUS_COLORS = {
  available: {
    base: 'bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-[#9CA3AF] hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.07)] hover:text-white cursor-pointer',
    selected: 'bg-[rgba(201,168,76,0.15)] border-[#C9A84C] text-[#E2C97E] shadow-[0_0_12px_rgba(201,168,76,0.2)] cursor-pointer',
  },
  busy: 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.04)] text-[#2D2D2D] line-through cursor-not-allowed',
  past: 'bg-transparent border-[rgba(255,255,255,0.04)] text-[#2D2D2D] cursor-not-allowed',
  closed: 'bg-transparent border-[rgba(255,255,255,0.04)] text-[#2D2D2D] cursor-not-allowed',
}

export default function SlotPicker({
  barber,
  selectedDate,
  selectedSlot,
  onDateSelect,
  onSlotSelect,
}: SlotPickerProps) {
  const dates = useMemo(() => getBookableDates(14), [])
  const [dateScrollIndex, setDateScrollIndex] = useState(0)
  const [mobileVisibleCount] = useState(5) // 5 on mobile for larger tap targets
  // We compute visibleDates in render based on viewport; use 7 as default for SSR
  const visibleDates = dates.slice(dateScrollIndex, dateScrollIndex + 7)

  // Auto-select today if nothing selected
  useEffect(() => {
    if (!selectedDate) onDateSelect(dates[0])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const slots = useMemo(() => {
    if (!selectedDate) return []
    return generateSlots(selectedDate, barber.id)
  }, [selectedDate, barber.id])

  const nextSlot = useMemo(() => getNextAvailableSlot(slots), [slots])
  const summary = useMemo(() => getSlotSummary(slots), [slots])

  // Group slots into morning / afternoon / evening
  const grouped = useMemo(() => {
    const morning: TimeSlot[] = []
    const afternoon: TimeSlot[] = []
    const evening: TimeSlot[] = []
    slots.forEach((s) => {
      const hour = parseInt(s.time.split(':')[0])
      if (hour < 12) morning.push(s)
      else if (hour < 17) afternoon.push(s)
      else evening.push(s)
    })
    return { morning, afternoon, evening }
  }, [slots])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
          Pick a <span className="gold-text italic">Date & Time</span>
        </h2>
        <p className="text-[#6B7280] text-sm">
          Showing availability for <span className="text-[#C9A84C]">{barber.name}</span>. Green = open, dimmed = booked.
        </p>
      </div>

      {/* ── Date Carousel ─────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#6B7280] uppercase tracking-wider font-medium">Select Date</span>
          <div className="flex gap-1">
            <button
              onClick={() => setDateScrollIndex((p) => Math.max(0, p - 1))}
              disabled={dateScrollIndex === 0}
              className="w-7 h-7 rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#6B7280] hover:text-white hover:border-[rgba(201,168,76,0.3)] disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => setDateScrollIndex((p) => Math.min(dates.length - 7, p + 1))}
              disabled={dateScrollIndex >= dates.length - 7}
              className="w-7 h-7 rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#6B7280] hover:text-white hover:border-[rgba(201,168,76,0.3)] disabled:opacity-30 transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5">
          {dates.slice(dateScrollIndex, dateScrollIndex + 7).map((date) => {
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
            const isToday = isSameDay(date, new Date())
            const daySlots = generateSlots(date, barber.id)
            const hasFreeSlot = daySlots.some((s) => s.status === 'available')

            return (
              <button
                key={date.toISOString()}
                onClick={() => { onDateSelect(date); }}
                className={cn(
                  'flex flex-col items-center py-2 px-0.5 sm:py-2.5 sm:px-1 rounded-xl border text-center transition-all duration-200 cursor-pointer',
                  isSelected
                    ? 'bg-gradient-to-b from-[#C9A84C] to-[#A07830] border-[#C9A84C] text-black shadow-[0_0_16px_rgba(201,168,76,0.3)]'
                    : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.07)] text-[#9CA3AF] hover:border-[rgba(201,168,76,0.3)] hover:text-white'
                )}
              >
                <span className={cn('text-[10px] font-medium uppercase tracking-wide', isSelected ? 'text-black/70' : 'text-[#4B5563]')}>
                  {date.toLocaleDateString('en-IN', { weekday: 'short' }).slice(0, 2)}
                </span>
                <span className={cn('text-base font-bold mt-0.5', isSelected ? 'text-black' : 'text-white')}>
                  {date.getDate()}
                </span>
                {/* Slot availability dot */}
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full mt-1',
                    isSelected
                      ? 'bg-black/40'
                      : hasFreeSlot
                      ? 'bg-emerald-400'
                      : 'bg-[#374151]'
                  )}
                />
                {isToday && !isSelected && (
                  <span className="text-[8px] text-[#C9A84C] font-medium mt-0.5">TODAY</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Slot Summary Bar ───────────────────────────── */}
      {selectedDate && (
        <div className="flex items-center gap-4 mb-6 px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
          <div className="text-xs text-[#6B7280] flex-1">
            <span className="text-white font-medium">{formatDateShort(selectedDate)}</span>
            {' · '}
            <span className="text-emerald-400">{summary.available} open</span>
            {' · '}
            <span className="text-[#4B5563]">{summary.busy} booked</span>
          </div>
          {nextSlot && (
            <div className="flex items-center gap-1.5 text-xs text-[#C9A84C]">
              <Zap size={12} />
              <span>Next: <strong>{nextSlot.displayTime}</strong></span>
            </div>
          )}
        </div>
      )}

      {/* ── Time Slots ─────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Date heading */}
            <p className="text-xs text-[#6B7280] mb-4 font-medium">
              {formatDateLong(selectedDate)}
            </p>

            {/* Slot groups */}
            {(
              [
                { label: '🌅 Morning', slots: grouped.morning },
                { label: '☀️ Afternoon', slots: grouped.afternoon },
                { label: '🌆 Evening', slots: grouped.evening },
              ] as { label: string; slots: TimeSlot[] }[]
            ).map(({ label, slots: groupSlots }) =>
              groupSlots.length === 0 ? null : (
                <div key={label} className="mb-6">
                  <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium mb-3">{label}</p>
                  <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 gap-2">
                    {groupSlots.map((slot) => {
                      const isSelected = selectedSlot?.time === slot.time
                      const isPeak = isPeakHour(slot.time)

                      let className = ''
                      if (slot.status === 'available') {
                        className = isSelected
                          ? SLOT_STATUS_COLORS.available.selected
                          : SLOT_STATUS_COLORS.available.base
                      } else {
                        className = SLOT_STATUS_COLORS[slot.status]
                      }

                      return (
                        <motion.button
                          key={slot.time}
                          whileHover={slot.status === 'available' ? { scale: 1.03 } : {}}
                          whileTap={slot.status === 'available' ? { scale: 0.97 } : {}}
                          onClick={() => slot.status === 'available' && onSlotSelect(slot)}
                          disabled={slot.status !== 'available'}
                          aria-label={`${slot.displayTime} - ${slot.status}`}
                          className={cn(
                            'relative py-2 px-1 rounded-xl border text-xs font-medium text-center transition-all duration-200',
                            className
                          )}
                        >
                          {slot.displayTime}
                          {/* Peak indicator */}
                          {isPeak && slot.status === 'available' && !isSelected && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500" title="Peak hour" />
                          )}
                          {isSelected && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C9A84C]"
                            />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              )
            )}

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.05)] text-[11px] text-[#4B5563]">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-[rgba(201,168,76,0.4)] bg-[rgba(201,168,76,0.07)]" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)]" /> Booked</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Peak hour</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-[#C9A84C] bg-[rgba(201,168,76,0.15)]" /> Selected</span>
            </div>

            {/* No slots message */}
            {summary.available === 0 && (
              <div className="flex items-center gap-2 mt-4 p-4 rounded-xl bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.15)]">
                <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">No available slots on this day. Please try another date.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timing note */}
      <div className="flex items-start gap-2 mt-6 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
        <Clock size={13} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
        <p className="text-xs text-[#4B5563] leading-relaxed">
          <span className="text-[#6B7280]">Tip:</span> Morning slots (before 12 PM) are typically less busy and recommended for longer treatments.
        </p>
      </div>
    </div>
  )
}
