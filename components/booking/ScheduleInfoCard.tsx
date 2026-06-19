'use client'

import { motion } from 'framer-motion'
import { Clock, Sun, Sunset, Info, TrendingUp } from 'lucide-react'
import { SHOP_SCHEDULE, SHOP_CONFIG } from '@/lib/booking-constants'
import { cn } from '@/lib/utils'

export default function ScheduleInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Clock size={14} className="text-[#C9A84C]" />
        <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Shop Hours</p>
      </div>

      {/* Schedule rows */}
      {SHOP_SCHEDULE.map((row) => (
        <div
          key={row.day}
          className="mb-3 last:mb-0 pb-3 last:pb-0 border-b border-[rgba(255,255,255,0.05)] last:border-0"
        >
          <p className="text-xs text-[#6B7280] mb-1">{row.day}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sun size={11} className="text-[#C9A84C]" />
              <span className="text-xs font-medium text-white">{row.open}</span>
            </div>
            <span className="text-[10px] text-[#4B5563]">to</span>
            <div className="flex items-center gap-1.5">
              <Sunset size={11} className="text-[#9CA3AF]" />
              <span className="text-xs font-medium text-white">{row.close}</span>
            </div>
          </div>
          {/* Peak indicator */}
          <div className="flex items-center gap-1 mt-1.5">
            <TrendingUp size={10} className="text-amber-500" />
            <span className="text-[10px] text-[#4B5563]">Peak: {row.peak}</span>
          </div>
        </div>
      ))}

      {/* Recommended window */}
      <div className={cn(
        'mt-3 px-3 py-2.5 rounded-xl bg-[rgba(201,168,76,0.06)] border border-[rgba(201,168,76,0.15)]'
      )}>
        <div className="flex items-start gap-2">
          <Info size={11} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] text-[#C9A84C] font-semibold mb-0.5">Best Time to Book</p>
            <p className="text-[10px] text-[#6B7280] leading-relaxed">
              {SHOP_CONFIG.recommendedWindow} — shortest wait times and freshest experience.
            </p>
          </div>
        </div>
      </div>

      {/* Walk-in note */}
      <p className="text-[10px] text-[#4B5563] mt-3 text-center">
        Walk-ins welcome · Appointment preferred during evenings
      </p>
    </motion.div>
  )
}
