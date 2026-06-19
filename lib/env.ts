/**
 * Environment configuration and validation layer.
 * Ensures that all required environment variables are present before the app boots.
 */

export const ENV = {
  // Firebase Public
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  // Cloudinary Public
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,

  // Cloudinary Private (Server Only)
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,

  // Environment checks
  NODE_ENV: process.env.NODE_ENV,
}

/**
 * Validates if the required client-side Firebase configuration is present.
 */
export function hasFirebaseConfig(): boolean {
  return Boolean(
    ENV.NEXT_PUBLIC_FIREBASE_API_KEY &&
    ENV.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  )
}

/**
 * Validates if the required Cloudinary configuration is present.
 */
export function hasCloudinaryConfig(): boolean {
  return Boolean(ENV.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME)
}

/**
 * Throws an error if required server-side environment variables are missing.
 * Should only be called in server components or API routes.
 */
export function requireServerEnv() {
  if (typeof window !== 'undefined') {
    throw new Error('requireServerEnv should only be called on the server.')
  }
  
  if (!ENV.CLOUDINARY_API_SECRET) {
    console.warn('⚠️ Missing CLOUDINARY_API_SECRET in environment variables.')
  }
}
