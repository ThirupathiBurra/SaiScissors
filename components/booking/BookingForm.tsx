'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react'
import { type BookingService, type Barber, type TimeSlot } from '@/lib/booking-constants'
import { formatDateLong } from '@/lib/availability'
import { cn } from '@/lib/utils'

interface BookingFormProps {
  service: BookingService
  barber: Barber
  date: Date
  slot: TimeSlot
  initialName: string
  initialPhone: string
  initialNotes: string
  onFormChange: (field: 'customerName' | 'customerPhone' | 'customerNotes', value: string) => void
  onSubmit: () => void
}

function FieldWrapper({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-[#9CA3AF] uppercase tracking-wider flex items-center gap-1">
        {label}
        {required && <span className="text-[#C9A84C]">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 text-xs text-red-400"
        >
          <AlertCircle size={11} /> {error}
        </motion.p>
      )}
    </div>
  )
}

function InputBase({
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  hasError,
  maxLength,
  icon: Icon,
}: {
  id: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  hasError?: boolean
  maxLength?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 bg-[rgba(255,255,255,0.03)]',
        focused
          ? 'border-[#C9A84C] shadow-[0_0_0_3px_rgba(201,168,76,0.08)]'
          : hasError
          ? 'border-red-500/50'
          : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)]'
      )}
    >
      {Icon && <Icon size={15} className={cn('flex-shrink-0 transition-colors duration-200', focused ? 'text-[#C9A84C]' : 'text-[#4B5563]')} />}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent text-sm text-white placeholder-[#4B5563] outline-none"
      />
    </div>
  )
}

export default function BookingForm({
  service,
  barber,
  date,
  slot,
  initialName,
  initialPhone,
  initialNotes,
  onFormChange,
  onSubmit,
}: BookingFormProps) {
  const [touched, setTouched] = useState({ name: false, phone: false })

  const nameError = touched.name && initialName.trim().length < 2 ? 'Please enter your full name' : ''
  const phoneError =
    touched.phone && !/^[6-9]\d{9}$/.test(initialPhone.replace(/\s/g, ''))
      ? 'Enter a valid 10-digit mobile number'
      : ''
  const isValid = initialName.trim().length >= 2 && /^[6-9]\d{9}$/.test(initialPhone.replace(/\s/g, ''))

  const handleSubmit = () => {
    setTouched({ name: true, phone: true })
    if (isValid) onSubmit()
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
          Your <span className="gold-text italic">Details</span>
        </h2>
        <p className="text-[#6B7280] text-sm">
          Almost done! Fill in your details to confirm this appointment.
        </p>
      </div>

      {/* Booking Summary Strip */}
      <div className="mb-8 p-4 rounded-2xl bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.15)]">
        <p className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-3 font-medium">Your Booking</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Service', value: service.name },
            { label: 'Stylist', value: barber.name },
            { label: 'Date', value: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) },
            { label: 'Time', value: slot.displayTime },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] text-[#6B7280] uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-5">
        <FieldWrapper label="Your Full Name" htmlFor="customer-name" required error={nameError}>
          <InputBase
            id="customer-name"
            placeholder="e.g. Ravi Kumar"
            value={initialName}
            icon={User}
            onChange={(v) => {
              onFormChange('customerName', v)
              setTouched((p) => ({ ...p, name: true }))
            }}
            hasError={!!nameError}
          />
        </FieldWrapper>

        <FieldWrapper label="Mobile Number" htmlFor="customer-phone" required error={phoneError}>
          <InputBase
            id="customer-phone"
            type="tel"
            placeholder="e.g. 9876543210"
            value={initialPhone}
            icon={Phone}
            maxLength={10}
            onChange={(v) => {
              onFormChange('customerPhone', v.replace(/\D/g, ''))
              setTouched((p) => ({ ...p, phone: true }))
            }}
            hasError={!!phoneError}
          />
          <p className="text-[11px] text-[#4B5563]">
            We&apos;ll send a WhatsApp confirmation to this number.
          </p>
        </FieldWrapper>

        <FieldWrapper label="Special Notes (optional)" htmlFor="customer-notes">
          <div
            className="px-4 py-3 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(255,255,255,0.15)] focus-within:border-[#C9A84C] focus-within:shadow-[0_0_0_3px_rgba(201,168,76,0.08)] transition-all duration-200"
          >
            <div className="flex gap-3">
              <MessageSquare size={15} className="text-[#4B5563] mt-0.5 flex-shrink-0" />
              <textarea
                id="customer-notes"
                placeholder="Any preferences, allergies, or special requests..."
                value={initialNotes}
                onChange={(e) => onFormChange('customerNotes', e.target.value)}
                rows={3}
                maxLength={300}
                className="flex-1 bg-transparent text-sm text-white placeholder-[#4B5563] outline-none resize-none"
              />
            </div>
          </div>
          <p className="text-[11px] text-[#4B5563] text-right">{initialNotes.length}/300</p>
        </FieldWrapper>
      </div>

      {/* Appointment info recap */}
      <div className="mt-6 p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
        <p className="text-xs text-[#6B7280] leading-relaxed">
          📅 <span className="text-white">{formatDateLong(date)}</span> at{' '}
          <span className="text-white">{slot.displayTime}</span>
          {' · '}⏱ {service.durationDisplay} session
          {' · '}💰 {service.priceDisplay}
        </p>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={isValid ? { scale: 1.02 } : {}}
        whileTap={isValid ? { scale: 0.98 } : {}}
        onClick={handleSubmit}
        className={cn(
          'btn-gold w-full mt-6 py-4 rounded-full font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2',
          isValid
            ? 'bg-gradient-to-r from-[#C9A84C] to-[#E2C97E] text-black hover:shadow-[0_0_30px_rgba(201,168,76,0.4)]'
            : 'bg-[rgba(255,255,255,0.05)] text-[#4B5563] cursor-not-allowed'
        )}
      >
        {isValid ? (
          <>
            <CheckCircle size={16} />
            Confirm Appointment
          </>
        ) : (
          'Fill in required fields to continue'
        )}
      </motion.button>

      <p className="text-center text-[11px] text-[#4B5563] mt-3">
        No payment required. This sends a booking request to Saiscissors.
      </p>
    </div>
  )
}
