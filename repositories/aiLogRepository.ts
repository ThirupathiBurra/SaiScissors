import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { AILog } from '../types/ai';

export const aiLogRepository = {
  async logAIRequest(log: Omit<AILog, 'id'>): Promise<void> {
    try {
      await addDoc(collection(db, COLLECTIONS.AI_LOGS), log);
    } catch (error) {
      console.error('Failed to write AI Log:', error);
    }
  }
};
