import { addDoc, collection, doc, onSnapshot, query, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { WaitlistEntry } from '../types';

const getCollection = () => collection(db, COLLECTIONS.WAITLIST);

export const waitlistRepository = {
  async createEntry(data: Omit<WaitlistEntry, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async updateStatus(docId: string, status: WaitlistEntry['status']): Promise<void> {
    const docRef = doc(db, COLLECTIONS.WAITLIST, docId);
    await updateDoc(docRef, { status });
  },

  subscribeToWaitlist(callback: (entries: WaitlistEntry[]) => void) {
    const q = query(getCollection(), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const entries = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as WaitlistEntry[];
      callback(entries);
    });
  }
};
