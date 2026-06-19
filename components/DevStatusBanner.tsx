'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { hasFirebaseConfig, hasCloudinaryConfig } from '@/lib/env'

export default function DevStatusBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [missingConfigs, setMissingConfigs] = useState<string[]>([])

  useEffect(() => {
    // Only check in development environment
    if (process.env.NODE_ENV !== 'development') return

    const missing = []
    if (!hasFirebaseConfig()) missing.push('Firebase')
    if (!hasCloudinaryConfig()) missing.push('Cloudinary')

    if (missing.length > 0) {
      setMissingConfigs(missing)
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md rounded-2xl p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle size={16} className="text-amber-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-amber-500 mb-1">Missing Configuration</h4>
          <p className="text-xs text-amber-500/80 leading-relaxed mb-3">
            The following integrations are missing environment variables: <strong className="text-amber-500">{missingConfigs.join(', ')}</strong>.
            The app is currently running using mock data.
          </p>
          <p className="text-[10px] text-amber-500/60 uppercase tracking-wider font-medium">
            Check .env.example
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-amber-500/60 hover:text-amber-500 transition-colors p-1"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
