import { addDoc, collection, doc, onSnapshot, query, updateDoc, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase/firestore';
import { COLLECTIONS } from '../constants/collections';
import { DailyNote } from '../types';

const getCollection = () => collection(db, COLLECTIONS.DAILY_NOTES);

export const dailyNotesRepository = {
  async createNote(data: Omit<DailyNote, 'id'>): Promise<string> {
    const docRef = await addDoc(getCollection(), data);
    return docRef.id;
  },

  async updateNote(docId: string, data: Partial<DailyNote>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.DAILY_NOTES, docId);
    await updateDoc(docRef, data);
  },

  subscribeToNotes(callback: (notes: DailyNote[]) => void) {
    const q = query(getCollection(), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      })) as DailyNote[];
      callback(notes);
    });
  }
};
