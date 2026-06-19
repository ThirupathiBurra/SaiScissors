import {
  Scissors,
  Sparkles,
  Wind,
  Shield,
  Heart,
  Zap,
  Clock,
  Star,
} from 'lucide-react'

// ─── Business Info ──────────────────────────────────────────────────────────
export const BUSINESS = {
  name: 'Saiscissors',
  fullName: "Saiscissors Men's Parlour A/C",
  teluguName: 'సెయిసైసోర్స్ మెన్స్ పార్లర్ ఎ/సి',
  tagline: 'Crafting Confidence, One Cut at a Time',
  subTagline: 'Premium Haircuts • Beard Styling • Hair Spa • Grooming',
  address: 'Opp Bus Depot, Subash Colony Road, Bhupalpally Main Road, Bhupalpally, Telangana 506169',
  phone: '081062 44047',
  phoneRaw: '08106244047',
  rating: 4.5,
  reviews: 98,
  status: 'Open',
  closingTime: '10 PM',
  type: "Hair Salon / Men's Parlour",
  location: 'Bhupalpally, Telangana',
  instagram: 'https://instagram.com',
  googleMaps: 'https://maps.google.com/?q=Saiscissors+Bhupalpally',
  whatsapp: 'https://wa.me/918106244047',
  bookingUrl: '/booking',
  openHours: [
    { day: 'Monday – Saturday', hours: '7:30 AM – 10:00 PM' },
    { day: 'Sunday', hours: '9:00 AM – 9:00 PM' },
  ],
}

// ─── Navigation ─────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

// ─── Highlights ──────────────────────────────────────────────────────────────
export const HIGHLIGHTS = [
  {
    icon: Scissors,
    title: 'Expert Stylists',
    description: 'Skilled professionals trained in modern cuts and classic barbering techniques.',
  },
  {
    icon: Wind,
    title: 'Air Conditioned',
    description: 'Stay cool and comfortable in our fully air-conditioned parlour.',
  },
  {
    icon: Zap,
    title: 'Modern Equipment',
    description: 'State-of-the-art grooming tools for a precise, polished finish every time.',
  },
  {
    icon: Shield,
    title: 'Hygiene First',
    description: 'Sanitised tools and clean workstations maintained for every single client.',
  },
  {
    icon: Heart,
    title: 'Client Satisfaction',
    description: 'Rated 4.5★ by 98+ happy clients who keep coming back.',
  },
]

// ─── Services ────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    name: 'Classic Haircut',
    description: 'Precision cuts tailored to your face shape. Clean, sharp, and timeless.',
    price: '₹ 80',
    duration: '30 min',
    icon: Scissors,
  },
  {
    name: 'Beard Trim & Style',
    description: 'Sculpted beard shaping with razor detailing for a refined look.',
    price: '₹ 50',
    duration: '20 min',
    icon: Sparkles,
  },
  {
    name: 'Hair Spa',
    description: 'Deep nourishing treatment to restore strength, shine, and scalp health.',
    price: '₹ 350',
    duration: '45 min',
    icon: Star,
  },
  {
    name: 'Facial Treatment',
    description: 'Premium skin care ritual for a refreshed, glowing complexion.',
    price: '₹ 200',
    duration: '40 min',
    icon: Heart,
  },
  {
    name: 'Hair Coloring',
    description: 'Expert color application with quality products for a natural finish.',
    price: '₹ 400+',
    duration: '60 min',
    icon: Zap,
  },
  {
    name: 'Head Massage',
    description: 'Traditional oil massage to relieve stress and promote relaxation.',
    price: '₹ 100',
    duration: '25 min',
    icon: Clock,
  },
]

// ─── Gallery Items ────────────────────────────────────────────────────────────
export const GALLERY_ITEMS = [
  {
    caption: 'Classic Cuts',
    subtitle: 'Timeless precision',
    imageUrl: '/gallery/ClassicCuts.png',
    gradient: 'from-zinc-900 to-zinc-800',
    accent: 'bg-amber-400',
  },
  {
    caption: 'Beard Styling',
    subtitle: 'Defined & refined',
    imageUrl: '/gallery/BeaardStyling.png',
    gradient: 'from-stone-900 to-stone-800',
    accent: 'bg-yellow-500',
  },
  {
    caption: 'Modern Grooming',
    subtitle: 'Contemporary looks',
    imageUrl: '/gallery/ModernGrooming.png',
    gradient: 'from-neutral-900 to-neutral-800',
    accent: 'bg-amber-300',
  },
  {
    caption: 'Clean Finish',
    subtitle: 'Sharp & polished',
    imageUrl: '/gallery/CleanFinish.png',
    gradient: 'from-zinc-900 to-neutral-800',
    accent: 'bg-yellow-400',
  },
  {
    caption: 'Hair Spa',
    subtitle: 'Deep restoration',
    imageUrl: '/gallery/HairSpa.png',
    gradient: 'from-stone-900 to-zinc-900',
    accent: 'bg-amber-500',
  },
  {
    caption: 'The Full Look',
    subtitle: 'Head to toe groomed',
    imageUrl: '/gallery/FullLook.png',
    gradient: 'from-neutral-900 to-stone-900',
    accent: 'bg-yellow-300',
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: 'Ravi Kumar',
    role: 'Regular Client',
    review:
      'Best haircut experience in Bhupalpally! The place is clean, AC, and the staff are very professional. I come here every two weeks without fail.',
    rating: 5,
    initial: 'R',
  },
  {
    name: 'Suresh Reddy',
    role: 'Local Resident',
    review:
      'The beard trim is absolutely perfect. They take their time and get every detail right. Highly recommended for anyone who cares about grooming.',
    rating: 5,
    initial: 'S',
  },
  {
    name: 'Mahesh Naik',
    role: 'Satisfied Customer',
    review:
      'The hair spa was incredibly relaxing. Great ambience, very hygienic, and reasonably priced. Saiscissors is simply the best parlour in town.',
    rating: 4,
    initial: 'M',
  },
]
