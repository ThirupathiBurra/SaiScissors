'use client'

import { motion } from 'framer-motion'
import { Check, Scissors } from 'lucide-react'
import { BOOKING_STEPS } from '@/lib/booking-constants'
import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop: horizontal stepper */}
      <div className="hidden sm:flex items-center justify-center gap-0">
        {BOOKING_STEPS.map((step, i) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id
          const isLast = i === BOOKING_STEPS.length - 1

          return (
            <div key={step.id} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive
                      ? '0 0 20px rgba(201,168,76,0.4)'
                      : '0 0 0px rgba(201,168,76,0)',
                  }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border',
                    isCompleted
                      ? 'bg-gradient-to-br from-[#C9A84C] to-[#A07830] border-[#C9A84C] text-black'
                      : isActive
                      ? 'bg-[rgba(201,168,76,0.12)] border-[#C9A84C] text-[#C9A84C]'
                      : 'bg-transparent border-[rgba(255,255,255,0.1)] text-[#4B5563]'
                  )}
                >
                  {isCompleted ? <Check size={14} strokeWidth={3} /> : step.short}
                </motion.div>
                <span
                  className={cn(
                    'text-[10px] font-medium tracking-wider uppercase',
                    isActive ? 'text-[#C9A84C]' : isCompleted ? 'text-[#9CA3AF]' : 'text-[#4B5563]'
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="w-16 mx-1 mb-5 h-px relative overflow-hidden">
                  <div className="absolute inset-0 bg-[rgba(255,255,255,0.08)]" />
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A84C] to-[#E2C97E]"
                    initial={{ width: '0%' }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Mobile: compact pill indicator */}
      <div className="sm:hidden flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#A07830] flex items-center justify-center">
            <Scissors size={14} className="text-black" />
          </div>
          <div>
            <p className="text-xs text-[#9CA3AF] uppercase tracking-wider">Step {currentStep} of {BOOKING_STEPS.length}</p>
            <p className="text-sm font-semibold text-white">{BOOKING_STEPS[currentStep - 1]?.label}</p>
          </div>
        </div>
        {/* Mini dots */}
        <div className="flex items-center gap-1.5">
          {BOOKING_STEPS.map((step) => (
            <div
              key={step.id}
              className={cn(
                'rounded-full transition-all duration-300',
                step.id === currentStep
                  ? 'w-5 h-2 bg-[#C9A84C]'
                  : step.id < currentStep
                  ? 'w-2 h-2 bg-[#A07830]'
                  : 'w-2 h-2 bg-[rgba(255,255,255,0.15)]'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
