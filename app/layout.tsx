import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import DevStatusBanner from '@/components/DevStatusBanner'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Saiscissors Men's Parlour A/C — Premium Grooming in Bhupalpally",
  description:
    "Experience elite men's grooming at Saiscissors in Bhupalpally, Telangana. Expert haircuts, beard styling, hair spa, facials, and more. Rated 4.5★ by 98+ satisfied clients. Open till 10 PM.",
  keywords: [
    "men's parlour Bhupalpally",
    'Saiscissors',
    'hair salon Telangana',
    'men grooming Bhupalpally',
    'beard trim',
    'haircut parlour',
    'AC salon',
  ],
  openGraph: {
    title: "Saiscissors Men's Parlour A/C",
    description:
      "Premium men's grooming parlour in Bhupalpally, Telangana. Haircuts, beard styling, spa treatments and more. Open till 10 PM.",
    type: 'website',
    locale: 'en_IN',
    siteName: "Saiscissors Men's Parlour",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Saiscissors Men's Parlour A/C — Bhupalpally",
    description:
      "Elite men's grooming. Premium haircuts, beard styling & spa in Bhupalpally, Telangana.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#0a0a0a] text-white font-body antialiased">
        <DevStatusBanner />
        {children}
      </body>
    </html>
  )
}
