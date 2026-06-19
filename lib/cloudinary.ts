import { ENV } from './env'

/**
 * Cloudinary Helper
 * Provides functions to generate image URLs and handle uploads.
 */

const CLOUD_NAME = ENV.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = ENV.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

/**
 * Generate a Cloudinary URL for an uploaded image.
 * Uses optimization flags for performance.
 * 
 * @param publicId The public ID of the image in Cloudinary
 * @param width Optional width for resizing
 * @param height Optional height for resizing
 */
export function getCloudinaryUrl(publicId: string, width?: number, height?: number): string {
  if (!CLOUD_NAME) {
    console.warn('Missing Cloudinary Cloud Name')
    return ''
  }

  const transformations = ['f_auto', 'q_auto'] // Auto format and quality
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (width || height) transformations.push('c_fill') // Crop mode

  const transformString = transformations.join(',')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${publicId}`
}

/**
 * Uploads a file to Cloudinary directly from the client using an unsigned preset.
 * 
 * @param file The file object from an input element
 * @returns The secure URL and public ID of the uploaded image
 */
export async function uploadToCloudinary(file: File): Promise<{ secureUrl: string; publicId: string }> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary configuration missing.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error?.message || 'Failed to upload image')
  }

  const data = await response.json()
  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
  }
}
