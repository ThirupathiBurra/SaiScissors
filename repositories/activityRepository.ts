import { addDoc, collection, doc, onSnapshot, query, updateDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { ActivityLog } from '../types';

const getCollection = () => collection(db, COLLECTIONS.ACTIVITY_LOGS);

export const activityRepository = {
  async logAction(data: Omit<ActivityLog, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  subscribeToLogs(callback: (logs: ActivityLog[]) => void, limitCount = 50) {
    const q = query(getCollection(), orderBy('timestamp', 'desc'), limit(limitCount));
    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as ActivityLog[];
      callback(logs);
    });
  }
};
