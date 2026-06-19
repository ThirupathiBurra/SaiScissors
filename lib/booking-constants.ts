import {
  Scissors,
  Sparkles,
  Star,
  Heart,
  Zap,
  Clock,
  Award,
  Droplets,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BookingService {
  id: string
  name: string
  description: string
  price: number
  priceDisplay: string
  durationMinutes: number
  durationDisplay: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
  category: string
  popular?: boolean
}

export interface Barber {
  id: string
  name: string
  role: string
  expertise: string[]
  rating: number
  reviewCount: number
  experience: string
  available: boolean
  topStylist?: boolean
  initial: string
  colorFrom: string
  colorTo: string
  bio: string
}

export interface TimeSlot {
  time: string          // "HH:MM" 24h
  displayTime: string   // "9:30 AM"
  status: 'available' | 'busy' | 'past' | 'closed'
}

export interface BookingData {
  service: BookingService | null
  barber: Barber | null
  date: Date | null
  slot: TimeSlot | null
  customerName: string
  customerPhone: string
  customerNotes: string
}

export interface BookingConfirmation {
  referenceId: string
  service: BookingService
  barber: Barber
  date: Date
  slot: TimeSlot
  customerName: string
  customerPhone: string
  estimatedEnd: string
}

// ─── Shop Configuration ───────────────────────────────────────────────────────
export const SHOP_CONFIG = {
  openHour: 7,
  openMinute: 30,
  closeHourWeekday: 22,   // 10 PM
  closeMinuteWeekday: 0,
  closeHourSunday: 21,    // 9 PM
  closeMinuteSunday: 0,
  slotIntervalMinutes: 30,
  maxAdvanceDays: 14,     // can book up to 14 days ahead
  peakHours: ['17:00', '18:00', '19:00', '20:00'], // 5–8 PM
  recommendedWindow: '9:00 AM – 12:00 PM',
  whatsappNumber: '918106244047',
}

// ─── Booking Services ─────────────────────────────────────────────────────────
export const BOOKING_SERVICES: BookingService[] = [
  {
    id: 'haircut',
    name: 'Classic Haircut',
    description: 'Precision cut tailored to your face shape. Clean, sharp, timeless.',
    price: 80,
    priceDisplay: '₹ 80',
    durationMinutes: 30,
    durationDisplay: '30 min',
    icon: Scissors,
    category: 'Hair',
    popular: true,
  },
  {
    id: 'beard',
    name: 'Beard Trim & Style',
    description: 'Sculpted beard shaping with razor detailing for a refined look.',
    price: 50,
    priceDisplay: '₹ 50',
    durationMinutes: 20,
    durationDisplay: '20 min',
    icon: Sparkles,
    category: 'Beard',
    popular: true,
  },
  {
    id: 'hair-spa',
    name: 'Hair Spa',
    description: 'Deep nourishing treatment to restore strength, shine, and scalp health.',
    price: 350,
    priceDisplay: '₹ 350',
    durationMinutes: 45,
    durationDisplay: '45 min',
    icon: Droplets,
    category: 'Treatment',
  },
  {
    id: 'facial',
    name: 'Facial Treatment',
    description: 'Premium skin care ritual for a refreshed, glowing complexion.',
    price: 200,
    priceDisplay: '₹ 200',
    durationMinutes: 40,
    durationDisplay: '40 min',
    icon: Heart,
    category: 'Skin',
  },
  {
    id: 'coloring',
    name: 'Hair Coloring',
    description: 'Expert color application with quality products for a natural finish.',
    price: 400,
    priceDisplay: '₹ 400+',
    durationMinutes: 60,
    durationDisplay: '60 min',
    icon: Zap,
    category: 'Hair',
  },
  {
    id: 'massage',
    name: 'Head Massage',
    description: 'Traditional oil massage to relieve stress and promote deep relaxation.',
    price: 100,
    priceDisplay: '₹ 100',
    durationMinutes: 25,
    durationDisplay: '25 min',
    icon: Clock,
    category: 'Wellness',
  },
  {
    id: 'haircut-beard',
    name: 'Haircut + Beard Combo',
    description: 'Our most popular combo — perfect cut with a crisp beard style.',
    price: 120,
    priceDisplay: '₹ 120',
    durationMinutes: 45,
    durationDisplay: '45 min',
    icon: Award,
    category: 'Combo',
    popular: true,
  },
  {
    id: 'deluxe',
    name: 'Deluxe Grooming',
    description: 'Full experience: haircut, beard, facial & head massage. The premium package.',
    price: 450,
    priceDisplay: '₹ 450',
    durationMinutes: 90,
    durationDisplay: '90 min',
    icon: Star,
    category: 'Package',
  },
]

// ─── Barbers / Stylists ───────────────────────────────────────────────────────
export const BARBERS: Barber[] = [
  {
    id: 'raju',
    name: 'Raju K.',
    role: 'Senior Master Stylist',
    expertise: ['Classic Cuts', 'Fades', 'Hair Spa'],
    rating: 4.9,
    reviewCount: 42,
    experience: '7 years',
    available: true,
    topStylist: true,
    initial: 'R',
    colorFrom: '#C9A84C',
    colorTo: '#A07830',
    bio: 'Our most sought-after stylist, known for flawless fades and timeless cuts.',
  },
  {
    id: 'kiran',
    name: 'Kiran S.',
    role: 'Beard & Grooming Expert',
    expertise: ['Beard Styling', 'Shaving', 'Facials'],
    rating: 4.8,
    reviewCount: 31,
    experience: '5 years',
    available: true,
    topStylist: false,
    initial: 'K',
    colorFrom: '#4A90D9',
    colorTo: '#2C5F8A',
    bio: 'Specialist in beard shaping and razor work. Perfectionist in every stroke.',
  },
  {
    id: 'suresh',
    name: 'Suresh R.',
    role: 'Color & Treatment Specialist',
    expertise: ['Hair Coloring', 'Hair Spa', 'Treatments'],
    rating: 4.7,
    reviewCount: 25,
    experience: '4 years',
    available: true,
    topStylist: false,
    initial: 'S',
    colorFrom: '#7C3AED',
    colorTo: '#4C1D95',
    bio: 'Skilled in modern coloring techniques and scalp treatments for healthy hair.',
  },
  {
    id: 'any',
    name: 'Any Available',
    role: 'First Available Stylist',
    expertise: ['All Services'],
    rating: 4.8,
    reviewCount: 98,
    experience: 'Varies',
    available: true,
    topStylist: false,
    initial: '★',
    colorFrom: '#10B981',
    colorTo: '#047857',
    bio: 'Prefer the fastest slot? We\'ll assign the next available professional.',
  },
]

// ─── Mock Busy Slots Per Barber ───────────────────────────────────────────────
// These represent pre-booked slots — will be replaced by Firestore in Stage 3
export const MOCK_BUSY_SLOTS: Record<string, string[]> = {
  raju:   ['09:00', '09:30', '11:00', '14:00', '14:30', '17:00', '18:30', '19:00'],
  kiran:  ['08:00', '10:30', '13:00', '15:00', '16:30', '20:00'],
  suresh: ['07:30', '09:00', '12:30', '16:00', '17:30', '19:30'],
  any:    [],
}

// ─── Step Metadata ────────────────────────────────────────────────────────────
export const BOOKING_STEPS = [
  { id: 1, label: 'Service',  short: '01' },
  { id: 2, label: 'Barber',   short: '02' },
  { id: 3, label: 'Schedule', short: '03' },
  { id: 4, label: 'Details',  short: '04' },
  { id: 5, label: 'Confirm',  short: '05' },
]

// ─── Week Days ────────────────────────────────────────────────────────────────
export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const WEEK_DAYS_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// ─── Shop Schedule Display ────────────────────────────────────────────────────
export const SHOP_SCHEDULE = [
  { day: 'Monday – Saturday', open: '7:30 AM', close: '10:00 PM', peak: '5:00 PM – 8:00 PM' },
  { day: 'Sunday',            open: '9:00 AM', close: '9:00 PM',  peak: '4:00 PM – 7:00 PM' },
]
