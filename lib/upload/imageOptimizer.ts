/**
 * Utility functions to generate optimized Cloudinary URLs on the fly
 */

export const imageOptimizer = {
  /**
   * Generates a square thumbnail
   */
  thumbnail(originalUrl: string, size: number = 200): string {
    if (!originalUrl.includes('cloudinary.com')) return originalUrl;
    const parts = originalUrl.split('/upload/');
    if (parts.length !== 2) return originalUrl;
    return `${parts[0]}/upload/c_fill,h_${size},w_${size},q_auto,f_auto/${parts[1]}`;
  },

  /**
   * Generates a responsive banner image maintaining aspect ratio
   */
  banner(originalUrl: string, width: number = 1200): string {
    if (!originalUrl.includes('cloudinary.com')) return originalUrl;
    const parts = originalUrl.split('/upload/');
    if (parts.length !== 2) return originalUrl;
    return `${parts[0]}/upload/c_scale,w_${width},q_auto,f_auto/${parts[1]}`;
  },

  /**
   * Standardizes any image for web display
   */
  standard(originalUrl: string): string {
    if (!originalUrl.includes('cloudinary.com')) return originalUrl;
    const parts = originalUrl.split('/upload/');
    if (parts.length !== 2) return originalUrl;
    return `${parts[0]}/upload/q_auto,f_auto/${parts[1]}`;
  }
};
