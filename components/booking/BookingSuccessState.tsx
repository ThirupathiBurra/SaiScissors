'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Phone, MessageCircle, MapPin, CalendarCheck, Scissors, RotateCcw } from 'lucide-react'
import { type BookingConfirmation } from '@/lib/booking-constants'
import { BUSINESS } from '@/lib/constants'
import { buildWhatsAppUrl, formatDateLong } from '@/lib/availability'

interface BookingSuccessStateProps {
  confirmation: BookingConfirmation
  onBookAnother: () => void
}

export default function BookingSuccessState({ confirmation, onBookAnother }: BookingSuccessStateProps) {
  const { referenceId, service, barber, date, slot, customerName, customerPhone } = confirmation

  const whatsappUrl = buildWhatsAppUrl({
    service: service.name,
    barber: barber.name,
    date: formatDateLong(date),
    time: slot.displayTime,
    name: customerName,
    phone: customerPhone,
  })

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-lg w-full text-center"
      >
        {/* Animated check icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 18 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center shadow-[0_0_50px_rgba(201,168,76,0.35)]"
        >
          <CheckCircle size={44} className="text-black" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3">
            Booking <span className="gold-text italic">Confirmed!</span>
          </h1>
          <p className="text-[#6B7280] text-base leading-relaxed">
            Your appointment request has been sent to Saiscissors. We&apos;ll see you soon, <span className="text-white font-medium">{customerName}</span>!
          </p>
        </motion.div>

        {/* Reference badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-full border border-[rgba(201,168,76,0.25)] bg-[rgba(201,168,76,0.07)]"
        >
          <CalendarCheck size={14} className="text-[#C9A84C]" />
          <span className="text-xs font-mono font-semibold text-[#E2C97E] tracking-widest">
            {referenceId}
          </span>
        </motion.div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="glass-card mt-8 p-6 text-left"
        >
          <p className="text-xs text-[#6B7280] uppercase tracking-wider font-medium mb-4 flex items-center gap-2">
            <Scissors size={12} className="text-[#C9A84C]" />
            Appointment Details
          </p>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            {[
              { label: 'Service', value: service.name },
              { label: 'Stylist', value: barber.name },
              { label: 'Date', value: formatDateLong(date) },
              { label: 'Time', value: slot.displayTime },
              { label: 'Duration', value: service.durationDisplay },
              { label: 'Price', value: service.priceDisplay },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] text-[#4B5563] uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-6 p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] text-left"
        >
          <p className="text-xs text-[#9CA3AF] font-medium mb-3">📋 What happens next?</p>
          {[
            { step: '1', text: 'The shop will call or WhatsApp you to confirm.' },
            { step: '2', text: 'Arrive 5 minutes early for a relaxed experience.' },
            { step: '3', text: 'Payment is made at the parlour — no advance needed.' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 mb-2 last:mb-0">
              <span className="w-5 h-5 rounded-full bg-[rgba(201,168,76,0.15)] border border-[rgba(201,168,76,0.25)] flex items-center justify-center text-[10px] font-bold text-[#C9A84C] flex-shrink-0 mt-0.5">
                {item.step}
              </span>
              <p className="text-xs text-[#6B7280] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm transition-all hover:shadow-[0_0_24px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle size={16} />
            Confirm on WhatsApp
          </a>

          {/* Call */}
          <a
            href={`tel:${BUSINESS.phoneRaw}`}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full border border-[rgba(201,168,76,0.3)] text-[#C9A84C] font-semibold text-sm hover:bg-[rgba(201,168,76,0.08)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Phone size={16} />
            Call the Shop
          </a>
        </motion.div>

        {/* Get directions + book another */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5"
        >
          <a
            href={BUSINESS.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#C9A84C] transition-colors"
          >
            <MapPin size={14} />
            Get Directions
          </a>
          <span className="hidden sm:block text-[#2D2D2D]">·</span>
          <button
            onClick={onBookAnother}
            className="flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-white transition-colors"
          >
            <RotateCcw size={14} />
            Book Another Slot
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
