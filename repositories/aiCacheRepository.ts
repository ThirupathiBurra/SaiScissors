import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { AICacheEntry } from '../types/ai';
import crypto from 'crypto';

/**
 * Creates a unique hash for caching AI responses
 */
export const generateCacheHash = (endpoint: string, input: any): string => {
  const dataString = JSON.stringify(input);
  return crypto.createHash('sha256').update(`${endpoint}-${dataString}`).digest('hex');
};

export const aiCacheRepository = {
  async getCachedResponse(endpoint: string, inputHash: string): Promise<any | null> {
    try {
      const q = query(
        collection(db, COLLECTIONS.AI_CACHE),
        where('endpoint', '==', endpoint),
        where('inputHash', '==', inputHash)
      );
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        const entry = snap.docs[0].data() as AICacheEntry;
        // Check expiry (e.g. 7 days cache)
        const now = new Date().getTime();
        const expiresAt = entry.expiresAt instanceof Date ? entry.expiresAt.getTime() : new Date(entry.expiresAt).getTime();
        
        if (now < expiresAt) {
          return entry.response;
        }
      }
      return null;
    } catch (error) {
      console.warn('Cache read failed:', error);
      return null;
    }
  },

  async setCachedResponse(endpoint: string, inputHash: string, response: any): Promise<void> {
    try {
      // 7 days expiry
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      const entry: Omit<AICacheEntry, 'id'> = {
        hashKey: `${endpoint}-${inputHash}`,
        endpoint,
        inputHash,
        response,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
      };

      await addDoc(collection(db, COLLECTIONS.AI_CACHE), entry);
    } catch (error) {
      console.warn('Cache write failed:', error);
    }
  }
};
