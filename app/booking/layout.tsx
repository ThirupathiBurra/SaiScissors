import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "Book Appointment | Saiscissors Men's Parlour",
  description:
    "Book your premium grooming appointment at Saiscissors Men's Parlour A/C in Bhupalpally. Choose your service, stylist, and preferred time slot — quick and easy.",
  openGraph: {
    title: 'Book Appointment | Saiscissors',
    description: "Premium men's parlour booking in Bhupalpally, Telangana.",
    type: 'website',
  },
}

export default function BookingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
