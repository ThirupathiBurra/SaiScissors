import { initializeApp, getApps, getApp } from 'firebase/app'
import { ENV } from '../env'

const firebaseConfig = {
  apiKey: ENV.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: ENV.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: ENV.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.NEXT_PUBLIC_FIREBASE_APP_ID,
}

/**
 * Initialize Firebase safely (prevent multiple initialization in Next.js development)
 */
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
