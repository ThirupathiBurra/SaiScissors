'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import BookingHeader from '@/components/booking/BookingHeader'
import StepIndicator from '@/components/booking/StepIndicator'
import ServiceSelector from '@/components/booking/ServiceSelector'
import BarberSelector from '@/components/booking/BarberSelector'
import SlotPicker from '@/components/booking/SlotPicker'
import BookingForm from '@/components/booking/BookingForm'
import BookingSummary from '@/components/booking/BookingSummary'
import BookingSuccessState from '@/components/booking/BookingSuccessState'
import ScheduleInfoCard from '@/components/booking/ScheduleInfoCard'

import {
  type BookingService,
  type Barber,
  type TimeSlot,
  type BookingData,
  type BookingConfirmation,
} from '@/lib/booking-constants'
import { generateReferenceId } from '@/lib/availability'
import { cn } from '@/lib/utils'
import { bookingRepository } from '@/repositories/bookingRepository'
import { BOOKING_STATUS } from '@/constants/bookingStatus'

// ── Step IDs ──────────────────────────────────────────────
const TOTAL_STEPS = 5

// ── Step labels (for CTA buttons) ────────────────────────
const STEP_NEXT_LABELS: Record<number, string> = {
  1: 'Choose Stylist →',
  2: 'Pick a Time →',
  3: 'Enter Details →',
  4: 'Review & Confirm →',
}

// ── Slide animation variants ──────────────────────────────
function slideVariants(direction: 1 | -1) {
  return {
    initial: { opacity: 0, x: direction * 40 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -direction * 30 },
  }
}

// ── Review Step (Step 5) ──────────────────────────────────
function ReviewStep({
  data,
  onSubmit,
  isSubmitting,
}: {
  data: BookingData
  onSubmit: () => void
  isSubmitting: boolean
}) {
  const { service, barber, date, slot, customerName, customerPhone, customerNotes } = data

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
          Review & <span className="gold-text italic">Confirm</span>
        </h2>
        <p className="text-[#6B7280] text-sm">
          Everything looks good? Hit confirm to send your booking request.
        </p>
      </div>

      <div className="glass-card p-6 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: 'Service', value: service?.name },
            { label: 'Price', value: service?.priceDisplay },
            { label: 'Duration', value: service?.durationDisplay },
            { label: 'Stylist', value: barber?.name },
            { label: 'Date', value: date?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) },
            { label: 'Time', value: slot?.displayTime },
            { label: 'Your Name', value: customerName },
            { label: 'Phone', value: customerPhone },
          ].map((item) => (
            <div key={item.label} className="border-b border-[rgba(255,255,255,0.05)] pb-3 last:border-0 last:pb-0">
              <p className="text-[10px] text-[#4B5563] uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-white">{item.value || '—'}</p>
            </div>
          ))}
          {customerNotes && (
            <div className="sm:col-span-2 border-b border-[rgba(255,255,255,0.05)] pb-3">
              <p className="text-[10px] text-[#4B5563] uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-[#9CA3AF]">{customerNotes}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.15)] mb-6">
        <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.15)] flex items-center justify-center flex-shrink-0">
          <span className="text-sm">💬</span>
        </div>
        <p className="text-xs text-[#6B7280] leading-relaxed">
          After confirmation, the shop will <span className="text-white">call or WhatsApp you</span> to verify your slot. No payment is required in advance.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`btn-gold w-full py-4 rounded-full font-semibold text-sm bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] text-black transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]'}`}
      >
        {isSubmitting ? 'Sending Request...' : '✓ Send Booking Request'}
      </motion.button>
      <p className="text-center text-[11px] text-[#4B5563] mt-3">
        This sends a request to the parlour — not an instant confirmation.
      </p>
    </div>
  )
}

// ── Main Booking Page ─────────────────────────────────────
export default function BookingPage() {
  const [step, setStep] = useState<number>(1)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null)

  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    barber: null,
    date: null,
    slot: null,
    customerName: '',
    customerPhone: '',
    customerNotes: '',
  })

  // ── Navigation helpers ──────────────────────────────────
  const goNext = useCallback(() => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }, [])

  // ── Data setters ────────────────────────────────────────
  const handleServiceSelect = (service: BookingService) => {
    setBookingData((p) => ({ ...p, service }))
  }
  const handleBarberSelect = (barber: Barber) => {
    setBookingData((p) => ({ ...p, barber, slot: null })) // reset slot if barber changes
  }
  const handleDateSelect = (date: Date) => {
    setBookingData((p) => ({ ...p, date, slot: null }))
  }
  const handleSlotSelect = (slot: TimeSlot) => {
    setBookingData((p) => ({ ...p, slot }))
  }
  const handleFormChange = (
    field: 'customerName' | 'customerPhone' | 'customerNotes',
    value: string
  ) => {
    setBookingData((p) => ({ ...p, [field]: value }))
  }

  // ── Step 4 → 5 transition (form submit) ─────────────────
  const handleFormSubmit = () => {
    setDirection(1)
    setStep(5)
  }

  // ── Final submission ─────────────────────────────────────
  const handleFinalSubmit = async () => {
    setIsSubmitting(true)
    try {
      const docId = await bookingRepository.createBooking({
        serviceId: bookingData.service!.id,
        serviceName: bookingData.service!.name,
        barberId: bookingData.barber!.id,
        barberName: bookingData.barber!.name,
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone,
        bookingDate: bookingData.date!.toISOString(),
        timeSlot: bookingData.slot!.displayTime,
        status: BOOKING_STATUS.PENDING,
        notes: bookingData.customerNotes,
      })

      const conf: BookingConfirmation = {
        referenceId: docId,
        service: bookingData.service!,
        barber: bookingData.barber!,
        date: bookingData.date!,
        slot: bookingData.slot!,
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone,
        estimatedEnd: '', // computed inside success screen
      }
      setConfirmation(conf)
      setIsSuccess(true)
    } catch (error) {
      console.error('Failed to create booking:', error)
      alert('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Reset for "Book Another" ─────────────────────────────
  const handleReset = () => {
    setBookingData({
      service: null, barber: null, date: null, slot: null,
      customerName: '', customerPhone: '', customerNotes: '',
    })
    setStep(1)
    setDirection(1)
    setIsSuccess(false)
    setConfirmation(null)
  }

  // ── Validate step to enable Next button ──────────────────
  const canProceed: Record<number, boolean> = {
    1: !!bookingData.service,
    2: !!bookingData.barber,
    3: !!bookingData.date && !!bookingData.slot,
    4: false, // form handles its own submit
    5: false, // review + confirm button inside
  }

  // ── Success screen ───────────────────────────────────────
  if (isSuccess && confirmation) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        {/* Navbar space */}
        <div className="h-[72px]" />
        <BookingSuccessState confirmation={confirmation} onBookAnother={handleReset} />
      </div>
    )
  }

  // ── Booking wizard ───────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navbar spacer */}
      <div className="h-[72px]" />

      {/* Booking header / hero */}
      <BookingHeader />

      {/* Step indicator */}
      <div className="sticky top-[72px] z-30 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <StepIndicator currentStep={step} />
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 md:py-12 pb-28 sm:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

          {/* ── Left: Step content ─────────────────────── */}
          <div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={{
                  initial: (d: number) => ({ opacity: 0, x: d * 40 }),
                  animate: { opacity: 1, x: 0 },
                  exit:    (d: number) => ({ opacity: 0, x: -d * 30 }),
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {step === 1 && (
                  <ServiceSelector
                    selected={bookingData.service}
                    onSelect={handleServiceSelect}
                  />
                )}

                {step === 2 && (
                  <BarberSelector
                    selected={bookingData.barber}
                    onSelect={handleBarberSelect}
                  />
                )}

                {step === 3 && bookingData.barber && (
                  <SlotPicker
                    barber={bookingData.barber}
                    selectedDate={bookingData.date}
                    selectedSlot={bookingData.slot}
                    onDateSelect={handleDateSelect}
                    onSlotSelect={handleSlotSelect}
                  />
                )}

                {step === 4 && bookingData.service && bookingData.barber && bookingData.date && bookingData.slot && (
                  <BookingForm
                    service={bookingData.service}
                    barber={bookingData.barber}
                    date={bookingData.date}
                    slot={bookingData.slot}
                    initialName={bookingData.customerName}
                    initialPhone={bookingData.customerPhone}
                    initialNotes={bookingData.customerNotes}
                    onFormChange={handleFormChange}
                    onSubmit={handleFormSubmit}
                  />
                )}

                {step === 5 && (
                  <ReviewStep data={bookingData} onSubmit={handleFinalSubmit} isSubmitting={isSubmitting} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* ── Navigation buttons (steps 1-3) — desktop only ─── */}
            {step <= 3 && (
              <motion.div
                layout
                className="hidden sm:flex items-center justify-between mt-10 pt-6 border-t border-[rgba(255,255,255,0.06)]"
              >
                {/* Back */}
                {step > 1 ? (
                  <button
                    onClick={goBack}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[#9CA3AF] text-sm font-medium hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-all duration-200"
                  >
                    <ArrowLeft size={15} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {/* Next */}
                <motion.button
                  whileHover={canProceed[step] ? { scale: 1.02 } : {}}
                  whileTap={canProceed[step] ? { scale: 0.98 } : {}}
                  onClick={goNext}
                  disabled={!canProceed[step]}
                  className={cn(
                    'btn-gold flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300',
                    canProceed[step]
                      ? 'bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] text-black hover:shadow-[0_0_24px_rgba(201,168,76,0.4)]'
                      : 'bg-[rgba(255,255,255,0.05)] text-[#4B5563] cursor-not-allowed'
                  )}
                >
                  {STEP_NEXT_LABELS[step]}
                  <ArrowRight size={15} />
                </motion.button>
              </motion.div>
            )}

            {/* Back button for steps 4-5 (form handles forward) — desktop */}
            {step >= 4 && (
              <div className="hidden sm:block mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#9CA3AF] transition-colors"
                >
                  <ArrowLeft size={14} />
                  Go back and edit
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Sticky sidebar — desktop only ───────────── */}
          <div className="hidden lg:flex flex-col gap-5">
            <BookingSummary data={bookingData} currentStep={step} />
            <ScheduleInfoCard />
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom action bar ─────────────────── */}
      <div className="sm:hidden mobile-sticky-bottom px-4 pt-3">
        {step <= 3 && (
          <div className="flex items-center gap-3">
            {step > 1 ? (
              <button
                onClick={goBack}
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[#9CA3AF] text-sm font-medium min-w-[80px] hover:text-white transition-all"
              >
                <ArrowLeft size={15} />
                Back
              </button>
            ) : (
              <div className="min-w-[80px]" />
            )}
            <motion.button
              whileTap={canProceed[step] ? { scale: 0.97 } : {}}
              onClick={goNext}
              disabled={!canProceed[step]}
              className={cn(
                'btn-gold flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold transition-all duration-300',
                canProceed[step]
                  ? 'bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] text-black'
                  : 'bg-[rgba(255,255,255,0.05)] text-[#4B5563] cursor-not-allowed'
              )}
            >
              {STEP_NEXT_LABELS[step]}
              <ArrowRight size={15} />
            </motion.button>
          </div>
        )}
        {step >= 4 && (
          <div className="flex items-center gap-3">
            <button
              onClick={goBack}
              className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[#9CA3AF] text-sm font-medium"
            >
              <ArrowLeft size={15} />
              Back
            </button>
            <p className="flex-1 text-xs text-[#4B5563] text-center">Step {step} of {TOTAL_STEPS}</p>
          </div>
        )}
      </div>
    </div>
  )
}
