'use client';

/**
 * cacheRepository
 * 
 * Intercepts Firestore fetches, stores them in localStorage for instant offline access,
 * and acts as the graceful fallback layer.
 */
export const cacheRepository = {
  set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`saiscissors_cache_${key}`, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Local storage cache write failed', e);
    }
  },

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(`saiscissors_cache_${key}`);
      if (!item) return null;
      
      const parsed = JSON.parse(item);
      // Optional: TTL logic could be added here
      return parsed.data as T;
    } catch (e) {
      return null;
    }
  },

  clear(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`saiscissors_cache_${key}`);
  }
};
