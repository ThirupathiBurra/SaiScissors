/**
 * Availability Engine — lib/availability.ts
 *
 * Pure functions for generating and evaluating time slot availability.
 * All logic is self-contained and mock-data-driven for Stage 2.
 * In Stage 3, replace MOCK_BUSY_SLOTS with Firestore reads.
 */

import { SHOP_CONFIG, MOCK_BUSY_SLOTS, type TimeSlot } from './booking-constants'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format a Date object to "HH:MM" (24-hour) */
export function to24h(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

/** Format a Date object to "h:MM AM/PM" */
export function toDisplayTime(date: Date): string {
  const h = date.getHours()
  const m = date.getMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  const displayH = h % 12 || 12
  const displayM = m.toString().padStart(2, '0')
  return `${displayH}:${displayM} ${ampm}`
}

/** Add minutes to a Date and return a new Date */
export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60_000)
}

/** Format a Date as "Mon, 18 Jun" */
export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
}

/** Format a Date as "Monday, 18 June 2026" */
export function formatDateLong(date: Date): string {
  return date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

/** Check if two dates are the same calendar day */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/** Check if a date is Sunday */
export function isSunday(date: Date): boolean {
  return date.getDay() === 0
}

/** Get a deterministic "extra busy" flag — simulates random bookings */
function isDeterministicBusy(date: Date, barberId: string, time: string): boolean {
  // Seed based on: day-of-month + month + barber char + hour
  const [hourStr] = time.split(':')
  const hour = parseInt(hourStr)
  const seed = date.getDate() * 3 + date.getMonth() * 7 + barberId.charCodeAt(0) + hour
  // ~25% of remaining slots are "accidentally" busy
  return seed % 4 === 0
}

// ─── Core Functions ───────────────────────────────────────────────────────────

/**
 * Get shop closing time for a given date
 */
export function getCloseTime(date: Date): { hour: number; minute: number } {
  if (isSunday(date)) {
    return { hour: SHOP_CONFIG.closeHourSunday, minute: SHOP_CONFIG.closeMinuteSunday }
  }
  return { hour: SHOP_CONFIG.closeHourWeekday, minute: SHOP_CONFIG.closeMinuteWeekday }
}

/**
 * Generate all 30-minute time slots for a given date and barber.
 * Slots are marked: 'available' | 'busy' | 'past' | 'closed'
 */
export function generateSlots(date: Date, barberId: string): TimeSlot[] {
  const now = new Date()
  const closeTime = getCloseTime(date)

  // Build start and end times for this day
  const startTime = new Date(date)
  startTime.setHours(SHOP_CONFIG.openHour, SHOP_CONFIG.openMinute, 0, 0)

  const endTime = new Date(date)
  endTime.setHours(closeTime.hour, closeTime.minute, 0, 0)

  const predefinedBusy = MOCK_BUSY_SLOTS[barberId] ?? []
  const slots: TimeSlot[] = []

  let cursor = new Date(startTime)

  while (cursor < endTime) {
    const time24 = to24h(cursor)
    const displayTime = toDisplayTime(cursor)
    const slotEnd = addMinutes(cursor, SHOP_CONFIG.slotIntervalMinutes)

    let status: TimeSlot['status'] = 'available'

    // If today, mark past slots
    if (isSameDay(date, now) && cursor <= now) {
      status = 'past'
    }
    // Check pre-defined busy slots
    else if (predefinedBusy.includes(time24)) {
      status = 'busy'
    }
    // Deterministic pseudo-random busy
    else if (isDeterministicBusy(date, barberId, time24)) {
      status = 'busy'
    }

    slots.push({ time: time24, displayTime, status })
    cursor = slotEnd
  }

  return slots
}

/**
 * Get the next available slot from a list of generated slots.
 */
export function getNextAvailableSlot(slots: TimeSlot[]): TimeSlot | null {
  return slots.find((s) => s.status === 'available') ?? null
}

/**
 * Calculate estimated end time given a start slot and service duration.
 */
export function getEstimatedEndTime(slot: TimeSlot, durationMinutes: number): string {
  const [hour, minute] = slot.time.split(':').map(Number)
  const base = new Date()
  base.setHours(hour, minute, 0, 0)
  return toDisplayTime(addMinutes(base, durationMinutes))
}

/**
 * Generate the next N bookable dates starting from today.
 */
export function getBookableDates(count: number = 14): Date[] {
  const dates: Date[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }

  return dates
}

/**
 * Generate a short booking reference ID.
 * Format: SAI-YYYYMMDD-XXXX
 * In Stage 3 this will be a Firestore document ID.
 */
export function generateReferenceId(date: Date): string {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SAI-${y}${m}${d}-${rand}`
}

/**
 * Build a pre-filled WhatsApp booking message URL.
 */
export function buildWhatsAppUrl(params: {
  service: string
  barber: string
  date: string
  time: string
  name: string
  phone: string
}): string {
  const msg = [
    `Hello Saiscissors! 👋`,
    ``,
    `I'd like to book an appointment:`,
    `📋 Service: ${params.service}`,
    `💈 Stylist: ${params.barber}`,
    `📅 Date: ${params.date}`,
    `⏰ Time: ${params.time}`,
    `👤 Name: ${params.name}`,
    `📱 Phone: ${params.phone}`,
    ``,
    `Please confirm my slot. Thank you!`,
  ].join('\n')

  return `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`
}

/**
 * Slot availability summary for a day (used in schedule display).
 */
export function getSlotSummary(slots: TimeSlot[]): {
  total: number
  available: number
  busy: number
} {
  const available = slots.filter((s) => s.status === 'available').length
  const busy = slots.filter((s) => s.status === 'busy').length
  return { total: slots.length, available, busy }
}

/**
 * Check if a given time is within peak hours.
 */
export function isPeakHour(time24: string): boolean {
  return SHOP_CONFIG.peakHours.includes(time24.substring(0, 5))
}
